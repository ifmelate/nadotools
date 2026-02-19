import { getTranslations, setRequestLocale } from "next-intl/server";
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
    <div className="space-y-20">
      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center pt-16 pb-6 space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -top-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--color-primary)/12,transparent_70%)]" />

        <Badge variant="outline" className="relative gap-1.5 px-3 py-1 text-sm border-primary/30 text-primary">
          <Shield className="h-3.5 w-3.5" />
          {tc("privacyBadge")}
        </Badge>

        <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          {tc("brand")}
        </h1>

        <p className="relative text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
          {t("hero")}
        </p>

        <p className="relative text-base text-muted-foreground/70 max-w-xl">
          {t("heroSub")}
        </p>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="-mt-10">
        <div className="grid gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <MonitorSmartphone className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{t("howItWorksStep1Title")}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("howItWorksStep1Desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{t("howItWorksStep2Title")}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("howItWorksStep2Desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{t("howItWorksStep3Title")}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("howItWorksStep3Desc")}</p>
          </div>
        </div>
      </section>

      {/* ── Convert Section ─────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-category-convert" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
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
          const groupLabelKey = `convertGroup${type.charAt(0).toUpperCase() + type.slice(1)}` as "convertGroupVideo" | "convertGroupAudio" | "convertGroupImage" | "convertGroupDocument";
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
                      <Card className="group h-full transition-colors hover:border-category-convert/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
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
              </div>
            </div>
          );
        })}
      </section>

      {/* ── PDF Section ──────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-category-pdf" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
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
                <Card className="group h-full transition-colors hover:border-category-pdf/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ToolIcon className="h-4 w-4 text-category-pdf" />
                        <CardTitle className="text-base">
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
        </div>
      </section>

      {/* ── Image Section ────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileImage className="h-5 w-5 text-category-image" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
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
                <Card className="group h-full transition-colors hover:border-category-image/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ToolIcon className="h-4 w-4 text-category-image" />
                        <CardTitle className="text-base">
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
        </div>
      </section>

      {/* ── Bottom Spacer ────────────────────────────────────────────────────── */}
      <div className="pb-8" />
    </div>
  );
}
