// src/components/layout/Header.tsx（改善版）
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [shrink, setShrink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "ホーム", icon: "🏠" },
    { href: "/posts", label: "記事", icon: "📚" },
    { href: "/about", label: "About", icon: "👤" },
  ];

  return (
    <header
      className={`
        sticky top-0 z-40
        border-b border-sky-100/70
        bg-white/90 backdrop-blur-lg
        transition-all duration-300
        ${shrink ? "py-2 shadow-md" : "py-3 sm:py-4 shadow-sm"}
      `}
    >
      <div className="mx-auto flex max-w-6xl px-4 items-center justify-between">
        {/* ロゴ */}
        <Link
          href="/"
          className={`
            font-extrabold tracking-tight transition-all duration-300
            bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent
            hover:from-sky-700 hover:to-cyan-700
            flex items-center gap-2
            ${shrink ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}
          `}
        >
          <span className="text-2xl" aria-hidden="true">
            🌊
          </span>
          <span className="hidden xs:inline">そーがの日記</span>
          <span className="xs:hidden">そーがの日記</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                flex items-center gap-1.5
                ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 shadow-sm"
                    : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                }
              `}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-sky-50 transition-colors"
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-sky-100 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  flex items-center gap-3
                  ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 shadow-sm"
                      : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                  }
                `}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
