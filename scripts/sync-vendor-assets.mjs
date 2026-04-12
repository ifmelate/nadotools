#!/usr/bin/env node
/**
 * Copies vendor assets (pdfjs worker, ffmpeg core) from node_modules into
 * public/wasm/ so they can be served same-origin instead of via a third-party
 * CDN. Runs automatically via predev/prebuild npm hooks.
 *
 * .wasm files > 24 MiB are split into 20 MiB chunks to stay under Cloudflare
 * Pages' 25 MiB per-file limit. A .manifest.json is written alongside each
 * split file so the client knows how to reassemble.
 */

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CHUNK_SIZE = 20 * 1024 * 1024; // 20 MiB
const SPLIT_THRESHOLD = 24 * 1024 * 1024; // 24 MiB

const wasmDir = join(process.cwd(), "public", "wasm");
const nodeModules = join(process.cwd(), "node_modules");

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

  const buf = readFileSync(src);

  if (buf.length > SPLIT_THRESHOLD) {
    const numChunks = Math.ceil(buf.length / CHUNK_SIZE);
    for (let i = 0; i < numChunks; i++) {
      const chunkPath = `${dest}.${i}`;
      const start = i * CHUNK_SIZE;
      writeFileSync(chunkPath, buf.subarray(start, start + CHUNK_SIZE));
    }
    writeFileSync(
      `${dest}.manifest.json`,
      JSON.stringify({ chunks: numChunks, totalSize: buf.length })
    );
    console.log(`  ${relOut} -> ${numChunks} chunks (${(buf.length / 1024 / 1024).toFixed(1)} MiB)`);
  } else {
    copyFileSync(src, dest);
    console.log(`  ${relOut}`);
  }
}
