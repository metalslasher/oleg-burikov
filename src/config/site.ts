export const siteConfig = {
  siteUrl: 'https://www.oleg-burikov.com',
  brandName: 'Oleg Burikov',
  personName: 'Олег Буріков',
  personNameEn: 'Oleg Burikov',
  jobTitle: 'Performance Marketing Manager',
  legalName: 'ФОП Буріков Олег Вікторович',
  locale: 'uk-UA',
  ogLocale: 'uk_UA',
  language: 'uk',
  city: 'Київ',
  logo: {
    src: '/favicon.png',
    alt: 'Oleg Burikov',
  },
  contact: {
    email: 'oleg.burikov.adv@gmail.com',
    phone: '+380962290400',
    phoneDisplay: '+380 96 229 04 00',
    telegram: 'https://t.me/metalslasher',
    telegramHandle: '@metalslasher',
    viber: 'viber://chat?number=380962290400',
    calendly: 'https://calendly.com/oleg-burikov-adv/30min',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/oleg-burikov/',
  },
  tracking: {
    // GA4, Microsoft Clarity and Meta Pixel are managed inside this GTM container.
    gtmId: 'GTM-KSZJGH2S',
  },
  seo: {
    defaultTitle: 'Олег Буріков — performance-маркетолог: реклама, сайти й аналітика під ключ',
    defaultDescription:
      'Performance-маркетолог з 6+ роками досвіду. Маркетинг під ключ: стратегія, лендінги й сайти, креативи, реклама в Google Ads, Meta Ads і TikTok Ads, аналітика GA4. Кейси з реальними цифрами.',
    defaultOgImage: '/images/og-oleg-burikov.jpg',
  },
} as const;

export const navigation = [
  { label: 'Послуги', href: '/services' },
  { label: 'Кейси', href: '/cases' },
  { label: 'Про мене', href: '/about' },
  { label: 'Блог', href: '/blog' },
];

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.siteUrl).toString();

export const withBrandTitle = (title: string) =>
  title.includes(siteConfig.personName) || title.includes(siteConfig.brandName)
    ? title
    : `${title} | ${siteConfig.personName}`;

export type ContactIcon = 'telegram' | 'viber' | 'linkedin' | 'email' | 'calendar';

export type ContactLink = {
  label: string;
  url: string;
  icon: ContactIcon;
  event: 'messenger_click' | 'social_click' | 'contact_click' | 'book_call';
  external: boolean;
};

export const contactLinks: ContactLink[] = [
  { label: 'Telegram', url: siteConfig.contact.telegram, icon: 'telegram', event: 'messenger_click', external: true },
  { label: 'LinkedIn', url: siteConfig.social.linkedin, icon: 'linkedin', event: 'social_click', external: true },
  { label: 'Email', url: `mailto:${siteConfig.contact.email}`, icon: 'email', event: 'contact_click', external: false },
  { label: 'Viber', url: siteConfig.contact.viber, icon: 'viber', event: 'messenger_click', external: true },
];

export const sameAsLinks = [siteConfig.social.linkedin, siteConfig.contact.telegram];
