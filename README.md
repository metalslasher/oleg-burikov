# Oleg Burikov Website

Personal-brand marketing website for Oleg Burikov, built with Astro and deployed on Vercel.

## Quick Start

Required runtime: Node.js `>=22.12.0`.

```bash
npm install
npm run dev
```

Local URL: `http://localhost:4321`.

## Common Commands

```bash
npm run build
npx astro check --no-color
npm audit --audit-level=low
```

## Environment

Create `.env` locally and configure the same variable in Vercel:

```bash
LEADS_WEBHOOK_URL=
```

`LEADS_WEBHOOK_URL` is used only by `/api/lead` for server-side lead forwarding. Do not expose it in client code and do not commit `.env`.

## Key Files

- `src/config/site.ts` - brand, domain, contacts, Calendly, tracking IDs, SEO defaults.
- `src/content/home-uk.json` - home page content plus navigation data.
- `src/pages/api/lead.ts` - server-side lead endpoint, validation, rate limit, webhook forwarding.
- `src/middleware.ts` - CSP and security headers.
- `docs/PROJECT.md` - current technical project notes.
- `docs/REBRAND_PLAN.md` - personal-brand rewrite plan.

## Deployment

- Vercel project: `oleg-burikov`
- Production domain: `https://www.oleg-burikov.com/`
- Build command: `npm run build`
