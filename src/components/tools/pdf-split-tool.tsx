"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { triggerDownload } from "@/lib/utils";

interface SplitRange {
  label: string;
  pages: number[]; // 0-indexed page numbers
}

function parseRanges(input: string, totalPages: number): SplitRange[] {
  const ranges: SplitRange[] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    const match = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (match) {
      const start = Math.max(1, parseInt(match[1], 10));
      const end = Math.min(totalPages, parseInt(match[2], 10));
      if (start <= end) {
        const pages: number[] = [];
        for (let i = start; i <= end; i++) pages.push(i - 1);
        ranges.push({ label: `Pages ${start}-${end}`, pages });
      }
    } else {
      const num = parseInt(part, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        ranges.push({ label: `Page ${num}`, pages: [num - 1] });
      }
    }
  }

  return ranges;
}

export function PdfSplitTool() {
  const t = useTranslations("common");
  const [sourceData, setSourceData] = useState<ArrayBuffer | null>(null);
  const [sourceName, setSourceName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [rangeInput, setRangeInput] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [results, setResults] = useState<{ name: string; blob: Blob }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setResults([]);
    setError(null);

    const data = await file.arrayBuffer();
    try {
      const doc = await PDFDocument.load(data);
      const count = doc.getPageCount();
      setSourceData(data);
      setSourceName(file.name.replace(/\.pdf$/i, ""));
      setPageCount(count);
      setRangeInput(`1-${count}`);
    } catch {
      setError(t("couldNotReadPdf"));
    }
  }, [t]);

  const handleSplit = useCallback(async () => {
    if (!sourceData || !rangeInput.trim()) return;
    setSplitting(true);
    setError(null);
    try {
      const ranges = parseRanges(rangeInput, pageCount);
      if (ranges.length === 0) {
        setError(t("invalidRanges"));
        return;
      }

      const outputFiles: { name: string; blob: Blob }[] = [];
      const srcDoc = await PDFDocument.load(sourceData);
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(srcDoc, range.pages);
        copiedPages.forEach((page) => newDoc.addPage(page));
        const bytes = await newDoc.save();
        const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
        outputFiles.push({
          name: `${sourceName}-${range.label.replace(/\s+/g, "-").toLowerCase()}.pdf`,
          blob,
        });
      }
      setResults(outputFiles);
    } catch {
      setError(t("splitError"));
    } finally {
      setSplitting(false);
    }
  }, [sourceData, rangeInput, pageCount, sourceName, t]);

  const handleDownload = useCallback((file: { name: string; blob: Blob }) => {
    triggerDownload(file.blob, file.name);
  }, []);

  const handleDownloadAll = useCallback(async () => {
    if (results.length < 2) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    results.forEach((f) => zip.file(f.name, f.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, `${sourceName}-split.zip`);
  }, [results, sourceName]);

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

      {sourceData && pageCount > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <FileText className="mr-1 inline h-4 w-4" />
            {sourceName}.pdf &mdash; {pageCount} page{pageCount !== 1 ? "s" : ""}
          </p>
          <div className="space-y-1">
            <label
              htmlFor="page-ranges"
              className="text-sm font-medium"
            >
              {t("pageRanges")}
            </label>
            <input
              id="page-ranges"
              type="text"
              value={rangeInput}
              onChange={(e) => {
                setRangeInput(e.target.value);
                setResults([]);
              }}
              placeholder="e.g. 1-3, 5, 7-10"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {t("pageRangesHint")}
            </p>
          </div>
          <Button onClick={handleSplit} disabled={splitting || !rangeInput.trim()}>
            {splitting ? t("splitting") : t("splitPdf")}
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate text-sm">{file.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDownload(file)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {results.length >= 2 && (
            <Button onClick={handleDownloadAll} className="gap-2">
              <Download className="h-4 w-4" /> {t("downloadAllZip")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
