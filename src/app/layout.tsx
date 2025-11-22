import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata;

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
