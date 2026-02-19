"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeConfig: Record<string, { flag: string; label: string }> = {
  en: { flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
  es: { flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00f1ol" },
  de: { flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
  fr: { flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00e7ais" },
  pt: { flag: "\u{1F1E7}\u{1F1F7}", label: "Portugu\u00eas" },
  zh: { flag: "\u{1F1E8}\u{1F1F3}", label: "\u4E2D\u6587" },
  ja: { flag: "\u{1F1EF}\u{1F1F5}", label: "\u65E5\u672C\u8A9E" },
  ru: { flag: "\u{1F1F7}\u{1F1FA}", label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" },
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
    },
    [pathname, router]
  );

  const current = localeConfig[locale] ?? localeConfig.en;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Switch language"
          className="text-lg"
        >
          {current.flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {routing.locales.map((loc) => {
          const cfg = localeConfig[loc];
          const isActive = loc === locale;
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleSwitch(loc)}
              className={isActive ? "font-medium bg-accent" : ""}
            >
              <span className="text-base">{cfg.flag}</span>
              <span>{cfg.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
