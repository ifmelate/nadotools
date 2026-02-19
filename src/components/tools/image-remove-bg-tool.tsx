"use client";

import { useCallback, useState } from "react";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ImageRemoveBgTool() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setProcessing(true);
    setProgress(10);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      setProgress(30);
      const blob = await removeBackground(file, {
        model: "isnet",
        output: {
          quality: 1,
          format: "image/png",
        },
        progress: (key: string, current: number, total: number) => {
          setProgress(30 + Math.round((current / total) * 60));
        },
      });
      setProgress(100);
      setResult(blob);
      setPreview(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Background removal failed:", err);
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement("a");
    a.href = url;
    a.download = "removed-bg.png";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setResult(null);
    setPreview(null);
    setProgress(0);
  }, [preview]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      {!result && (
        <FileDropzone
          accept={["image/jpeg", "image/png", "image/webp"]}
          multiple={false}
          onFiles={handleFiles}
        />
      )}
      {processing && <Progress value={progress} className="h-2" />}
      {preview && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="Result"
            className="max-h-96 rounded-lg border"
          />
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> Download PNG
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Process Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
