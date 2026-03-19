import { i18n } from "@/i18n-config";

/**
 * Maps each filesystem route slug (always the RO slug) to its public URL
 * segment per locale. Slugs identical in both locales (blog, contact) are
 * listed explicitly so the LanguageSwitcher can look them up.
 */
export const LOCALE_SLUGS: Record<string, Record<string, string>> = {
  "servicii":                   { ro: "servicii",                   en: "services" },
  "despre-noi":                 { ro: "despre-noi",                 en: "about" },
  "portofoliu":                 { ro: "portofoliu",                 en: "portfolio" },
  "produse":                    { ro: "produse",                    en: "products" },
  "blog":                       { ro: "blog",                       en: "blog" },
  "contact":                    { ro: "contact",                    en: "contact" },
  "politica-confidentialitate": { ro: "politica-confidentialitate", en: "privacy-policy" },
  "termeni-si-conditii":        { ro: "termeni-si-conditii",        en: "terms-and-conditions" },
};

/**
 * Returns the public URL path (with leading slash) for a given FS slug and locale.
 * Falls back to the FS slug if no mapping exists (e.g. blog post slugs).
 */
export function getPublicPath(fsSlug: string, locale: string): string {
  const slug = LOCALE_SLUGS[fsSlug]?.[locale] ?? fsSlug;
  return `/${slug}`;
}

/**
 * Returns a per-locale map of public paths for use in buildAlternates.
 * E.g. for "servicii" → { ro: "/servicii", en: "/services" }
 */
export function getLocaleAlternates(
  fsSlug: string
): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {};
  for (const locale of i18n.locales) {
    result[locale] = getPublicPath(fsSlug, locale);
  }
  return result;
}

/**
 * Given a public URL slug and the locale it belongs to, returns the FS slug.
 * Used by the LanguageSwitcher to translate slugs when switching locales.
 * Returns the input slug unchanged if no mapping is found (e.g. blog post slugs).
 */
export function getFsSlug(publicSlug: string, locale: string): string {
  const entry = Object.entries(LOCALE_SLUGS).find(
    ([, slugs]) => slugs[locale] === publicSlug
  );
  return entry?.[0] ?? publicSlug;
}
