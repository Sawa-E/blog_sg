import type { PostMeta } from "@/lib/posts/type";

export type MatchType = "title" | "summary" | "tag" | "content";

export type SearchResult = PostMeta & {
  matchType: MatchType;
  snippet?: string;
};

const MAX_RESULTS = 10;

function makeSnippet(
  source: string,
  query: string,
  pad: number,
  sanitizeMdx = false,
): string {
  const lower = source.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx < 0) return "";
  const start = Math.max(0, idx - pad);
  const end = Math.min(source.length, idx + query.length + pad);
  let body = source.slice(start, end);
  if (sanitizeMdx) {
    body = body.replace(/[#*_`\[\]]/g, "").replace(/\n+/g, " ").trim();
  }
  return (
    (start > 0 ? "..." : "") + body + (end < source.length ? "..." : "")
  );
}

export function searchPosts(
  posts: PostMeta[],
  query: string,
): SearchResult[] {
  if (!query) return [];
  const lower = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const post of posts) {
    if (post.title.toLowerCase().includes(lower)) {
      results.push({ ...post, matchType: "title" });
      continue;
    }
    if (post.summary?.toLowerCase().includes(lower)) {
      results.push({
        ...post,
        matchType: "summary",
        snippet: makeSnippet(post.summary, lower, 30),
      });
      continue;
    }
    if (post.content?.toLowerCase().includes(lower)) {
      results.push({
        ...post,
        matchType: "content",
        snippet: makeSnippet(post.content, lower, 40, true),
      });
      continue;
    }
    if (post.tags?.some((tag) => tag.toLowerCase().includes(lower))) {
      results.push({ ...post, matchType: "tag" });
    }
  }
  return results.slice(0, MAX_RESULTS);
}

export const MATCH_STYLES: Record<
  MatchType,
  { icon: string; label: string; color: string }
> = {
  title: { icon: "📄", label: "タイトル", color: "text-sky-600 bg-sky-50" },
  summary: { icon: "📝", label: "概要", color: "text-cyan-600 bg-cyan-50" },
  content: { icon: "📖", label: "本文", color: "text-blue-600 bg-blue-50" },
  tag: { icon: "🏷️", label: "タグ", color: "text-emerald-600 bg-emerald-50" },
};
