"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck } from "lucide-react";
import { formatSize, triggerDownload } from "@/lib/utils";

export function ImageStripMetadataTool() {
  const t = useTranslations("common");
  const [processing, setProcessing] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setOriginalFile(file);
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      // Drawing to canvas strips all EXIF/metadata
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      // Determine output type - use PNG for lossless re-export
      const outputType =
        file.type === "image/webp" ? "image/webp" : "image/png";
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setProcessing(false);
            return;
          }
          setResult(blob);
          setPreview(URL.createObjectURL(blob));
          setProcessing(false);
        },
        outputType,
        1.0
      );

      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      setProcessing(false);
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleDownload = useCallback(() => {
    if (!result || !originalFile) return;
    const ext = originalFile.type === "image/webp" ? "webp" : "png";
    triggerDownload(result, `clean-${originalFile.name.replace(/\.[^.]+$/, "")}.${ext}`);
  }, [result, originalFile]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setOriginalFile(null);
    setResult(null);
    setPreview(null);
  }, [preview]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      {!result && !processing && (
        <FileDropzone
          accept={["image/jpeg", "image/png", "image/webp"]}
          multiple={false}
          onFiles={handleFiles}
        />
      )}
      {processing && (
        <p className="text-center text-sm text-muted-foreground">
          {t("strippingMetadata")}
        </p>
      )}
      {preview && result && originalFile && (
        <div className="flex flex-col items-center gap-4">
          {/* Success message */}
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
            <ShieldCheck className="h-5 w-5" />
            <span>
              {t("metadataRemoved")}
            </span>
          </div>

          {/* Size info */}
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">{t("original")}: </span>
              <span className="font-medium">
                {formatSize(originalFile.size)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">{t("clean")}: </span>
              <span className="font-medium">{formatSize(result.size)}</span>
            </div>
          </div>

          <img
            src={preview}
            alt="Clean image"
            className="max-h-96 rounded-lg border"
          />
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> {t("downloadCleanImage")}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              {t("processAnother")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
