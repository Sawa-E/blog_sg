// src/app/tags/[tag]/not-found.tsx（新規作成）
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen body-sea flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🏷️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          タグが見つかりません
        </h1>
        <p className="text-gray-600 mb-8">
          指定されたタグは存在しないか、記事が削除された可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            タグ一覧へ
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-sky-200 text-sky-700 font-semibold rounded-full hover:bg-sky-50 hover:border-sky-300 transition-all duration-200"
          >
            記事一覧へ
          </Link>
        </div>
      </div>
    </main>
  );
}
