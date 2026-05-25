import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const staticPages = [
    '',
    '/fitur/',
    '/harga/',
    '/kontak/',
    '/tentang/',
    '/reseller-undangan-digital/',
    '/artikel/',
    '/tools/',
    '/review-us/'
  ];

  const urls = staticPages.map(page => `  <url>
    <loc>${siteConfig.url}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
