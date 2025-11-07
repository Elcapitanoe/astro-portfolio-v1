import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://domiadi.com",
  trailingSlash: "always",
  viewTransitions: true,
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
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
