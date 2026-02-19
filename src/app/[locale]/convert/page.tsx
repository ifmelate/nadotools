import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getConversionsByType } from "@/config/conversions";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";

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
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">{hubHeadings[loc] ?? hubHeadings.en}</h1>

      {types.map((type) => {
        const items = getConversionsByType(type);
        if (items.length === 0) return null;
        return (
          <section key={type} className="space-y-3">
            <h2 className="text-xl font-semibold">
              {typeLabels[type]?.[loc] ?? typeLabels[type]?.en ?? type}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/convert/${c.slug}`}
                  className="rounded-lg border p-4 hover:border-foreground transition-colors"
                >
                  <span className="font-medium">
                    {c.seo[loc]?.h1 ?? c.seo.en.h1}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.from.format.toUpperCase()} &rarr; {c.to.format.toUpperCase()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
