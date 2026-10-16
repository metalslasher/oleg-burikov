// Personal-brand content shared by the homepage and the /about page.
// Source of truth for claims: docs/OLEG_BURIKOV_PROFILE.md.

export const proofStats = [
  { value: '6+', suffix: 'років', label: 'у performance-маркетингу з 2019 року' },
  { value: '$100K+', suffix: '/ міс', label: 'рекламних бюджетів у сукупному управлінні' },
  { value: '60+', suffix: 'проєктів', label: 'від B2B SaaS і FinTech до eCommerce та нерухомості' },
  { value: '4', suffix: 'ринки', label: 'Україна, Європа, США та Канада' },
];

export const channels = [
  'Google Ads',
  'Meta Ads',
  'TikTok Ads',
  'Amazon Ads',
  'GA4',
  'Google Tag Manager',
  'Merchant Center',
  'Microsoft Clarity',
  'Looker Studio',
  'CRM-інтеграції',
  'Enhanced Conversions',
  'Offline Conversions',
];

export type Service = {
  id: string;
  title: string;
  task: string;
  text: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: 'google',
    title: 'Google Ads',
    task: 'Забираю готовий попит',
    text: 'Пошук, Shopping, Performance Max і YouTube. Структура кампаній, семантика, фід Merchant Center і стратегії ставок під CPA або ROAS — щоб гроші йшли на тих, хто вже шукає ваш продукт.',
    tags: ['Search', 'Shopping', 'PMax', 'Merchant Center'],
  },
  {
    id: 'meta',
    title: 'Meta & TikTok Ads',
    task: 'Формую попит і масштабую продажі',
    text: 'Креативні тести, каталоги, Advantage+, Lead Ads і ретаргетинг. Будую воронку TOF → MOF → BOF, де кожен рівень має свою задачу й метрику.',
    tags: ['Advantage+', 'Lead Ads', 'Каталоги', 'Creative testing'],
  },
  {
    id: 'analytics',
    title: 'Аналітика і трекінг',
    task: 'Показую, що реально приносить гроші',
    text: 'GA4, GTM, Enhanced Conversions, офлайн-конверсії з CRM і дашборди в Looker Studio. Рекламні системи вчаться на продажах, а ви бачите ціну клієнта, а не кліка.',
    tags: ['GA4', 'GTM', 'CRM', 'Looker Studio'],
  },
  {
    id: 'audit',
    title: 'Аудит реклами',
    task: 'Знаходжу, де губиться бюджет',
    text: 'Перевіряю кабінети, трекінг, структуру, семантику, креативи й посадкові сторінки. На виході — список проблем за пріоритетом і план дій, який можна віддати будь-якому підряднику.',
    tags: ['Кабінети', 'Трекінг', 'План дій'],
  },
  {
    id: 'funnel',
    title: 'Сайт і воронка',
    task: 'Роблю так, щоб трафік конвертувався',
    text: 'Аналізую поведінку в Clarity, пишу ТЗ для дизайнерів і розробників, тестую лендінги, форми й офери. За потреби збираю посадкову сторінку під кампанію сам.',
    tags: ['CRO', 'Лендінги', 'Clarity'],
  },
  {
    id: 'creatives',
    title: 'Креативи',
    task: 'Даю алгоритму, що тестувати',
    text: 'Креативна матриця під болі й сегменти, банери, сценарії UGC і відео. Регулярні тести, щоб оголошення не вигорали, а CPA не ріс.',
    tags: ['UGC', 'Банери', 'Матриця тестів'],
  },
];

export const process = [
  {
    step: '01',
    title: 'Сигнали',
    text: 'Налаштовую трекінг, події та зв’язок з CRM. Без чистих даних будь-яка оптимізація — вгадування.',
    metric: 'conversion tracking',
  },
  {
    step: '02',
    title: 'Стратегія',
    text: 'Юніт-економіка, цільовий CPA/ROAS, канали, структура кампаній і гіпотези для перших тестів.',
    metric: 'CPA · ROAS · LTV',
  },
  {
    step: '03',
    title: 'Запуск і тести',
    text: 'Кампанії, креативи, аудиторії та посадкові сторінки. Тестую швидко й відключаю те, що не працює.',
    metric: 'A/B · creative tests',
  },
  {
    step: '04',
    title: 'Масштабування',
    text: 'Перерозподіл бюджету в сегменти, що окупаються, щотижнева звітність і план наступних кроків.',
    metric: 'scale · report',
  },
];

