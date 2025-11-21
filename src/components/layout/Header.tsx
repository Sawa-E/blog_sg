"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const shrinkStartY = 80; // ここより下までスクロールしたら縮小

      if (!shrink && currentY > shrinkStartY) {
        setShrink(true);
      } else if (shrink && currentY <= shrinkStartY) {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shrink]);

  return (
    <header
      className={`
        sticky top-0 z-30
        border-b border-sky-100/70
        bg-white/70 backdrop-blur-md
        transition-all duration-300
        ${shrink ? "py-1 shadow-sm" : "py-4 shadow-md"}
      `}
    >
      <div
        className={`
          mx-auto flex max-w-5xl px-4
          transition-all duration-300
          flex-col gap-2
          sm:flex-row sm:items-center sm:justify-between sm:gap-4
        `}
      >
        {/* タイトル */}
        <Link
          href="/"
          className={`
            font-bold tracking-tight transition-all duration-300
            whitespace-nowrap
            ${shrink ? "text-lg text-sky-700" : "text-2xl text-sky-800"}
          `}
        >
          そーがの日記
        </Link>

        {/* ナビ */}
        <nav
          className={`
            flex flex-wrap items-center
            gap-x-4 gap-y-1
            text-xs sm:text-sm
            transition-all duration-300
            ${shrink ? "text-sky-700" : "text-sky-800"}
          `}
        >
          <Link href="/" className="whitespace-nowrap hover:text-sky-600">
            ホーム
          </Link>
          <Link href="/posts" className="whitespace-nowrap hover:text-sky-600">
            記事一覧
          </Link>
          <Link href="/about" className="whitespace-nowrap hover:text-sky-600">
            このブログについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
