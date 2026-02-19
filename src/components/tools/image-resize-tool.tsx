"use client";

import { useCallback, useRef, useState } from "react";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, Lock, Unlock } from "lucide-react";

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
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [originalName, setOriginalName] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspectLocked, setAspectLocked] = useState(true);
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const aspectRatio = useRef(1);

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setOriginalName(file.name.replace(/\.[^.]+$/, ""));
    const img = new Image();
    img.onload = () => {
      setOriginalImage(img);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      aspectRatio.current = img.naturalWidth / img.naturalHeight;
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleWidthChange = useCallback(
    (val: string) => {
      const w = Math.max(1, parseInt(val) || 1);
      setWidth(w);
      if (aspectLocked) {
        setHeight(Math.round(w / aspectRatio.current));
      }
    },
    [aspectLocked]
  );

  const handleHeightChange = useCallback(
    (val: string) => {
      const h = Math.max(1, parseInt(val) || 1);
      setHeight(h);
      if (aspectLocked) {
        setWidth(Math.round(h * aspectRatio.current));
      }
    },
    [aspectLocked]
  );

  const applyPreset = useCallback((preset: Preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setAspectLocked(false);
  }, []);

  const handleResize = useCallback(() => {
    if (!originalImage) return;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(originalImage, 0, 0, width, height);
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
  }, [originalImage, width, height, preview]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${originalName || "resized"}-${width}x${height}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, originalName, width, height]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setOriginalImage(null);
    setOriginalName("");
    setWidth(0);
    setHeight(0);
    setResult(null);
    setPreview(null);
    setAspectLocked(true);
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
              <label className="text-xs text-muted-foreground">Width</label>
              <input
                type="number"
                min={1}
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="h-9 w-28 rounded-md border bg-background px-3 text-sm"
              />
            </div>
            <button
              onClick={() => setAspectLocked((v) => !v)}
              className="mt-5 rounded p-1 text-muted-foreground hover:text-foreground"
              title={aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
            >
              {aspectLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </button>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Height</label>
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

          <Button onClick={handleResize}>Resize Image</Button>
        </div>
      )}
      {preview && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Resized to {width} x {height}
          </p>
          <img
            src={preview}
            alt="Resized"
            className="max-h-96 rounded-lg border"
          />
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Resize Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
