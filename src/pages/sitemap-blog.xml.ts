import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const publishedPosts = posts.filter(post => post.data.status === 'published');

  const urls = publishedPosts.map(post => {
    const publishedDate = post.data.publishedAt.toISOString();
    const modifiedDate = post.data.updatedAt ? post.data.updatedAt.toISOString() : publishedDate;
    return `  <url>
    <loc>${siteConfig.url}/artikel/${post.id}/</loc>
    <lastmod>${modifiedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

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
