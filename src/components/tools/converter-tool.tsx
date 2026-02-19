"use client";

import { useCallback, useRef, useEffect } from "react";
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
  const workerRef = useRef<Worker | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (config.engine !== "ffmpeg") return;

    const worker = new Worker(
      new URL("@/workers/ffmpeg.worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (e) => {
      const msg = e.data;
      switch (msg.type) {
        case "ready":
          isReadyRef.current = true;
          break;
        case "progress":
          updateFile(msg.fileId, {
            progress: msg.progress,
            status: "processing",
          });
          break;
        case "done":
          updateFile(msg.fileId, {
            status: "done",
            progress: 100,
            outputBlob: new Blob([msg.output]),
            outputName: msg.outputName,
          });
          break;
        case "error":
          updateFile(msg.fileId, { status: "error", error: msg.error });
          break;
      }
    };

    worker.postMessage({ type: "init" });
    workerRef.current = worker;

    return () => {
      worker.terminate();
    };
  }, [config.engine, updateFile]);

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
        reader.onload = () => {
          workerRef.current?.postMessage({
            type: "convert",
            fileId: entry.id,
            inputData: reader.result,
            inputName: file.name,
            outputFormat: config.to.format,
            outputExt: config.to.extension,
          });
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [addFiles, config]
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
