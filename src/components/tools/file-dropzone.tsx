"use client";

import { useTranslations } from "next-intl";
import { Upload, FileUp } from "lucide-react";
import { useFileDrop } from "@/hooks/use-file-drop";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  accept?: string[];
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}

export function FileDropzone({ accept, multiple = true, onFiles }: FileDropzoneProps) {
  const t = useTranslations("common");
  const { isDragging, onDragOver, onDragLeave, onDrop, onChange, openPicker, inputRef } =
    useFileDrop({ accept, multiple, onFiles });

  return (
    <div
      className={cn(
        "dropzone-wrapper group relative flex flex-col items-center justify-center gap-5 rounded-xl p-12 sm:p-16 transition-all duration-300 cursor-pointer overflow-hidden",
        isDragging
          ? "dropzone-active border-2 border-primary bg-primary/[0.06] shadow-[0_0_0_4px_var(--color-primary)/10,0_0_24px_var(--color-primary)/8] scale-[1.01]"
          : "border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openPicker}
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] transition-opacity duration-300 group-hover:opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
          isDragging
            ? "bg-primary/15 text-primary scale-110"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}
      >
        {isDragging ? (
          <FileUp className="h-6 w-6" />
        ) : (
          <Upload className="h-6 w-6 animate-float" />
        )}
      </div>

      <div className="relative text-center space-y-1.5">
        <p
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            isDragging ? "text-primary" : "text-foreground"
          )}
        >
          <span className="hidden sm:inline">{t("dropFiles")}</span>
          <span className="sm:hidden">{t("tapToSelect")}</span>
        </p>
        {accept && accept.length > 0 && (
          <p className="text-xs text-muted-foreground/60">
            {accept.map((a) => a.replace(".", "").toUpperCase()).join(", ")}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept?.join(",")}
        onChange={onChange}
      />
    </div>
  );
}
