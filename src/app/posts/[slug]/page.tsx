// src/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts/getAllPosts";
import { Toc } from "@/components/posts/Toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/posts/mdxComponents";
import { RelatedPosts } from "@/components/posts/RelatedPosts";
import { ShareButtons } from "@/components/posts/ShareButtons";
import { ReadingProgress } from "@/components/posts/ReadingProgress";
import { ScrollToTop } from "@/components/posts/ScrollToTop";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません | そーがの日記",
    };
  }

  // 🆕 generatePageMetadata を使用
  return generatePageMetadata({
    title: post.title,
    description: post.summary ?? "そーがの日記のブログ記事",
    path: `/posts/${slug}`,
    type: "article",
  });
}

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* プログレスバー */}
      <ReadingProgress />

      <main className="min-h-screen body-sea text-gray-900">
        {/* 記事ヘッダーセクション */}
        <header className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-b border-sky-100 py-12">
          <div className="max-w-3xl mx-auto px-4">
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
              <span className="text-gray-700">現在の記事</span>
            </nav>

            {/* タグ */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* タイトル */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <time className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {post.date}
              </time>
            </div>
          </div>
        </header>

        {/* 記事本文エリア */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-start gap-8">
            {/* 本文 */}
            <article className="flex-1 min-w-0" id="article-content">
              <div className="prose-post-wrapper">
                <div className="prose-post">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeHighlight, rehypeKatex],
                      },
                    }}
                  />
                </div>
              </div>

              {/* 記事終了後のアクション */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <ShareButtons title={post.title} slug={slug} />
              </div>
            </article>

            {/* 目次 */}
            <Toc />
          </div>

          {/* 関連記事 */}
          <div className="mt-16" id="related-posts">
            <RelatedPosts currentSlug={slug} tags={post.tags} />
          </div>

          {/* ナビゲーション */}
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium group transition-colors"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
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
              記事一覧に戻る
            </Link>
            <ScrollToTop />
          </div>
        </div>
      </main>
    </>
  );
}
