"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export function PrivacyBadge() {
  const t = useTranslations("common");
  return (
    <Badge variant="secondary" className="gap-1">
      <Shield className="h-3 w-3" />
      {t("privacyBadge")}
    </Badge>
  );
}
