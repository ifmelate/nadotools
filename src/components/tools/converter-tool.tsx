"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "./file-dropzone";
import { FileList } from "./file-list";
import { DownloadAllButton, downloadFile } from "./download-button";
import { PrivacyBadge } from "./privacy-badge";
import { useProgress, type FileEntry } from "@/hooks/use-progress";
import type { ConversionConfig } from "@/config/types";
import { CanvasConverterTool } from "./canvas-converter-tool";
import { getFFmpeg } from "@/lib/ffmpeg-singleton";

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
  const t = useTranslations("common");
  const { files, addFiles, updateFile, removeFile } = useProgress();
  const ffmpegRef = useRef<import("@ffmpeg/ffmpeg").FFmpeg | null>(null);
  const cancelledRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (config.engine !== "ffmpeg") return;

    cancelledRef.current = false;

    getFFmpeg()
      .then((ffmpeg) => {
        if (cancelledRef.current) return;
        ffmpegRef.current = ffmpeg;
        setIsReady(true);
      })
      .catch((err) => {
        if (!cancelledRef.current) {
          setLoadError(String(err));
        }
      });

    return () => {
      cancelledRef.current = true;
      // Don't terminate — the singleton is shared across navigations
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

      // Process files sequentially — FFmpeg WASM is single-threaded
      (async () => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const file = inputFiles[i];

          if (cancelledRef.current) return;

          const ffmpeg = ffmpegRef.current;
          if (!ffmpeg) {
            updateFile(entry.id, {
              status: "error",
              error: "Converter engine not loaded",
            });
            continue;
          }

          const outputName = file.name.replace(
            /\.[^.]+$/,
            config.to.extension
          );
          const onProgress = ({ progress }: { progress: number }) => {
            updateFile(entry.id, {
              progress: Math.round(progress * 100),
            });
          };

          try {
            updateFile(entry.id, { status: "processing", progress: 0 });
            ffmpeg.on("progress", onProgress);

            const data = new Uint8Array(await file.arrayBuffer());
            await ffmpeg.writeFile(file.name, data);

            let success = false;

            // Try remux first (nearly instant — just copies streams)
            if (config.tryRemux) {
              const exitCode = await ffmpeg.exec([
                "-i", file.name, "-c", "copy",
                "-movflags", "+faststart", outputName,
              ]);
              if (exitCode === 0) {
                success = true;
              } else {
                // Remux failed (incompatible codecs), fall through to re-encode
                try { await ffmpeg.deleteFile(outputName); } catch { /* ignore */ }
              }
            }

            // Re-encode if remux wasn't attempted or failed
            if (!success) {
              const extraArgs = config.ffmpegArgs ?? ["-preset", "ultrafast"];
              const exitCode = await ffmpeg.exec(["-i", file.name, ...extraArgs, outputName]);
              if (exitCode !== 0) {
                throw new Error(`FFmpeg exited with code ${exitCode}`);
              }
            }

            const output = (await ffmpeg.readFile(outputName)) as Uint8Array;

            if (cancelledRef.current) return;

            updateFile(entry.id, {
              status: "done",
              progress: 100,
              outputBlob: new Blob([output.slice()]),
              outputName,
            });
          } catch (err) {
            if (!cancelledRef.current) {
              updateFile(entry.id, {
                status: "error",
                error: String(err),
              });
            }
          } finally {
            ffmpeg.off("progress", onProgress);
            try { await ffmpeg.deleteFile(file.name); } catch { /* ignore */ }
            try { await ffmpeg.deleteFile(outputName); } catch { /* ignore */ }
          }
        }
      })();
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
            {t("engineLoadFailed")}
          </p>
          <p className="text-xs text-muted-foreground break-all">{loadError}</p>
        </div>
      )}
      {!isReady && !loadError && (
        <p className="text-sm text-muted-foreground text-center">
          {t("loadingEngine")}
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
