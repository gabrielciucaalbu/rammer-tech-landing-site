import RSS from "rss";
import { blogPosts } from "@/data/blog-posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";
const FEED_URL = `${SITE_URL}/feed.xml`;

export const revalidate = 3600;

export async function GET() {
  const feed = new RSS({
    title: "Rammer Tech Blog",
    description:
      "Articole, ghiduri și perspective din lumea software-ului și tehnologiei de la echipa Rammer Tech.",
    site_url: SITE_URL,
    feed_url: FEED_URL,
    language: "ro",
    pubDate: new Date().toUTCString(),
    copyright: `© ${new Date().getFullYear()} Rammer Tech`,
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/ro/blog/${post.slug}`,
      guid: `${SITE_URL}/ro/blog/${post.slug}`,
      date: post.date,
      author: post.author,
    });
  });

  let xml = feed.xml({ indent: true });

  xml = xml.replace(
    '<rss version="2.0">',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">'
  );
  xml = xml.replace(
    "<channel>",
    `<channel>\n    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>`
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
