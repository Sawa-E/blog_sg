// src/lib/posts/getAllPosts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PostMeta, Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// ファイル名 "YYYY-MM-DD-slug.mdx" から slug 部分だけ取り出す
function extractSlug(filename: string): string {
  // 例: 2025-11-20-hello-world.mdx
  const base = filename.replace(/\.mdx?$/, ""); // 拡張子除去
  // 最初の 10 文字は "YYYY-MM-DD"
  const rest = base.slice(11); // 11文字目以降が slug
  return rest || base; // 念のため slug が空なら base を返す
}

// 1ファイルから PostMeta を作る
function getPostMetaFromFile(filePath: string, filename: string): PostMeta {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContents);

  const slug = extractSlug(filename);

  const title = data.title ?? slug;
  const date = data.date ?? "1970-01-01";
  const summary = data.summary ?? "";
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return {
    slug,
    title,
    date,
    summary,
    tags,
  };
}

// 全記事のメタ情報を取得（本文なし）
export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((filename) => {
    const fullPath = path.join(POSTS_DIR, filename);
    return getPostMetaFromFile(fullPath, filename);
  });

  // date 降順にソート
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// slug から本文つきで取得する関数（詳細ページ用）
export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const targetFile = files.find((filename) => {
    return extractSlug(filename) === slug;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(POSTS_DIR, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const meta = getPostMetaFromFile(fullPath, targetFile);

  return {
    ...meta,
    content,
  };
}
