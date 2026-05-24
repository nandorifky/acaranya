import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const categories = await getCollection('designCategories');
  const publishedCategories = categories.filter(c => c.data.status === 'published');

  const mainUrl = `  <url>
    <loc>${siteConfig.url}/desain-undangan-digital/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  const categoryUrls = publishedCategories.map(cat => {
    return `  <url>
    <loc>${siteConfig.url}/desain-undangan-digital/${cat.id}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainUrl}
${categoryUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
