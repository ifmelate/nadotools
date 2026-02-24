# Contributing to NadoTools

Thanks for your interest in contributing! NadoTools is a privacy-first file processing suite where everything runs in the browser.

## Getting started

```bash
git clone https://github.com/ifmelate/nadotools.git
cd nadotools
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project structure

```
src/
  app/          # Next.js App Router pages
  components/   # React components (ui, tools, layout, seo)
  config/       # Tool registries (conversions, pdf-tools, image-tools)
  hooks/        # Custom React hooks
  i18n/         # Internationalization setup
  lib/          # Utilities
  messages/     # Translation files (8 locales)
  workers/      # Web Worker implementations
```

## Key principles

- **Privacy first** — All file processing happens client-side. Never send user files to a server.
- **Static export** — The app builds to static HTML/JS/CSS (`next build` outputs to `out/`). No server runtime.
- **i18n from day one** — Every tool has SEO metadata in all 8 locales (EN, ES, DE, FR, PT, ZH, JA, RU). If you add a tool, add all locale strings.

## Running tests

```bash
npm test              # unit tests (Vitest)
npm run test:e2e      # e2e tests (Playwright, requires build first)
npm run test:all      # both
npm run lint          # ESLint
```

## Building

```bash
npm run build         # static export to out/
```

## Adding a new tool

1. Add the tool definition in the appropriate config file (`src/config/conversions.ts`, `pdf-tools.ts`, or `image-tools.ts`)
2. Include SEO metadata for all 8 locales
3. Add or update the processing logic in `src/components/tools/`
4. Add translation keys to all locale files in `src/messages/`
5. Run `npm run build` to verify all pages generate correctly

## Pull request process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npm run lint && npm test && npm run build`
4. Open a PR with a clear description of what changed and why
5. Fill out the PR template checklist

## Code style

- TypeScript strict mode
- Tailwind CSS for styling (shadcn/ui components)
- ESLint with Next.js recommended rules
- Keep components focused and small

## License

By contributing, you agree that your contributions will be licensed under [AGPL-3.0](LICENSE).
