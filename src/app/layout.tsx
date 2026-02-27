import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nadotools.com"),
  title: "NadoTools — Free Online File Tools",
  description: "Convert files, edit PDFs, process images — free, private, in your browser.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
