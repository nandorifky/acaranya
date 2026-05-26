import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  
  // Filter for published posts with the 'news' tag
  const newsPosts = posts
    .filter(post => post.data.status === 'published' && post.data.tags?.includes('news'))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  const urls = newsPosts.map(post => {
    const pubDate = post.data.publishedAt.toISOString();
    // Escape XML special characters in title
    const escapedTitle = post.data.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    return `  <url>
    <loc>${siteConfig.url}/artikel/${post.id}/</loc>
    <news:news>
      <news:publication>
        <news:name>${siteConfig.name}</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapedTitle}</news:title>
    </news:news>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
