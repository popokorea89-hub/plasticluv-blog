import { NextRequest } from "next/server";
import { getAllPosts } from "@/lib/content";
import { locales } from "@/lib/i18n";

const SITE_URL = "https://plasticluv.com";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  if (!locales.includes(lang as never)) {
    return new Response("Not Found", { status: 404 });
  }

  const posts = getAllPosts(lang);

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/${lang}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${lang}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <dc:creator>Dr. Yongwoo Lee</dc:creator>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Plastic Love</title>
    <description>Evidence-based plastic surgery insights from Seoul</description>
    <link>${SITE_URL}/${lang}</link>
    <language>${lang}</language>
    <atom:link href="${SITE_URL}/api/rss/${lang}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