export const businessFormats = [
  {
    title: 'Аудит',
    duration: '5–7 днів',
    text: 'Для тих, у кого реклама вже працює, але результат не влаштовує або незрозумілий.',
    points: ['Розбір кабінетів і трекінгу', 'Список проблем за пріоритетом', 'План дій на 30 днів'],
  },
  {
    title: 'Запуск під ключ',
    duration: '2–4 тижні',
    text: 'Для нового продукту, каналу або повного перезапуску з нуля.',
    points: ['Аналітика й події', 'Структура кампаній і креативи', 'Перші тести та висновки'],
  },
  {
    title: 'Ведення і ріст',
    duration: 'від 3 місяців',
    text: 'Для стабільного потоку заявок і продажів з регулярною оптимізацією.',
    points: ['Щотижнева оптимізація', 'Звіт і план на кожен місяць', 'Масштабування каналів'],
  },
];

export const teamOffer = {
  title: 'Для команд і роботодавців',
  text: 'Шукаю роль Performance / Growth Marketing Manager у продуктовій компанії або агенції. Працюю full-time, віддалено, на рівні з дизайнерами, розробниками й sales.',
  facts: [
    { label: 'Формат', value: 'Full-time, remote' },
    { label: 'Локація', value: 'Київ, Україна' },
    { label: 'Мови', value: 'Українська, English B2' },
    { label: 'Фокус', value: 'Paid acquisition, analytics, CRO' },
  ],
};

export type Role = {
  company: string;
  role: string;
  period: string;
  years: string;
  logo: string;
  location: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const roles: Role[] = [
  {
    company: 'SvitSoft',
    role: 'Performance Marketing Specialist',
    period: 'Серпень 2025 — зараз',
    years: '2025 — зараз',
    logo: '/images/companies/svitsoft-linkedin.jpg',
    location: 'Remote',
    summary: 'Full-funnel paid acquisition для нерухомості, автобізнесу, медицини, eCommerce і локальних бізнесів у Європі.',
    points: [
      'Мультиканальні кампанії в Google Ads, Meta Ads і TikTok Ads.',
      'Full-funnel стратегії для lead generation і продажів.',
      'Аналіз ефективності через GA4, Microsoft Clarity і CRM.',
      'Комерційні пропозиції, growth roadmaps і зустрічі з клієнтами.',
    ],
    tags: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'GA4'],
  },
  {
    company: 'Fortunatos',
    role: 'Performance Marketing Specialist',
    period: 'Квітень 2024 — липень 2025',
    years: '2024 — 2025',
    logo: '/images/companies/fortunatos-linkedin.jpg',
    location: 'Remote',
    summary: 'In-house агенція: SaaS, нерухомість, eCommerce, EdTech і локальні бізнеси на ринках США, Канади та Європи.',
    points: [
      'Google Ads і Meta Ads під різні бізнес-моделі та customer journey.',
      'Сегментація аудиторій, creative testing і розподіл бюджету.',
      'Покращення якості лідів через тести лендінгів і воронки.',
    ],
    tags: ['Google Ads', 'Meta Ads', 'B2B SaaS', 'CRO'],
  },
  {
    company: 'Admitad',
    role: 'PPC Specialist',
    period: 'Січень 2022 — березень 2024',
    years: '2022 — 2024',
    logo: '/images/companies/admitad-linkedin.jpg',
    location: 'Remote',
    summary: 'Google Search для банківських і фінансових продуктів на ринках України та Казахстану за CPA-моделлю.',
    points: [
      'Keyword research, аналіз search intent і мінус-слова.',
      'Стратегії ставок і бюджети під цільову ціну заявки.',
      'Масштабування прибуткових кампаній з контролем юніт-економіки.',
    ],
    tags: ['Google Search', 'FinTech', 'CPA'],
  },
  {
    company: 'Best Seller Hunter',
    role: 'PPC Specialist',
    period: 'Квітень — грудень 2021',
    years: '2021',
    logo: '/images/companies/best-seller-hunter-linkedin.jpg',
    location: 'Одеса, hybrid',
    summary: 'Amazon Advertising для eCommerce-товарів на ринку США.',
    points: [
      'Кампанії Amazon Ads у різних товарних категоріях.',
      'Search term mining, ставки й розподіл бюджету.',
      'Участь в оптимізації лістингів для росту конверсії.',
    ],
    tags: ['Amazon Ads', 'eCommerce', 'US'],
  },
  {
    company: 'DEVILS',
    role: 'Media Buyer',
    period: 'Вересень 2019 — березень 2021',
    years: '2019 — 2021',
    logo: '/images/companies/devils-linkedin.jpg',
    location: 'Remote',
    summary: 'Paid social для мобільних застосунків за affiliate CPA-моделлю на ринках Канади та Європи.',
    points: [
      'Запуск і масштабування Meta Ads для мобільних застосунків.',
      'Тести креативів, аудиторій, плейсментів і оферів.',
      'Аналіз CPA, ROI та прибутковості через трекери.',
    ],
    tags: ['Meta Ads', 'Mobile apps', 'Affiliate'],
  },
];

