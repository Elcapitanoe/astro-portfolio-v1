import { SUPPORTED_LOCALES, type Locale } from './locales';

export interface LocaleOption {
  code: Locale;
  name: string;
  href: string;
  active: boolean;
}

interface BuildLocaleOptionsInput {
  lang: Locale;
  pathname: string;
  hash?: string;
}

const LOCALE_PREFIX = /^\/[a-z]{2}(?:-[A-Z]{2})?\//;

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const withTrailingSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const withoutLocale = withTrailingSlash.replace(LOCALE_PREFIX, '/');
  const cleaned = withoutLocale.replace(/\/{2,}/g, '/');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export function buildLocaleOptions({ lang, pathname, hash }: BuildLocaleOptionsInput): LocaleOption[] {
  const normalizedPath = normalizePath(pathname);
  return SUPPORTED_LOCALES.map((locale) => {
    const hrefPath = `/${locale.code}${normalizedPath}`.replace(/\/{2,}/g, '/');
    const href = hash ? `${hrefPath}${hash}` : hrefPath;
    return {
      code: locale.code,
      name: locale.name,
      href,
      active: locale.code === lang,
    };
  });
}
