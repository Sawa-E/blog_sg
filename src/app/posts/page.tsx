import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { PostsBrowser } from "@/components/posts/PostsBrowser";
import { generatePageMetadata } from "@/lib/seo";
import { aggregateTags } from "@/lib/tags";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "記事一覧",
  description: "そーがの日記の全記事一覧",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPostsMeta().sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
  const allTags = aggregateTags(posts);

  return (
    <div className="app-route container">
      <section className="page-head">
        <span className="eyebrow">Archive</span>
        <h1>すべての記事</h1>
        <p>
          これまで書いた {posts.length} 本のエントリ。タグや検索で絞り込めます。
        </p>
        <PostsBrowser posts={posts} tags={allTags.slice(0, 6)} />
      </section>
    </div>
  );
}
