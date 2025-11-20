import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

export default function PostsPage() {
  const posts = getAllPostsMeta().sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    // 背景は layout.tsx の body-sea を活かす
    <main className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="block rounded-2xl border border-sky-100 bg-sky-50/20 p-6 shadow-sm hover:shadow-md hover:bg-sky-50/40 transition-all duration-200"
            >
              {/* 日付 */}
              <div className="text-xs text-gray-500 mb-2">{post.date}</div>

              {/* タイトル */}
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

              {/* サマリ */}
              {post.summary && (
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.summary}
                </p>
              )}

              {/* タグ（最後に表示） */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
