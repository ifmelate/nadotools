"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from "lucide-react";

interface PageImage {
  pageNum: number;
  blob: Blob;
  url: string;
}

export function PdfToImageTool() {
  const [processing, setProcessing] = useState(false);
  const [pages, setPages] = useState<PageImage[]>([]);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [scale, setScale] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const pdfjsRef = useRef<typeof import("pdfjs-dist") | null>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      pages.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPdfjs = useCallback(async () => {
    if (pdfjsRef.current) return pdfjsRef.current;
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    pdfjsRef.current = pdfjs;
    return pdfjs;
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      // Cleanup previous
      pages.forEach((p) => URL.revokeObjectURL(p.url));
      setPages([]);
      setError(null);
      setProcessing(true);
      setFileName(file.name.replace(/\.pdf$/i, ""));

      try {
        const pdfjs = await loadPdfjs();
        const data = await file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data }).promise;
        const newPages: PageImage[] = [];

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvas, viewport }).promise;

          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))),
              `image/${format}`,
              format === "jpeg" ? 0.92 : undefined
            );
          });

          const url = URL.createObjectURL(blob);
          newPages.push({ pageNum: i, blob, url });
        }

        setPages(newPages);
      } catch {
        setError("Could not render PDF pages to images.");
      } finally {
        setProcessing(false);
      }
    },
    [format, scale, loadPdfjs, pages]
  );

  const handleDownload = useCallback(
    (page: PageImage) => {
      const a = document.createElement("a");
      a.href = page.url;
      a.download = `${fileName}-page-${page.pageNum}.${format === "jpeg" ? "jpg" : "png"}`;
      a.click();
    },
    [fileName, format]
  );

  const handleDownloadAll = useCallback(async () => {
    if (pages.length < 2) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    const ext = format === "jpeg" ? "jpg" : "png";
    pages.forEach((p) => {
      zip.file(`${fileName}-page-${p.pageNum}.${ext}`, p.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}-images.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pages, format, fileName]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="space-y-1">
          <label htmlFor="img-format" className="text-sm font-medium">
            Format
          </label>
          <select
            id="img-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as "png" | "jpeg")}
            className="block rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="img-scale" className="text-sm font-medium">
            Scale
          </label>
          <select
            id="img-scale"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="block rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value={1}>1x</option>
            <option value={2}>2x (default)</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>

      <FileDropzone
        accept={["application/pdf"]}
        multiple={false}
        onFiles={handleFiles}
      />

      {processing && (
        <p className="text-center text-sm text-muted-foreground">
          Rendering pages...
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {pages.length > 0 && (
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <div
                key={page.pageNum}
                className="group relative overflow-hidden rounded-lg border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.url}
                  alt={`Page ${page.pageNum}`}
                  className="w-full"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-3 py-2 text-xs text-white">
                  <span>
                    <ImageIcon className="mr-1 inline h-3 w-3" />
                    Page {page.pageNum}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(page)}
                    className="hover:text-white/80"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {pages.length >= 2 && (
            <Button onClick={handleDownloadAll} className="gap-2">
              <Download className="h-4 w-4" /> Download all as ZIP
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
