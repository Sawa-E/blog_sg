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
              className="
                block rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm
                p-6 shadow-sm transition-all duration-300
                hover:shadow-lg hover:scale-[1.01]
                relative overflow-hidden group
              "
            >
              {/* 波アニメーションの背景 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg"></div>

              {/* 内容 */}
              <div className="relative z-10">
                <span className="text-xs text-gray-500">{post.date}</span>

                <h2 className="text-2xl font-semibold mt-2 mb-2">
                  {post.title}
                </h2>

                {post.summary && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
      </div>
    </main>
  );
}
