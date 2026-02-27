"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";
import { formatSize, triggerDownload } from "@/lib/utils";

export function PdfCompressTool() {
  const t = useTranslations("common");
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [result, setResult] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setResult(null);
    setError(null);
    setCompressing(true);
    setOriginalSize(file.size);
    setFileName(file.name.replace(/\.pdf$/i, ""));

    try {
      const data = await file.arrayBuffer();
      const doc = await PDFDocument.load(data);

      // Re-save the PDF. pdf-lib strips unused objects, metadata duplication, etc.
      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });

      setCompressedSize(blob.size);
      setResult(blob);
    } catch {
      setError(t("compressPdfError"));
    } finally {
      setCompressing(false);
    }
  }, [t]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    triggerDownload(result, `${fileName}-compressed.pdf`);
  }, [result, fileName]);

  const reductionPercent =
    originalSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      <FileDropzone
        accept={["application/pdf"]}
        multiple={false}
        onFiles={handleFiles}
      />

      {compressing && (
        <p className="text-center text-sm text-muted-foreground">
          {t("compressing")}
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <FileDown className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{fileName}.pdf</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{t("original")}: {formatSize(originalSize)}</span>
                <span>{t("compressed")}: {formatSize(compressedSize)}</span>
                <span className={reductionPercent > 0 ? "text-green-600 dark:text-green-400" : ""}>
                  {reductionPercent > 0
                    ? `${reductionPercent}% ${t("smaller")}`
                    : t("alreadyOptimized")}
                </span>
              </div>
            </div>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" /> {t("downloadCompressedPdf")}
          </Button>
        </div>
      )}
    </div>
  );
}
