# NadoTools

Free online file tools. Convert files, edit PDFs, process images — all in your browser. No upload, no sign-up, no cookies. Privacy-first analytics only.

## Tools

**File Converter** — MP4, MKV, MOV, WAV, FLAC, HEIC, WebP, PNG, JPG, SVG, PDF and more

**PDF Toolkit** — Merge, Split, Compress, PDF to Image, Extract Text

**Image Processing** — Remove Background (AI), Resize, Compress, Strip Metadata

## How it works

Everything runs locally in your browser using WebAssembly (FFmpeg, pdf-lib, pdfjs) and Canvas API. Your files never leave your device.

## Tech stack

- Next.js 16 (static export, 252 pre-rendered pages)
- TypeScript, Tailwind CSS, shadcn/ui
- FFmpeg.wasm for video/audio conversion
- pdf-lib + pdfjs-dist for PDF tools
- @imgly/background-removal for AI background removal
- 8 languages: EN, ES, DE, FR, PT, ZH, JA, RU
- Deployed to Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test              # unit tests (Vitest)
npm run test:e2e      # e2e tests (Playwright)
npm run test:all      # both
```

## Build

```bash
npm run build         # static export to out/
```

## License

[AGPL-3.0](LICENSE)
