// src/lib/posts/type.ts

/**
 * Post metadata without content
 * Used for listing posts on index pages
 */
export type PostMeta = {
  /** URL slug (e.g., "hello-world") */
  slug: string;
  /** Post title */
  title: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Short summary/description */
  summary?: string;
  /** Array of tag names */
  tags?: string[];
  thumbnail?: string; // 🆕 サムネイル画像のパス
  readingTime?: number; // 🆕 読了時間（分）
};

/**
 * Full post data including content
 * Used for rendering individual post pages
 */
export type Post = PostMeta & {
  /** Raw MDX content */
  content: string;
};
