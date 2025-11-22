// src/components/layout/Footer.tsx（改善版）
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-sky-800 mb-3">🌊 そーがの日記</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ただのオタクが書いている技術ブログ兼日記
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">ナビゲーション</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-sky-600">
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-gray-600 hover:text-sky-600"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-sky-600"
                >
                  このブログについて
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">SNS</h3>
            <div className="flex gap-3">
              <a
                href="https://x.com/..."
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <img
                  src="/icons/x-logo.svg"
                  alt="X"
                  className="w-5 h-5 invert"
                />
              </a>
              <a
                href="https://github.com/Sawa-E"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <img
                  src="/icons/github-mark.svg"
                  alt="GitHub"
                  className="w-6.25 h-6.25"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-sky-100 text-center text-sm text-gray-500">
          <p>© {currentYear} そーがの日記.</p>
        </div>
      </div>
    </footer>
  );
}
