# Oleg Burikov — personal website

Personal-brand site of Oleg Burikov, Performance Marketing Manager. Astro 7 on Vercel.

## Quick start

Node.js `22.x`.

```bash
npm install
npm run dev
```

Local URL: `http://localhost:4321`.

## Commands

```bash
npm run check     # astro type check
npm run build     # production build (Vercel output)
npm run quality   # check + build
```

## Environment

```bash
LEADS_WEBHOOK_URL=   # server-side only, used by /api/lead
```

## Docs

- `docs/PROJECT.md` — structure, how to add cases and posts, tracking, security notes.
- `docs/OLEG_BURIKOV_PROFILE.md` — source of truth for experience and claims.
- `docs/COMPETITOR_ANALYSIS.md` — market research behind the structure.

## Deployment

Vercel project `oleg-burikov`, domain `https://www.oleg-burikov.com/`, build command `npm run build`.
