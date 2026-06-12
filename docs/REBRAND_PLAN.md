# Rebrand Plan

## Goal

Move the site from agency positioning to a personal-brand site for Oleg Burikov.

The technical base already supports the new brand through `src/config/site.ts`. The next work should focus on copy, page positioning, and visual/content consistency.

## Principles

- Write from Oleg's perspective, not from an anonymous agency voice.
- Keep tracking accuracy intact, especially GTM events, form submissions, CTA clicks, messenger clicks, and Calendly clicks.
- Keep contact, legal, Calendly, social, SEO, and tracking constants centralized in `src/config/site.ts`.
- Do not rewrite working technical infrastructure unless it directly supports the rebrand.

## Recommended Order

1. Homepage positioning

   Initial homepage pass is done: hero, services intro, about block, experience block, niches, process, CTA, footer copy, header logo, and OG image now use Oleg's personal-brand positioning.

2. Service pages

   Convert service pages from "agency provides" language to "I help / I set up / I manage" language while keeping the commercial offer clear.

3. Cases

   Reframe cases as Oleg's work and experience. Keep metrics, but check every claim for accuracy and consistency.

4. Testimonials

   The old homepage testimonials were removed because they were not ready to use as real social proof. Add this section back later only with verified client quotes, names, permissions, and consistent attribution.

5. Blog

   Blog pages currently contain useful technical content, but some files have old text and encoding history. Review copy, headings, author schema, and visible brand language before treating the blog as final.

6. SEO and schema

   Confirm page titles, descriptions, structured data, Open Graph text, and privacy/legal wording after the copy rewrite.

7. Visual pass

   Check logo, OG image, favicon, screenshots, and any remaining agency-style visual signals.

8. Final QA

   Run:

   ```bash
   npx astro check --no-color
   npm run build
   npm audit --audit-level=low
   ```

   Then smoke-test the live domain for homepage, privacy, 404, forms, Calendly, messenger links, and tracking events.

## Known Non-Technical Content Leftovers

- Some pages still read conceptually like an agency offer.
- Blog content should be reviewed before being considered brand-final.
