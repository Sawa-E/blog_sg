import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

export default function HomePage() {
  const posts = getAllPostsMeta()
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 3); // 最新3件だけ表示

  return (
    <main className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ヒーローセクション */}
        <section className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">そーがの日記</h1>
          <p className="text-sm text-gray-600 mb-4">
            日々の勉強メモやロボット・開発の進捗を、海のそよ風みたいにゆるく書いていくブログです。
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/posts" className="btn-sea">
              記事一覧を見る
            </Link>
            <span className="text-xs text-gray-500">
              Cloudflare Pages + Next.js + TypeScript + MDX
            </span>
          </div>
        </section>

        {/* 最近の記事 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">最近の記事</h2>
            <Link
              href="/posts"
              className="text-xs text-sky-600 hover:underline"
            >
              すべての記事 →
            </Link>
          </div>

          {posts.length === 0 && (
            <p className="text-sm text-gray-500">
              まだ記事がありません。最初のMDX記事を書いてみましょう。
            </p>
          )}

          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.slug}`}
                key={post.slug}
                className="block rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm
                           p-6 shadow-sm transition-all duration-300
                           hover:shadow-lg hover:scale-[1.01]
                           relative overflow-hidden group"
              >
                {/* 波アニメーション背景 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

                {/* 本文 */}
                <div className="relative z-10">
                  {/* 日付 */}
                  <div className="text-xs text-gray-500 mb-2">{post.date}</div>

                  {/* タイトル */}
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>

                  {/* サマリ */}
                  {post.summary && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {post.summary}
                    </p>
                  )}

                  {/* タグ */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
