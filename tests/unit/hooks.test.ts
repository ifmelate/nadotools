import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgress } from "@/hooks/use-progress";

describe("useProgress", () => {
  it("should initialize with empty files", () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.files).toEqual([]);
  });

  it("should add a file", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.addFile({ id: "1", name: "test.mp4", size: 1000, status: "pending", progress: 0 });
    });
    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0].name).toBe("test.mp4");
  });

  it("should update file progress", () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.addFile({ id: "1", name: "test.mp4", size: 1000, status: "pending", progress: 0 });
    });
    act(() => {
      result.current.updateFile("1", { progress: 50, status: "processing" });
    });
    expect(result.current.files[0].progress).toBe(50);
    expect(result.current.files[0].status).toBe("processing");
  });
});
