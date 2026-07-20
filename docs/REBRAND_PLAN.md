# Personal Brand Content Plan

## Current Status

The site has been moved from the old agency-style positioning to Oleg Burikov's personal brand.

The technical base supports the current brand through `src/config/site.ts`. The public structure is now focused on the homepage, case studies, blog articles, contact popup, privacy policy, and lead endpoint.

## Principles

- Write from Oleg's perspective, not from an anonymous agency voice.
- Use `docs/OLEG_BURIKOV_PROFILE.md` as the source of truth for Oleg's experience, positioning, niches, and content claims.
- Keep tracking accuracy intact, especially GTM events, form submissions, CTA clicks, messenger clicks, and Calendly clicks.
- Keep contact, legal, Calendly, social, SEO, and tracking constants centralized in `src/config/site.ts`.
- Do not rewrite working technical infrastructure unless it directly supports the rebrand.

## Completed

- Repository and Vercel project were renamed to the new brand context.
- Brand, contact, tracking, Calendly, and SEO constants were centralized in `src/config/site.ts`.
- Lead submission was moved to a server-side `/api/lead` endpoint.
- CSP and security headers were tightened while preserving GTM-based tracking.
- The old tools/audit page was removed.
- Dedicated service pages and service-price pages were removed.
- Homepage copy now uses personal-brand positioning.
- Header, footer, favicon, hero, services, niches, experience, cases carousel, contact popup, and SEO metadata were updated for Oleg Burikov.
- Cases and blog pages were rewritten to avoid agency/team voice.

## Current Site Structure

- `/` - homepage with hero, services, niches, experience, cases, and CTA.
- `/cases` - case index.
- `/cases/case-*` - individual case studies.
- `/blog` - blog index.
- `/blog/*` - individual articles.
- `/privacy` - privacy policy.
- `/api/lead` - lead endpoint.

## Recommended Next Content Work

1. Cooperation formats

   Add a compact homepage section explaining how a potential client or team can start working with Oleg: audit, launch/relaunch, or ongoing acquisition work.

2. System positioning

   Strengthen the idea that Oleg works not only with ad accounts, but with the full acquisition system: ads, site, funnel, analytics, creatives, lead quality, and optimization.

3. FAQ

   Add a short FAQ section to support conversion and organic search: audit vs launch, existing campaigns, analytics setup, work with internal teams, and what is needed to start.

4. SEO content

   Continue growing the blog and case library around high-intent topics such as Google Ads for eCommerce, Meta Ads for real estate, analytics setup, advertising audit, and lead quality.

5. Verified social proof

   Add testimonials or client logos only when they are real, approved, and safe to publish.

## QA Checklist

Run before shipping larger changes:

```bash
npx astro check --no-color
npm run build
npm audit --audit-level=low
```

Smoke-test the live domain for homepage, cases, blog, privacy, 404, contact popup, lead submission, Calendly, messenger links, and GTM events.
