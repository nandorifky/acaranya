// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import addImageDimensions from './src/lib/rehype/add-image-dimensions.mjs';
import fs from 'node:fs';
import matter from 'gray-matter';
import slugify from 'slugify';

const site = 'https://acaranya.id';
const contentRoot = new URL('./src/content/', import.meta.url);
const blogContentDir = new URL('blog/', contentRoot);
const toolsContentDir = new URL('tools/', contentRoot);
const areaContentDir = new URL('area/', contentRoot);
const designCategoriesDir = new URL('design-categories/', contentRoot);
const designsContentDir = new URL('designs/', contentRoot);
const contentFilePattern = /\.(md|mdx|mdoc)$/;

const listFiles = (dir, recursive = false) => {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (recursive) files.push(...listFiles(new URL(`${entry.name}/`, dir), true));
      continue;
    }
    if (contentFilePattern.test(entry.name)) files.push(new URL(entry.name, dir));
  }
  return files;
};
const readEntry = (file) => matter(fs.readFileSync(file, 'utf8')).data;
const entryId = (file) =>
  decodeURIComponent(file.pathname.split('/').pop() ?? '').replace(contentFilePattern, '');

const blogEntries = listFiles(blogContentDir).map((file) => ({ file, data: readEntry(file) }));
const toolEntries = listFiles(toolsContentDir).map((file) => ({ file, data: readEntry(file) }));
const areaEntries = listFiles(areaContentDir).map((file) => ({ file, data: readEntry(file) }));

const toolUrls = new Set([
  `${site}/tools/`,
  ...toolEntries.map(({ file, data }) => `${site}/${data.customSlug || entryId(file)}/`),
]);

// Every URL that renders with noindex must also stay out of the sitemap.
const noindexUrls = new Set([
  `${site}/search/`,
  `${site}/legal/`,
  ...['aqiqah', 'corporate', 'grand-opening', 'khitanan', 'natal', 'pernikahan', 'syukuran', 'ulang-tahun', 'wisuda'].map(
    (slug) => `${site}/order-undangan/${slug}/`,
  ),
]);

const tagCounts = new Map();
const categoryCounts = new Map();
for (const { file, data } of blogEntries) {
  if (data.status !== 'published') continue;
  if (data.noindex) noindexUrls.add(`${site}/artikel/${data.customSlug || entryId(file)}/`);
  for (const tag of new Set(data.tags ?? [])) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  categoryCounts.set(data.category, (categoryCounts.get(data.category) ?? 0) + 1);
}
for (const [tag, count] of tagCounts) {
  if (count < 3 && /^[a-z0-9-]+$/.test(tag)) {
    noindexUrls.add(`${site}/artikel/tag/${tag}/`);
  }
}

const taxonomy = JSON.parse(
  fs.readFileSync(new URL('blog-taxonomy/main.json', contentRoot), 'utf8'),
);
for (const category of taxonomy.categories) {
  if ((categoryCounts.get(category.value) ?? 0) < 3) {
    noindexUrls.add(
      `${site}/artikel/kategori/${slugify(category.value, { lower: true, strict: true })}/`,
    );
  }
}

for (const { file, data } of areaEntries) {
  if (data.status === 'published' && data.noindex) {
    noindexUrls.add(`${site}/area/${data.customSlug || entryId(file)}/`);
  }
}
for (const { file, data } of toolEntries) {
  if (data.noindex) noindexUrls.add(`${site}/${data.customSlug || entryId(file)}/`);
}

const designCounts = new Map();
for (const file of listFiles(designsContentDir, true)) {
  const data = readEntry(file);
  if (data.status !== 'published') continue;
  for (const categoryId of new Set([data.category, ...(data.categories ?? [])])) {
    if (!categoryId) continue;
    designCounts.set(categoryId, (designCounts.get(categoryId) ?? 0) + 1);
  }
}
for (const file of listFiles(designCategoriesDir)) {
  const id = entryId(file);
  if ((designCounts.get(id) ?? 0) === 0) {
    noindexUrls.add(`${site}/desain-undangan-digital/${id}/`);
  }
}

const isPaginationUrl = (url) => {
  const pathname = new URL(url).pathname;
  return /^\/(artikel|area|penulis|desain-undangan-digital)(\/[^/]+)?\/(?:[2-9]|[1-9]\d+)\/$/.test(pathname)
    || /^\/artikel\/tag\/[^/]+\/(?:[2-9]|[1-9]\d+)\/$/.test(pathname)
    || /^\/artikel\/kategori\/[^/]+\/(?:[2-9]|[1-9]\d+)\/$/.test(pathname);
};

const isNoindexUrl = (url) => {
  const pathname = new URL(url).pathname;
  return pathname.startsWith('/legal/') || noindexUrls.has(url);
};

let contentDates = {};
try {
  contentDates = JSON.parse(
    fs.readFileSync(new URL('./src/data/content-dates.json', import.meta.url), 'utf8'),
  );
} catch {
  contentDates = {};
}

// https://astro.build/config
// Triggering fresh build
export default defineConfig({
  site,
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory'
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  markdown: {
    rehypePlugins: [rehypeSlug, addImageDimensions],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom']
    }
  },

  integrations: [
    react(),
    markdoc(),
    sitemap({
      chunks: {
        blog(item) {
          if (item.url.includes('/artikel/')) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.priority = 0.7;
            return item;
          }
        },
        designs(item) {
          if (item.url.includes('/desain-undangan-digital/')) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.priority = 0.7;
            return item;
          }
        },
        tools(item) {
          if (toolUrls.has(item.url)) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.priority = 0.7;
            return item;
          }
        },
        area(item) {
          if (item.url.includes('/area/')) {
            item.changefreq = ChangeFreqEnum.MONTHLY;
            item.priority = item.url === `${site}/area/` ? 0.7 : 0.5;
            return item;
          }
        }
      },
      serialize(item) {
        if (isPaginationUrl(item.url)) return undefined;
        if (isNoindexUrl(item.url)) return undefined;
        if (contentDates[item.url]) item.lastmod = contentDates[item.url];

        item.changefreq ??= ChangeFreqEnum.WEEKLY;
        item.priority ??= item.url === `${site}/` ? 1.0 : 0.6;
        return item;
      }
    })
  ]
});
