import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://domiadi.com',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          ar: 'ar',
          bn: 'bn',
          en: 'en',
          fr: 'fr',
          hi: 'hi',
          id: 'id',
          pt: 'pt',
          ru: 'ru',
          es: 'es',
          zh: 'zh', 
        },
      },
      
      filter: (page) => {
        const { pathname } = new URL(page);
        if (pathname === '/') return false;
        if (pathname.includes('/draft')) return false;
        return true;
      },
      entryLimit: 45000, 
    }),
    react(),
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
  },
});
