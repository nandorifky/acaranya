// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
// Triggering fresh build
export default defineConfig({
  site: 'https://acaranya.id',
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
    markdoc()
  ]
});