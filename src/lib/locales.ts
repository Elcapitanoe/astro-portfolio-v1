export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'id', name: 'Bahasa Indonesia' }
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = SUPPORTED_LOCALES[0].code;
export const FALLBACK_LOCALE: Locale = 'en';

const localeSet = new Set(SUPPORTED_LOCALES.map((locale) => locale.code));

export function isLocale(value: string): value is Locale {
  return localeSet.has(value as Locale);
}

export function normalizeLocale(input: string | null | undefined): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const candidate = input.toLowerCase();
  if (isLocale(candidate)) {
    return candidate;
  }

  const base = candidate.split(/[-_]/)[0];
  if (isLocale(base)) {
    return base;
  }

  return DEFAULT_LOCALE;
}
