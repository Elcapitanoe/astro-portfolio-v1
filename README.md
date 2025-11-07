# Personal Portfolio (Astro + Tailwind CSS)

A clean, fast, and minimal personal portfolio built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). The goal is straightforward: showcase projects and profile info with solid performance and a simple authoring experience.

## Tech Stack
- Astro (content-first, file-based routing)
- Tailwind CSS (utility-first styling)
- Optional: TypeScript support if you prefer strict typing

## Internationalization (i18n)

All translation resources live in `/src/i18n`.

If you notice any errors, awkward phrasing, or missing strings, I would appreciate your help:
- Contact me via the email listed on my GitHub profile, or
- Fork this repo and open a Pull Request, or
- Open an Issue on the repository’s issue page

### Translation guidelines
- Keep keys stable and meaningful. Avoid editing existing keys unless necessary.
- Preserve interpolation placeholders
- Maintain consistent punctuation and capitalization across languages.
- Keep line breaks and spacing where they carry meaning.

## Deployment

This site builds to static assets by default and works well on most hosts. Common options:
- **Vercel**: zero-config for Astro
- **Cloudflare**: deploy via Pages or Workers (depending on your setup)

Run `npm run build`, then follow your platform’s upload/deploy instructions.

## Contributing

Issues and PRs are welcome. For translation fixes, see the i18n section above. For code changes:
1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Open a Pull Request with a concise description and rationale
