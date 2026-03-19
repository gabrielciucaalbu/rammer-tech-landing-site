import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { blogPosts } from "@/data/blog-posts";
import { getPublicPath } from "@/lib/locale-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

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
        lastModified: new Date(),
        changeFrequency: fsSlug === "" ? "weekly" : "monthly",
        priority:
          fsSlug === "" ? 1.0 : fsSlug === "contact" ? 0.9 : 0.8,
        alternates: { languages: altLanguages },
      });
    }
  }

  // Blog posts — slugs are the same in all locales
  for (const locale of i18n.locales) {
    for (const post of blogPosts) {
      const altLanguages: Record<string, string> = {};
      for (const l of i18n.locales) {
        altLanguages[l] = `${BASE_URL}/${l}/blog/${post.slug}`;
      }
      altLanguages["x-default"] =
        `${BASE_URL}/${i18n.defaultLocale}/blog/${post.slug}`;

      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: altLanguages },
      });
    }
  }

  return entries;
}
