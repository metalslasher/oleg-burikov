# Targetsy Agency — Marketing Website

Маркетинговий сайт агенції Targetsy з послугами, кейсами, блогом, прайсингом і інструментом аудиту сайту.

## Стек
- **Astro** (SSR/SSG під Vercel)
- **Tailwind CSS** (стилі)
- **TypeScript** (скрипти та API)
- **OpenAI API** (аудит сайту)
- **Google Tag Manager** (аналітика/пікселі)
- **Google Apps Script + Sheets** (збереження лідів)
- **Vercel** (деплой)

## Локальний запуск
Вимоги: Node.js 18+ (рекомендовано 18/20 для сумісності з Vercel функціями).

```bash
npm install
npm run dev
```

Сайт буде доступний на `http://localhost:4321`.

Збірка та прев’ю:
```bash
npm run build
npm run preview
```

## Змінні середовища
Створіть `.env` локально або задайте змінні у Vercel.

| Змінна | Де використовується | Опис |
| --- | --- | --- |
| `OPENAI_API_KEY` | `/tools/site-audit` | Ключ для аналізу сторінки в API `/api/analyze` |

> `.env` не комітиться в репозиторій.

## Контент і редагування
- Основний контент головної сторінки зберігається в `src/content/home-uk.json`.
- Сторінки знаходяться у `src/pages/**` і написані на Astro.
- Кожен кейс має окрему сторінку в `src/pages/cases/`.
- Блогові статті — окремі сторінки в `src/pages/blog/`.
- Інструмент аудиту — `src/pages/tools/site-audit.astro`.

> Детальна мапа файлів — у `FILE_STRUCTURE.md`.

## Форми та ліди
- Валідація і відправка форм на сторінці через `src/scripts/formValidation.ts`.
- Дані лідів відправляються у Google Sheets через Apps Script URL (змінна `SHEETS_URL` у скрипті).
- UTM-параметри зчитуються з URL і зберігаються в `sessionStorage`.

## Інструмент аудиту сайту
- UI та логіка: `src/pages/tools/site-audit.astro`
- API: `src/pages/api/analyze.ts`
- Витягує текст зі сторінки та формує рекомендації через OpenAI.
- Є rate‑limit на запити (див. код API).

## Аналітика і трекінг
- GTM підключений у `src/layouts/BaseLayout.astro`.
- Усі теги/пікселі налаштовуються в GTM (GA4, Clarity тощо).

## Деплой
Проєкт розгортається на Vercel.
- Команда збірки: `npm run build`
- Вивід: `dist`
- Канонічний домен задається в `astro.config.mjs`
- Sitemap генерується автоматично через `@astrojs/sitemap`

## Документація
- **PROJECT_SUMMARY.md** — огляд продукту, ключові сценарії, інтеграції
- **FILE_STRUCTURE.md** — структура та пояснення ключових файлів
