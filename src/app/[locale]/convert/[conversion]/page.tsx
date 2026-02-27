import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getAllConversionSlugs, getConversion } from "@/config/conversions";
import { StructuredData } from "@/components/seo/structured-data";
import { FaqSection } from "@/components/seo/faq-section";
import { ConverterToolLazy } from "@/components/tools/converter-tool-lazy";
import type { Locale } from "@/config/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  const slugs = getAllConversionSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((conversion) => ({ locale, conversion }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; conversion: string }>;
}): Promise<Metadata> {
  const { locale, conversion } = await params;
  const config = getConversion(conversion);
  if (!config) return {};
  const loc = locale as Locale;
  const seo = config.seo[loc] ?? config.seo.en;
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      type: "website" as const,
      title: seo.title,
      description: seo.description,
      url: `https://nadotools.com/${locale}/convert/${conversion}/`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { title: seo.title, description: seo.description, images: ["/opengraph-image.png"] },
    alternates: buildAlternates(locale, `convert/${conversion}/`),
  };
}

export default async function ConversionPage({
  params,
}: {
  params: Promise<{ locale: string; conversion: string }>;
}) {
  const { locale, conversion } = await params;
  setRequestLocale(locale);

  const config = getConversion(conversion);
  if (!config) notFound();

  const loc = locale as Locale;
  const seo = config.seo[loc] ?? config.seo.en;
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{seo.h1}</h1>

      <ConverterToolLazy config={config} />

      {/* How It Works */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("howItWorks")}</h2>
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
