import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

const staticPages = [
  "",
  "/servicii",
  "/despre-noi",
  // "/portofoliu", // Hidden - no public portfolio yet
  "/produse",
  "/blog",
  "/contact",
  "/politica-confidentialitate",
  "/termeni-si-conditii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of i18n.locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/contact" ? 0.9 : 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(
              i18n.locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
            ),
            "x-default": `${BASE_URL}/ro${page}`,
          },
        },
      });
    }
  }

  // Blog posts for each locale
  for (const locale of i18n.locales) {
    for (const post of blogPosts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            ...Object.fromEntries(
              i18n.locales.map((l) => [
                l,
                `${BASE_URL}/${l}/blog/${post.slug}`,
              ])
            ),
            "x-default": `${BASE_URL}/ro/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
