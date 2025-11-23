// src/app/posts/page.tsx（修正版）
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { TagSearch } from "@/components/posts/TagSearch";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "記事一覧",
  description: "そーがの日記の全記事一覧",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPostsMeta().sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  // タグの集計
  const tagCounts = new Map<string, number>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  const allTags = Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">記事一覧</h1>
          <p className="text-gray-600 mb-6">
            全 {posts.length} 件の記事があります
          </p>

          {/* 🆕 タグ検索 */}
          <TagSearch allTags={allTags} />
        </div>

        {/* 記事リスト */}
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

              {/* 内容本体 */}
              <div className="relative z-10 flex gap-4">
                {/* テキスト部分 */}
                <div className="flex-1">
                  {/* 日付 */}
                  <span className="text-xs text-gray-500">{post.date}</span>

                  {/* タイトル */}
                  <h2 className="text-xl font-semibold mt-1 mb-2 text-gray-900">
                    {post.title}
                  </h2>

                  {/* サマリ */}
                  {post.summary && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.summary}
                    </p>
                  )}

                  {/* タグ */}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
