"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/posts/PostCard";
import type { PostMeta } from "@/lib/posts/type";
import type { TagWithCount } from "@/lib/tags";

type Props = {
  posts: PostMeta[];
  tags: TagWithCount[];
};

export function PostsBrowser({ posts, tags }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeTag && !p.tags?.includes(activeTag)) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${p.title} ${p.summary ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [posts, query, activeTag]);

  const byYear = useMemo(() => {
    const acc: Record<string, PostMeta[]> = {};
    for (const p of filtered) {
      const y = String(new Date(p.date).getFullYear());
      (acc[y] ||= []).push(p);
    }
    return acc;
  }, [filtered]);

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <div className="toolbar">
        <label className="search">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="キーワードで検索…"
          />
          {query && (
            <button
              type="button"
              className="btn btn--ghost"
              style={{ padding: "2px 6px" }}
              onClick={() => setQuery("")}
              aria-label="クリア"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </button>
          )}
        </label>
        <div className="tag-cloud">
          <button
            type="button"
            className={`tag-pill${!activeTag ? " active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            all <span className="count">{posts.length}</span>
          </button>
          {tags.map((t) => (
            <button
              type="button"
              key={t.name}
              className={`tag-pill${activeTag === t.name ? " active" : ""}`}
              onClick={() => setActiveTag(activeTag === t.name ? null : t.name)}
            >
              #{t.name} <span className="count">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="list" style={{ marginTop: 24 }}>
        {years.map((y) => (
          <div key={y} style={{ marginBottom: 32 }}>
            <div className="list__head">
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--ink-3)",
                  letterSpacing: "0.06em",
                }}
              >
                {y}
              </h3>
              <span style={{ color: "var(--ink-3)", fontSize: 12 }}>
                {byYear[y].length} posts
              </span>
            </div>
            {byYear[y].map((p) => (
              <PostCard key={p.slug} post={p} highlightTag={activeTag ?? undefined} />
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              padding: "60px 0",
              textAlign: "center",
              color: "var(--ink-3)",
            }}
          >
            該当する記事が見つかりませんでした。
          </div>
        )}
      </section>
    </>
  );
}
