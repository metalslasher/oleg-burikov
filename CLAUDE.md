# CLAUDE.md

Personal-brand site of Oleg Burikov (performance marketer). Astro 7 SSR on Vercel, Tailwind 4, Ukrainian only.
Two audiences: businesses buying paid-acquisition services, and employers hiring a performance marketer.

## Read first
- `docs/WORKFLOW.md` — how rounds of edits work with Oleg (record → critique → decide → implement → verify → push).
- `docs/BACKLOG.md` — current round, roadmap, decisions. Update statuses as you go.
- `docs/PROJECT.md` — where things live, common edits, leads, tracking, CSP.
- `docs/OLEG_BURIKOV_PROFILE.md` — source of truth for experience claims (LinkedIn).

## Rules
- Reply to Oleg in Ukrainian. When he gives edits, push back with arguments if a best practice says otherwise.
- When he says "just record", only update `docs/BACKLOG.md`; change no site code.
- Never change how GTM/analytics load or fire. Keep `data-gtm-*` attributes on CTAs.
- Case numbers must match screenshots in `public/images/cases`.
- Copy lives in `src/data/*.ts` and `src/config/site.ts` — prefer editing data over markup.
- Git is fully delegated: commit and push to `main` (auto-deploys to production) on your own judgment, without asking. Verify before pushing.
- Before committing: `npm run quality`, then check desktop and 375px in the browser pane.
- After adding/changing cases, posts or share titles: `npm run og`.

## Dev
- `npm run dev` → http://127.0.0.1:4321 (launch config `astro-dev` passes `--host 127.0.0.1`; plain localhost binds IPv6 only and the browser pane can't reach it).
