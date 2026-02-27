"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { CropOverlay, CropRect } from "./crop-overlay";
import { Button } from "@/components/ui/button";
import { Download, ImagePlus, Lock, RotateCcw, Unlock } from "lucide-react";
import { triggerDownload } from "@/lib/utils";

interface Preset {
  label: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { label: "Instagram Post (1080x1080)", width: 1080, height: 1080 },
  { label: "YouTube Thumbnail (1280x720)", width: 1280, height: 720 },
  { label: "Twitter Header (1500x500)", width: 1500, height: 500 },
];

export function ImageResizeTool() {
  const t = useTranslations("common");
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [originalName, setOriginalName] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [cropRect, setCropRect] = useState<CropRect>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });
  const [aspectLocked, setAspectLocked] = useState(true);
  const [aspectRatioVal, setAspectRatioVal] = useState(1);
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track whether crop was just changed by input fields to avoid circular updates
  const inputDriven = useRef(false);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setOriginalName(file.name.replace(/\.[^.]+$/, ""));
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      setOriginalImage(img);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setCropRect({
        x: 0,
        y: 0,
        w: img.naturalWidth,
        h: img.naturalHeight,
      });
      setAspectRatioVal(img.naturalWidth / img.naturalHeight);
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => URL.revokeObjectURL(objectUrl);
    img.src = objectUrl;
  }, []);

  // When crop rect changes from dragging, sync width/height
  const handleCropChange = useCallback((rect: CropRect) => {
    if (inputDriven.current) return;
    setCropRect(rect);
    setWidth(Math.round(rect.w));
    setHeight(Math.round(rect.h));
  }, []);

  const handleWidthChange = useCallback(
    (val: string) => {
      const w = Math.max(1, parseInt(val) || 1);
      setWidth(w);
      let h: number;
      if (aspectLocked) {
        h = Math.round(w / aspectRatioVal);
        setHeight(h);
      } else {
        h = height;
      }
      // Update crop rect size, centered on current center
      if (originalImage) {
        inputDriven.current = true;
        const newW = Math.min(w, originalImage.naturalWidth);
        const newH = Math.min(
          aspectLocked ? h : height,
          originalImage.naturalHeight
        );
        const cx = cropRect.x + cropRect.w / 2;
        const cy = cropRect.y + cropRect.h / 2;
        const newX = Math.max(
          0,
          Math.min(cx - newW / 2, originalImage.naturalWidth - newW)
        );
        const newY = Math.max(
          0,
          Math.min(cy - newH / 2, originalImage.naturalHeight - newH)
        );
        setCropRect({ x: newX, y: newY, w: newW, h: newH });
        requestAnimationFrame(() => {
          inputDriven.current = false;
        });
      }
    },
    [aspectLocked, aspectRatioVal, height, originalImage, cropRect]
  );

  const handleHeightChange = useCallback(
    (val: string) => {
      const h = Math.max(1, parseInt(val) || 1);
      setHeight(h);
      let w: number;
      if (aspectLocked) {
        w = Math.round(h * aspectRatioVal);
        setWidth(w);
      } else {
        w = width;
      }
      // Update crop rect size, centered on current center
      if (originalImage) {
        inputDriven.current = true;
        const newW = Math.min(
          aspectLocked ? w : width,
          originalImage.naturalWidth
        );
        const newH = Math.min(h, originalImage.naturalHeight);
        const cx = cropRect.x + cropRect.w / 2;
        const cy = cropRect.y + cropRect.h / 2;
        const newX = Math.max(
          0,
          Math.min(cx - newW / 2, originalImage.naturalWidth - newW)
        );
        const newY = Math.max(
          0,
          Math.min(cy - newH / 2, originalImage.naturalHeight - newH)
        );
        setCropRect({ x: newX, y: newY, w: newW, h: newH });
        requestAnimationFrame(() => {
          inputDriven.current = false;
        });
      }
    },
    [aspectLocked, aspectRatioVal, width, originalImage, cropRect]
  );

  const applyPreset = useCallback(
    (preset: Preset) => {
      setWidth(preset.width);
      setHeight(preset.height);
      setAspectLocked(false);
      // Fit crop rect with preset aspect ratio, centered, maximum fit within image
      if (originalImage) {
        const presetAspect = preset.width / preset.height;
        const imgW = originalImage.naturalWidth;
        const imgH = originalImage.naturalHeight;
        let cropW: number, cropH: number;
        if (presetAspect > imgW / imgH) {
          cropW = imgW;
          cropH = imgW / presetAspect;
        } else {
          cropH = imgH;
          cropW = imgH * presetAspect;
        }
        setCropRect({
          x: (imgW - cropW) / 2,
          y: (imgH - cropH) / 2,
          w: cropW,
          h: cropH,
        });
      }
    },
    [originalImage]
  );

  const resetCrop = useCallback(() => {
    if (!originalImage) return;
    const w = originalImage.naturalWidth;
    const h = originalImage.naturalHeight;
    setCropRect({ x: 0, y: 0, w, h });
    setWidth(w);
    setHeight(h);
    setAspectLocked(true);
    setAspectRatioVal(w / h);
  }, [originalImage]);

  const handleResize = useCallback(() => {
    if (!originalImage) return;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Crop from source rect, draw to full canvas (resize)
    ctx.drawImage(
      originalImage,
      cropRect.x,
      cropRect.y,
      cropRect.w,
      cropRect.h,
      0,
      0,
      width,
      height
    );
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (preview) URL.revokeObjectURL(preview);
        setResult(blob);
        setPreview(URL.createObjectURL(blob));
      },
      "image/png",
      1.0
    );
  }, [originalImage, width, height, cropRect, preview]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    triggerDownload(result, `${originalName || "resized"}-${width}x${height}.png`);
  }, [result, originalName, width, height]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setOriginalImage(null);
    setOriginalName("");
    setWidth(0);
    setHeight(0);
    setCropRect({ x: 0, y: 0, w: 0, h: 0 });
    setResult(null);
    setPreview(null);
    setAspectLocked(true);
  }, [preview]);

  // Update aspect ratio when lock is toggled on
  const handleToggleAspectLock = useCallback(() => {
    setAspectLocked((prev) => {
      if (!prev && width > 0 && height > 0) {
        setAspectRatioVal(width / height);
      }
      return !prev;
    });
  }, [width, height]);

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
          {/* Image preview with crop overlay */}
          <div className="relative overflow-hidden rounded-lg border bg-muted/30">
            <div className="relative mx-auto" style={{ maxHeight: 400 }}>
              <img
                src={originalImage.src}
                alt="Original"
                className="mx-auto block max-h-[400px] select-none object-contain"
                draggable={false}
              />
              <CropOverlay
                imageWidth={originalImage.naturalWidth}
                imageHeight={originalImage.naturalHeight}
                cropRect={cropRect}
                onCropChange={handleCropChange}
                aspectLocked={aspectLocked}
                aspectRatio={aspectRatioVal}
              />
            </div>
            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              {originalImage.naturalWidth} x {originalImage.naturalHeight}
            </div>
            <div className="absolute bottom-2 right-2 flex gap-1.5">
              <button
                onClick={resetCrop}
                className="flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 text-xs text-white transition-colors hover:bg-black/80"
                title="Reset crop to full image"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t("resetCrop")}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 text-xs text-white transition-colors hover:bg-black/80"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                {t("changeImage")}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files?.length) handleFiles(Array.from(files));
                e.target.value = "";
              }}
            />
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button
                key={p.label}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </Button>
            ))}
          </div>

          {/* Dimension inputs */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">{t("width")}</label>
              <input
                type="number"
                min={1}
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="h-9 w-28 rounded-md border bg-background px-3 text-sm"
              />
            </div>
            <button
              onClick={handleToggleAspectLock}
              className="mt-5 rounded p-1 text-muted-foreground hover:text-foreground"
              title={aspectLocked ? t("unlockAspect") : t("lockAspect")}
            >
              {aspectLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </button>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">{t("height")}</label>
              <input
                type="number"
                min={1}
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="h-9 w-28 rounded-md border bg-background px-3 text-sm"
              />
            </div>
            <span className="mt-5 text-xs text-muted-foreground">px</span>
          </div>

          <Button onClick={handleResize}>{t("resizeCrop")}</Button>
        </div>
      )}
      {preview && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("resizedTo", { width, height })}
          </p>
          <img
            src={preview}
            alt="Resized"
            className="max-h-96 rounded-lg border"
          />
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> {t("download")}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              {t("resizeAnother")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
