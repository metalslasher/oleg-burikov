# Project Notes

Personal-brand site for Oleg Burikov (Performance Marketing Manager). Two audiences: businesses looking for paid
acquisition help, and teams/employers hiring a performance marketer. Ukrainian only.

## Stack

- Astro 7 (`output: 'server'`, Vercel adapter) — SSR so every response gets a CSP nonce.
- Tailwind CSS 4 via `@tailwindcss/vite` (design tokens in `src/styles/global.css` `@theme`); components use scoped CSS.
- Self-hosted variable fonts from `@fontsource-variable/*`: Unbounded (display), Manrope (body), JetBrains Mono (data labels).
- Google Tag Manager (GA4, Clarity, Meta Pixel live inside GTM), Vercel Speed Insights.

## Where things live

```text
src/
  config/site.ts        brand, contacts, navigation, GTM id, SEO defaults
  data/cases.ts         all case studies (typed). Numbers match screenshots in public/images/cases
  data/profile.ts       services, process, formats, experience, skills, FAQ
  content/blog/*.md     blog posts (content collection, schema in src/content.config.ts)
  components/           Header, Footer, ContactModal, ContactCta, Shot, Icon
  components/home/      homepage sections
  pages/cases/[slug]    one template for every case
  pages/blog/[slug]     one template for every post
  pages/about.astro     CV page; "Зберегти резюме в PDF" uses a print stylesheet
  pages/api/lead.ts     lead endpoint → LEADS_WEBHOOK_URL
  scripts/              site.ts (header, reveal, count-up), contactModal.ts, gtmEvents.ts
  lib/                  text helpers, contact detection (shared by form + API), blog helpers
  middleware.ts         CSP (nonce) and security headers
```

## Common edits

- **Add a case:** append an object to `cases` in `src/data/cases.ts`, put `.webp` images in `public/images/cases/`.
  `*text*` in `headline` renders as an orange accent. Add the slug to `featuredCaseSlugs` to show it on the homepage.
- **Add a blog post:** create `src/content/blog/<slug>.md` with the frontmatter used by existing posts.
  `relatedCase` links the post to a case. `## headings` build the table of contents.
- **Change contacts / CTA links:** `src/config/site.ts`.
- **OG image:** `public/images/og-oleg-burikov.jpg` (1200×630). Rename the file when replacing it so social networks refetch.
- **Images:** convert to WebP (max ~1600–1800 px wide) before adding; always pass `width`/`height`.

## Leads

The contact modal opens from any link to `#contact` (or `[data-contact-open]`). `data-contact-service` on the
trigger preselects the request type. The browser posts JSON to `/api/lead`; the API validates, rate-limits,
checks the honeypot and forwards to `LEADS_WEBHOOK_URL` as query params. The `phone` param holds whatever contact
the visitor left (phone, Telegram or email) to keep the existing sheet columns; `contact_method` says which.

## Tracking

Keep `data-gtm-event` / `data-gtm-label` / `data-gtm-location` on CTAs. Events pushed to `dataLayer`:
`cta_click`, `lead_submit`, `messenger_click`, `social_click`, `contact_click`, `book_call`.

## Security

- CSP is nonce-based in production. Astro must not inline page scripts (they would have no nonce), so
  `assetsInlineLimit: 0` is set in `astro.config.mjs` — keep it.
- In dev the CSP uses `'unsafe-inline'` instead of a nonce because Vite injects its own inline scripts.

## URLs

Old `/cases/case-N` URLs 301-redirect to descriptive slugs (generated from `legacySlug` in `astro.config.mjs`).
Case and blog pages are listed in the sitemap via `customPages`.

## QA before shipping

```bash
npm run quality
npm audit --audit-level=low
```

Then check on a phone width (375 px): no horizontal scroll, the contact form, case filters and the blog table.

## Ideas for next iterations

- Real testimonials or client logos — only approved ones.
- An English version for international employers (needs i18n routing).
- More blog posts on high-intent topics: Meta Ads for real estate, Merchant Center feed fixes, offline conversions.