export const niches = [
  'B2B SaaS',
  'eCommerce',
  'Нерухомість',
  'FinTech і банки',
  'EdTech',
  'Автобізнес',
  'Медицина',
  'Локальні послуги',
  'Мобільні застосунки',
  'Amazon (США)',
  'Lead generation',
  'Affiliate / CPA',
];

export const skillGroups = [
  { title: 'Рекламні платформи', items: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Amazon Ads', 'Google Merchant Center'] },
  { title: 'Аналітика', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Looker Studio', 'AppsFlyer', 'Amplitude', 'Search Console'] },
  { title: 'Підходи', items: ['Full-funnel стратегія', 'Conversion tracking і атрибуція', 'CRO', 'Creative testing', 'Lead quality', 'Unit economics'] },
  { title: 'Інструменти', items: ['CRM-інтеграції', 'Figma', 'Canva', 'WordPress', 'HTML / CSS / JS', 'AI-автоматизація'] },
];

export const certifications = [
  { title: 'Google Ads Shopping Certification', issuer: 'Google', year: '2024' },
  { title: 'PPC Fundamentals', issuer: 'Semrush', year: '2024' },
  { title: 'Google Ads Search, Display, Performance, App', issuer: 'Google', year: '2022' },
  { title: 'Advanced Google Ads', issuer: 'LinkedIn Learning', year: '2022' },
  { title: 'PPC Internship', issuer: 'Netpeak', year: '2021' },
  { title: 'Amazon Sponsored Ads', issuer: 'Amazon', year: '2021' },
];

export const education = {
  school: 'Київський національний університет імені Тараса Шевченка',
  degree: 'Бакалавр, комп’ютерна інженерія',
  years: '2017 — 2021',
};

export const faq = [
  {
    q: 'З якими бюджетами ви працюєте?',
    a: 'Від кількох сотень доларів на тест нового каналу до десятків тисяч на місяць. Для запуску з нуля раджу закладати бюджет, якого вистачить хоча б на 3–4 тижні тестів — інакше рекламні системи не встигнуть навчитися.',
  },
  {
    q: 'Ви можете взяти вже запущену рекламу?',
    a: 'Так, це найчастіший сценарій. Починаю з аудиту: перевіряю трекінг, структуру й історію кабінетів і зберігаю все, що вже працює. Перезапускаю з нуля тільки якщо дані зламані.',
  },
  {
    q: 'Як швидко будуть перші результати?',
    a: 'Перші дані з’являються за 1–2 тижні, стабільна картина — за 4–6 тижнів. У сезонних запусках, як у кейсі з доставкою квітів, усе готую заздалегідь, щоб працювати на результат з першого дня.',
  },
  {
    q: 'Що потрібно від вас для старту?',
    a: 'Доступи до рекламних кабінетів, GA4 / GTM і сайту, розуміння маржі або цільової ціни клієнта і контакт людини, яка відповідає за продажі. Решту структурую сам.',
  },
  {
    q: 'Як ви звітуєте?',
    a: 'Щотижня — короткий апдейт: що зроблено, що змінилось у цифрах, що далі. Щомісяця — звіт з висновками й планом. Дашборд у Looker Studio, щоб цифри були доступні будь-коли.',
  },
  {
    q: 'Ви працюєте з командою клієнта?',
    a: 'Так. Регулярно працюю разом з дизайнерами, розробниками й відділом продажів: пишу ТЗ на лендінги, налаштовую передачу лідів у CRM і збираю зворотний зв’язок щодо якості заявок.',
  },
];
