# Project Summary — Targetsy Agency

## What it is
Agency website with cases, blog, service pages, and a site audit tool.

## Key routes
- `/` — home
- `/services/*` — services
- `/cases` — cases
- `/blog` — blog
- `/pricing` — pricing
- `/contact` — contact
- `/tools/site-audit` — site audit tool
- `/privacy` — privacy policy

## Integrations
- Leads saved to Google Sheets via Apps Script.
- Site audit via OpenAI API (`/api/analyze`).
- Optional analytics: GA4 and Meta Pixel (`PUBLIC_*` env vars).

## Stack
Astro + TypeScript + Tailwind CSS.

## Docs
- `README.md` — setup, content, integrations
- `FILE_STRUCTURE.md` — project tree
