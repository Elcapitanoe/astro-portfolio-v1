import { FALLBACK_LOCALE, type Locale } from './locales';

type Dictionary = Record<string, any>;

const modules = import.meta.glob<{ default: Dictionary }>('../i18n/*.json', {
  eager: true,
});

const dictionaries: Partial<Record<Locale, Dictionary>> = {};

for (const [path, module] of Object.entries(modules)) {
  const code = path.split('/').pop()?.replace('.json', '');
  if (!code) continue;
  dictionaries[code as Locale] = module.default;
}

const dictionaryCache = new Map<Locale, Dictionary>();

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item)) as unknown as T;
  }

  if (isRecord(value)) {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = cloneDeep(val);
    }
    return result as unknown as T;
  }

  return value;
}

function deepMerge(target: Dictionary, source: Dictionary): Dictionary {
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      target[key] = value.map((item) => cloneDeep(item));
      continue;
    }

    if (isRecord(value)) {
      const existing = target[key];
      target[key] = deepMerge(
        isRecord(existing) ? { ...existing } : {},
        value,
      );
      continue;
    }

    target[key] = value;
  }

  return target;
}

function getDictionaryModule(locale: Locale): Dictionary | undefined {
  return dictionaries[locale];
}

export async function loadDict(locale: Locale): Promise<Dictionary> {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }

  const fallbackDict = getDictionaryModule(FALLBACK_LOCALE);
  if (!fallbackDict) {
    throw new Error(`Fallback dictionary \"${FALLBACK_LOCALE}\" is missing.`);
  }

  const base = cloneDeep(fallbackDict);

  if (locale === FALLBACK_LOCALE) {
    dictionaryCache.set(locale, base);
    return base;
  }

  const localeDict = getDictionaryModule(locale);
  if (localeDict) {
    deepMerge(base, cloneDeep(localeDict));
  }

  dictionaryCache.set(locale, base);
  return base;
}

function lookup(dict: Dictionary, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, segment) => {
    if (acc === undefined || acc === null) {
      return undefined;
    }

    if (typeof acc !== 'object') {
      return undefined;
    }

    return (acc as Record<string, any>)[segment];
  }, dict);
}

export async function createT(locale: Locale) {
  const dict = await loadDict(locale);

  return (key: string, fallback?: string): string => {
    const value = lookup(dict, key);
    if (value === undefined || value === null) {
      return fallback ?? key;
    }

    if (typeof value === 'object') {
      return fallback ?? key;
    }

    return String(value);
  };
}
