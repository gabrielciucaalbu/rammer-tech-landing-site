import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { blogPosts } from "@/data/blog-posts";
import { getPublicPath } from "@/lib/locale-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

/**
 * Last time static pages were meaningfully updated.
 * Bump this date whenever you modify page content, layout, or metadata.
 * @see .cursor/rules/sitemap-lastmod.mdc
 */
const STATIC_PAGES_LAST_MOD = "2026-04-10";

// FS slugs (always RO) — getPublicPath translates to the public slug per locale
const staticFsSlugs = [
  "",
  "servicii",
  "despre-noi",
  // "portofoliu", // Hidden — no public portfolio yet
  "produse",
  "blog",
  "contact",
  "politica-confidentialitate",
  "termeni-si-conditii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of i18n.locales) {
    for (const fsSlug of staticFsSlugs) {
      const publicPath = fsSlug === "" ? "" : getPublicPath(fsSlug, locale);
      const url = `${BASE_URL}/${locale}${publicPath}`;

      const altLanguages: Record<string, string> = {};
      for (const l of i18n.locales) {
        const lPath = fsSlug === "" ? "" : getPublicPath(fsSlug, l);
        altLanguages[l] = `${BASE_URL}/${l}${lPath}`;
      }
      const defaultPath =
        fsSlug === "" ? "" : getPublicPath(fsSlug, i18n.defaultLocale);
      altLanguages["x-default"] =
        `${BASE_URL}/${i18n.defaultLocale}${defaultPath}`;

      entries.push({
        url,
        lastModified: new Date(STATIC_PAGES_LAST_MOD),
        changeFrequency: fsSlug === "" ? "weekly" : "monthly",
        priority:
          fsSlug === "" ? 1.0 : fsSlug === "contact" ? 0.9 : 0.8,
        alternates: { languages: altLanguages },
      });
    }
  }

  // Blog posts — RO locale only (all blog content is currently in Romanian)
  for (const post of blogPosts) {
    entries.push({
      url: `${BASE_URL}/ro/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
