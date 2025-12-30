
import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import dns from 'node:dns/promises';
import net from 'node:net';

// Rate limiting (simple in-memory for demo/MVP)
type RateLimitEntry = { count: number; windowStart: number };
const rateLimit = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute per IP

const isPrivateIPv4 = (ip: string) => {
    const parts = ip.split('.').map((part) => Number(part));
    if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
        return false;
    }
    const [a, b] = parts;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
};

const isPrivateIPv6 = (ip: string) => {
    const normalized = ip.toLowerCase();
    return (
        normalized === '::1' ||
        normalized === '::' ||
        normalized.startsWith('fc') ||
        normalized.startsWith('fd') ||
        normalized.startsWith('fe80')
    );
};

const isPrivateIp = (ip: string) => {
    const ipVersion = net.isIP(ip);
    if (ipVersion === 4) return isPrivateIPv4(ip);
    if (ipVersion === 6) return isPrivateIPv6(ip);
    return false;
};

const validateTargetUrl = async (target: URL) => {
    const protocol = target.protocol.toLowerCase();
    if (!['http:', 'https:'].includes(protocol)) {
        throw new Error('Unsupported URL protocol');
    }

    const hostname = target.hostname.toLowerCase();
    if (!hostname || hostname === 'localhost' || hostname.endsWith('.local')) {
        throw new Error('Localhost targets are not allowed');
    }

    if (net.isIP(hostname) && isPrivateIp(hostname)) {
        throw new Error('Private IP targets are not allowed');
    }

    const resolved = await dns.lookup(hostname, { all: true });
    if (resolved.some((record) => isPrivateIp(record.address))) {
        throw new Error('Private IP targets are not allowed');
    }
};

const safeFetch = async (target: URL, options: RequestInit, maxRedirects = 3) => {
    let current = new URL(target.toString());

    for (let i = 0; i <= maxRedirects; i += 1) {
        await validateTargetUrl(current);

        const response = await fetch(current, { ...options, redirect: 'manual' });
        if (![301, 302, 303, 307, 308].includes(response.status)) {
            return response;
        }

        const location = response.headers.get('location');
        if (!location) {
            return response;
        }

        current = new URL(location, current);
    }

    throw new Error('Too many redirects');
};

export const POST: APIRoute = async ({ request }) => {
    const now = Date.now();
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const clientId =
        forwardedFor.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-vercel-forwarded-for') ||
        'unknown';

    const current = rateLimit.get(clientId);
    if (!current || now - current.windowStart > RATE_LIMIT_WINDOW) {
        rateLimit.set(clientId, { count: 1, windowStart: now });
    } else {
        current.count += 1;
        if (current.count > MAX_REQUESTS) {
            return new Response(
                JSON.stringify({ error: 'Too many requests. Try again in a minute.' }),
                { status: 429, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Retry-After': '60' } }
            );
        }
    }

    const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

    // Simple Honeypot Check
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: jsonHeaders });
    }

    if (body.website_hp) {
        // Bot detected
        return new Response(JSON.stringify({ error: 'Bot detected' }), { status: 400, headers: jsonHeaders });
    }

    const { url, name, phone, message, notes } = body;

    if (!url || !name || !phone) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: jsonHeaders });
    }

    // Validate URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    try {
        const target = new URL(targetUrl);

        // 2. Fetch Website Content
        // Note: In a real prod environment, use a headless browser or specialized scraper to handle JS-heavy sites.
        // For MVP, simple fetch is okay, but might fail on some sites.
        const siteResponse = await safeFetch(target, {
            headers: {
                'User-Agent': 'TargetsyAuditBot/1.0',
            },
            signal: AbortSignal.timeout(5000) // 5s timeout
        });

        if (!siteResponse.ok) {
            throw new Error(`Failed to fetch site: ${siteResponse.statusText}`);
        }

        const html = await siteResponse.text();

        const MAX_PAGE_TEXT_CHARS = 20000;

        const stripHtml = (rawHtml: string) =>
            rawHtml
                .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "")
                .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();

        const extractTagText = (rawHtml: string, tag: string) => {
            const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
            const matches = rawHtml.match(regex) || [];
            return matches
                .map((match) =>
                    match
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim()
                )
                .filter(Boolean);
        };

        const buildPageContext = (pageUrl: string, rawHtml: string) => {
            const titleMatch = rawHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            const metaDescMatch = rawHtml.match(
                /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
            );
            const h1Text = extractTagText(rawHtml, 'h1').join(' | ');
            const h2Text = extractTagText(rawHtml, 'h2').join(' | ');
            const cleanText = stripHtml(rawHtml).substring(0, MAX_PAGE_TEXT_CHARS);

            return [
                `URL: ${pageUrl}`,
                titleMatch?.[1] ? `Title: ${titleMatch[1].trim()}` : '',
                metaDescMatch?.[1] ? `Meta description: ${metaDescMatch[1].trim()}` : '',
                h1Text ? `H1: ${h1Text}` : '',
                h2Text ? `H2: ${h2Text}` : '',
                `Visible text excerpt:\n${cleanText}`,
            ]
                .filter(Boolean)
                .join("\n");
        };

        const combinedContext = buildPageContext(targetUrl, html);

        // 3. Call OpenAI
        const openai = new OpenAI({
            apiKey: import.meta.env.OPENAI_API_KEY,
        });

        if (!import.meta.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is missing");
            return new Response(
                JSON.stringify({
                    analysis: 'API key is missing. Add OPENAI_API_KEY to environment variables.',
                }),
                { status: 200, headers: jsonHeaders }
            );
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are a senior CRO/UX auditor at a marketing agency. Respond in Ukrainian. " +
                        "Provide ONLY actionable recommendations to improve UX or conversion based on the provided content. " +
                        "Do NOT summarize the business or repeat the page content. " +
                        "No headings, no markdown, no numbered lists. Output plain text only. " +
                        "Each recommendation must be on a new line and start with a hyphen (-). " +
                        "If information is missing, add a recommendation that clearly states what should be added or clarified.",
                },
                {
                    role: "user",
                    content: [
                        "Audit the page using the data below.",
                        `Client context: ${message || notes || "Not provided"}.`,
                        "Page data:",
                        combinedContext,
                    ].join("\n\n"),
                },
            ],
            model: "gpt-4o",
            temperature: 0.2,
            max_tokens: 1800,
        });

        const analysis = completion.choices[0].message.content || '';
        const sanitized = analysis
            .replace(/^#{1,6}\s*/gm, '')
            .replace(/^\s*\d+\.\s*/gm, '')
            .replace(/^\s*[-*\u2022]\s+/gm, '- ')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/`+/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
        const formatted = sanitized
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => (line.startsWith('-') ? line : `- ${line}`))
            .join('\n');

        // In a real app, you would also SAVE this lead to a database or send an email to the admin.

        return new Response(JSON.stringify({ analysis: formatted }), { status: 200, headers: jsonHeaders });

    } catch (error: any) {
        console.error("Audit Error:", error);
        return new Response(
            JSON.stringify({ error: 'Unable to analyze the site. Check the URL or try again later.' }),
            { status: 500, headers: jsonHeaders }
        );
    }
}
