"use client";

import dynamic from "next/dynamic";
import type { ConversionConfig } from "@/config/types";

const ConverterTool = dynamic(
  () =>
    import("./converter-tool").then((m) => ({
      default: m.ConverterTool,
    })),
  { ssr: false }
);

interface ConverterToolLazyProps {
  config: ConversionConfig;
}

export function ConverterToolLazy({ config }: ConverterToolLazyProps) {
  return <ConverterTool config={config} />;
}
