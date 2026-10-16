import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const getPosts = async () =>
  (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 150));

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(date).replace(' р.', '');
