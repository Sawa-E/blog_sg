// src/components/posts/RelatedPosts.tsx（改善版）
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";

type RelatedPostsProps = {
  currentSlug: string;
  tags?: string[];
};

export function RelatedPosts({ currentSlug, tags = [] }: RelatedPostsProps) {
  const allPosts = getAllPostsMeta();

  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const matchCount =
        post.tags?.filter((tag) => tags.includes(tag)).length || 0;
      return { ...post, matchCount };
    })
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return Number(new Date(b.date)) - Number(new Date(a.date));
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <span className="text-3xl">🔗</span>
        <span>関連記事</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.slug}
            className="block group"
          >
            <article className="h-full rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
              {/* 波アニメーション背景 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

              <div className="relative z-10">
                <time className="text-xs text-gray-500 font-medium">
                  {post.date}
                </time>
                <h3 className="text-base font-bold mt-2 mb-3 text-gray-900 line-clamp-2 group-hover:text-sky-700 transition-colors leading-snug">
                  {post.title}
                </h3>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
