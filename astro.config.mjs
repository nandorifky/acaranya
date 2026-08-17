// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const site = 'https://acaranya.id';
const blogContentDir = new URL('./src/content/blog/', import.meta.url);
const toolsContentDir = new URL('./src/content/tools/', import.meta.url);
const contentFilePattern = /\.(md|mdx|mdoc)$/;
const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
const recentNewsUrls = new Set(
  fs.readdirSync(blogContentDir)
    .filter((file) => contentFilePattern.test(file))
    .filter((file) => {
      const { data } = matter(fs.readFileSync(new URL(file, blogContentDir), 'utf8'));
      const publishedAt = data.publishedAt ? new Date(data.publishedAt).getTime() : 0;
      return data.status === 'published'
        && data.tags?.includes('news')
        && publishedAt >= twoDaysAgo;
    })
    .map((file) => `${site}/artikel/${file.replace(contentFilePattern, '')}/`)
);
const toolUrls = new Set([
  `${site}/tools/`,
  ...fs.readdirSync(toolsContentDir)
    .filter((file) => contentFilePattern.test(file))
    .map((file) => `${site}/${file.replace(contentFilePattern, '')}/`)
]);

const isRecentNewsUrl = (url) => recentNewsUrls.has(url);
const isPaginationUrl = (url) => {
  const pathname = new URL(url).pathname;
  return /^\/(artikel|area|penulis|desain-undangan-digital)(\/[^/]+)?\/[2-9]\d*\/$/.test(pathname)
    || /^\/artikel\/tag\/[^/]+\/[2-9]\d*\/$/.test(pathname);
};

const isNoindexUrl = (url) => {
  const pathname = new URL(url).pathname;
  return pathname === '/search/' || pathname === '/legal/' || pathname.startsWith('/legal/');
};

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
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  markdown: {
    rehypePlugins: [rehypeSlug],
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
      customSitemaps: [`${site}/sitemap-news.xml`],
      chunks: {
        blog(item) {
          if (item.url.includes('/artikel/') && !isRecentNewsUrl(item.url)) {
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
        if (isRecentNewsUrl(item.url)) return undefined;

        item.changefreq ??= ChangeFreqEnum.WEEKLY;
        item.priority ??= item.url === `${site}/` ? 1.0 : 0.6;
        return item;
      }
    })
  ]
});
