# Project Notes

## Purpose

This repository contains the Astro marketing website for the personal brand `Oleg Burikov`.

The site is currently positioned as Oleg Burikov's personal-brand website for performance marketing, paid acquisition, analytics, websites, creatives, cases, and blog content.

## Stack

- Astro 6
- TypeScript
- Tailwind CSS 4 through `@tailwindcss/vite`
- Vercel adapter
- Vercel Speed Insights
- Google Tag Manager for analytics and advertising tags

## Current Structure

```text
src/
  components/        Reusable Astro UI sections and shared layout pieces
  config/site.ts     Brand, contacts, tracking, Calendly, SEO defaults
  content/home-uk.json
  layouts/           BaseLayout and PageLayout
  pages/             Astro routes and API routes
  scripts/           Browser scripts for forms, GTM events, smooth scroll
  styles/global.css
  middleware.ts      Security headers and CSP
```

Current public routes:

- `/` - homepage;
- `/cases` and `/cases/case-*` - case studies;
- `/blog` and individual blog articles;
- `/privacy` - privacy policy;
- `/api/lead` - server-side lead endpoint.

Dedicated service landing pages were removed. The header "Services" link points to the homepage services section (`/#services`).

## Brand And Site Constants

Use `src/config/site.ts` for:

- production URL;
- brand and personal names;
- legal name;
- email and phone;
- Telegram, Viber, WhatsApp, LinkedIn;
- Calendly URL;
- GTM ID and tracking metadata;
- default SEO title, description, and OG image.

Avoid adding hardcoded brand/contact/tracking constants in components or pages.

## Leads

Lead forms submit to `/api/lead`.

Flow:

1. Browser form validates and sends JSON to `/api/lead`.
2. The API validates fields server-side.
3. The API applies rate limiting and honeypot protection.
4. Accepted leads are forwarded to `LEADS_WEBHOOK_URL`.
5. GTM form-success events are pushed after accepted submissions.

The webhook URL must stay server-side only.

## Tracking

The site loads GTM container `GTM-KSZJGH2S`.

GA4, Microsoft Clarity, and Meta Pixel are expected to be managed through GTM. Do not add those tags directly to the code unless the tracking plan changes.

When changing forms, buttons, Calendly links, or CTA markup, preserve existing `data-gtm-*` attributes unless there is a clear tracking reason to change them.

## Security Baseline

Security headers and CSP live in `src/middleware.ts`.

Current direction:

- keep inline scripts nonce-based;
- avoid exposing webhook URLs in client code;
- keep third-party domains scoped to services actually used by the site;
- run `npx astro check --no-color`, `npm run build`, and `npm audit --audit-level=low` before shipping larger changes.

## Deployment

The project is deployed on Vercel:

- project: `oleg-burikov`;
- production domain: `https://www.oleg-burikov.com/`;
- build command: `npm run build`.

GitHub push to `main` may trigger Vercel automatically, but production can also be deployed manually with:

```bash
vercel deploy --prod --yes
```

## Documentation Rule

Keep documentation small and current. Prefer updating this file and `docs/REBRAND_PLAN.md` instead of adding one-off summary or quest files.
