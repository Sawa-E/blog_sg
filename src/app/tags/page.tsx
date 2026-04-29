import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { generatePageMetadata } from "@/lib/seo";
import { aggregateTags } from "@/lib/tags";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "タグ一覧",
  description: "そーがの日記の全タグ一覧。記事をタグで探せます。",
  path: "/tags",
});

export default function TagsPage() {
  const posts = getAllPostsMeta();
  const allTags = aggregateTags(posts);

  return (
    <div className="app-route container">
      <section className="tag-hero">
        <div className="breadcrumb">
          <Link href="/">home</Link> / <strong style={{ color: "var(--ink)" }}>tags</strong>
        </div>
        <h1>Tags</h1>
        <p>
          全 {allTags.length} 個のタグから記事を探す。
        </p>
        <div className="tag-hero__count">
          <strong>{allTags.length}</strong> tags
        </div>

        <div className="tag-pills">
          {allTags.map((t) => (
            <Link key={t.name} href={`/tags/${t.name}`} className="tag-pill">
              #{t.name} <span className="count">{t.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
