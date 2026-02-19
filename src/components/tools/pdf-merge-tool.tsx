"use client";

import { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, GripVertical, X } from "lucide-react";

interface PdfFile {
  id: string;
  name: string;
  data: ArrayBuffer;
}

export function PdfMergeTool() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    setResult(null);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfFiles((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: file.name,
            data: reader.result as ArrayBuffer,
          },
        ]);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handleMerge = useCallback(async () => {
    if (pdfFiles.length < 2) return;
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const pdfFile of pdfFiles) {
        const doc = await PDFDocument.load(pdfFile.data);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      setResult(new Blob([bytes as BlobPart], { type: "application/pdf" }));
    } finally {
      setMerging(false);
    }
  }, [pdfFiles]);

  const handleRemove = useCallback((id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
    setResult(null);
  }, []);

  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return;
    setPdfFiles((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
    setResult(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <PrivacyBadge />
      </div>
      <FileDropzone accept={["application/pdf"]} onFiles={handleFiles} />
      {pdfFiles.length > 0 && (
        <div className="space-y-2">
          {pdfFiles.map((f, i) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <button
                type="button"
                className="cursor-grab text-muted-foreground hover:text-foreground"
                onClick={() => handleMoveUp(i)}
                aria-label="Move up"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <span className="flex-1 truncate text-sm">{f.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRemove(f.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={handleMerge}
            disabled={pdfFiles.length < 2 || merging}
          >
            {merging ? "Merging..." : `Merge ${pdfFiles.length} PDFs`}
          </Button>
        </div>
      )}
      {result && (
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" /> Download merged PDF
        </Button>
      )}
    </div>
  );
}
