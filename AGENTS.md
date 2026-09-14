# AGENTS.md

## Project Overview

Personal portfolio site for Mohamed Ismail (Flutter Developer). Next.js 16 App Router + React 19 + TypeScript.

## Quick Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint only (no test script exists)
npx tsc --noEmit   # Typecheck (no npm script for this)
```

No test suite, no CI/CD, no formatter config.

## Architecture

- **App Router** — all routes under `src/app/[locale]/`
- **i18n** — `next-intl` with only `en` locale active. `ar.json` exists but is unused. Middleware is in `src/proxy.ts` (not `middleware.ts`)
- **Path alias** — `@/*` maps to `./src/*`
- **Theming** — extensive CSS custom properties in `globals.css` (paper/warm theme). Tailwind v4 syntax (`@import "tailwindcss"`, not v3 `@tailwind base`)
- **Data** — `src/data/projects-map.ts` defines all 4 portfolio projects (Flutter/Dart apps)
- **GitHub stats** — fetched from GitHub API with 1hr ISR + on-demand revalidation via `POST /api/revalidate?secret=...`
- **Contact form** — submits directly to Web3Forms from client. `src/app/api/contact/route.ts` is disabled (returns 410)

## Key Files

| File | Purpose |
|------|---------|
| `src/components/HomeAnimated.tsx` | Main page composition — all section components imported here |
| `src/components/[section]/[Section].tsx` | Each portfolio section (hero, about, skills, projects, github, education, footer, contact) |
| `src/data/projects-map.ts` | All project data — edit this to add/update projects |
| `src/messages/en.json` | All UI text — edit this for content changes |
| `src/proxy.ts` | i18n middleware (not at root `middleware.ts`) |
| `src/lib/theme.ts` | CSS variable wrappers for gradients, shadows, borders, text, surfaces |
| `stitch_screen.html` | Static HTML reference from Stitch design tool — NOT used by the app |

## Conventions

- `"use client"` required for all components using hooks or browser APIs
- Sections use `framer-motion` for animations (`motion.div`, `whileInView`)
- Tailwind classes use `stone` palette for borders/text, CSS variables for themed colors
- Components import `useTranslations` from `next-intl` for i18n text
- Certificate/education data is defined as const arrays at the top of `EducationSection.tsx`
- SVG icons for education certs are in `public/icons/`
- Certificate images (PNG) are in `public/cert[1-4].png`

## Gotchas

- Tailwind v4 — do not use `@tailwind base/components/utilities` directives. Use `@import "tailwindcss"`
- No `middleware.ts` at root — i18n middleware lives in `src/proxy.ts`
- `reactStrictMode: false` in next.config.ts
- `ar.json` translations exist but Arabic locale is not configured in routing
- Static HTML files (`stitch_screen.html`, `stitch_screen_new.html`) are design artifacts, not part of the app
