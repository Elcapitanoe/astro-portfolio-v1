# Domi Portfolio

A fast, minimalist personal portfolio built to showcase projects with exceptional performance and a seamless authoring experience.

[View Live Site](https://hlengineer-port.domi.my.id)

## Tech Stack

- **Core**: [Astro](https://astro.build/), [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/)
- **Quality**: [TypeScript](https://www.typescriptlang.org/), [Playwright](https://playwright.dev/)
- **Optimization**: Partytown, Astro Sitemap

## Features

- **High Performance**: Static Site Generation (SSG) with minimal client-side JavaScript.
- **Global Reach (i18n)**: Native routing and support for 10 languages (EN, ID, ES, FR, ZH, AR, BN, HI, PT, RU).
- **SEO Ready**: Automated sitemaps and optimized metadata.
- **Accessible UI**: Built on top of unstyled, accessible Radix UI primitives.

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Run development server**
   ```sh
   npm run dev
   ```

3. **Build for production**
   ```sh
   npm run build
   ```

## Internationalization

Translations are managed in `/src/i18n`. Contributions to improve translations are welcome:
- Preserve existing keys and interpolation placeholders.
- Maintain consistent punctuation and spacing.
- Open a Pull Request for any corrections.

## Deployment

The project is pre-configured for platforms like Vercel, Netlify, and Cloudflare Pages. Simply link your repository or run `npm run build` and deploy the `dist/` directory.
