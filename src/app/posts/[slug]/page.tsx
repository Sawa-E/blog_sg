import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts/getAllPosts";
import { Toc } from "@/components/posts/Toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/posts/mdxComponents";
import { RelatedPosts } from "@/components/posts/RelatedPosts";
import { ShareButtons } from "@/components/posts/ShareButtons";
import { ReadingProgress } from "@/components/posts/ReadingProgress";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDateLong(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "記事が見つかりません | そーがの日記" };

  return generatePageMetadata({
    title: post.title,
    description: post.summary ?? "そーがの日記のブログ記事",
    path: `/posts/${slug}`,
    type: "article",
  });
}

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="app-route">
      <ReadingProgress />
      <div className="container">
        <div className="article">
          <main className="article__main" id="article-content">
            <header className="article__head">
              <Link href="/posts" className="article__back">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
                記事一覧へ
              </Link>

              {post.tags && post.tags.length > 0 && (
                <div className="post-item__tags" style={{ marginTop: 0 }}>
                  {post.tags.map((t) => (
                    <Link key={t} href={`/tags/${t}`} className="tag">
                      #{t}
                    </Link>
                  ))}
                </div>
              )}

              <h1>{post.title}</h1>

              <div className="article__meta">
                <span className="article__author">
                  <span className="avatar" /> そーが
                </span>
                <span className="sep" />
                <span>{formatDateLong(post.date)}</span>
                {post.readingTime && (
                  <>
                    <span className="sep" />
                    <span>{post.readingTime} 分で読めます</span>
                  </>
                )}
              </div>
            </header>

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

            <ShareButtons slug={slug} />

            <RelatedPosts currentSlug={slug} tags={post.tags} />
          </main>

          <aside>
            <Toc />
          </aside>
        </div>
      </div>
    </div>
  );
}
