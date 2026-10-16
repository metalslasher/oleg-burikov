import type { APIRoute } from 'astro';
import { detectContact } from '../../lib/contact';

export const runtime = 'nodejs';

type JsonObject = Record<string, unknown>;
type RateLimitBucket = { count: number; resetAt: number };
type ClientRateLimit = {
  minute: RateLimitBucket;
  hour: RateLimitBucket;
};
type LeadField =
  | 'name'
  | 'phone'
  | 'contact_method'
  | 'service'
  | 'message'
  | 'plan'
  | 'form_id'
  | 'source'
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_term'
  | 'utm_content';

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_MAX_ENTRIES = 500;
const WEBHOOK_TIMEOUT_MS = 8000;
const MINUTE_LIMIT = { max: 5, windowMs: 60 * 1000 };
const HOUR_LIMIT = { max: 30, windowMs: 60 * 60 * 1000 };
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };
const rateLimits = new Map<string, ClientRateLimit>();

const jsonResponse = (payload: JsonObject, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...jsonHeaders, ...headers },
  });

const normalize = (value: string, maxLength: number) =>
  value
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);

const getString = (payload: JsonObject, key: string, maxLength: number) => {
  const value = payload[key];
  if (typeof value !== 'string') return '';
  return normalize(value, maxLength);
};

const getClientId = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  return (
    forwardedFor.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-vercel-forwarded-for') ||
    'unknown'
  );
};

const createBucket = (now: number, windowMs: number): RateLimitBucket => ({
  count: 0,
  resetAt: now + windowMs,
});

const refreshBucket = (bucket: RateLimitBucket, now: number, windowMs: number) => {
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }
};

const pruneRateLimits = (now: number) => {
  if (rateLimits.size <= RATE_LIMIT_MAX_ENTRIES) return;
  for (const [clientId, limits] of rateLimits.entries()) {
    if (limits.hour.resetAt < now) {
      rateLimits.delete(clientId);
    }
  }
};

const checkRateLimit = (clientId: string) => {
  const now = Date.now();
  pruneRateLimits(now);

  const limits =
    rateLimits.get(clientId) ||
    ({
      minute: createBucket(now, MINUTE_LIMIT.windowMs),
      hour: createBucket(now, HOUR_LIMIT.windowMs),
    } satisfies ClientRateLimit);

  rateLimits.set(clientId, limits);
  refreshBucket(limits.minute, now, MINUTE_LIMIT.windowMs);
  refreshBucket(limits.hour, now, HOUR_LIMIT.windowMs);

  limits.minute.count += 1;
  limits.hour.count += 1;

  if (limits.minute.count > MINUTE_LIMIT.max) {
    return { isLimited: true, retryAfter: Math.ceil((limits.minute.resetAt - now) / 1000) };
  }
  if (limits.hour.count > HOUR_LIMIT.max) {
    return { isLimited: true, retryAfter: Math.ceil((limits.hour.resetAt - now) / 1000) };
  }

  return { isLimited: false, retryAfter: 0 };
};

const getWebhookUrl = () =>
  import.meta.env.LEADS_WEBHOOK_URL ||
  import.meta.env.LEAD_WEBHOOK_URL ||
  import.meta.env.GOOGLE_APPS_SCRIPT_URL ||
  '';

const buildLeadParams = (lead: Record<LeadField, string>) =>
  new URLSearchParams({
    name: lead.name,
    phone: lead.phone,
    contact_method: lead.contact_method,
    service: lead.service,
    message: lead.message,
    plan: lead.plan,
    form_id: lead.form_id,
    source: lead.source,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_term: lead.utm_term,
    utm_content: lead.utm_content,
  });

const forwardLead = async (lead: Record<LeadField, string>) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
      throw new Error('Lead webhook URL is not configured');
    }

    const params = buildLeadParams(lead);
    const response = await fetch(`${webhookUrl}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Lead webhook returned ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Заявка занадто велика.' }, 413);
  }

  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return jsonResponse({ error: 'Невірний формат даних.' }, 415);
  }

  const rateLimit = checkRateLimit(getClientId(request));
  if (rateLimit.isLimited) {
    return jsonResponse(
      { error: 'Забагато запитів. Спробуйте ще раз пізніше.' },
      429,
      { 'Retry-After': String(rateLimit.retryAfter) }
    );
  }

  let payload: JsonObject;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Payload must be an object');
    }
    payload = parsed as JsonObject;
  } catch {
    return jsonResponse({ error: 'Невірний формат даних.' }, 400);
  }

  const encodedPayloadSize = new TextEncoder().encode(JSON.stringify(payload)).length;
  if (encodedPayloadSize > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Заявка занадто велика.' }, 413);
  }

  const honeypot = getString(payload, 'website_hp', 100);
  if (honeypot) {
    return jsonResponse({ ok: true });
  }

  const lead: Record<LeadField, string> = {
    name: getString(payload, 'name', 80),
    // Kept as `phone` for the webhook columns; holds a phone, Telegram handle or email.
    phone: getString(payload, 'contact', 120) || getString(payload, 'phone', 120),
    contact_method: getString(payload, 'contact_method', 40),
    service: getString(payload, 'service', 120) || 'Не вказано',
    message: getString(payload, 'message', 1200) || 'Не вказано',
    plan: getString(payload, 'plan', 80),
    form_id: getString(payload, 'form_id', 80),
    source: getString(payload, 'source', 80),
    utm_source: getString(payload, 'utm_source', 120),
    utm_medium: getString(payload, 'utm_medium', 120),
    utm_campaign: getString(payload, 'utm_campaign', 160),
    utm_term: getString(payload, 'utm_term', 160),
    utm_content: getString(payload, 'utm_content', 160),
  };

  if (lead.name.length < 2) {
    return jsonResponse({ error: 'Вкажіть коректне ім’я.' }, 400);
  }
  const contactKind = detectContact(lead.phone);
  if (!contactKind) {
    return jsonResponse({ error: 'Вкажіть телефон, Telegram або email для зв’язку.' }, 400);
  }
  lead.contact_method = lead.contact_method || contactKind;

  try {
    await forwardLead(lead);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error('Lead webhook error:', error);
    return jsonResponse({ error: 'Не вдалося надіслати заявку. Спробуйте ще раз.' }, 502);
  }
};
