"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ArrowRightLeft, FileText, FileImage } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  children,
  onClick,
  activeBg,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  activeBg?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative transition-colors pb-1",
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <span
          className={cn(
            "absolute -bottom-px left-0 right-0 h-0.5 rounded-full",
            activeBg || "bg-primary"
          )}
        />
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/convert", label: t("convert"), icon: ArrowRightLeft, color: "text-category-convert", activeBg: "bg-category-convert" },
    { href: "/pdf", label: t("pdf"), icon: FileText, color: "text-category-pdf", activeBg: "bg-category-pdf" },
    { href: "/image", label: t("image"), icon: FileImage, color: "text-category-image", activeBg: "bg-category-image" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            {t("brand")}
            <span className="text-primary">.</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} activeBg={item.activeBg}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:max-w-[280px]">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="font-display text-lg font-bold">
                  {t("brand")}
                  <span className="text-primary">.</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className={cn("h-4 w-4", item.color)} />
                      {item.label}
                    </MobileNavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
