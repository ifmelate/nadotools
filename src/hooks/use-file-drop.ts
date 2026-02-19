"use client";

import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from "react";

interface UseFileDropOptions {
  accept?: string[];
  maxSize?: number;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}

export function useFileDrop({ accept, maxSize, multiple = true, onFiles }: UseFileDropOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      let files = Array.from(fileList);
      if (accept) {
        files = files.filter((f) =>
          accept.some((type) => f.type === type || f.name.endsWith(type))
        );
      }
      if (maxSize) {
        files = files.filter((f) => f.size <= maxSize);
      }
      if (!multiple) {
        files = files.slice(0, 1);
      }
      if (files.length > 0) {
        onFiles(files);
      }
    },
    [accept, maxSize, multiple, onFiles]
  );

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFiles]
  );

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return { isDragging, onDragOver, onDragLeave, onDrop, onChange, openPicker, inputRef };
}
