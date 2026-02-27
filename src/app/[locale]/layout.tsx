import { Sora, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NadoTools",
  url: "https://nadotools.com",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NadoTools",
  url: "https://nadotools.com",
  logo: "https://nadotools.com/icon.svg",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${sora.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="container min-h-[calc(100vh-8rem)] py-8">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
