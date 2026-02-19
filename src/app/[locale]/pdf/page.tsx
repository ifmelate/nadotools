import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pdfTools } from "@/config/pdf-tools";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const hubTitles: Record<Locale, string> = {
  en: "PDF Tools — Free, Online | NadoTools",
  es: "Herramientas PDF — gratis, en linea | NadoTools",
  de: "PDF-Werkzeuge — kostenlos, online | NadoTools",
  fr: "Outils PDF — gratuit, en ligne | NadoTools",
  pt: "Ferramentas PDF — gratis, online | NadoTools",
  zh: "PDF 工具 — 免费在线 | NadoTools",
  ja: "PDF ツール — 無料・オンライン | NadoTools",
  ru: "Инструменты PDF — бесплатно, онлайн | NadoTools",
};

const hubDescriptions: Record<Locale, string> = {
  en: "Merge, split, compress, and convert PDF files for free. No upload — everything runs in your browser.",
  es: "Une, divide, comprime y convierte archivos PDF gratis. Sin subir archivos — todo en tu navegador.",
  de: "PDF-Dateien kostenlos zusammenfuegen, aufteilen, komprimieren und konvertieren. Kein Upload — alles im Browser.",
  fr: "Fusionnez, divisez, compressez et convertissez vos PDF gratuitement. Aucun envoi — tout dans votre navigateur.",
  pt: "Junte, divida, comprima e converta arquivos PDF gratuitamente. Sem upload — tudo no navegador.",
  zh: "免费合并、拆分、压缩和转换 PDF 文件。无需上传 — 一切在浏览器中完成。",
  ja: "PDF の結合・分割・圧縮・変換を無料で。アップロード不要 — すべてブラウザ内で処理。",
  ru: "Объединяйте, разделяйте, сжимайте и конвертируйте PDF бесплатно. Без загрузки — всё в браузере.",
};

const hubHeadings: Record<Locale, string> = {
  en: "PDF Tools",
  es: "Herramientas PDF",
  de: "PDF-Werkzeuge",
  fr: "Outils PDF",
  pt: "Ferramentas PDF",
  zh: "PDF 工具",
  ja: "PDF ツール",
  ru: "Инструменты PDF",
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

export default async function PdfHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const tools = Object.values(pdfTools);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{hubHeadings[loc] ?? hubHeadings.en}</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/pdf/${tool.id}`}
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
