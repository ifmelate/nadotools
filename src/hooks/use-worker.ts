"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export type WorkerMessage =
  | { type: "progress"; fileId: string; progress: number }
  | { type: "done"; fileId: string; output: ArrayBuffer; outputName: string }
  | { type: "error"; fileId: string; error: string }
  | { type: "ready" }
  | { type: "loading"; progress: number };

interface UseWorkerOptions {
  onMessage: (msg: WorkerMessage) => void;
}

export function useWorker(
  createWorker: () => Worker,
  options: UseWorkerOptions
) {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const worker = createWorker();
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const msg = e.data;
      if (msg.type === "ready") {
        setIsReady(true);
      } else if (msg.type === "loading") {
        setLoadProgress(msg.progress);
      }
      options.onMessage(msg);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postMessage = useCallback((data: unknown) => {
    workerRef.current?.postMessage(data);
  }, []);

  return { postMessage, isReady, loadProgress };
}
