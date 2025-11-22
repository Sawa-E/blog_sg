// src/components/posts/PostCard.tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/posts/type";

type PostCardProps = {
  post: PostMeta;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group h-full">
      <article className="h-full rounded-2xl border border-sky-100 bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* サムネイル画像 */}
        {post.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-sky-100 to-cyan-100">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading={priority ? "eager" : "lazy"}
            />
            {/* オーバーレイグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* コンテンツ部分 */}
        <div className="p-6 relative">
          {/* 波アニメーション背景 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

          <div className="relative z-10">
            {/* メタ情報 */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <time className="font-medium">{post.date}</time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {post.readingTime}分
                  </span>
                </>
              )}
            </div>

            {/* タイトル */}
            <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-sky-700 transition-colors">
              {post.title}
            </h3>

            {/* サマリ */}
            {post.summary && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.summary}
              </p>
            )}

            {/* タグ */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-400 self-center">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
