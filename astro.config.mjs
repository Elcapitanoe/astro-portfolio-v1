// astro.config.mjs
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
      
      filter: (page) => page !== '/' && !page.includes('/draft'),
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
