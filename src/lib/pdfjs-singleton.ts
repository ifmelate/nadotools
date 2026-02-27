/**
 * Shared pdfjs-dist instance to avoid re-setting the worker on every component mount.
 * Mirrors the ffmpeg-singleton pattern.
 *
 * TODO: Self-host the worker file in /public/wasm/ to eliminate CDN supply-chain risk.
 */

import type * as PdfjsLib from "pdfjs-dist";

let pdfjsInstance: typeof PdfjsLib | null = null;
let loadPromise: Promise<typeof PdfjsLib> | null = null;

export function getPdfjs(): Promise<typeof PdfjsLib> {
  if (pdfjsInstance) return Promise.resolve(pdfjsInstance);
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    pdfjsInstance = pdfjs;
    return pdfjs;
  })().catch((err) => {
    loadPromise = null;
    throw err;
  });

  return loadPromise;
}
