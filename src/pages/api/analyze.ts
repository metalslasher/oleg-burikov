import type { APIRoute } from 'astro';
import OpenAI from 'openai';

export const runtime = 'nodejs';

type RateLimitEntry = { count: number; windowStart: number };
const rateLimit = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute per IP
const MAX_SCREENSHOT_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

const sanitizeOutput = (raw: string) => {
    const cleaned = raw
        .replace(/^#{1,6}\s*/gm, '')
        .replace(/^\s*\d+\.\s*/gm, '')
        .replace(/^\s*[-*\u2022]\s+/gm, '- ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`+/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const lines = cleaned
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => (line.startsWith('-') ? line : `- ${line}`));

    return lines.length
        ? lines.join('\n')
        : '- Помітних проблем не виявлено. Якщо потрібен глибший аудит, надішліть більше скріншотів ключових блоків.';
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
                JSON.stringify({ error: 'Забагато запитів. Спробуйте ще раз через хвилину.' }),
                { status: 429, headers: { ...jsonHeaders, 'Retry-After': '60' } }
            );
        }
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return new Response(JSON.stringify({ error: 'Немає даних запиту.' }), { status: 400, headers: jsonHeaders });
    }

    const honeypot = normalize(String(formData.get('website_hp') || ''));
    if (honeypot) {
        return new Response(JSON.stringify({ error: 'Підозрілий запит.' }), { status: 400, headers: jsonHeaders });
    }

    const name = normalize(String(formData.get('name') || ''));
    const phone = normalize(String(formData.get('phone') || ''));
    const message = normalize(String(formData.get('message') || ''));
    const siteType = normalize(String(formData.get('site_type') || ''));
    const siteGoal = normalize(String(formData.get('site_goal') || ''));
    const screenshot = formData.get('screenshot');

    if (!name || !phone) {
        return new Response(JSON.stringify({ error: 'Заповніть ім’я та телефон.' }), { status: 400, headers: jsonHeaders });
    }

    if (!(screenshot instanceof File)) {
        return new Response(JSON.stringify({ error: 'Завантажте скріншот сторінки.' }), { status: 400, headers: jsonHeaders });
    }

    if (!ALLOWED_IMAGE_TYPES.has(screenshot.type)) {
        return new Response(
            JSON.stringify({ error: 'Підтримуються лише PNG, JPG або WebP.' }),
            { status: 400, headers: jsonHeaders }
        );
    }

    if (screenshot.size > MAX_SCREENSHOT_BYTES) {
        return new Response(
            JSON.stringify({ error: 'Файл завеликий. Максимум 6 МБ.' }),
            { status: 400, headers: jsonHeaders }
        );
    }

    if (!import.meta.env.OPENAI_API_KEY) {
        return new Response(JSON.stringify({ error: 'AI ключ не налаштовано.' }), { status: 500, headers: jsonHeaders });
    }

    try {
        const buffer = Buffer.from(await screenshot.arrayBuffer());
        const base64 = buffer.toString('base64');
        const imageUrl = `data:${screenshot.type};base64,${base64}`;

        const contextParts: string[] = [];
        if (siteType) contextParts.push(`Тип сайту: ${siteType}`);
        if (siteGoal) contextParts.push(`Ціль: ${siteGoal}`);
        if (message) contextParts.push(`Контекст від користувача: ${message}`);

        const contextText = contextParts.length ? contextParts.join('\n') : 'Контекст не надано.';

        const openai = new OpenAI({
            apiKey: import.meta.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            temperature: 0.1,
            max_tokens: 900,
            messages: [
                {
                    role: 'system',
                    content:
                        'Ви — маркетинговий аудитор. Аналізуйте тільки те, що видно на скріншоті. Не робіть припущень про блоки, яких не видно. ' +
                        'Не давайте загальних порад без доказу. Якщо немає явної проблеми — не вигадуйте її. ' +
                        'Кожен пункт у форматі: "- Проблема: ... | Доказ: ... | Рекомендація: ...". ' +
                        'Якщо помітних проблем немає, поверніть один пункт: "- Помітних проблем не виявлено. ...".',
                },
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: contextText },
                        { type: 'image_url', image_url: { url: imageUrl } },
                    ],
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content || '';
        const sanitized = sanitizeOutput(raw);

        return new Response(JSON.stringify({ analysis: sanitized }), { status: 200, headers: jsonHeaders });
    } catch (error) {
        console.error('Audit Error:', error);
        return new Response(
            JSON.stringify({ error: 'Не вдалося виконати аудит. Спробуйте ще раз.' }),
            { status: 500, headers: jsonHeaders }
        );
    }
};
