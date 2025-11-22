import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "そーがの日記",
  description: "Soga's blog",
  openGraph: {
    title: "そーがの日記",
    description: "Soga's blog",
    siteName: "そーがの日記",
    images: [
      {
        url: "/og-image.png", // public/og-image.png
        width: 1200,
        height: 630,
        alt: "そーがの日記 OG画像",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "そーがの日記",
    description: "Soga's blog",
    images: ["/og-image.png"], // ここは string or string[]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased body-sea min-h-screen flex flex-col">
        {/* ヘッダー */}
        <Header />

        {/* メイン：可変領域 */}
        <main className="flex-1">{children}</main>

        {/* フッター */}
        <Footer />
      </body>
    </html>
  );
}
