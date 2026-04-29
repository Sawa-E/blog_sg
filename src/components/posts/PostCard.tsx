import Link from "next/link";
import type { PostMeta } from "@/lib/posts/type";

type PostCardProps = {
  post: PostMeta;
  highlightTag?: string;
  showReadingTime?: boolean;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function PostCard({
  post,
  highlightTag,
  showReadingTime = true,
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-item"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="post-item__date">{formatDate(post.date)}</div>
      <div className="post-item__body">
        <h4>{post.title}</h4>
        {post.summary && <p>{post.summary}</p>}
        {((post.tags && post.tags.length > 0) || (showReadingTime && post.readingTime)) && (
          <div className="post-item__tags">
            {post.tags?.map((t) => (
              <span
                key={t}
                className={`tag${t === highlightTag ? " tag--solid" : ""}`}
              >
                #{t}
              </span>
            ))}
            {showReadingTime && post.readingTime && (
              <span className="tag tag--ghost">
                {post.readingTime} min read
              </span>
            )}
          </div>
        )}
      </div>
      <div className="post-item__arrow" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}
