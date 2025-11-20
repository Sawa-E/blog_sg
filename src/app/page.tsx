// src/app/posts/page.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

export const metadata = {
  title: "記事一覧 | そーがの日記",
};

export default function PostsPage() {
  const posts = getAllPostsMeta();

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

        <h1 className="text-2xl font-bold mb-4 text-sky-800">記事一覧</h1>

        {posts.length === 0 ? (
          <p className="text-sm text-gray-500">まだ記事がありません。</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
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
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-sky-50 px-2 py-[2px] text-[10px] text-sky-700 border border-sky-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
