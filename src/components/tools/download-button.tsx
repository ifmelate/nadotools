"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { triggerDownload } from "@/lib/utils";
import type { FileEntry } from "@/hooks/use-progress";

export function downloadFile(file: FileEntry) {
  if (!file.outputBlob || !file.outputName) return;
  triggerDownload(file.outputBlob, file.outputName);
}

export function DownloadAllButton({ files }: { files: FileEntry[] }) {
  const t = useTranslations("common");
  const completedFiles = files.filter((f) => f.status === "done");

  if (completedFiles.length < 2) return null;

  const handleDownloadAll = async () => {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    completedFiles.forEach((f) => {
      if (f.outputBlob && f.outputName) {
        zip.file(f.outputName, f.outputBlob);
      }
    });
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, "nadotools-converted.zip");
  };

  return (
    <Button onClick={handleDownloadAll} className="gap-2">
      <Download className="h-4 w-4" />
      {t("downloadAll")} ({completedFiles.length})
    </Button>
  );
}
