export type WasmEngine = "ffmpeg" | "pdfjs" | "onnx" | "tesseract";
export type WasmStatus = "idle" | "loading" | "ready" | "error";

const statusMap: Record<WasmEngine, WasmStatus> = {
  ffmpeg: "idle",
  pdfjs: "idle",
  onnx: "idle",
  tesseract: "idle",
};

export function getWasmStatus(engine: WasmEngine): WasmStatus {
  return statusMap[engine];
}

export function setWasmStatus(engine: WasmEngine, status: WasmStatus) {
  statusMap[engine] = status;
}
