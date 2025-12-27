# Targetsy Agency

Marketing site for Targetsy agency (Google Ads, Meta Ads, analytics, consulting) with cases, blog, and tools.

## Stack
- Astro
- TypeScript
- Tailwind CSS

## Local development
```bash
npm install
npm run dev
```
The site runs at `http://localhost:4321`.

Build and preview:
```bash
npm run build
npm run preview
```

## Environment variables
Create `.env` from `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes (for `/tools/site-audit`) | Used by the audit API. |
| `PUBLIC_GA4_ID` | Optional | Google Analytics 4. |
| `PUBLIC_FB_PIXEL_ID` | Optional | Meta/Facebook Pixel. |

## Content and pages
- Homepage content: `src/content/home-uk.json`
- Pages: `src/pages/**`
  - cases: `src/pages/cases/`
  - blog: `src/pages/blog/`
  - services: `src/pages/services/`
  - tools: `src/pages/tools/`

## Forms and leads
- Client-side validation and submission: `src/scripts/formValidation.ts`.
- Sends lead data to Google Sheets via an Apps Script URL (`SHEETS_URL` in the file).
- UTM params are read from the URL and stored in `sessionStorage`.

## Site audit tool
- UI: `src/pages/tools/site-audit.astro`
- API: `src/pages/api/analyze.ts`
- The API fetches page HTML, extracts text, and sends it to OpenAI (`gpt-4o`).
- Rate limit: 3 requests/min per IP.

## Deployment
- Vercel: build command `npm run build`, output `dist`.
- Update `public/sitemap.xml` when new pages are added.

## File structure
See `FILE_STRUCTURE.md`.

## Contact
info@targetsy.agency
