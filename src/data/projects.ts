// Oleg's own digital projects built from scratch.
// TODO(Oleg): the entries below are PLACEHOLDERS to preview the layout. Replace them with real projects
// from GitHub and set `placeholder: false` (or delete the flag). While any entry is a placeholder,
// the section is hidden on the production deployment (see showProjects below).

export type Project = {
  title: string;
  kind: string;
  text: string;
  /** What Oleg did on the project. */
  scope: ('Розробка' | 'Дизайн' | 'Аналітика' | 'SEO' | 'Реклама')[];
  stack: string[];
  result?: { value: string; label: string };
  url?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Платформа порівняння онлайн-курсів',
    kind: 'Вебсервіс',
    text: 'Каталог курсів з фільтрами за ціною, тривалістю й форматом. Спроєктував структуру, зробив сайт, налаштував аналітику й SEO під пошукові запити.',
    scope: ['Розробка', 'Аналітика', 'SEO'],
    stack: ['Astro', 'TypeScript', 'GA4'],
    result: { value: '120+', label: 'сторінок в індексі' },
    placeholder: true,
  },
  {
    title: 'Лендінг для локальної послуги',
    kind: 'Лендінг',
    text: 'Односторінковий сайт із формою заявки та калькулятором вартості. Зібрав дизайн, верстку, події в Tag Manager і запустив рекламу в Google.',
    scope: ['Дизайн', 'Розробка', 'Реклама'],
    stack: ['Figma', 'WordPress', 'Google Ads'],
    result: { value: '4,8%', label: 'конверсія в заявку' },
    placeholder: true,
  },
  {
    title: 'Дашборд рекламних витрат',
    kind: 'Інструмент',
    text: 'Зведений звіт з Google Ads, Meta Ads і CRM в одному місці: витрати, заявки, продажі й окупність по днях без ручних таблиць.',
    scope: ['Розробка', 'Аналітика'],
    stack: ['Looker Studio', 'Google Sheets', 'Apps Script'],
    placeholder: true,
  },
];

const isProduction = typeof process !== 'undefined' && process.env?.VERCEL_ENV === 'production';

/** Placeholder projects are visible locally and on preview deployments only. */
export const showProjects = projects.length > 0 && !(isProduction && projects.some((project) => project.placeholder));
