import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getConversionsByType } from "@/config/conversions";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowRight,
  ArrowRightLeft,
  FileVideo,
  FileAudio,
  FileImage,
  FileText,
} from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const hubTitles: Record<Locale, string> = {
  en: "File Converters — Free, Online | NadoTools",
  es: "Conversores de archivos — gratis, en linea | NadoTools",
  de: "Dateikonverter — kostenlos, online | NadoTools",
  fr: "Convertisseurs de fichiers — gratuit, en ligne | NadoTools",
  pt: "Conversores de arquivos — gratis, online | NadoTools",
  zh: "文件转换器 — 免费在线 | NadoTools",
  ja: "ファイル変換 — 無料・オンライン | NadoTools",
  ru: "Конвертеры файлов — бесплатно, онлайн | NadoTools",
};

const hubDescriptions: Record<Locale, string> = {
  en: "Convert video, audio, image, and document files for free. No upload — everything runs in your browser.",
  es: "Convierte archivos de video, audio, imagen y documentos gratis. Sin subir archivos — todo se procesa en tu navegador.",
  de: "Video-, Audio-, Bild- und Dokumentdateien kostenlos konvertieren. Kein Upload — alles laeuft im Browser.",
  fr: "Convertissez vos fichiers video, audio, image et documents gratuitement. Aucun envoi — tout se passe dans votre navigateur.",
  pt: "Converta arquivos de video, audio, imagem e documentos gratuitamente. Sem upload — tudo no navegador.",
  zh: "免费转换视频、音频、图片和文档文件。无需上传 — 一切在浏览器中完成。",
  ja: "動画・音声・画像・ドキュメントファイルを無料で変換。アップロード不要 — すべてブラウザ内で処理。",
  ru: "Конвертируйте видео, аудио, изображения и документы бесплатно. Без загрузки — всё в браузере.",
};

const hubHeadings: Record<Locale, string> = {
  en: "File Converters",
  es: "Conversores de archivos",
  de: "Dateikonverter",
  fr: "Convertisseurs de fichiers",
  pt: "Conversores de arquivos",
  zh: "文件转换器",
  ja: "ファイル変換",
  ru: "Конвертеры файлов",
};

const typeLabels: Record<string, Record<Locale, string>> = {
  video: {
    en: "Video", es: "Video", de: "Video", fr: "Video",
    pt: "Video", zh: "视频", ja: "動画", ru: "Видео",
  },
  audio: {
    en: "Audio", es: "Audio", de: "Audio", fr: "Audio",
    pt: "Audio", zh: "音频", ja: "音声", ru: "Аудио",
  },
  image: {
    en: "Image", es: "Imagen", de: "Bild", fr: "Image",
    pt: "Imagem", zh: "图片", ja: "画像", ru: "Изображение",
  },
  document: {
    en: "Document", es: "Documento", de: "Dokument", fr: "Document",
    pt: "Documento", zh: "文档", ja: "ドキュメント", ru: "Документ",
  },
};

// ─── Highlight format names ─────────────────────────────────────────────────────

function HighlightFormats({
  text,
  formats,
  className,
}: {
  text: string;
  formats: string[];
  className: string;
}) {
  const pattern = formats
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

const formatTypeIcon: Record<string, React.ElementType> = {
  video: FileVideo,
  audio: FileAudio,
  image: FileImage,
  document: FileText,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const title = hubTitles[loc] ?? hubTitles.en;
  const description = hubDescriptions[loc] ?? hubDescriptions.en;
  return {
    title,
    description,
    openGraph: {
      type: "website" as const,
      title,
      description,
      url: `https://nadotools.com/${locale}/convert/`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { title, description, images: ["/opengraph-image.png"] },
    alternates: buildAlternates(locale, "convert/"),
  };
}

export default async function ConvertHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const types = ["video", "audio", "image", "document"] as const;

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-category-convert/10">
            <ArrowRightLeft className="h-4 w-4 text-category-convert" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {hubHeadings[loc] ?? hubHeadings.en}
          </h1>
        </div>
      </div>

      {types.map((type) => {
        const items = getConversionsByType(type);
        if (items.length === 0) return null;
        const GroupIcon = formatTypeIcon[type] ?? FileText;

        return (
          <section key={type} className="space-y-4">
            <ScrollReveal>
              <div className="flex items-center gap-2">
                <GroupIcon className="h-4 w-4 text-category-convert" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {typeLabels[type]?.[loc] ?? typeLabels[type]?.en ?? type}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal
              stagger
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/convert/${c.slug}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Card className="group h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-category-convert/40">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-display">
                          <HighlightFormats
                            text={c.seo[loc]?.h1 ?? c.seo.en.h1}
                            formats={[c.from.format, c.to.format]}
                            className="text-category-convert font-bold"
                          />
                        </CardTitle>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </div>
                      <CardDescription>
                        {c.from.format.toUpperCase()} &rarr; {c.to.format.toUpperCase()}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </ScrollReveal>
          </section>
        );
      })}
    </div>
  );
}
