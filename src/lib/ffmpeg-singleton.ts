/**
 * Shared FFmpeg WASM instance to avoid re-downloading ~30MB on every page navigation.
 * The instance is created once and reused across component mounts.
 *
 * TODO: Self-host the WASM files in /public/wasm/ to eliminate CDN supply-chain risk.
 * The _headers file already has cache rules for /wasm/*.
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
    const pkg = useMultiThread ? "core-mt" : "core";
    const baseURL = `https://unpkg.com/@ffmpeg/${pkg}@0.12.10/dist/umd`;

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
