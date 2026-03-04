export const i18n = {
  defaultLocale: "ro",
  locales: ["ro"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
