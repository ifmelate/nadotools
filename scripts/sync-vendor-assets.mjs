#!/usr/bin/env node
/**
 * Copies vendor assets (pdfjs worker, ffmpeg core) from node_modules into
 * public/wasm/ so they can be served same-origin instead of via a third-party
 * CDN. Runs automatically via predev/prebuild npm hooks.
 */

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const wasmDir = join(process.cwd(), "public", "wasm");
const nodeModules = join(process.cwd(), "node_modules");

// @ffmpeg/core uses restrictive package exports that block require.resolve,
// so we read directly from node_modules. Safe inside this project's build.
const assets = [
  ["pdfjs-dist/build/pdf.worker.min.mjs", "pdf.worker.min.mjs"],
  ["@ffmpeg/core/dist/umd/ffmpeg-core.js", "ffmpeg-core/ffmpeg-core.js"],
  ["@ffmpeg/core/dist/umd/ffmpeg-core.wasm", "ffmpeg-core/ffmpeg-core.wasm"],
  ["@ffmpeg/core-mt/dist/umd/ffmpeg-core.js", "ffmpeg-core-mt/ffmpeg-core.js"],
  ["@ffmpeg/core-mt/dist/umd/ffmpeg-core.wasm", "ffmpeg-core-mt/ffmpeg-core.wasm"],
  ["@ffmpeg/core-mt/dist/umd/ffmpeg-core.worker.js", "ffmpeg-core-mt/ffmpeg-core.worker.js"],
].map(([rel, relOut]) => [join(nodeModules, rel), relOut]);

for (const [src, relOut] of assets) {
  const dest = join(wasmDir, relOut);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`  ${relOut}`);
}
