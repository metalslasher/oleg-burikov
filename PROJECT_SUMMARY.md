# Targetsy Agency - Підсумок проекту

## Про проект

Лендінг диджитал-агенції Targetsy, побудований на Astro + TypeScript + Tailwind CSS.

---

## Структура сайту

### Сторінки

| Сторінка | URL | Опис |
|---------|-----|------|
| Головна | `/` | Герой, послуги, кейси, відгуки, форма |
| Ціни | `/pricing` | Тарифні пакети + разові послуги |
| Контакти | `/contact` | Форма + месенджери |
| Блог | `/blog` | Список статей |
| Кейси | `/cases` | Список 6 кейсів |
| Послуги | `/services` | Список 4 послуг |
| Privacy | `/privacy` | Політика конфіденційності |

### Кейси (6 шт)

| № | Клієнт | Платформа | URL |
|---|--------|----------|-----|
| 1 | Квітковий магазин | Google Ads | `/cases/case-1` |
| 2 | Освітній проект | Meta Ads | `/cases/case-2` |
| 3 | Житловий комплекс | Meta Ads | `/cases/case-3` |
| 4 | Мобільний банкінг | Google Ads | `/cases/case-4` |
| 5 | Магазин сирних снеків | Meta Ads | `/cases/case-5` |
| 6 | Магазин наборів для вишивання | Meta Ads | `/cases/case-6` |

### Послуги (4 шт)

| Послуга | URL |
|---------|-----|
| Google Ads | `/services/google-ads` |
| Meta Ads | `/services/facebook-ads` |
| Веб-аналітика | `/services/analytics` |
| Консалтинг | `/services/consulting` |

---

## Технічна реалізація

### Стек технологій
- **Framework**: Astro 4.x
- **Стилі**: Tailwind CSS 3.x
- **Мова**: TypeScript
- **Контент**: JSON (українська)

### Функціонал
- Контактна форма з валідацією (відправка в Google Sheets)
- Інтеграція GA4 + Facebook Pixel
- Плавна прокрутка до секцій
- Автозаповнення форми при виборі тарифу (на /pricing)
- Mobile-first дизайн

### SEO
- Meta теги на всіх сторінках
- Open Graph теги
- sitemap.xml
- robots.txt

---

## Запуск проекту

### Вимоги
- Node.js 18+
- npm

### Команди

```bash
# Встановлення залежностей
npm install

# Запуск dev-сервера
npm run dev
# → http://localhost:4321

# Збірка для продакшену
npm run build
```

---

## Конфігурація

### Змінні середовища

Створити `.env` з `.env.example`:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_FB_PIXEL_ID=1234567890
```

### Контакти

Телефон: +38 (096) 229 04 00
Email: info@targetsy.agency

---

## Деплой

### Netlify / Vercel / Cloudflare Pages

1. Push в GitHub
2. Підключити репозиторій
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Додати env змінні
