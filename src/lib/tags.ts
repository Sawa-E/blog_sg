import type { PostMeta } from "@/lib/posts/type";

export type TagWithCount = {
  name: string;
  count: number;
};

const GRADIENT_COLORS = [
  "from-sky-400 to-cyan-400",
  "from-blue-400 to-indigo-400",
  "from-cyan-400 to-teal-400",
  "from-emerald-400 to-green-400",
  "from-teal-400 to-cyan-400",
] as const;

const SOFT_COLORS = [
  "bg-sky-100 text-sky-700 border-sky-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
] as const;

function hashTag(tag: string): number {
  return tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

export function getTagGradient(tag: string): string {
  return GRADIENT_COLORS[hashTag(tag) % GRADIENT_COLORS.length];
}

export function getTagSoftColor(tag: string): string {
  return SOFT_COLORS[hashTag(tag) % SOFT_COLORS.length];
}

export function getTagSize(count: number, maxCount: number): string {
  const ratio = count / maxCount;
  if (ratio > 0.7) return "text-3xl px-6 py-3";
  if (ratio > 0.4) return "text-2xl px-5 py-2.5";
  if (ratio > 0.2) return "text-xl px-4 py-2";
  return "text-lg px-3 py-1.5";
}

export function aggregateTags(posts: PostMeta[]): TagWithCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    post.tags?.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedTags(
  posts: PostMeta[],
  excludeTag: string,
  limit = 5,
): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    post.tags?.forEach((tag) => {
      if (tag !== excludeTag) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    });
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
