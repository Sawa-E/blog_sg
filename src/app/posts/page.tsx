// src/app/page.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

export default function Home() {
  const posts = getAllPostsMeta();
  const latest = posts.slice(0, 5);

  return (
    <main className="min-h-screen text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="flex items-center justify-between mb-10">
          <Link href="/" className="site-title-sea">
            そーがの日記
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/posts" className="link-sea">
              記事一覧
            </Link>
          </nav>
        </header>

        {/* キャッチコピー */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-sky-800">
            そーがの技術日記。
          </h1>
          <p className="text-sm text-gray-600">
            ロボット、制御、プログラミング、日々のメモなどを
            すこしずつ残していきます。
          </p>
        </section>

        {/* 最新記事 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-sky-800">最新の記事</h2>
            <Link href="/posts" className="btn-sea">
              すべての記事へ
            </Link>
          </div>

          {latest.length === 0 ? (
            <p className="text-sm text-gray-500">まだ記事がありません。</p>
          ) : (
            <ul className="space-y-4">
              {latest.map((post) => (
                <li
                  key={post.slug}
                  className="bg-white/80 rounded-xl border border-[#e2edf7] px-4 py-3 shadow-sm"
                >
                  <div className="text-[11px] text-gray-500 mb-1">
                    {post.date}
                  </div>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-base font-medium text-sky-800 hover:underline"
                  >
                    {post.title}
                  </Link>
                  {post.summary && (
                    <p className="text-sm text-gray-700 mt-1">{post.summary}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
