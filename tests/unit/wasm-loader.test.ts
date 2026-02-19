import { describe, it, expect } from "vitest";
import { getWasmStatus } from "@/lib/wasm-loader";

describe("wasm-loader", () => {
  it("should report engines as not loaded initially", () => {
    expect(getWasmStatus("ffmpeg")).toBe("idle");
    expect(getWasmStatus("pdfjs")).toBe("idle");
    expect(getWasmStatus("onnx")).toBe("idle");
    expect(getWasmStatus("tesseract")).toBe("idle");
  });
});
