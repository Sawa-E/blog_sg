// src/app/posts/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts/getAllPosts";
import { Toc } from "@/components/posts/Toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/posts/mdxComponents";
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

  return {
    title: `${post.title} | そーがの日記`,
    description: post.summary ?? "そーがの日記のブログ記事",
  };
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
    <main className="min-h-screen body-sea text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 2カラム (本文 + 目次) */}
        <div className="flex items-start gap-8">
          {/* 左：本文 */}
          <article className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-2">{post.date}</div>
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

            {/* MDX content using RSC API */}
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
