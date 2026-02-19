import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { imageTools } from "@/config/image-tools";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: hubTitles[loc] ?? hubTitles.en,
    description: hubDescriptions[loc] ?? hubDescriptions.en,
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
      <h1 className="text-3xl font-bold">{hubHeadings[loc] ?? hubHeadings.en}</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/image/${tool.id}`}
            className="rounded-lg border p-4 hover:border-foreground transition-colors"
          >
            <span className="font-medium">
              {tool.seo[loc]?.h1 ?? tool.seo.en.h1}
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              {tool.seo[loc]?.description ?? tool.seo.en.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
