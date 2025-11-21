// src/components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-sky-100 bg-white/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 text-xs text-gray-500 sm:flex-row sm:justify-between">
        <div>
          <span>© {year} そーがの日記</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/about"
            className="hover:text-sky-700 hover:underline underline-offset-4"
          >
            このブログについて
          </Link>
          <a
            href="https://github.com/Sawa-E"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub を開く"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="/icons/github-mark.svg"
              alt="GitHubアイコン"
              className="w-6 h-6"
            />
          </a>
          {/* 将来 X(Twitter) などもここに追加 */}
        </div>

        <div className="text-[10px] text-gray-400">
          Built with Next.js &amp; Cloudflare Pages
        </div>
      </div>
    </footer>
  );
}
