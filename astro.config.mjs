import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://domi.my.id",
  trailingSlash: "always",
  redirects: {
    "/": "/en/",
  },
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          ar: "ar",
          bn: "bn",
          en: "en",
          fr: "fr",
          hi: "hi",
          id: "id",
          pt: "pt",
          ru: "ru",
          es: "es",
          zh: "zh",
        },
      },
      filter: (page) => {
        const { pathname } = new URL(page);
        if (pathname === "/") return false;
        if (pathname.includes("/draft")) return false;
        return true;
      },
      entryLimit: 45000,
    }),
    partytown({ config: { forward: ["dataLayer.push", "gtag"] } }),
  ],
  build: { inlineStylesheets: "auto" },
  compressHTML: true,
  vite: {
    build: {
      minify: "esbuild",
      cssMinify: "esbuild",
    },
  },
});
