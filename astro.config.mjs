import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://domiadi.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/draft'),
      entryLimit: 45000
    })
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild'
    }
  }
});
