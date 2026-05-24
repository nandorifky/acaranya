import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const publishedTools = tools.filter(t => t.data.status === 'published');

  const mainUrl = `  <url>
    <loc>${siteConfig.url}/tools/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  const toolUrls = publishedTools.map(tool => {
    return `  <url>
    <loc>${siteConfig.url}/${tool.id}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainUrl}
${toolUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
