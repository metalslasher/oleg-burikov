# File Structure

Нижче — структура проєкту з поясненням ключових папок і файлів.

```
oleg-burikov/
  public/
    favicon.png
    robots.txt
    sitemap.xml
    icons/
    images/
      logo.png
      cases/
      blog/
  src/
    components/
      Header.astro
      Hero.astro
      Services.astro
      Cases.astro
      Footer.astro
      ...
    content/
      home-uk.json
    layouts/
      BaseLayout.astro
      PageLayout.astro
    pages/
      index.astro
      blog/
      cases/
      services/
      pricing.astro
      tools/
        index.astro
        site-audit.astro
      api/
        analyze.ts
    scripts/
      formValidation.ts
      smoothScroll.ts
    styles/
      global.css
    middleware.ts
  astro.config.mjs
  tailwind.config.cjs
  tsconfig.json
  package.json
  README.md
  PROJECT_SUMMARY.md
  FILE_STRUCTURE.md
```

## public/
Статичні файли, які віддаються без обробки:
- `favicon.png` — іконка сайту.
- `robots.txt` — індексація для пошукових систем.
- `sitemap.xml` — статичний sitemap (на проді також генерується через `@astrojs/sitemap`).
- `icons/` — SVG/PNG для інтерфейсу.
- `images/` — зображення логотипа, кейсів, блогу.

## src/components/
UI‑компоненти для повторного використання:
- `Header.astro` — хедер, меню, мобільна навігація.
- `Hero.astro` — головний hero‑блок з анімаціями та CTA.
- `Services.astro` — блок послуг.
- `Cases.astro` — блок кейсів на головній.
- `Footer.astro` — футер.

## src/content/
Дані контенту (тексти, структури, списки):
- `home-uk.json` — головний JSON для контенту home‑сторінки, CTA, кейсів, навігації.

## src/layouts/
Базові макети сторінок:
- `BaseLayout.astro` — глобальний layout, мета‑теги, GTM, базові скрипти.
- `PageLayout.astro` — спільний layout для більшості сторінок.

## src/pages/
Сторінки сайту:
- `index.astro` — головна сторінка.
- `services/` — сторінки послуг.
- `cases/` — сторінки кейсів.
- `blog/` — сторінки блогу.
- `pricing.astro` — прайсинг.
- `tools/` — сторінки інструментів.
  - `tools/index.astro` — список інструментів.
  - `tools/site-audit.astro` — інструмент аудиту сайту (форма + логіка).
- `api/analyze.ts` — серверний endpoint для аудиту сайту.

## src/scripts/
Клієнтські скрипти:
- `formValidation.ts` — валідація й відправка лідформи.
- `smoothScroll.ts` — плавний скрол до якорів.

## src/styles/
Глобальні стилі:
- `global.css` — базові стилі, типографіка, утиліти.

## src/middleware.ts
Глобальні HTTP‑заголовки: CSP, security‑headers, політики.

## Конфіги
- `astro.config.mjs` — конфіг Astro, sitemap, домен, адаптер Vercel.
- `tailwind.config.cjs` — палітра, типографіка, spacing.
- `tsconfig.json` — TypeScript налаштування.
- `package.json` — залежності та команди.

## Документація
- `README.md` — запуск, конфігурація, інтеграції.
- `PROJECT_SUMMARY.md` — огляд продукту та сценарії.
- `FILE_STRUCTURE.md` — поточна структура.
