import { blogPosts } from "@/data/blog-posts";
import { getPublicPath } from "@/lib/locale-slugs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export const revalidate = 3600;

function ro(slug: string): string {
  return `${SITE_URL}/ro${slug === "" ? "" : getPublicPath(slug, "ro")}`;
}

export async function GET() {
  const lines = [
    "# Rammer Tech",
    "",
    "> Rammer Tech is a software development and IT consulting company based in Bucharest, Romania. We build custom web and mobile applications, enterprise ERP/CRM systems, and provide IT consulting for SMEs, delivered by a small senior team led by founder & CTO Gabriel Ciucă-Albu.",
    "",
    "## Core Services",
    "",
    `- [Servicii Software Complete](${ro("servicii")}): Web & mobile development, enterprise ERP/CRM solutions, IT consulting.`,
    `- [Despre Noi](${ro("despre-noi")}): Company story, values, and team.`,
    `- [Contact](${ro("contact")}): Get in touch — office@mail.rammertech.ro, +40736459926.`,
    "",
    "## Knowledge Base",
    "",
    ...blogPosts.map(
      (post) => `- [${post.title}](${SITE_URL}/ro/blog/${post.slug}): ${post.excerpt}`
    ),
    "",
    "## Other",
    "",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Full content mirror](${SITE_URL}/llms-full.txt)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
