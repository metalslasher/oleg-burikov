
import type { APIRoute } from 'astro';
import OpenAI from 'openai';

// Rate limiting (simple in-memory for demo/MVP)
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute per IP

export const POST: APIRoute = async ({ request }) => {
    // Simple Honeypot Check
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    if (body.website_hp) {
        // Bot detected
        return new Response(JSON.stringify({ error: 'Bot detected' }), { status: 400 });
    }

    const { url, name, phone, message, notes } = body;

    if (!url || !name || !phone) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Validate URL
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    try {
        // 2. Fetch Website Content
        // Note: In a real prod environment, use a headless browser or specialized scraper to handle JS-heavy sites.
        // For MVP, simple fetch is okay, but might fail on some sites.
        const siteResponse = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'TargetsyAuditBot/1.0',
            },
            signal: AbortSignal.timeout(5000) // 5s timeout
        });

        if (!siteResponse.ok) {
            throw new Error(`Failed to fetch site: ${siteResponse.statusText}`);
        }

        const html = await siteResponse.text();

        // Extract text content (very naive implementation)
        // Removing scripts, styles, and tags
        const cleanText = html
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "")
            .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .substring(0, 8000); // Limit context size for LLM

        // 3. Call OpenAI
        const openai = new OpenAI({
            apiKey: import.meta.env.OPENAI_API_KEY,
        });

        if (!import.meta.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is missing");
            // Return dummy data if no key for testing
            return new Response(JSON.stringify({
                analysis: "Демо режим: API ключ не знайдено. \n\n1. Покращіть швидкість завантаження.\n2. Додайте CTA кнопки на перший екран.\n3. Оптимізуйте мобільну версію."
            }), { status: 200 });
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Ти досвідчений маркетолог та експерт з конверсії сайтів (CRO). Твоє завдання - проаналізувати текст з сайту клієнта і надати 3-5 конкретних, дієвих порад українською мовою, як покращити цей сайт для збільшення продажів. Будь лаконічним, професійним та переконливим. Форматуй відповідь як простий список порад." },
                { role: "user", content: `Проаналізуй цей контент сайту (${targetUrl}) і дай поради. Контекст бізнесу від клієнта: ${message || notes || "Не вказано"}. \n\nКонтент сайту:\n${cleanText}` }
            ],
            model: "gpt-4o-mini", // Cost effective
        });

        const analysis = completion.choices[0].message.content;

        // In a real app, you would also SAVE this lead to a database or send an email to the admin.

        return new Response(JSON.stringify({ analysis }), { status: 200 });

    } catch (error: any) {
        console.error("Audit Error:", error);
        return new Response(JSON.stringify({ error: 'Не вдалося проаналізувати сайт. Перевірте URL або спробуйте пізніше.' }), { status: 500 });
    }
}
