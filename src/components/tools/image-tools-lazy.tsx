"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "./tool-skeleton";

const ImageRemoveBgTool = dynamic(
  () =>
    import("./image-remove-bg-tool").then((m) => ({
      default: m.ImageRemoveBgTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const ImageResizeTool = dynamic(
  () =>
    import("./image-resize-tool").then((m) => ({
      default: m.ImageResizeTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const ImageCompressTool = dynamic(
  () =>
    import("./image-compress-tool").then((m) => ({
      default: m.ImageCompressTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const ImageStripMetadataTool = dynamic(
  () =>
    import("./image-strip-metadata-tool").then((m) => ({
      default: m.ImageStripMetadataTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
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
