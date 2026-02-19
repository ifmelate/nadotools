import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "NadoTools — Free Online File Tools",
  description: "Convert files, edit PDFs, process images — free, private, in your browser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- COI service worker must load synchronously before other JS to enable SharedArrayBuffer */}
        <script src="/coi-serviceworker.js" />
      </head>
      <body className={`${sora.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
