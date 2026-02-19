"use client";

import dynamic from "next/dynamic";

const PdfMergeTool = dynamic(
  () =>
    import("./pdf-merge-tool").then((m) => ({ default: m.PdfMergeTool })),
  { ssr: false }
);

const PdfSplitTool = dynamic(
  () =>
    import("./pdf-split-tool").then((m) => ({ default: m.PdfSplitTool })),
  { ssr: false }
);

const PdfCompressTool = dynamic(
  () =>
    import("./pdf-compress-tool").then((m) => ({
      default: m.PdfCompressTool,
    })),
  { ssr: false }
);

const PdfToImageTool = dynamic(
  () =>
    import("./pdf-to-image-tool").then((m) => ({
      default: m.PdfToImageTool,
    })),
  { ssr: false }
);

const PdfExtractTextTool = dynamic(
  () =>
    import("./pdf-extract-text-tool").then((m) => ({
      default: m.PdfExtractTextTool,
    })),
  { ssr: false }
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
