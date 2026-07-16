import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

// AI/GEO crawlers get an explicit Allow rule each — a GEO best practice that
// future-proofs against a bot defaulting to disallow when it finds no rule
// naming it, even though the wildcard rule below already permits them.
const AI_BOT_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Amazonbot",
  "Applebot-Extended",
  "FacebookBot",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_BOT_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
        // /api/ hosts server actions and internal route handlers (e.g. the
        // contact form) — no crawlable or citable content lives there.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
