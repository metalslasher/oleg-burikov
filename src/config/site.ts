export const siteConfig = {
  siteUrl: 'https://www.oleg-burikov.com',
  brandName: 'Oleg Burikov',
  personName: 'Олег Буріков',
  legalName: 'ФОП Буріков Олег Вікторович',
  locale: 'uk-UA',
  ogLocale: 'uk_UA',
  language: 'uk',
  country: 'UA',
  positioning: {
    shortLabel: 'Performance Marketing',
  },
  logo: {
    src: '/images/logo.png',
    alt: 'Oleg Burikov logo',
  },
  contact: {
    email: 'oleg.burikov.adv@gmail.com',
    phone: '+380962290400',
    phoneDisplay: '+380 96 229 04 00',
    phoneDigits: '380962290400',
    telegram: 'https://t.me/metalslasher',
    viber: 'viber://chat?number=380962290400',
    whatsapp: 'https://wa.me/380962290400',
    calendly: 'https://calendly.com/oleg-burikov-adv/30min',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/oleg-burikov/',
    facebook: '',
    instagram: '',
  },
  tracking: {
    gtmId: 'GTM-KSZJGH2S',
    metaPixel: {
      id: '',
      managedBy: 'gtm',
    },
    clarity: {
      id: '',
      managedBy: 'gtm',
    },
    ga4: {
      id: '',
      managedBy: 'gtm',
    },
  },
  seo: {
    defaultTitle: 'Oleg Burikov - performance marketing та реклама для бізнесу',
    defaultDescription:
      'Performance marketing, Google Ads, Meta Ads, аналітика та стратегія росту для бізнесу.',
    defaultOgImage: '/images/og-image.jpg',
  },
} as const;

type SocialIcon = 'facebook' | 'instagram' | 'linkedin';

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.siteUrl).toString();

export const withBrandTitle = (title: string) => {
  const brandSuffix = ` | ${siteConfig.brandName}`;
  const cleanTitle = title.endsWith(brandSuffix)
    ? title.slice(0, -brandSuffix.length).trim()
    : title.trim();

  return cleanTitle.includes(siteConfig.brandName)
    ? cleanTitle
    : `${cleanTitle} | ${siteConfig.brandName}`;
};

export const messengerLinks = [
  {
    label: 'Telegram',
    url: siteConfig.contact.telegram,
  },
  {
    label: 'Viber',
    url: siteConfig.contact.viber,
  },
  {
    label: 'WhatsApp',
    url: siteConfig.contact.whatsapp,
  },
].filter((link) => link.url);

type SocialLink = {
  platform: string;
  url: string;
  icon: SocialIcon;
};

const allSocialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: siteConfig.social.linkedin,
    icon: 'linkedin',
  },
  {
    platform: 'Facebook',
    url: siteConfig.social.facebook,
    icon: 'facebook',
  },
  {
    platform: 'Instagram',
    url: siteConfig.social.instagram,
    icon: 'instagram',
  },
];

export const socialLinks = allSocialLinks.filter((link) => link.url);

export const sameAsLinks = [
  siteConfig.social.linkedin,
  siteConfig.contact.telegram,
].filter((url) => url);
