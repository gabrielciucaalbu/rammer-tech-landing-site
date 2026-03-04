const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

/**
 * Construiește alternates (canonical + languages) pentru metadata.
 * Site-ul este doar în română; canonical și x-default indică același URL.
 *
 * @param pathWithoutLocale - Calea fără prefix locale, ex: "" | "/contact" | "/blog/slug"
 */
export function buildAlternates(
  pathWithoutLocale: string,
  _currentLang?: string
): { canonical: string; languages: Record<string, string> } {
  const canonical = `${BASE_URL}/ro${pathWithoutLocale}`;
  return {
    canonical,
    languages: { ro: canonical, "x-default": canonical },
  };
}
