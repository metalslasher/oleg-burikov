import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const cryptoApi = globalThis.crypto;
  const bytes = cryptoApi?.getRandomValues ? cryptoApi.getRandomValues(new Uint8Array(16)) : new Uint8Array(16);
  const raw = String.fromCharCode(...bytes);
  const nonce = typeof btoa === 'function' ? btoa(raw) : Buffer.from(raw, 'binary').toString('base64');
  context.locals.cspNonce = nonce;
  const isDev = import.meta.env.DEV;
  const pathname = new URL(context.request.url).pathname;
  const isDemoRoute = pathname.startsWith('/demos/');

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://va.vercel-scripts.com',
    'https://www.clarity.ms',
    'https://scripts.clarity.ms',
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
    'https://*.clarity.ms',
    'https://www.facebook.com',
    'https://vitals.vercel-insights.com',
    ...(isDev ? ['ws:', 'http://localhost:*'] : []),
  ].join(' ');

  const frameSrc = [
    "'self'",
    'https://www.googletagmanager.com',
    'https://www.facebook.com',
    'https://connect.facebook.net',
  ].join(' ');

  const frameAncestors = isDemoRoute ? "'self'" : "'none'";

  const styleSrc = [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
  ].join(' ');
  const fontSrc = ["'self'", 'data:', 'https://fonts.gstatic.com'].join(' ');

  const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    "img-src 'self' data: https:",
    `font-src ${fontSrc}`,
    `connect-src ${connectSrc}`,
    `frame-src ${frameSrc}`,
    "base-uri 'self'",
    "form-action 'self' https://www.facebook.com",
    "object-src 'none'",
    `frame-ancestors ${frameAncestors}`,
  ].join('; ');

  const response = await next();

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', isDemoRoute ? 'SAMEORIGIN' : 'DENY');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );

  return response;
});
