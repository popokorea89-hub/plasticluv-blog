export const locales = ["en", "ko", "ja", "zh", "id", "fr", "es", "pt", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const rtlLocales: Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
  id: "Bahasa",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ar: "العربية",
};

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
