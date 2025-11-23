// src/lib/posts/getAllPosts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PostMeta, Post } from "./type";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Extract slug from filename
 * Expected format: YYYY-MM-DD-slug.mdx
 *
 * @param filename - The filename to extract slug from
 * @returns The extracted slug
 */
function extractSlug(filename: string): string {
  const base = filename.replace(/\.mdx?$/, ""); // Remove extension
  // First 10 characters are "YYYY-MM-DD", skip the next hyphen
  const rest = base.slice(11); // Characters from position 11 onwards are the slug
  return rest || base; // Fallback to base if slug is empty
}

/**
 * Get post metadata from a single file
 *
 * @param filePath - Full path to the post file
 * @param filename - Filename of the post
 * @param includeContent - Whether to include the MDX content (for search)
 * @returns Post metadata
 */
function getPostMetaFromFile(
  filePath: string,
  filename: string,
  includeContent = false // ← 新しいパラメータ
): PostMeta {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents); // ← contentも取得

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
    ...(includeContent && { content }), // ← contentを条件付きで追加
  };
}

/**
 * Get all posts metadata (with optional content for search)
 * Posts are sorted by date in descending order
 *
 * @param includeContent - Whether to include MDX content (default: true for search)
 * @returns Array of post metadata
 */
export function getAllPostsMeta(includeContent = true): PostMeta[] {
  // ← デフォルトtrue
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((filename) => {
    const fullPath = path.join(POSTS_DIR, filename);
    return getPostMetaFromFile(fullPath, filename, includeContent); // ← 引数を渡す
  });

  // Sort by date in descending order
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get a single post by slug (including content)
 *
 * @param slug - The post slug to retrieve
 * @returns Full post data with content, or null if not found
 */
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
  const { content } = matter(fileContents);

  const meta = getPostMetaFromFile(fullPath, targetFile);

  return {
    ...meta,
    content,
  };
}
