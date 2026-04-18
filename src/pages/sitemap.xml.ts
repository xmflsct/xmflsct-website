import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const cases = await getCollection('cases');

  const urls: { loc: string; priority: string }[] = [];

  // Homepage
  urls.push({ loc: new URL('/', site).href, priority: '1.0' });

  // About page
  urls.push({ loc: new URL('/about-zhiyuan/', site).href, priority: '0.8' });

  // Case study pages
  for (const entry of cases) {
    const slug = entry.id.split('/')[0];
    urls.push({ loc: new URL(`/cases/${slug}/`, site).href, priority: '0.6' });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
