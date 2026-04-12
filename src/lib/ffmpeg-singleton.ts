/**
 * Shared FFmpeg WASM instance to avoid re-downloading ~30MB on every page navigation.
 * The instance is created once and reused across component mounts.
 *
 * Core files are self-hosted under /public/wasm/ffmpeg-core{,-mt}/ (copied from
 * node_modules by scripts/sync-vendor-assets.mjs via the prebuild hook) so no
 * third-party CDN is needed at runtime.
 *
 * The .wasm files exceed Cloudflare Pages' 25 MiB per-file limit so they are
 * split into numbered chunks at build time. fetchChunkedBlobURL() reassembles
 * them into a single Blob URL at runtime.
 */

import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

/** Fetch a chunked asset and return a Blob URL. */
async function fetchChunkedBlobURL(
  url: string,
  mimeType: string
): Promise<string> {
  const manifestRes = await fetch(`${url}.manifest.json`);
  if (!manifestRes.ok) {
    // No manifest → file is not chunked, fetch directly
    const res = await fetch(url);
    const blob = await res.blob();
    return URL.createObjectURL(new Blob([blob], { type: mimeType }));
  }

  const { chunks } = (await manifestRes.json()) as { chunks: number };
  const parts = await Promise.all(
    Array.from({ length: chunks }, (_, i) =>
      fetch(`${url}.${i}`).then((r) => r.arrayBuffer())
    )
  );

  return URL.createObjectURL(new Blob(parts, { type: mimeType }));
}

export function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance) return Promise.resolve(ffmpegInstance);
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");

    const ffmpeg = new FFmpeg();
    const useMultiThread = typeof SharedArrayBuffer !== "undefined";
    const baseURL = useMultiThread ? "/wasm/ffmpeg-core-mt" : "/wasm/ffmpeg-core";

    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await fetchChunkedBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      ...(useMultiThread && {
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      }),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })().catch((err) => {
    loadPromise = null;
    throw err;
  });

  return loadPromise;
}
