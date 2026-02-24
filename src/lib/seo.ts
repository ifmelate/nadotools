export const BASE_URL = "https://nadotools.com";
export const LOCALES = ["en", "es", "de", "fr", "pt", "zh", "ja", "ru"] as const;

export function buildAlternates(locale: string, pathSuffix: string) {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}/${pathSuffix}`;
  }
  languages["x-default"] = `${BASE_URL}/en/${pathSuffix}`;
  return {
    canonical: `${BASE_URL}/${locale}/${pathSuffix}`,
    languages,
  };
}
