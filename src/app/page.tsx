// src/app/page.tsx（改善版）
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { ProfileCard } from "@/components/home/ProfileCard";

export default function HomePage() {
  const posts = getAllPostsMeta()
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* 🎨 改善: 大きなヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 border-b border-sky-100">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative z-10">
          {/* 装飾的な波エフェクト */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-sky-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-700" />

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            そーがの日記
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            ただの日常
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              📚 記事を読む
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-sky-700 font-semibold rounded-full border-2 border-sky-200 hover:border-sky-300 hover:bg-white transition-all duration-300"
            >
              👋 このブログについて
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 自己紹介カード */}
        <ProfileCard />

        <div className="my-12 border-t border-gray-200" />

        {/* 最近の記事 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最近の記事</h2>
            <Link
              href="/posts"
              className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 group"
            >
              すべての記事
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {posts.length === 0 && (
            <p className="text-sm text-gray-500">まだ記事がありません。</p>
          )}

          {/* 🎨 改善: グリッドレイアウト（2列） */}
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.slug}`}
                key={post.slug}
                className="block group"
              >
                <article className="h-full rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  {/* 波アニメーション背景 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

                  {/* 本文 */}
                  <div className="relative z-10">
                    {/* 日付 */}
                    <time className="text-xs text-gray-500 font-medium">
                      {post.date}
                    </time>

                    {/* タイトル */}
                    <h3 className="text-lg font-bold mt-2 mb-3 text-gray-900 line-clamp-2 group-hover:text-sky-700 transition-colors">
                      {post.title}
                    </h3>

                    {/* サマリ */}
                    {post.summary && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {post.summary}
                      </p>
                    )}

                    {/* タグ */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
