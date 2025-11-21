import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "そーがの日記",
  description: "Soga's blog powered by Next.js & Cloudflare Pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased body-sea min-h-screen flex flex-col`}
      >
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
