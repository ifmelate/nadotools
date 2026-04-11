/**
 * Shared FFmpeg WASM instance to avoid re-downloading ~30MB on every page navigation.
 * The instance is created once and reused across component mounts.
 *
 * Core files are self-hosted under /public/wasm/ffmpeg-core{,-mt}/ (copied from
 * node_modules by scripts/sync-vendor-assets.mjs via the prebuild hook) so no
 * third-party CDN is needed at runtime.
 */

import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

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
      wasmURL: await toBlobURL(
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
