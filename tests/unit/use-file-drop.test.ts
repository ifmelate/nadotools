import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { useFileDrop } from "@/hooks/use-file-drop";

function makeFile(name: string, type: string): File {
  return new File(["data"], name, { type });
}

function selectFiles(
  onFiles: (files: File[]) => void,
  accept: string[] | undefined,
  files: File[]
) {
  const { result } = renderHook(() => useFileDrop({ accept, onFiles }));
  act(() => {
    result.current.onChange({
      target: { files, value: "" },
    } as unknown as ChangeEvent<HTMLInputElement>);
  });
}

describe("useFileDrop accept filtering", () => {
  it("accepts a file whose reported MIME matches exactly", () => {
    const onFiles = vi.fn();
    selectFiles(onFiles, ["audio/mp4", ".m4a"], [makeFile("song.m4a", "audio/mp4")]);
    expect(onFiles).toHaveBeenCalledOnce();
  });

  it("accepts an .m4a file even when the browser reports audio/x-m4a", () => {
    const onFiles = vi.fn();
    selectFiles(onFiles, ["audio/mp4", ".m4a"], [makeFile("song.m4a", "audio/x-m4a")]);
    expect(onFiles).toHaveBeenCalledOnce();
    expect(onFiles.mock.calls[0][0]).toHaveLength(1);
  });

  it("accepts a file with an uppercase extension and empty MIME", () => {
    const onFiles = vi.fn();
    selectFiles(onFiles, ["video/x-matroska", ".mkv"], [makeFile("MOVIE.MKV", "")]);
    expect(onFiles).toHaveBeenCalledOnce();
  });

  it("rejects a file that matches neither MIME nor extension", () => {
    const onFiles = vi.fn();
    selectFiles(onFiles, ["audio/mp4", ".m4a"], [makeFile("notes.txt", "text/plain")]);
    expect(onFiles).not.toHaveBeenCalled();
  });

  it("does not treat a MIME accept entry as a file-name suffix", () => {
    const onFiles = vi.fn();
    selectFiles(onFiles, ["audio/mp4"], [makeFile("evil.audio/mp4".replace("/", "_") + "", "text/plain")]);
    expect(onFiles).not.toHaveBeenCalled();
  });
});
