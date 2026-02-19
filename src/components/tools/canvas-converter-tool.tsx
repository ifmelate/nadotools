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
  const { files, addFile, updateFile, removeFile } = useProgress();

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
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), config.to.mime, 0.92);
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
      inputFiles.forEach((file) => {
        const entry: FileEntry = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          status: "pending",
          progress: 0,
        };
        addFile(entry);
        convertImage(file, entry);
      });
    },
    [addFile, convertImage]
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
