import type { Locale } from "@/i18n-config";

const dictionaries = {
  ro: () => import("./ro.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
