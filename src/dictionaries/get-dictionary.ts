import { notFound } from "next/navigation";
import type { Locale } from "@/i18n-config";

const dictionaries = {
  ro: () => import("./ro.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

// `lang` comes from the URL. Paths with a dot (for example /foo.txt) skip the middleware
// and reach the [lang] route, so an unknown value must end in a 404, never a TypeError (500).
// hasOwnProperty also rejects inherited names such as "constructor".
export const getDictionary = async (locale: Locale) => {
  if (!Object.prototype.hasOwnProperty.call(dictionaries, locale)) notFound();
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
