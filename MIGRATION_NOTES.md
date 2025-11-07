# Astro + React Islands Migration Notes

This project now runs on **Astro + Tailwind CSS + `@astrojs/react` + Radix UI + shadcn/ui + Motion One** with Astro view transitions enabled. The key ideas to keep the experience fast and accessible are documented below.

## Dependencies & Tooling
- React support is wired through `@astrojs/react` in `astro.config.mjs`.
- UI primitives are copied into `src/components/ui` (own-the-code) for buttons, inputs, cards, dialog, dropdown menu, tabs, toast, tooltip, and popover.
- Motion One helpers live in `src/lib/motion.ts`.
- `tailwindcss-animate`, `class-variance-authority`, `tailwind-merge`, and `lucide-react` are available for styling utilities and icons.
- Playwright has been added for smoke tests under `tests/` (see below).

Run `npm install` after pulling these changes, then use:

```bash
npm run dev      # local development
npm run build    # type-check + production build
npx playwright test  # run smoke tests
```

## React Islands
- React components are co-located under `src/components/react`. They are imported from `.astro` files with explicit hydration directives (`client:idle`/`client:visible`).
- Only interactive widgets use React:
  - `MobileNavMenu` (Radix dialog) handles navigation on small screens.
  - `SkillsTabs` (Radix tabs with Motion One animation) for mobile view.
  - `ContactActions` (Radix popover/toast/tooltip) replacing inline scripts.
- Non-interactive sections remain pure Astro/HTML to keep almost-zero client JS.

### Adding a New Island
1. Build the React component inside `src/components/react/`.
2. Wrap Radix/shadcn primitives from `src/components/ui` rather than importing directly from npm.
3. Import the component inside an `.astro` file and hydrate it with the narrowest directive (`client:visible` preferred, then `client:idle`).
4. Gate animations with the helpers from `src/lib/motion.ts` so that `prefers-reduced-motion` is honoured.

## Motion & Transitions
- View transitions are enabled through `experimental.viewTransitions` in `astro.config.mjs`. The global header (`<header transition:persist="site-nav">`) stays mounted across page navigations.
- Motion One helpers animate dialogs, dropdowns, tabs, and toasts. They automatically skip animations when `prefers-reduced-motion` is set.
- Prefer opacity/transform animations to avoid layout jank; see `src/lib/motion.ts` for reusable fade/scale helpers.

## Styling
- Tailwind now exposes shadcn-style design tokens (`--background`, `--primary`, etc.) via `src/styles/global.css`.
- Use the `cn` helper from `src/lib/utils.ts` to merge Tailwind classes safely.
- Additional Tailwind plugins: `tailwindcss-animate` for keyframe utilities.

## Testing & Quality
- A Playwright smoke suite lives under `tests/` and covers:
  - Mobile navigation open/close & keyboard traversal.
  - Skills tabs switching.
  - Contact actions toast/clipboard behaviour.
- Target Lighthouse baselines: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Keep React islands as small as possible to stay within the thresholds.

## Performance Tips
- Prefer `client:visible` hydration and avoid bundling unused shadcn components. Only import the primitives that are used in each island.
- When adding new animations, lean on `motion` helpers and guard with `useReducedMotion`.
- If a new feature does not need interactivity, keep it in Astro/HTML.

## Accessibility Checklist
- Use Radix primitives for focus management (dialog, menu, tabs, tooltip, toast) and provide accessible labels.
- Ensure persistent header continues to expose skip links/landmarks if added later.
- When copying new shadcn components, audit them for keyboard behaviour and adapt to the dark theme variables defined in Tailwind.

