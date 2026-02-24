import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { imageTools } from "@/config/image-tools";
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
  FileImage,
  Eraser,
  Maximize,
  Image,
  ShieldOff,
} from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const hubTitles: Record<Locale, string> = {
  en: "Image Tools — Free, Online | NadoTools",
  es: "Herramientas de imagen — gratis, en linea | NadoTools",
  de: "Bildwerkzeuge — kostenlos, online | NadoTools",
  fr: "Outils image — gratuit, en ligne | NadoTools",
  pt: "Ferramentas de imagem — gratis, online | NadoTools",
  zh: "图片工具 — 免费在线 | NadoTools",
  ja: "画像ツール — 無料・オンライン | NadoTools",
  ru: "Инструменты для изображений — бесплатно, онлайн | NadoTools",
};

const hubDescriptions: Record<Locale, string> = {
  en: "Remove backgrounds, resize, compress, and strip metadata from images for free. No upload — everything runs in your browser.",
  es: "Elimina fondos, redimensiona, comprime y elimina metadatos de imagenes gratis. Sin subir archivos — todo en tu navegador.",
  de: "Hintergruende entfernen, skalieren, komprimieren und Metadaten entfernen — kostenlos. Kein Upload — alles im Browser.",
  fr: "Supprimez les arriere-plans, redimensionnez, compressez et supprimez les metadonnees gratuitement. Tout dans votre navigateur.",
  pt: "Remova fundos, redimensione, comprima e remova metadados gratuitamente. Sem upload — tudo no navegador.",
  zh: "免费移除背景、调整大小、压缩图片和删除元数据。无需上传 — 一切在浏览器中完成。",
  ja: "背景除去・リサイズ・圧縮・メタデータ削除を無料で。アップロード不要 — すべてブラウザ内で処理。",
  ru: "Удаляйте фон, изменяйте размер, сжимайте и удаляйте метаданные бесплатно. Без загрузки — всё в браузере.",
};

const hubHeadings: Record<Locale, string> = {
  en: "Image Tools",
  es: "Herramientas de imagen",
  de: "Bildwerkzeuge",
  fr: "Outils image",
  pt: "Ferramentas de imagem",
  zh: "图片工具",
  ja: "画像ツール",
  ru: "Инструменты для изображений",
};

const iconMap: Record<string, React.ElementType> = {
  Eraser,
  Maximize,
  Image,
  FileImage,
  ShieldOff,
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
      url: `https://nadotools.com/${locale}/image/`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { title, description, images: ["/opengraph-image.png"] },
    alternates: buildAlternates(locale, "image/"),
  };
}

export default async function ImageHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const tools = Object.values(imageTools);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-category-image/10">
            <FileImage className="h-4 w-4 text-category-image" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {hubHeadings[loc] ?? hubHeadings.en}
          </h1>
        </div>
      </div>

      <ScrollReveal
        stagger
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool, i) => {
          const ToolIcon = iconMap[tool.icon] ?? FileImage;

          return (
            <Link
              key={tool.id}
              href={`/image/${tool.id}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Card className="group h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-category-image/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ToolIcon className="h-4 w-4 text-category-image" />
                      <CardTitle className="text-base font-display">
                        {tool.seo[loc]?.h1 ?? tool.seo.en.h1}
                      </CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <CardDescription className="line-clamp-2">
                    {tool.seo[loc]?.description ?? tool.seo.en.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </ScrollReveal>
    </div>
  );
}
