// src/app/tags/page.tsx（新規作成）
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { TagSearch } from "@/components/posts/TagSearch";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "タグ一覧",
  description: "そーがの日記の全タグ一覧。記事をタグで探すことができます。",
  path: "/tags",
});

export default function TagsPage() {
  const posts = getAllPostsMeta();

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

  // タグの色を生成
  const getTagColor = (tag: string) => {
    const colors = [
      "from-sky-400 to-cyan-400",
      "from-blue-400 to-indigo-400",
      "from-cyan-400 to-teal-400",
      "from-emerald-400 to-green-400",
      "from-teal-400 to-cyan-400",
    ];
    const hash = tag
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // タグのサイズを計算（記事数に応じて）
  const getTagSize = (count: number, maxCount: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return "text-3xl px-6 py-3";
    if (ratio > 0.4) return "text-2xl px-5 py-2.5";
    if (ratio > 0.2) return "text-xl px-4 py-2";
    return "text-lg px-3 py-1.5";
  };

  const maxCount = Math.max(...allTags.map((t) => t.count));

  return (
    <main className="min-h-screen body-sea text-gray-900">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-b border-sky-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">
            タグ一覧
          </h1>
          <p className="text-gray-600 mb-6">
            全 {allTags.length} 個のタグがあります
          </p>

          {/* タグ検索 */}
          <div className="flex justify-center">
            <TagSearch allTags={allTags} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* タグクラウド */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">☁️</span>
            タグクラウド
          </h2>
          <div className="rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm p-8 shadow-sm">
            <div className="flex flex-wrap justify-center gap-4">
              {allTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${tag.name}`}
                  className={`
                    inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${getTagColor(
                      tag.name
                    )} text-white font-bold shadow-md
                    hover:shadow-lg hover:scale-105 transition-all duration-300
                    ${getTagSize(tag.count, maxCount)}
                  `}
                >
                  <span>#</span>
                  <span>{tag.name}</span>
                  <span className="text-sm opacity-80">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* タグリスト（テーブル形式） */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">📋</span>
            すべてのタグ
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name}`}
                className="block rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* タグ名 */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTagColor(
                        tag.name
                      )}`}
                    />
                    <span className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                      #{tag.name}
                    </span>
                  </div>

                  {/* 記事数 */}
                  <div className="flex items-center gap-1.5 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      {tag.count}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 記事一覧へのリンク */}
        <div className="mt-12 text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            📚 すべての記事を見る
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
        </div>
      </div>
    </main>
  );
}
