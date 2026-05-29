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
const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
const recentNewsUrls = new Set(
  fs.readdirSync(blogContentDir)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => {
      const { data } = matter(fs.readFileSync(new URL(file, blogContentDir), 'utf8'));
      const publishedAt = data.publishedAt ? new Date(data.publishedAt).getTime() : 0;
      return data.status === 'published'
        && data.tags?.includes('news')
        && publishedAt >= twoDaysAgo;
    })
    .map((file) => `${site}/artikel/${path.basename(file, '.md')}/`)
);
const toolUrls = new Set([
  `${site}/tools/`,
  ...fs.readdirSync(toolsContentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => `${site}/${path.basename(file, '.md')}/`)
]);

const isRecentNewsUrl = (url) => recentNewsUrls.has(url);

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
            item.changefreq = ChangeFreqEnum.DAILY;
            item.priority = 0.9;
            return item;
          }
        },
        designs(item) {
          if (item.url.includes('/desain-undangan-digital/')) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.priority = 0.8;
            return item;
          }
        },
        tools(item) {
          if (toolUrls.has(item.url)) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.priority = 0.8;
            return item;
          }
        },
        area(item) {
          if (item.url.includes('/area/')) {
            item.changefreq = item.url === `${site}/area/` ? ChangeFreqEnum.WEEKLY : ChangeFreqEnum.MONTHLY;
            item.priority = item.url === `${site}/area/` ? 0.9 : 0.8;
            return item;
          }
        }
      },
      serialize(item) {
        if (isRecentNewsUrl(item.url)) return undefined;

        item.changefreq ??= ChangeFreqEnum.WEEKLY;
        item.priority ??= item.url === `${site}/` ? 1.0 : 0.8;
        return item;
      }
    })
  ]
});
