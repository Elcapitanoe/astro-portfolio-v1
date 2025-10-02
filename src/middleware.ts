// src/middleware.ts
import { defineMiddleware } from 'astro/middleware';

const LOCALES = new Set(['en', 'id', 'jv']);
const ASSET_PREFIXES = ['/_astro', '/assets', '/favicon', '/icons', '/images', '/img', '/fonts'];
const ASSET_FILES = new Set(['/robots.txt', '/sitemap.xml', '/manifest.webmanifest']);

export const onRequest = defineMiddleware(({ url, redirect, cookies }, next) => {
  const { pathname, search } = url;

  if (
    ASSET_FILES.has(pathname) ||
    ASSET_PREFIXES.some((p) => pathname.startsWith(p)) ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return next();
  }

  const first = pathname.split('/').filter(Boolean)[0];

  // Paksa prefix ke /en jika belum ada
  if (!first || !LOCALES.has(first)) {
    cookies.set('lang', 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,   // detik (1 tahun)
      sameSite: 'lax',              // <<< perbaikan: lowercase
      secure: import.meta.env.PROD, // hanya Secure saat production/https
      // httpOnly: true,            // opsional: kalau cookie tidak perlu diakses JS
    });
    const normalized = pathname === '/' ? '/' : pathname;
    return redirect(`/en${normalized}${search}`, 302);
  }

  // Sudah ada prefix; sinkronkan cookie jika perlu
  if (cookies.get('lang')?.value !== first) {
    cookies.set('lang', first, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: import.meta.env.PROD,
      // httpOnly: true,
    });
  }

  return next();
});