import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { conversions } from "@/config/conversions";
import { pdfTools } from "@/config/pdf-tools";
import { imageTools } from "@/config/image-tools";
import type { Locale } from "@/config/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Shield,
  FileVideo,
  FileAudio,
  FileImage,
  FileText,
  Combine,
  Scissors,
  FileDown,
  Image,
  Eraser,
  Maximize,
  ShieldOff,
  ArrowRightLeft,
  MonitorSmartphone,
  Cpu,
  Eye,
} from "lucide-react";

// ─── Highlight format names in titles ────────────────────────────────────────────

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
  const lowerFormats = formats.map((f) => f.toLowerCase());

  return (
    <>
      {parts.map((part, i) =>
        lowerFormats.includes(part.toLowerCase()) ? (
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

// ─── Icon map for tool configs ──────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  Combine,
  Scissors,
  FileDown,
  Image,
  FileText,
  Eraser,
  Maximize,
  ShieldOff,
};

// ─── Format-type icon map ───────────────────────────────────────────────────────

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
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website" as const,
      title: t("title"),
      description: t("description"),
      url: `https://nadotools.com/${locale}/`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image.png"],
    },
    alternates: buildAlternates(locale, ""),
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const t = await getTranslations("landing");
  const tc = await getTranslations("common");

  const conversionList = Object.values(conversions);
  const pdfToolList = Object.values(pdfTools);
  const imageToolList = Object.values(imageTools);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-24 pb-4">
        <div className="space-y-6">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight max-w-4xl">
            {tc("brand")}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            {t("hero")}
          </p>

          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            {tc("privacyBadge")}
          </p>

          <p className="text-sm text-muted-foreground/60 max-w-xl">
            {t("heroSub")}
          </p>

          {/* How it works — inline steps */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
            {[
              { icon: MonitorSmartphone, key: "howItWorksStep1Title" as const },
              { icon: Cpu, key: "howItWorksStep2Title" as const },
              { icon: Eye, key: "howItWorksStep3Title" as const },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {t(step.key)}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Convert Section ─────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <ArrowRightLeft className="h-5 w-5 text-category-convert" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {t("convertSection")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {t("convertSectionSub")}
          </p>
        </div>

        {(["video", "audio", "image", "document"] as const).map((type) => {
          const group = conversionList.filter((c) => c.from.type === type);
          if (group.length === 0) return null;
          const groupLabelKey =
            `convertGroup${type.charAt(0).toUpperCase() + type.slice(1)}` as
              | "convertGroupVideo"
              | "convertGroupAudio"
              | "convertGroupImage"
              | "convertGroupDocument";
          const GroupIcon = formatTypeIcon[type] ?? FileText;

          return (
            <div key={type} className="space-y-3">
              <div className="flex items-center gap-2">
                <GroupIcon className="h-4 w-4 text-category-convert" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(groupLabelKey)}
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((conv) => {
                  const seo = conv.seo[loc] ?? conv.seo.en;
                  return (
                    <Link key={conv.slug} href={`/convert/${conv.slug}`}>
                      <Card className="h-full transition-colors hover:border-category-convert/40">
                        <CardHeader>
                          <CardTitle className="text-base font-display">
                            <HighlightFormats
                              text={seo.h1}
                              formats={[conv.from.format, conv.to.format]}
                              className="text-category-convert font-bold"
                            />
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {seo.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── PDF Section ──────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <FileText className="h-5 w-5 text-category-pdf" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {t("pdfSection")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {t("pdfSectionSub")}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pdfToolList.map((tool) => {
            const seo = tool.seo[loc] ?? tool.seo.en;
            const ToolIcon = iconMap[tool.icon] ?? FileText;

            return (
              <Link key={tool.id} href={`/pdf/${tool.id}`}>
                <Card className="h-full transition-colors hover:border-category-pdf/40">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ToolIcon className="h-4 w-4 text-category-pdf" />
                      <CardTitle className="text-base font-display">
                        {seo.h1}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {seo.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Image Section ────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <FileImage className="h-5 w-5 text-category-image" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {t("imageSection")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {t("imageSectionSub")}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {imageToolList.map((tool) => {
            const seo = tool.seo[loc] ?? tool.seo.en;
            const ToolIcon = iconMap[tool.icon] ?? FileImage;

            return (
              <Link key={tool.id} href={`/image/${tool.id}`}>
                <Card className="h-full transition-colors hover:border-category-image/40">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ToolIcon className="h-4 w-4 text-category-image" />
                      <CardTitle className="text-base font-display">
                        {seo.h1}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {seo.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Bottom Spacer ────────────────────────────────────────────────────── */}
      <div className="pb-8" />
    </div>
  );
}
