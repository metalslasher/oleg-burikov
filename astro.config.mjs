import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config/site.ts';
import { cases } from './src/data/cases.ts';
import { servicePages } from './src/data/services.ts';

// Old numeric case URLs keep working after the move to descriptive slugs.
const legacyCaseRedirects = Object.fromEntries(
  cases.map((item) => [`/cases/${item.legacySlug}`, { status: 301, destination: `/cases/${item.slug}` }]),
);

// Case and blog pages are rendered on demand, so the sitemap lists them explicitly.
const blogSlugs = readdirSync(new URL('./src/content/blog', import.meta.url))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'never',
  redirects: {
    ...legacyCaseRedirects,
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|privacy)\/?$/.test(page),
      customPages: [
        ...cases.map((item) => `${siteConfig.siteUrl}/cases/${item.slug}`),
        ...blogSlugs.map((slug) => `${siteConfig.siteUrl}/blog/${slug}`),
        ...servicePages.map((page) => `${siteConfig.siteUrl}/services/${page.slug}`),
      ],
    }),
  ],
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    // Inline scripts would lack the CSP nonce (see src/middleware.ts), so always emit files.
    build: { assetsInlineLimit: 0 },
    environments: { client: { build: { assetsInlineLimit: 0 } } },
  },
});
