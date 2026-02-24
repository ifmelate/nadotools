"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "./tool-skeleton";

const PdfMergeTool = dynamic(
  () =>
    import("./pdf-merge-tool").then((m) => ({ default: m.PdfMergeTool })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const PdfSplitTool = dynamic(
  () =>
    import("./pdf-split-tool").then((m) => ({ default: m.PdfSplitTool })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const PdfCompressTool = dynamic(
  () =>
    import("./pdf-compress-tool").then((m) => ({
      default: m.PdfCompressTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const PdfToImageTool = dynamic(
  () =>
    import("./pdf-to-image-tool").then((m) => ({
      default: m.PdfToImageTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const PdfExtractTextTool = dynamic(
  () =>
    import("./pdf-extract-text-tool").then((m) => ({
      default: m.PdfExtractTextTool,
    })),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

const toolMap: Record<string, React.ComponentType> = {
  merge: PdfMergeTool,
  split: PdfSplitTool,
  compress: PdfCompressTool,
  "to-image": PdfToImageTool,
  "extract-text": PdfExtractTextTool,
};

export function PdfToolLazy({ toolId }: { toolId: string }) {
  const Tool = toolMap[toolId];
  if (!Tool) return null;
  return <Tool />;
}
