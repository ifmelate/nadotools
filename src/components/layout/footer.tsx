"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Github, CircleAlert } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");
  const tl = useTranslations("landing");
  return (
    <footer className="border-t">
      <div className="container py-8 space-y-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2">
            <p className="font-semibold">{t("brand")}</p>
            <p className="text-sm text-muted-foreground">
              {tl("footerOpenSource")}
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">{tl("allTools")}</p>
            <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
              <Link href="/convert" className="hover:text-foreground transition-colors">
                {t("convert")}
              </Link>
              <Link href="/pdf" className="hover:text-foreground transition-colors">
                {t("pdf")}
              </Link>
              <Link href="/image" className="hover:text-foreground transition-colors">
                {t("image")}
              </Link>
            </nav>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">{tl("footerSourceCode")}</p>
            <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a
                href="https://github.com/ifmelate/nadotools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://github.com/ifmelate/nadotools/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <CircleAlert className="h-3.5 w-3.5" />
                {tl("reportIssue")}
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t pt-4 text-center text-xs text-muted-foreground">
          {t("byNadotools")}
        </div>
      </div>
    </footer>
  );
}
