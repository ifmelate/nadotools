import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;
let currentFileId = "";

async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg;

  const instance = new FFmpeg();
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";

  instance.on("progress", ({ progress }) => {
    self.postMessage({
      type: "progress",
      fileId: currentFileId,
      progress: Math.round(progress * 100),
    });
  });

  self.postMessage({ type: "loading", progress: 0 });

  await instance.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm"
    ),
  });

  ffmpeg = instance;
  self.postMessage({ type: "ready" });
  return ffmpeg;
}

self.onmessage = async (e: MessageEvent) => {
  const { type, fileId, inputData, inputName, outputExt } =
    e.data;

  if (type === "init") {
    try {
      await loadFFmpeg();
    } catch (err) {
      self.postMessage({ type: "load-error", error: String(err) });
    }
    return;
  }

  if (type === "convert") {
    currentFileId = fileId;
    try {
      const ff = await loadFFmpeg();
      const outputName = inputName.replace(/\.[^.]+$/, outputExt);
      await ff.writeFile(inputName, new Uint8Array(inputData));
      await ff.exec(["-i", inputName, outputName]);
      const data = await ff.readFile(outputName);
      const output = (data as Uint8Array).buffer;

      await ff.deleteFile(inputName);
      await ff.deleteFile(outputName);

      self.postMessage(
        { type: "done", fileId, output, outputName },
        { transfer: [output] }
      );
    } catch (err) {
      self.postMessage({ type: "error", fileId, error: String(err) });
    }
  }
};
