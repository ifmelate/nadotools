export type Locale = "en" | "es" | "de" | "fr" | "pt" | "zh" | "ja" | "ru";

export interface FormatInfo {
  format: string;
  type: "video" | "audio" | "image" | "document";
  mime: string;
  extension: string;
}

export interface SeoData {
  title: string;
  description: string;
  h1: string;
  howItWorks: string[];
  faq: { q: string; a: string }[];
}

export interface ConversionConfig {
  slug: string;
  from: FormatInfo;
  to: FormatInfo;
  engine: "ffmpeg" | "canvas" | "pdf" | "pandoc";
  /** Extra args inserted between -i input and output. Defaults to ["-preset", "ultrafast"]. */
  ffmpegArgs?: string[];
  /** If true, try -c copy (remux) first, fall back to re-encode on failure. */
  tryRemux?: boolean;
  seo: Record<Locale, SeoData>;
}

export interface ToolConfig {
  id: string;
  category: "pdf" | "image";
  icon: string;
  engine: string;
  acceptedTypes: string[];
  maxFileSize?: number;
  seo: Record<Locale, SeoData>;
}
