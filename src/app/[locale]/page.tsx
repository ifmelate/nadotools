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
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Shield,
  ArrowRight,
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
      <section className="relative pt-16 sm:pt-24 pb-4 overflow-hidden">
        {/* Layered background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,var(--color-primary)/14,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,var(--color-category-convert)/6,transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,var(--color-category-image)/5,transparent_40%)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 text-sm border-primary/30 text-primary backdrop-blur-sm"
            >
              <Shield className="h-3.5 w-3.5" />
              {tc("privacyBadge")}
            </Badge>
          </div>

          <h1
            className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight max-w-4xl"
          >
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
              {tc("brand")}
            </span>
          </h1>

          <p
            className="animate-fade-up text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            {t("hero")}
          </p>

          <p
            className="animate-fade-up text-sm text-muted-foreground/60 max-w-xl"
            style={{ animationDelay: "240ms" }}
          >
            {t("heroSub")}
          </p>

          {/* How it works — inline pills */}
          <div
            className="animate-fade-up flex flex-wrap gap-3 pt-4"
            style={{ animationDelay: "320ms" }}
          >
            {[
              { icon: MonitorSmartphone, key: "howItWorksStep1Title" as const },
              { icon: Cpu, key: "howItWorksStep2Title" as const },
              { icon: Eye, key: "howItWorksStep3Title" as const },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground"
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
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-category-convert/10">
                <ArrowRightLeft className="h-4 w-4 text-category-convert" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                {t("convertSection")}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {t("convertSectionSub")}
            </p>
          </div>
        </ScrollReveal>

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
              <ScrollReveal>
                <div className="flex items-center gap-2">
                  <GroupIcon className="h-4 w-4 text-category-convert" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(groupLabelKey)}
                  </h3>
                </div>
              </ScrollReveal>

              <ScrollReveal
                stagger
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {group.map((conv, i) => {
                  const seo = conv.seo[loc] ?? conv.seo.en;
                  return (
                    <Link
                      key={conv.slug}
                      href={`/convert/${conv.slug}`}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <Card className="group h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-category-convert/40">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-display">
                              <HighlightFormats
                                text={seo.h1}
                                formats={[conv.from.format, conv.to.format]}
                                className="text-category-convert font-bold"
                              />
                            </CardTitle>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </div>
                          <CardDescription className="line-clamp-2">
                            {seo.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </ScrollReveal>
            </div>
          );
        })}
      </section>

      {/* ── PDF Section ──────────────────────────────────────────────────────── */}
      <section className="relative rounded-2xl bg-category-pdf/[0.04] dark:bg-category-pdf/[0.03] p-6 sm:p-8 space-y-6">
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-category-pdf/10">
                <FileText className="h-4 w-4 text-category-pdf" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                {t("pdfSection")}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {t("pdfSectionSub")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          stagger
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pdfToolList.map((tool, i) => {
            const seo = tool.seo[loc] ?? tool.seo.en;
            const ToolIcon = iconMap[tool.icon] ?? FileText;

            return (
              <Link
                key={tool.id}
                href={`/pdf/${tool.id}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <Card className="group h-full transition-all duration-200 bg-background/70 backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 hover:border-category-pdf/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ToolIcon className="h-4 w-4 text-category-pdf" />
                        <CardTitle className="text-base font-display">
                          {seo.h1}
                        </CardTitle>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {seo.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </ScrollReveal>
      </section>

      {/* ── Image Section ────────────────────────────────────────────────────── */}
      <section className="relative rounded-2xl bg-category-image/[0.04] dark:bg-category-image/[0.03] p-6 sm:p-8 space-y-6">
        <ScrollReveal>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-category-image/10">
                <FileImage className="h-4 w-4 text-category-image" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                {t("imageSection")}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {t("imageSectionSub")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          stagger
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {imageToolList.map((tool, i) => {
            const seo = tool.seo[loc] ?? tool.seo.en;
            const ToolIcon = iconMap[tool.icon] ?? FileImage;

            return (
              <Link
                key={tool.id}
                href={`/image/${tool.id}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <Card className="group h-full transition-all duration-200 bg-background/70 backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 hover:border-category-image/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ToolIcon className="h-4 w-4 text-category-image" />
                        <CardTitle className="text-base font-display">
                          {seo.h1}
                        </CardTitle>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {seo.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </ScrollReveal>
      </section>

      {/* ── Bottom Spacer ────────────────────────────────────────────────────── */}
      <div className="pb-8" />
    </div>
  );
}
