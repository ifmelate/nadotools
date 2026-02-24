"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { FileDropzone } from "./file-dropzone";
import { FileList } from "./file-list";
import { DownloadAllButton, downloadFile } from "./download-button";
import { PrivacyBadge } from "./privacy-badge";
import { useProgress, type FileEntry } from "@/hooks/use-progress";
import type { ConversionConfig } from "@/config/types";
import { CanvasConverterTool } from "./canvas-converter-tool";

interface ConverterToolProps {
  config: ConversionConfig;
}

export function ConverterTool({ config }: ConverterToolProps) {
  if (config.engine === "canvas") {
    return <CanvasConverterTool config={config} />;
  }

  return <FfmpegConverterTool config={config} />;
}

function FfmpegConverterTool({ config }: ConverterToolProps) {
  const { files, addFiles, updateFile, removeFile } = useProgress();
  const ffmpegRef = useRef<import("@ffmpeg/ffmpeg").FFmpeg | null>(null);
  const loadingRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (config.engine !== "ffmpeg") return;

    let cancelled = false;

    async function init() {
      if (loadingRef.current || ffmpegRef.current) return;
      loadingRef.current = true;

      try {
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");

        if (cancelled) return;

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

        if (cancelled) {
          ffmpeg.terminate();
          return;
        }

        ffmpegRef.current = ffmpeg;
        setIsReady(true);
      } catch (err) {
        if (!cancelled) {
          setLoadError(String(err));
        }
      } finally {
        loadingRef.current = false;
      }
    }

    init();

    return () => {
      cancelled = true;
      ffmpegRef.current?.terminate();
      ffmpegRef.current = null;
    };
  }, [config.engine]);

  const handleFiles = useCallback(
    (inputFiles: File[]) => {
      const entries: FileEntry[] = inputFiles.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        status: "pending" as const,
        progress: 0,
      }));

      addFiles(entries);

      entries.forEach((entry, i) => {
        const file = inputFiles[i];
        const reader = new FileReader();
        reader.onload = async () => {
          const ffmpeg = ffmpegRef.current;
          if (!ffmpeg) {
            updateFile(entry.id, {
              status: "error",
              error: "Converter engine not loaded",
            });
            return;
          }

          try {
            updateFile(entry.id, { status: "processing", progress: 0 });

            const onProgress = ({ progress }: { progress: number }) => {
              updateFile(entry.id, {
                progress: Math.round(progress * 100),
              });
            };
            ffmpeg.on("progress", onProgress);

            const outputName = file.name.replace(
              /\.[^.]+$/,
              config.to.extension
            );
            await ffmpeg.writeFile(
              file.name,
              new Uint8Array(reader.result as ArrayBuffer)
            );

            let success = false;

            // Try remux first (nearly instant — just copies streams)
            if (config.tryRemux) {
              try {
                await ffmpeg.exec([
                  "-i", file.name, "-c", "copy",
                  "-movflags", "+faststart", outputName,
                ]);
                success = true;
              } catch {
                // Remux failed (incompatible codecs), fall through to re-encode
                try { await ffmpeg.deleteFile(outputName); } catch { /* ignore */ }
              }
            }

            // Re-encode if remux wasn't attempted or failed
            if (!success) {
              const extraArgs = config.ffmpegArgs ?? ["-preset", "ultrafast"];
              await ffmpeg.exec(["-i", file.name, ...extraArgs, outputName]);
            }

            const data = (await ffmpeg.readFile(outputName)) as Uint8Array;

            await ffmpeg.deleteFile(file.name);
            await ffmpeg.deleteFile(outputName);
            ffmpeg.off("progress", onProgress);

            updateFile(entry.id, {
              status: "done",
              progress: 100,
              outputBlob: new Blob([new Uint8Array(data) as BlobPart]),
              outputName,
            });
          } catch (err) {
            updateFile(entry.id, {
              status: "error",
              error: String(err),
            });
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [addFiles, config, updateFile]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      {loadError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3 space-y-1">
          <p className="text-sm font-medium text-destructive">
            Failed to load converter engine
          </p>
          <p className="text-xs text-muted-foreground break-all">{loadError}</p>
        </div>
      )}
      {!isReady && !loadError && (
        <p className="text-sm text-muted-foreground text-center">
          Loading converter engine…
        </p>
      )}
      <FileDropzone accept={[config.from.mime]} onFiles={handleFiles} />
      <FileList files={files} onRemove={removeFile} onDownload={downloadFile} />
      <div className="flex justify-center">
        <DownloadAllButton files={files} />
      </div>
    </div>
  );
}
