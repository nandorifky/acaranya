import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-designs.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-tools.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-area.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
