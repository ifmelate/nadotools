"use client";

import { useCallback } from "react";
import { FileDropzone } from "./file-dropzone";
import { FileList } from "./file-list";
import { DownloadAllButton, downloadFile } from "./download-button";
import { PrivacyBadge } from "./privacy-badge";
import { useProgress, type FileEntry } from "@/hooks/use-progress";
import type { ConversionConfig } from "@/config/types";

interface CanvasConverterToolProps {
  config: ConversionConfig;
}

export function CanvasConverterTool({ config }: CanvasConverterToolProps) {
  const { files, addFiles, updateFile, removeFile } = useProgress();

  const convertImage = useCallback(
    async (file: File, entry: FileEntry) => {
      updateFile(entry.id, { status: "processing", progress: 30 });

      const img = new Image();
      const url = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      updateFile(entry.id, { progress: 60 });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas 2D context");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))), config.to.mime, 0.92);
      });

      const outputName = file.name.replace(/\.[^.]+$/, config.to.extension);
      updateFile(entry.id, {
        status: "done",
        progress: 100,
        outputBlob: blob,
        outputName,
      });
    },
    [config, updateFile]
  );

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

      // Process sequentially to avoid unbounded concurrent canvas draws
      (async () => {
        for (let i = 0; i < entries.length; i++) {
          try {
            await convertImage(inputFiles[i], entries[i]);
          } catch (err) {
            updateFile(entries[i].id, {
              status: "error",
              error: String(err),
            });
          }
        }
      })();
    },
    [addFiles, convertImage, updateFile]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      <FileDropzone accept={[config.from.mime]} onFiles={handleFiles} />
      <FileList files={files} onRemove={removeFile} onDownload={downloadFile} />
      <div className="flex justify-center">
        <DownloadAllButton files={files} />
      </div>
    </div>
  );
}
