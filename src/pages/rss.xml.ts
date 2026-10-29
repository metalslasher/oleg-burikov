import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/blog';
import { siteConfig } from '../config/site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  return rss({
    title: `Блог — ${siteConfig.personName}`,
    description: 'Практичні статті про Google Ads, Meta Ads, аналітику й заявки з реальних проєктів.',
    site: siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.updated || post.data.published,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
};
