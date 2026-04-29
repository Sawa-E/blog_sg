import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

type RelatedPostsProps = {
  currentSlug: string;
  tags?: string[];
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export function RelatedPosts({ currentSlug, tags = [] }: RelatedPostsProps) {
  const related = getAllPostsMeta()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      matchCount: p.tags?.filter((t) => tags.includes(t)).length ?? 0,
    }))
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return Number(new Date(b.date)) - Number(new Date(a.date));
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="related">
      <h3>Related posts</h3>
      <div className="related__grid">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="related__card"
          >
            <span className="date">{formatDate(post.date)}</span>
            <h4>{post.title}</h4>
            {post.summary && <p>{post.summary}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
