# Project Summary

## Purpose

This is the marketing website for `oleg-burikov`, currently transitioning from an agency-positioned site to a personal-brand site. The active technical goal is to keep the codebase clean, secure, and simple before larger content and positioning changes.

## Current Website Areas

- Home page with hero, services, cases, testimonials, work process, and lead form.
- Service pages for Google Ads, Meta Ads, analytics, consulting, and website development.
- Case study pages.
- Blog pages.
- Pricing page.
- Privacy page.
- Server API for lead form submissions.

## Integrations

- Vercel for hosting and deployments.
- Google Tag Manager for analytics and advertising tags.
- Vercel Speed Insights.
- Google Apps Script or another webhook endpoint for lead storage, configured through `LEADS_WEBHOOK_URL`.

## Data Flow

1. A visitor submits a contact form.
2. Client code sends the payload to `/api/lead`.
3. The API validates input, applies rate limiting, blocks honeypot submissions, and forwards accepted leads server-side.
4. GTM events are pushed only after accepted form submissions.

## Security Notes

- CSP and common security headers are set in `src/middleware.ts`.
- Lead webhook URLs are kept out of client-side code.
- Deprecated tool routes and unused server dependencies are removed.
