"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { FileDropzone } from "./file-dropzone";
import { PrivacyBadge } from "./privacy-badge";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Download, FileText, Check } from "lucide-react";
import { triggerDownload } from "@/lib/utils";
import { getPdfjs } from "@/lib/pdfjs-singleton";

export function PdfExtractTextTool() {
  const t = useTranslations("common");
  const [extracting, setExtracting] = useState(false);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      setText("");
      setError(null);
      setExtracting(true);
      setCopied(false);
      setFileName(file.name.replace(/\.pdf$/i, ""));

      try {
        const pdfjs = await getPdfjs();
        const data = await file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data }).promise;
        const allText: string[] = [];

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .filter((item): item is { str: string } & typeof item => "str" in item)
            .map((item) => item.str)
            .join(" ");
          if (pageText.trim()) {
            allText.push(`--- ${t("page")} ${i} ---\n${pageText}`);
          }
        }

        setText(allText.join("\n\n"));
      } catch {
        setError(t("extractTextError"));
      } finally {
        setExtracting(false);
      }
    },
    [t]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the textarea
    }
  }, [text]);

  const handleDownloadText = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    triggerDownload(blob, `${fileName}-text.txt`);
  }, [text, fileName]);

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

      {extracting && (
        <p className="text-center text-sm text-muted-foreground">
          {t("extractingText")}
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {text && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <FileText className="mr-1 inline h-4 w-4" />
              {t("extractedTextFrom", { fileName: `${fileName}.pdf` })}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="gap-1"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <ClipboardCopy className="h-3 w-3" />
                )}
                {copied ? t("copied") : t("copy")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownloadText}
                className="gap-1"
              >
                <Download className="h-3 w-3" />
                {t("downloadTxt")}
              </Button>
            </div>
          </div>
          <textarea
            readOnly
            value={text}
            className="h-80 w-full resize-y rounded-md border bg-muted/50 p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
