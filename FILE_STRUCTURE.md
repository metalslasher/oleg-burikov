# File Structure

```text
oleg-burikov/
  public/
    favicon.png
    robots.txt
    icons/
    images/
  src/
    components/
      Header.astro
      Hero.astro
      Services.astro
      Cases.astro
      ContactCTA.astro
      Footer.astro
      ...
    content/
      home-uk.json
    layouts/
      BaseLayout.astro
      PageLayout.astro
    pages/
      api/
        lead.ts
      blog/
      cases/
      services/
      404.astro
      index.astro
      pricing.astro
      privacy.astro
    scripts/
      formValidation.ts
      gtmEvents.ts
      smoothScroll.ts
    styles/
      global.css
    env.d.ts
    middleware.ts
  astro.config.mjs
  package.json
  README.md
  PROJECT_SUMMARY.md
  FILE_STRUCTURE.md
```

## Key Areas

- `src/content/home-uk.json`: home-page content plus header and footer navigation.
- `src/components/`: reusable Astro UI components.
- `src/pages/`: file-based routes.
- `src/pages/api/lead.ts`: server-side lead endpoint with validation, rate limiting, and webhook forwarding.
- `src/scripts/formValidation.ts`: client-side form validation and submission to `/api/lead`.
- `src/middleware.ts`: CSP and security headers.
- `README.md`: local setup, environment, forms, and deployment notes.
- `PROJECT_SUMMARY.md`: current product and integration summary.
