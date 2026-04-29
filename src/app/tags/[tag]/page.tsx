import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { PostCard } from "@/components/posts/PostCard";
import { generatePageMetadata } from "@/lib/seo";
import { aggregateTags } from "@/lib/tags";
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
  const tagSet = new Set<string>();
  getAllPostsMeta().forEach((post) =>
    post.tags?.forEach((t) => tagSet.add(t)),
  );
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getAllPostsMeta()
    .filter((p) => p.tags?.includes(decodedTag))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  if (posts.length === 0) notFound();

  const allTags = aggregateTags(getAllPostsMeta());

  return (
    <div className="app-route container">
      <section className="tag-hero">
        <div className="breadcrumb">
          <Link href="/">home</Link> / <Link href="/tags">tags</Link> /{" "}
          <strong style={{ color: "var(--ink)" }}>{decodedTag}</strong>
        </div>
        <h1>
          <span className="hash">#</span>
          {decodedTag}
        </h1>
        <p>「{decodedTag}」のタグがついた記事のアーカイブ。</p>
        <div className="tag-hero__count">
          <strong>{posts.length}</strong> posts
        </div>

        <div className="tag-pills">
          {allTags.map((t) => (
            <Link
              key={t.name}
              href={`/tags/${t.name}`}
              className={`tag-pill${t.name === decodedTag ? " active" : ""}`}
            >
              #{t.name} <span className="count">{t.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="list" style={{ marginTop: 24 }}>
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} highlightTag={decodedTag} />
        ))}
      </section>
    </div>
  );
}
