// src/lib/posts/types.ts
export type PostMeta = {
  slug: string; // URL に使う slug（例: "hello-world"）
  title: string;
  date: string; // ISO形式の文字列
  summary?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  content: string; // MDX 本文（ひとまず文字列のまま）
};
