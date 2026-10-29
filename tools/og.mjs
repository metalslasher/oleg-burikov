// Generates 1200×630 share images (Open Graph) in the site style: `npm run og`.
// Output: public/images/og/<type>-<slug>.jpg for blog posts, service pages, cases and section indexes.
// Text is drawn as vector paths from the site fonts, so no system fonts are needed.
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { servicePages } from '../src/data/services.ts';
import { cases } from '../src/data/cases.ts';

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'public/images/og');
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 630;
const LEFT = 72;
const TEXT_WIDTH = 660;
const COLORS = { ink: '#0a0b0d', paper: '#f2efe8', muted: '#a3a3ab', faint: '#8b8c95', signal: '#ff5a1f' };

const loadFont = (pkg, file) => {
  const buffer = readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
  return opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
};

// Each family = [cyrillic subset, latin subset]; glyphs are routed by code point.
const fonts = {
  display: [loadFont('unbounded', 'unbounded-cyrillic-600-normal.woff'), loadFont('unbounded', 'unbounded-latin-600-normal.woff')],
  body: [loadFont('manrope', 'manrope-cyrillic-500-normal.woff'), loadFont('manrope', 'manrope-latin-500-normal.woff')],
  mono: [loadFont('jetbrains-mono', 'jetbrains-mono-cyrillic-500-normal.woff'), loadFont('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff')],
};
const pick = (family, ch) => (/[Ѐ-ӿ]/.test(ch) ? family[0] : family[1]);

/** Lays out a string; returns SVG path markup and its width. */
const layout = (family, str, x, y, size, spacing = 0) => {
  let d = '';
  let cx = x;
  for (const ch of str) {
    const font = pick(family, ch);
    const glyph = font.charToGlyph(ch);
    const k = size / font.unitsPerEm;
    const X = (v) => (cx + v * k).toFixed(2);
    const Y = (v) => (y - v * k).toFixed(2);
    let pd = '';
    for (const c of glyph.path.commands) {
      if (c.type === 'M' || c.type === 'L') pd += `${c.type}${X(c.x)} ${Y(c.y)}`;
      else if (c.type === 'Q') pd += `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`;
      else if (c.type === 'C') pd += `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`;
      else if (c.type === 'Z') pd += 'Z';
    }
    if (pd && !pd.includes('NaN')) d += `<path d="${pd}"/>`;
    cx += (glyph.advanceWidth / font.unitsPerEm) * size + spacing;
  }
  return { d, width: cx - x };
};

/** Word-wraps a headline where *word* marks accent words. */
const wrapTitle = (title, size) => {
  const words = title.split(/\s+/).map((raw) => ({ text: raw.replace(/\*/g, ''), accent: raw.includes('*') }));
  // Accent markers may span several words: *a b* → both accented.
  let open = false;
  title.split(/\s+/).forEach((raw, i) => {
    const starts = raw.startsWith('*');
    const ends = raw.endsWith('*') && raw.length > 1;
    words[i].accent = open || starts;
    if (starts && !ends) open = true;
    if (ends) open = false;
  });
  const space = layout(fonts.display, ' ', 0, 0, size).width;
  const lines = [[]];
  let lineWidth = 0;
  for (const word of words) {
    const w = layout(fonts.display, word.text, 0, 0, size, -size * 0.02).width;
    if (lineWidth && lineWidth + space + w > TEXT_WIDTH) {
      lines.push([]);
      lineWidth = 0;
    }
    lines[lines.length - 1].push({ ...word, w });
    lineWidth += (lineWidth ? space : 0) + w;
  }
  return { lines, space };
};

const portrait = await (async () => {
  const height = 520;
  const image = await sharp(path.join(root, 'public/images/oleg-burikov-hero-cutout.webp')).resize({ height }).toBuffer({ resolveWithObject: true });
  const width = image.info.width;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#m)"/></svg>`,
  );
  const data = await sharp(image.data).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  return { data, width, height };
})();

