// src/app/tags/[tag]/page.tsx（新規作成）
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return generatePageMetadata({
    title: `#${decodedTag} の記事`,
    description: `「${decodedTag}」タグが付いた記事の一覧です。`,
    path: `/tags/${tag}`,
  });
}

export function generateStaticParams() {
  const posts = getAllPostsMeta();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagSet.add(tag);
    });
  });

  return Array.from(tagSet).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // このタグを持つ記事を取得
  const allPosts = getAllPostsMeta();
  const posts = allPosts
    .filter((post) => post.tags?.includes(decodedTag))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  if (posts.length === 0) {
    notFound();
  }

  // 関連タグの抽出（このタグと一緒によく使われるタグ）
  const relatedTagsMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags?.forEach((t) => {
      if (t !== decodedTag) {
        relatedTagsMap.set(t, (relatedTagsMap.get(t) || 0) + 1);
      }
    });
  });

  const relatedTags = Array.from(relatedTagsMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

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

  return (
    <main className="min-h-screen body-sea text-gray-900">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-b border-sky-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* パンくずリスト */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link
              href="/posts"
              className="hover:text-sky-600 transition-colors"
            >
              記事一覧
            </Link>
            <span>/</span>
            <Link href="/tags" className="hover:text-sky-600 transition-colors">
              タグ一覧
            </Link>
            <span>/</span>
            <span className="text-gray-700">#{decodedTag}</span>
          </nav>

          {/* タグバッジ（大） */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r ${getTagColor(
                decodedTag
              )} text-white font-bold text-2xl shadow-lg`}
            >
              <span>#</span>
              <span>{decodedTag}</span>
            </div>
            <div className="text-sm text-gray-600">{posts.length}件の記事</div>
          </div>

          {/* 関連タグ */}
          {relatedTags.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                関連タグ
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedTags.map((relatedTag) => (
                  <Link
                    key={relatedTag}
                    href={`/tags/${relatedTag}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-sky-200 text-sm font-medium text-sky-700 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200"
                  >
                    #{relatedTag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 記事一覧 */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="block rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] relative overflow-hidden group"
            >
              {/* 波アニメーション背景 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

              {/* 内容本体 */}
              <div className="relative z-10 flex gap-4">
                <div className="flex-1">
                  {/* 日付 */}
                  <time className="text-xs text-gray-500 font-medium">
                    {post.date}
                  </time>

                  {/* タイトル */}
                  <h2 className="text-xl font-semibold mt-1 mb-2 text-gray-900 group-hover:text-sky-700 transition-colors">
                    {post.title}
                  </h2>

                  {/* サマリ */}
                  {post.summary && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  )}

                  {/* タグ */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t: string) => (
                        <span
                          key={t}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            t === decodedTag
                              ? "bg-sky-500 text-white"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 戻るリンク */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-sky-200 text-sky-700 font-semibold rounded-full hover:bg-sky-50 hover:border-sky-300 transition-all duration-200 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            タグ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
