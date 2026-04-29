import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { baseMetadata } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  style: ["italic", "normal"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const allPosts = getAllPostsMeta();
  const fontVars = `${inter.variable} ${notoJP.variable} ${serif.variable} ${mono.variable}`;
  return (
    <html lang="ja" className={fontVars}>
      <body>
        <Header allPosts={allPosts} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
