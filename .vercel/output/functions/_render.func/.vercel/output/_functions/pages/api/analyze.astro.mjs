import OpenAI from 'openai';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  if (body.website_hp) {
    return new Response(JSON.stringify({ error: "Bot detected" }), { status: 400 });
  }
  const { url, name, email, phone, notes } = body;
  if (!url || !name || !email || !phone) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  let targetUrl = url;
  if (!targetUrl.startsWith("http")) {
    targetUrl = "https://" + targetUrl;
  }
  try {
    const siteResponse = await fetch(targetUrl, {
      headers: {
        "User-Agent": "TargetsyAuditBot/1.0"
      },
      signal: AbortSignal.timeout(5e3)
      // 5s timeout
    });
    if (!siteResponse.ok) {
      throw new Error(`Failed to fetch site: ${siteResponse.statusText}`);
    }
    const html = await siteResponse.text();
    const cleanText = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "").replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().substring(0, 8e3);
    const openai = new OpenAI({
      apiKey: "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"
    });
    if (false) ;
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Ти досвідчений маркетолог та експерт з конверсії сайтів (CRO). Твоє завдання - проаналізувати текст з сайту клієнта і надати 3-5 конкретних, дієвих порад українською мовою, як покращити цей сайт для збільшення продажів. Будь лаконічним, професійним та переконливим. Форматуй відповідь як простий список порад." },
        { role: "user", content: `Проаналізуй цей контент сайту (${targetUrl}) і дай поради. Контекст бізнесу від клієнта: ${notes || "Не вказано"}. 

Контент сайту:
${cleanText}` }
      ],
      model: "gpt-4o-mini"
      // Cost effective
    });
    const analysis = completion.choices[0].message.content;
    return new Response(JSON.stringify({ analysis }), { status: 200 });
  } catch (error) {
    console.error("Audit Error:", error);
    return new Response(JSON.stringify({ error: "Не вдалося проаналізувати сайт. Перевірте URL або спробуйте пізніше." }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
