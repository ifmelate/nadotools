"use client";

import { useState, useCallback } from "react";

export interface FileEntry {
  id: string;
  name: string;
  size: number;
  status: "pending" | "processing" | "done" | "error";
  progress: number;
  outputBlob?: Blob;
  outputName?: string;
  error?: string;
}

export function useProgress() {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const addFile = useCallback((file: FileEntry) => {
    setFiles((prev) => [...prev, file]);
  }, []);

  const addFiles = useCallback((newFiles: FileEntry[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const updateFile = useCallback((id: string, updates: Partial<FileEntry>) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return { files, addFile, addFiles, updateFile, removeFile, clearFiles };
}
