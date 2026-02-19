"use client";

import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
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
        "relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 sm:p-16 transition-colors cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openPicker}
    >
      <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground text-center">
        <span className="hidden sm:inline">{t("dropFiles")}</span>
        <span className="sm:hidden">{t("tapToSelect")}</span>
      </p>
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
