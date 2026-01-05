
import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import dns from 'node:dns/promises';
import net from 'node:net';

export const runtime = 'nodejs';

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

        const MAX_PAGE_TEXT_CHARS = 12000;
        const EXCERPT_CHUNK = 4000;

        const stripHtml = (rawHtml: string) =>
            rawHtml
                .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "")
                .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();

        const normalizeText = (value: string) =>
            value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

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

        const extractMetaContent = (rawHtml: string, name: string) => {
            const regex = new RegExp(
                `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`,
                'i'
            );
            const match = rawHtml.match(regex);
            return match?.[1]?.trim() || '';
        };

        const extractAttr = (tag: string, attr: string) => {
            const regex = new RegExp(`${attr}=["']([^"']+)["']`, 'i');
            const match = tag.match(regex);
            return match?.[1]?.trim() || '';
        };

        const extractButtons = (rawHtml: string) => {
            const matches = rawHtml.match(/<button[^>]*>([\s\S]*?)<\/button>/gi) || [];
            return matches
                .map((match) => normalizeText(match))
                .filter(Boolean);
        };

        const extractAnchors = (rawHtml: string) => {
            const matches = rawHtml.match(/<a[^>]*>([\s\S]*?)<\/a>/gi) || [];
            return matches
                .map((match) => normalizeText(match))
                .filter(Boolean);
        };

        const extractInputs = (rawHtml: string) => {
            const matches = rawHtml.match(/<(input|textarea|select)\b[^>]*>/gi) || [];
            return matches.map((tag) => {
                const type = extractAttr(tag, 'type') || (tag.startsWith('<textarea') ? 'textarea' : 'input');
                const name = extractAttr(tag, 'name');
                const placeholder = extractAttr(tag, 'placeholder');
                const required = /\srequired(\s|>|=)/i.test(tag);
                return { type, name, placeholder, required };
            });
        };

        const extractEmails = (text: string) => {
            const matches = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || [];
            return Array.from(new Set(matches)).slice(0, 5);
        };

        const extractPhones = (text: string) => {
            const matches =
                text.match(/(\+?\d[\d\s().-]{7,}\d)/g) || [];
            return Array.from(new Set(matches)).slice(0, 5);
        };

        const extractMetrics = (text: string) => {
            const matches =
                text.match(/(\d[\d\s.,]*\s?(%|₴|грн|uah|\$|€|млн|тис|k|m))/gi) || [];
            return Array.from(new Set(matches.map((value) => value.trim()))).slice(0, 8);
        };

        const hasResultKeywords = (text: string) => {
            const lower = text.toLowerCase();
            const keywords = ['результат', 'досягнен', 'кейси', 'портфоліо', 'відгук', 'клієнт'];
            return keywords.some((word) => lower.includes(word));
        };

        const detectSections = (plainText: string) => {
            const lower = plainText.toLowerCase();
            const sectionMap: Record<string, string[]> = {
                pricing: ['ціна', 'тарифи', 'пакет', 'вартість', 'pricing', 'plans'],
                faq: ['faq', 'питання', 'відповіді'],
                testimonials: ['відгук', 'клієнт', 'review', 'testimonial'],
                portfolio: ['кейси', 'портфоліо', 'case study'],
                guarantees: ['гарантія', 'guarantee'],
                delivery: ['доставка', 'shipping'],
                about: ['про нас', 'about us', 'команда'],
                blog: ['блог', 'статті', 'resources'],
            };

            const found: string[] = [];
            Object.entries(sectionMap).forEach(([key, keywords]) => {
                if (keywords.some((word) => lower.includes(word))) {
                    found.push(key);
                }
            });
            return found;
        };

        const buildTextExcerpts = (text: string) => {
            if (text.length <= MAX_PAGE_TEXT_CHARS) {
                return text.substring(0, MAX_PAGE_TEXT_CHARS);
            }

            const midStart = Math.max(0, Math.floor(text.length / 2) - Math.floor(EXCERPT_CHUNK / 2));
            const endStart = Math.max(0, text.length - EXCERPT_CHUNK);

            const chunks = [
                text.slice(0, EXCERPT_CHUNK),
                text.slice(midStart, midStart + EXCERPT_CHUNK),
                text.slice(endStart),
            ]
                .map((chunk) => chunk.trim())
                .filter(Boolean);

            const uniqueChunks = Array.from(new Set(chunks));
            return uniqueChunks.join('\n\n');
        };

        const buildPageContext = (pageUrl: string, rawHtml: string) => {
            const titleMatch = rawHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            const metaDesc = extractMetaContent(rawHtml, 'description');
            const metaRobots = extractMetaContent(rawHtml, 'robots');
            const canonicalMatch = rawHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
            const htmlLangMatch = rawHtml.match(/<html[^>]*lang=["']([^"']+)["'][^>]*>/i);
            const h1Text = extractTagText(rawHtml, 'h1').join(' | ');
            const h2Text = extractTagText(rawHtml, 'h2').join(' | ');
            const h3Text = extractTagText(rawHtml, 'h3').join(' | ');
            const cleanText = stripHtml(rawHtml);
            const visibleExcerpt = buildTextExcerpts(cleanText);

            const buttons = extractButtons(rawHtml);
            const anchors = extractAnchors(rawHtml);
            const ctaKeywords = [
                'замов', 'отрим', 'консультац', 'заброн', 'звʼяз', 'зв\'яз',
                'купит', 'записат', 'дізнат', 'детальніше', 'переглянут',
                'demo', 'trial', 'book', 'contact', 'schedule', 'call', 'start', 'get',
            ];
            const ctaCandidates = [...buttons, ...anchors]
                .map((text) => text.replace(/\s+/g, ' ').trim())
                .filter(Boolean)
                .filter((text) => ctaKeywords.some((key) => text.toLowerCase().includes(key)))
                .slice(0, 10);
            const ctaTotal = ctaCandidates.length;
            const ctaMap = new Map<string, string>();
            ctaCandidates.forEach((text) => {
                const key = text.toLowerCase();
                if (!ctaMap.has(key)) {
                    ctaMap.set(key, text);
                }
            });
            const ctaUnique = ctaMap.size;
            const ctaSamples = Array.from(ctaMap.values()).slice(0, 6);

            const inputs = extractInputs(rawHtml);
            const requiredCount = inputs.filter((item) => item.required).length;
            const typeCounts: Record<string, number> = {};
            inputs.forEach((item) => {
                const key = item.type.toLowerCase();
                typeCounts[key] = (typeCounts[key] || 0) + 1;
            });

            const images = rawHtml.match(/<img\b[^>]*>/gi) || [];
            const imagesWithoutAlt = images.filter((tag) => !/\salt=["'][^"']*["']/i.test(tag)).length;
            const emails = extractEmails(cleanText);
            const phones = extractPhones(cleanText);
            const metrics = extractMetrics(cleanText);
            const resultsKeywordsPresent = hasResultKeywords(cleanText);
            const sections = detectSections(cleanText);
            const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

            return [
                `URL: ${pageUrl}`,
                titleMatch?.[1] ? `Title: ${titleMatch[1].trim()}` : '',
                metaDesc ? `Meta description: ${metaDesc}` : '',
                metaRobots ? `Meta robots: ${metaRobots}` : '',
                canonicalMatch?.[1] ? `Canonical: ${canonicalMatch[1].trim()}` : '',
                htmlLangMatch?.[1] ? `HTML lang: ${htmlLangMatch[1].trim()}` : '',
                h1Text ? `H1: ${h1Text}` : '',
                h2Text ? `H2: ${h2Text}` : '',
                h3Text ? `H3: ${h3Text}` : '',
                `Signals:`,
                `- Word count: ${wordCount}`,
                `- Forms: ${rawHtml.match(/<form\b[^>]*>/gi)?.length || 0}`,
                `- Form fields: ${inputs.length} (required: ${requiredCount})`,
                `- Field types: ${Object.entries(typeCounts).map(([k, v]) => `${k}:${v}`).join(', ') || 'none'}`,
                `- CTA total: ${ctaTotal}, unique: ${ctaUnique}, samples: ${ctaSamples.length ? ctaSamples.join(' | ') : 'not detected'}`,
                `- Emails: ${emails.length ? emails.join(' | ') : 'not detected'}`,
                `- Phones: ${phones.length ? phones.join(' | ') : 'not detected'}`,
                `- Images: ${images.length} (missing alt: ${imagesWithoutAlt})`,
                `- Metrics samples: ${metrics.length ? metrics.join(' | ') : 'not detected'}`,
                `- Result keywords present: ${resultsKeywordsPresent ? 'yes' : 'no'}`,
                `- Sections detected: ${sections.length ? sections.join(', ') : 'not detected'}`,
                `Visible text excerpt:\n${visibleExcerpt}`,
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
                        "Use ONLY evidence from the provided Page data and Signals. " +
                        "Each recommendation must explicitly reference a concrete element from the data (e.g., an exact phrase from Visible text excerpt, H1/H2/H3, CTA samples, form fields, or Signals). " +
                        "Do NOT make generic or unverifiable suggestions (links, mobile responsiveness, speed, SEO, etc.) unless the data explicitly supports it. " +
                        "Do NOT summarize the business or repeat the page content. " +
                        "Do not assume missing sections are required unless the Signals explicitly indicate they are absent and this impacts trust or conversion. " +
                        "Only comment on CTA variety if Signals show CTA total >= 3 and CTA unique = 1. " +
                        "Only suggest adding results/achievements if Signals show Result keywords present: no AND Metrics samples: not detected. " +
                        "No headings, no markdown, no numbered lists. Output plain text only. " +
                        "Each recommendation must be on a new line and start with a hyphen (-). " +
                        "If you cannot find any concrete improvements based on the data, output exactly one line: - Помітних проблем не виявлено за наданими даними.",
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
