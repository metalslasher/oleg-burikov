# Backlog — iteration 2 (2026-10-29)

Source: Oleg's feedback on the redesign + LinkedIn/Djinni PDFs (LinkedIn is the most accurate source).
Status: [ ] todo · [~] in progress · [x] done · [?] waiting for Oleg

## P1 — Content accuracy (LinkedIn is source of truth)
- [x] Titles: SvitSoft and Fortunatos → "Performance Marketing Manager"
- [x] Admitad: Ukrainian banking products via affiliate partnerships (drop Kazakhstan)
- [x] Richer role descriptions from LinkedIn bullets (call tracking, lead-form qualification, media plans, AI reporting…)
- [x] Skills/marquee/about skills from LinkedIn skill list (67), grouped and filtered
- [x] Languages: English B2 / professional working proficiency
- [x] Team block: "Відкритий до пропозицій" (decided)
- [x] DEVILS wording: neutral (decided: no "iGaming")
- [x] Own projects section with PLACEHOLDER data (Oleg will send real projects from GitHub next iteration; mostly development, maybe analytics). Shown live with placeholder data (Oleg decided); replace later.
- [x] Update docs/OLEG_BURIKOV_PROFILE.md to match LinkedIn

## P1 — Hero & header
- [x] Logo: name only + OB mark (no "Performance Marketing" subline)
- [x] Kicker: plain "Performance Marketing Manager" — no live dot, no "Київ / remote"
- [x] Remove dashed ring + orbiting dot
- [x] Headline/subheadline back to previous calm positioning (turnkey: strategy, site, creatives, ads, analytics); no "clicks" repetition
- [x] KPI cards rotate through cases (same 3 slots, crossfade), mobile-safe
- [x] Stats: no duplication with subheadline; simpler labels ("в управлінні", not "сукупному"); no niche explanation

## P1 — Copy pass (whole site)
- [x] Fewer anglicisms/jargon (homepage, services, cases, blog)
- [x] Services subtitle: "аудиту чи запуску реклами" (not only Google Ads)
- [x] Services reflect turnkey positioning (sites + SEO basics, creatives, strategy)
- [x] Experience section — stronger, less "simple"
- [x] Proofread cases and blog

## P1 — Bugs / polish
- [x] Contact modal: center the direct links row
- [x] Case creatives on mobile: portrait creatives leave empty space → proper grid
- [x] Jewelry case: Meta creatives collage belongs to the Meta Ads campaign block, not creatives
- [x] Lightbox gallery (prev/next, keyboard, swipe, counter, close) instead of opening images in a new tab
- [x] About: divider right under the stats block — fix spacing
- [x] Full responsive pass (375 / 768 / 1440)

## P2 — "Wow" animations (keep them cheap and reduced-motion safe)
- [x] Section headings: word-by-word mask reveal
- [x] Process: line fills as you scroll (scroll-driven, with fallback)
- [x] Cursor spotlight on service cards
- [ ] Featured case bars grow on reveal (exists) — check

## P2 — SEO
- [x] Keyword-driven titles/descriptions/H1 per page (Ukrainian queries)
- [x] Schema: Person + ProfessionalService (areaServed, services), Service, FAQ, Breadcrumbs on all inner pages
- [x] Separate service landing pages (decided: 4 pages) (Google Ads, Meta/TikTok Ads, analytics, sites) for search traffic
- [x] Internal linking: services ↔ cases ↔ blog
- [x] Font preload, sitemap lastmod for posts, alt/H1/heading audit, title ≤62 / description ≤160 chars
- [ ] Remove/rename leftovers that confuse future work (stale docs, unused data)

## Later / ideas
- English version for international employers
- Real testimonials (LinkedIn recommendations?) — only approved

## Next iteration
- Replace placeholder projects in src/data/projects.ts with Oleg's real GitHub projects
- [x] 3 new articles linked to service pages (Merchant Center feed, Google Ads budget, real estate in Meta)
