"use client";

import { useTranslations } from "next-intl";
import { X, Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { formatSize } from "@/lib/utils";
import type { FileEntry } from "@/hooks/use-progress";

interface FileListProps {
  files: FileEntry[];
  onRemove: (id: string) => void;
  onDownload: (file: FileEntry) => void;
}

export function FileList({ files, onRemove, onDownload }: FileListProps) {
  const t = useTranslations("common");
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-3 rounded-lg border p-3"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </p>
          </div>

          {file.status === "processing" && (
            <div className="flex items-center gap-2 w-32">
              <Progress value={file.progress} className="h-2" />
              <span className="text-xs text-muted-foreground w-8">
                {file.progress}%
              </span>
            </div>
          )}

          {file.status === "pending" && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}

          {file.status === "done" && (
            <Button size="sm" variant="ghost" onClick={() => onDownload(file)}>
              <Download className="h-4 w-4" />
            </Button>
          )}

          {file.status === "error" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  {file.error || t("conversionFailed")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Button size="sm" variant="ghost" onClick={() => onRemove(file.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
