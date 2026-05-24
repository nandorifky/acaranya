import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const areas = await getCollection('area');
  const publishedAreas = areas.filter(area => area.data.status === 'published');

  const urls = publishedAreas.map(area => {
    const publishedDate = area.data.publishedAt.toISOString();
    const modifiedDate = area.data.updatedAt ? area.data.updatedAt.toISOString() : publishedDate;
    return `  <url>
    <loc>${siteConfig.url}/area/${area.id}/</loc>
    <lastmod>${modifiedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}/area/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
