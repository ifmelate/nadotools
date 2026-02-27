"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { formatSize, triggerDownload } from "@/lib/utils";

export function ImageCompressTool() {
  const t = useTranslations("common");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">(
    "image/jpeg"
  );
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setOriginalFile(file);
    // Default to JPEG for lossy compression; use WebP if input is WebP
    if (file.type === "image/webp") {
      setFormat("image/webp");
    } else {
      setFormat("image/jpeg");
    }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      setOriginalImage(img);
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => URL.revokeObjectURL(objectUrl);
    img.src = objectUrl;
  }, []);

  const handleCompress = useCallback(() => {
    if (!originalImage) return;
    const canvas = document.createElement("canvas");
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(originalImage, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (preview) URL.revokeObjectURL(preview);
        setResult(blob);
        setPreview(URL.createObjectURL(blob));
      },
      format,
      quality
    );
  }, [originalImage, quality, format, preview]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const ext = format === "image/webp" ? "webp" : "jpg";
    triggerDownload(result, `compressed.${ext}`);
  }, [result, format]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setOriginalFile(null);
    setOriginalImage(null);
    setResult(null);
    setPreview(null);
    setQuality(0.7);
  }, [preview]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      {!originalImage && (
        <FileDropzone
          accept={["image/jpeg", "image/png", "image/webp"]}
          multiple={false}
          onFiles={handleFiles}
        />
      )}
      {originalImage && !result && (
        <div className="space-y-4">
          {/* Format selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">{t("outputFormat")}:</label>
            <select
              value={format}
              onChange={(e) =>
                setFormat(e.target.value as "image/jpeg" | "image/webp")
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>

          {/* Quality slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Quality: {Math.round(quality * 100)}%
              </label>
              <span className="text-xs text-muted-foreground">
                Original: {originalFile ? formatSize(originalFile.size) : ""}
              </span>
            </div>
            <Slider
              value={[quality * 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(vals: number[]) => setQuality(vals[0] / 100)}
            />
          </div>

          <Button onClick={handleCompress}>{t("compressImage")}</Button>
        </div>
      )}
      {preview && result && (
        <div className="flex flex-col items-center gap-4">
          {/* Size comparison */}
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">{t("before")}: </span>
              <span className="font-medium">
                {originalFile ? formatSize(originalFile.size) : ""}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">{t("after")}: </span>
              <span className="font-medium">{formatSize(result.size)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t("saved")}: </span>
              <span className={`font-medium ${originalFile && result.size < originalFile.size ? "text-green-600" : "text-muted-foreground"}`}>
                {originalFile
                  ? result.size < originalFile.size
                    ? `${Math.round(((originalFile.size - result.size) / originalFile.size) * 100)}%`
                    : t("noReduction")
                  : ""}
              </span>
            </div>
          </div>
          <img
            src={preview}
            alt="Compressed"
            className="max-h-96 rounded-lg border"
          />
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> {t("download")}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              {t("compressAnother")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
