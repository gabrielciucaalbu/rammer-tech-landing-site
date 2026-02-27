import { i18n } from "@/i18n-config";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

/**
 * Construiește alternates (canonical + languages + x-default) pentru hreflang.
 * @param pathWithoutLocale - Calea fără prefix locale, ex: "" | "/contact" | "/blog/slug"
 * @param currentLang - Limba curentă (pentru canonical)
 */
export function buildAlternates(
  pathWithoutLocale: string,
  currentLang: string
): { canonical: string; languages: Record<string, string> } {
  const canonical = `${BASE_URL}/${currentLang}${pathWithoutLocale}`;
  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = `${BASE_URL}/${locale}${pathWithoutLocale}`;
  }
  languages["x-default"] = `${BASE_URL}/ro${pathWithoutLocale}`;
  return { canonical, languages };
}
