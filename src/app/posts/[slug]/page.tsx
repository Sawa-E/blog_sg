// src/app/posts/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts/getAllPosts";
import { PostContent } from "@/components/posts/PostContent";
import { Toc } from "@/components/posts/Toc";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  // Next.js 16 + React Compiler で params が Promise になるパターンに対応
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen body-sea text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/" className="site-title-sea">
            そーがの日記
          </Link>
          <Link href="/posts" className="text-sm link-sea">
            記事一覧
          </Link>
        </header>

        {/* 2カラム (本文 + 目次) */}
        <div className="flex items-start gap-8">
          {/* 左：本文 */}
          <article className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-2">{post.date}</div>
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

            <PostContent content={post.content} />
          </article>

          {/* 右：目次 */}
          <Toc />
        </div>

        <div className="mt-10">
          <Link href="/posts" className="text-sm link-sea">
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