const background = () => {
  const grid = [];
  for (let x = 0; x <= W; x += 60) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
  for (let y = 0; y <= H; y += 60) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><radialGradient id="glow" cx="0.86" cy="0.62" r="0.5">
      <stop offset="0" stop-color="${COLORS.signal}" stop-opacity="0.42"/>
      <stop offset="0.5" stop-color="${COLORS.signal}" stop-opacity="0.07"/>
      <stop offset="1" stop-color="${COLORS.signal}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="${COLORS.ink}"/>
    <g stroke="rgba(255,255,255,0.035)">${grid.join('')}</g>
    <rect width="100%" height="100%" fill="url(#glow)"/>
  </svg>`);
};

const render = async ({ kicker, title, subtitle, file }) => {
  const parts = [];
  const add = (family, str, x, y, size, fill, spacing) => {
    const t = layout(family, str, x, y, size, spacing);
    parts.push(`<g fill="${fill}">${t.d}</g>`);
    return t.width;
  };

  // Kicker
  parts.push(`<rect x="${LEFT}" y="96" width="28" height="2" fill="${COLORS.signal}"/>`);
  add(fonts.mono, kicker.toUpperCase(), LEFT + 42, 104, 18, COLORS.signal, 1.2);

  // Headline: shrink until it fits in 4 lines and no single word overflows into the portrait
  const widest = (w) => Math.max(...w.lines.map((line) => line.reduce((sum, word) => sum + word.w, 0) + (line.length - 1) * w.space));
  let size = 62;
  let wrapped = wrapTitle(title, size);
  while ((wrapped.lines.length > 4 || widest(wrapped) > TEXT_WIDTH) && size > 36) {
    size -= 4;
    wrapped = wrapTitle(title, size);
  }
  const lineHeight = size * 1.12;
  const blockTop = 150 + size;
  wrapped.lines.forEach((line, i) => {
    let x = LEFT;
    for (const word of line) {
      add(fonts.display, word.text, x, blockTop + i * lineHeight, size, word.accent ? COLORS.signal : COLORS.paper, -size * 0.02);
      x += word.w + wrapped.space;
    }
  });

  if (subtitle) {
    add(fonts.body, subtitle, LEFT, blockTop + wrapped.lines.length * lineHeight + 18, 26, COLORS.muted);
  }

  // Footer
  parts.push(`<rect x="${LEFT}" y="540" width="40" height="40" rx="10" fill="${COLORS.signal}"/>`);
  add(fonts.display, 'OB', LEFT + 7, 567, 15, COLORS.ink, -0.3);
  add(fonts.body, 'Олег Буріков', LEFT + 56, 558, 21, COLORS.paper);
  add(fonts.mono, 'oleg-burikov.com', LEFT + 56, 580, 15, COLORS.faint, 0.4);

  const foreground = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`);
  await sharp(background())
    .composite([
      { input: portrait.data, left: W - portrait.width + 70, top: H - portrait.height },
      { input: foreground, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, file));
  console.log('✓', file);
};

const frontmatter = (source, key) => source.match(new RegExp(`^${key}:\\s*'(.*)'\\s*$`, 'm'))?.[1];

const jobs = [
  { kicker: 'Послуги', title: 'Маркетинг *під ключ* — або окрема задача', file: 'services.jpg' },
  { kicker: 'Кейси', title: 'Результати, які можна *перевірити*', file: 'cases.jpg' },
  { kicker: 'Блог', title: 'Нотатки з *рекламних кабінетів*', file: 'blog.jpg' },
  { kicker: 'Резюме', title: 'Performance Marketing *Manager*', subtitle: '6+ років · Google, Meta, TikTok Ads · аналітика', file: 'about.jpg' },
  ...servicePages.map((page) => ({ kicker: 'Послуга', title: page.h1, file: `service-${page.slug}.jpg` })),
  ...cases.map((item) => ({ kicker: `Кейс · ${item.niche}`, title: item.headline, subtitle: item.channels.join(' + ') + ' · ' + item.market, file: `case-${item.slug}.jpg` })),
  ...readdirSync(path.join(root, 'src/content/blog'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(path.join(root, 'src/content/blog', file), 'utf8');
      const slug = file.replace(/\.md$/, '');
      return { kicker: 'Блог', title: frontmatter(source, 'seoTitle') || frontmatter(source, 'title'), file: `blog-${slug}.jpg` };
    }),
];

for (const job of jobs) await render(job);

// Pages read this list to pick their share image (falls back to the default one).
writeFileSync(
  path.join(root, 'src/data/og-images.json'),
  JSON.stringify(jobs.map((job) => `/images/og/${job.file}`).sort(), null, 2) + '\n',
);
