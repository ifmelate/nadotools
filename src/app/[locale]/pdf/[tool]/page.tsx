import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getAllPdfToolIds, getPdfTool } from "@/config/pdf-tools";
import { StructuredData } from "@/components/seo/structured-data";
import { FaqSection } from "@/components/seo/faq-section";
import { PdfToolLazy } from "@/components/tools/pdf-tools-lazy";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  const ids = getAllPdfToolIds();
  return routing.locales.flatMap((locale) =>
    ids.map((tool) => ({ locale, tool }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool } = await params;
  const config = getPdfTool(tool);
  if (!config) return {};
  const loc = locale as Locale;
  const seo = config.seo[loc] ?? config.seo.en;
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function PdfToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool } = await params;
  setRequestLocale(locale);

  const config = getPdfTool(tool);
  if (!config) notFound();

  const loc = locale as Locale;
  const seo = config.seo[loc] ?? config.seo.en;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{seo.h1}</h1>

      <PdfToolLazy toolId={config.id} />

      {/* How It Works */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          {seo.howItWorks.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <FaqSection faq={seo.faq} />

      {/* JSON-LD Structured Data */}
      <StructuredData seo={seo} />
    </div>
  );
}
