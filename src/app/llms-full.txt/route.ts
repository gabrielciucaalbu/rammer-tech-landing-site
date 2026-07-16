import { blogPosts } from "@/data/blog-posts";
import ro from "@/dictionaries/ro.json";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export const revalidate = 3600;

export async function GET() {
  const faqSection = ro.services.faq.items
    .map((item) => `**Q: ${item.question}**\n\nA: ${item.answer}`)
    .join("\n\n");

  const blogSections = blogPosts
    .map(
      (post) =>
        `## ${post.title}\n\nURL: ${SITE_URL}/ro/blog/${post.slug}\nAuthor: ${post.author}\nPublished: ${post.date}\n\n${post.content}`
    )
    .join("\n\n---\n\n");

  const body = `# Rammer Tech — Full Content Mirror

> Rammer Tech is a software development and IT consulting company based in Bucharest, Romania. We build custom web and mobile applications, enterprise ERP/CRM solutions, and provide IT consulting for SMEs.

## Contact

- Email: office@mail.rammertech.ro
- Phone: +40736459926
- Location: Bucharest, Romania
- Hours: Monday–Friday, 09:00–18:00

## Services

${ro.services.pageSubtitle}

## Frequently Asked Questions

${faqSection}

## Blog Articles

${blogSections}

---

Full sitemap: ${SITE_URL}/sitemap.xml
Discovery file: ${SITE_URL}/llms.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
