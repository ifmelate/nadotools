"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { FileEntry } from "@/hooks/use-progress";

export function downloadFile(file: FileEntry) {
  if (!file.outputBlob || !file.outputName) return;
  const url = URL.createObjectURL(file.outputBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.outputName;
  a.click();
  URL.revokeObjectURL(url);
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nadotools-converted.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownloadAll} className="gap-2">
      <Download className="h-4 w-4" />
      {t("downloadAll")} ({completedFiles.length})
    </Button>
  );
}
