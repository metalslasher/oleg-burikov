import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const cryptoApi = globalThis.crypto;
  const bytes = cryptoApi?.getRandomValues ? cryptoApi.getRandomValues(new Uint8Array(16)) : new Uint8Array(16);
  const raw = String.fromCharCode(...bytes);
  const nonce = typeof btoa === 'function' ? btoa(raw) : Buffer.from(raw, 'binary').toString('base64');
  context.locals.cspNonce = nonce;
  const isDev = import.meta.env.DEV;

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://www.clarity.ms',
    'https://scripts.clarity.ms',
    'https://script.google.com',
    'https://script.googleusercontent.com',
  ].join(' ');

  const connectSrc = [
    "'self'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://www.google.com',
    'https://www.google.com.ua',
    'https://region1.google-analytics.com',
    'https://region1.analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://www.clarity.ms',
    'https://b.clarity.ms',
    'https://c.clarity.ms',
    'https://www.facebook.com',
    'https://script.google.com',
    'https://script.googleusercontent.com',
    ...(isDev ? ['ws:', 'http://localhost:*'] : []),
  ].join(' ');

  const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "frame-src https://www.googletagmanager.com",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join('; ');

  const response = await next();

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );

  return response;
});
