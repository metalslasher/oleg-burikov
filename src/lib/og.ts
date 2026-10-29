import generated from '../data/og-images.json';
import { siteConfig } from '../config/site';

const available = new Set<string>(generated);

/** Share image for a page: the generated one from `npm run og` if it exists, else the site default. */
export const ogImage = (name: string) => {
  const path = `/images/og/${name}.jpg`;
  return available.has(path) ? path : siteConfig.seo.defaultOgImage;
};
