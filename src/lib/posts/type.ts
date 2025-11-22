// src/lib/posts/type.ts

/**
 * Post metadata without content
 * Used for listing posts on index pages
 */
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  thumbnail?: string;
  readingTime?: number;
};

export type Post = PostMeta & {
  content: string;
};
