# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NadoTools is a privacy-first web app for client-side file processing (convert, PDF tools, image tools). All processing happens in-browser via WebAssembly and Canvas API — no server uploads. Deployed as a fully static site to Cloudflare Pages.

## Commands

```bash
npm run dev          # Next.js dev server on :3000
npm run build        # Static export to out/ (252 pre-rendered pages)
npm run lint         # ESLint
npm test             # Unit tests (Vitest, non-watch)
npm run test:watch   # Unit tests in watch mode
npm run test:e2e     # E2E tests (Playwright, requires build first)
npm run test:all     # Unit + E2E
```

Run a single unit test: `npx vitest run tests/unit/config.test.ts`
Run a single E2E test: `npx playwright test tests/e2e/navigation.spec.ts`

## Architecture

**Static export only** — `output: "export"` in next.config.ts. No server runtime. Every page is pre-rendered at build time.

**Locale routing** — All routes are under `src/app/[locale]/`. 8 locales: en, es, de, fr, pt, zh, ja, ru. Managed by next-intl. Translation files in `src/messages/{locale}.json`.

**Config-driven tool registry** — Tools are defined declaratively in `src/config/`:
- `conversions.ts` — 100+ file conversion definitions (slug, engine, ffmpegArgs, tryRemux, full SEO for all 8 locales)
- `pdf-tools.ts` — PDF tool configs
- `image-tools.ts` — Image tool configs
- `types.ts` — `ConversionConfig`, `ToolConfig`, `FormatInfo`, `SeoData`, `Locale`

Each config entry includes `seo: Record<Locale, SeoData>` with title, description, h1, howItWorks, and FAQ for every locale.

**Processing engines** (`engine` field in configs):
- `ffmpeg` — Video/audio via FFmpeg.wasm in a Web Worker (`src/workers/ffmpeg.worker.ts`)
- `canvas` — Image conversion via Canvas API (`src/components/tools/canvas-converter-tool.tsx`)
- `pdf` — PDF manipulation via pdf-lib + pdfjs-dist
- `pandoc` — Document conversion (future)

**Key component patterns:**
- `"use client"` for interactive tool components; pages and layouts are server components
- Lazy-loaded tool components (`converter-tool-lazy.tsx`) with skeleton loading states to reduce CLS
- Custom hooks: `useProgress` (file queue state), `useFileDrop` (drag-drop), `useWorker` (worker messaging)

**Styling** — Tailwind CSS 4 with CSS variable theming in `src/app/globals.css`. shadcn/ui components in `src/components/ui/`. Dark/light mode via next-themes. Use `cn()` from `src/lib/utils.ts` for conditional classes.

**Security headers** — `public/_headers` sets CSP, COOP/COEP (required for SharedArrayBuffer/multi-threaded FFmpeg). Update CSP if adding new external resources.

**SEO** — Each tool page generates metadata with hreflang alternates via `buildAlternates()` from `src/lib/seo.ts`. JSON-LD schemas in root layout. Sitemap and robots in `src/app/`.

## Key Conventions

- Path alias: `@/*` maps to `src/*`
- Every new tool/conversion needs SEO data for all 8 locales in its config
- TypeScript strict mode — no `any` unless unavoidable
- Commits follow conventional format: `feat:`, `fix:`, `perf:`, `chore:`
- Webpack config disables fs/path/crypto fallbacks for WASM compatibility

## Testing

- Unit tests: `tests/unit/` — Vitest with jsdom, setup in `tests/setup.ts`
- E2E tests: `tests/e2e/` — Playwright against static build served on :3000
- E2E requires `npm run build` before running
