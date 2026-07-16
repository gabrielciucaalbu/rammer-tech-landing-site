import { i18n } from "@/i18n-config";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

/**
 * Default Open Graph / Twitter image. Next.js does not merge a page's
 * `openGraph` object with the root layout's — it replaces it entirely —
 * so every page-level `generateMetadata` that defines its own `openGraph`
 * must include `images` explicitly or the og:image tag is dropped.
 */
export const DEFAULT_OG_IMAGE = "/og-default.png";

/**
 * Builds canonical URL + hreflang alternates for a page.
 *
 * @param fsPath - Filesystem path without locale prefix (the RO slug), e.g. "/servicii"
 * @param currentLang - Locale of the current page render
 * @param localePaths - Per-locale public path overrides from getLocaleAlternates().
 *                      If omitted, fsPath is used for all locales (e.g. "/blog").
 */
export function buildAlternates(
  fsPath: string,
  currentLang: string = i18n.defaultLocale,
  localePaths?: Partial<Record<string, string>>
): { canonical: string; languages: Record<string, string> } {
  const getPath = (locale: string) => localePaths?.[locale] ?? fsPath;

  const canonical = `${BASE_URL}/${currentLang}${getPath(currentLang)}`;

  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = `${BASE_URL}/${locale}${getPath(locale)}`;
  }
  languages["x-default"] =
    `${BASE_URL}/${i18n.defaultLocale}${getPath(i18n.defaultLocale)}`;

  return { canonical, languages };
}
