# Файлова структура проекту

```
targetsy-agency/
│
├── package.json               Залежності та скрипти
├── astro.config.mjs           Конфігурація Astro
├── tailwind.config.cjs        Конфігурація Tailwind/дизайн
├── tsconfig.json              Конфігурація TypeScript
├── .gitignore                 Git ignore правила
├── .env.example               Шаблон змінних середовища
│
├── public/                    Статичні файли
│   ├── favicon.svg            Іконка сайту
│   ├── robots.txt             Директиви для пошукових систем
│   ├── sitemap.xml            SEO карта сайту
│   └── images/                Зображення
│       ├── logo.png           Логотип
│       └── cases/             Скріншоти кейсів
│           ├── banking-campaigns.png
│           ├── banking-results.png
│           ├── cheese-campaigns.png
│           ├── edi-after.png
│           ├── edi-before.png
│           ├── edi-campaigns.png
│           ├── embroidery-campaigns.png
│           ├── flowers-campaigns.png
│           ├── flowers-results.png
│           └── realestate-campaigns.png
│
└── src/                       Вихідний код
    │
    ├── pages/                 Маршрути сайту
    │   ├── index.astro        Головна сторінка
    │   ├── pricing.astro      Сторінка цін
    │   ├── contact.astro      Сторінка контактів
    │   ├── privacy.astro      Політика конфіденційності
    │   ├── 404.astro          Сторінка помилки 404
    │   │
    │   ├── blog/              Блог
    │   │   └── index.astro    Список статей
    │   │
    │   ├── cases/             Кейси
    │   │   ├── index.astro    Список кейсів
    │   │   ├── case-1.astro   Квітковий магазин (Google Ads)
    │   │   ├── case-2.astro   Освітній проект (Meta Ads)
    │   │   ├── case-3.astro   Житловий комплекс (Meta Ads)
    │   │   ├── case-4.astro   Мобільний банкінг (Google Ads)
    │   │   ├── case-5.astro   Магазин сирних снеків (Meta Ads)
    │   │   └── case-6.astro   Магазин наборів для вишивання (Meta Ads)
    │   │
    │   └── services/          Послуги
    │       ├── index.astro    Список послуг
    │       ├── google-ads.astro    Google Ads послуга
    │       ├── facebook-ads.astro  Meta Ads послуга
    │       ├── analytics.astro     Веб-аналітика
    │       └── consulting.astro    Консалтинг
    │
    ├── layouts/               Шаблони сторінок
    │   ├── BaseLayout.astro   Базовий layout (SEO, мета-теги)
    │   └── PageLayout.astro   Layout для внутрішніх сторінок
    │
    ├── components/            UI секції
    │   ├── Header.astro       Навігація + мобільне меню
    │   ├── Hero.astro         Головний заголовок + CTA
    │   ├── Services.astro     4 картки послуг
    │   ├── About.astro        Секція про нас + переваги
    │   ├── Cases.astro        Кейси клієнтів
    │   ├── WorkProcess.astro  Етапи роботи
    │   ├── Testimonials.astro Відгуки клієнтів
    │   ├── ContactCTA.astro   Контактна форма
    │   └── Footer.astro       Футер з посиланнями
    │
    ├── content/               Контент
    │   └── home-uk.json       Весь український текст
    │
    ├── scripts/               JavaScript функціональність
    │   ├── smoothScroll.ts    Плавна прокрутка до секцій
    │   ├── formValidation.ts  Логіка валідації форми
    │   └── analytics.ts       Інтеграція GA4 + FB Pixel
    │
    └── styles/                Глобальні стилі
        └── global.css         Базові стилі + утиліти
```

---

## Ключові файли

### Редагування контенту
- `src/content/home-uk.json` - весь текст головної сторінки

### Налаштування дизайну
- `tailwind.config.cjs` - кольори, шрифти, відступи
- `src/styles/global.css` - глобальні стилі

### Конфігурація
- `.env` (створити з `.env.example`) - ID аналітики
- `astro.config.mjs` - налаштування збірки

### SEO файли
- `public/sitemap.xml` - карта сайту
- `public/robots.txt` - інструкції для краулерів

---

## Команди

| Команда | Опис |
|---------|------|
| `npm run dev` | Запуск dev-сервера (http://localhost:4321) |
| `npm run build` | Збірка для продакшену (dist/) |
| `npm run preview` | Попередній перегляд продакшн збірки |

---

## Кількість файлів

- **Сторінки**: 15 (головна, ціни, контакти, блог, 6 кейсів, 4 послуги, 404, privacy)
- **Компоненти**: 9 Astro компонентів
- **Скрипти**: 3 TypeScript файли
- **Layouts**: 2 (Base + Page)
- **Контент**: 1 JSON файл
- **Публічні**: favicon, robots, sitemap, логотип, зображення кейсів
