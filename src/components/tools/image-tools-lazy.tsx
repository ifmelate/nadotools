"use client";

import dynamic from "next/dynamic";

const ImageRemoveBgTool = dynamic(
  () =>
    import("./image-remove-bg-tool").then((m) => ({
      default: m.ImageRemoveBgTool,
    })),
  { ssr: false }
);

const ImageResizeTool = dynamic(
  () =>
    import("./image-resize-tool").then((m) => ({
      default: m.ImageResizeTool,
    })),
  { ssr: false }
);

const ImageCompressTool = dynamic(
  () =>
    import("./image-compress-tool").then((m) => ({
      default: m.ImageCompressTool,
    })),
  { ssr: false }
);

const ImageStripMetadataTool = dynamic(
  () =>
    import("./image-strip-metadata-tool").then((m) => ({
      default: m.ImageStripMetadataTool,
    })),
  { ssr: false }
);

const toolMap: Record<string, React.ComponentType> = {
  "remove-bg": ImageRemoveBgTool,
  resize: ImageResizeTool,
  compress: ImageCompressTool,
  "strip-metadata": ImageStripMetadataTool,
};

export function ImageToolLazy({ toolId }: { toolId: string }) {
  const Tool = toolMap[toolId];
  if (!Tool) return null;
  return <Tool />;
}
