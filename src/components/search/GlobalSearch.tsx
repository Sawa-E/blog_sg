"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts/type";
import { MATCH_LABELS, searchPosts, type SearchResult } from "@/lib/search";
import { useListNavigation } from "@/hooks/useListNavigation";

type GlobalSearchProps = {
  isOpen: boolean;
  onClose: () => void;
  allPosts: PostMeta[];
};

export function GlobalSearch({ isOpen, onClose, allPosts }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchPosts(allPosts, query);
  const recentPosts = useMemo<SearchResult[]>(
    () =>
      [...allPosts]
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
        .slice(0, 5)
        .map((p) => ({ ...p, matchType: "title" as const })),
    [allPosts],
  );

  const navigationItems = query.length === 0 ? recentPosts : results;

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const { selectedIndex, setSelectedIndex } = useListNavigation<SearchResult>({
    items: navigationItems,
    enabled: isOpen,
    onSelect: (item) => {
      window.location.href = `/posts/${item.slug}`;
    },
    onEscape: handleClose,
  });

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("gs-backdrop")) handleClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="gs-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="記事を検索"
    >
      <div className="gs-modal">
        <div className="gs-input-row">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="タイトル・本文・タグで検索…"
            className="gs-input"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={handleClose}
            className="gs-close"
            aria-label="閉じる"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="gs-body">
          {query.length === 0 ? (
            <RecentList
              posts={recentPosts}
              selectedIndex={selectedIndex}
              onHover={setSelectedIndex}
            />
          ) : results.length > 0 ? (
            <ResultsList
              results={results}
              selectedIndex={selectedIndex}
              onHover={setSelectedIndex}
            />
          ) : (
            <NoResults query={query} />
          )}
        </div>
      </div>
    </div>
  );
}

function RecentList({
  posts,
  selectedIndex,
  onHover,
}: {
  posts: SearchResult[];
  selectedIndex: number;
  onHover: (i: number) => void;
}) {
  if (posts.length === 0) return null;
  return (
    <div className="gs-empty">
      <p className="gs-empty__title">最近の記事</p>
      <ResultRows
        results={posts}
        selectedIndex={selectedIndex}
        onHover={onHover}
        showMatchType={false}
      />
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="gs-no-result">
      <p className="gs-no-result__title">
        <span className="gs-no-result__query">「{query}」</span>
        に一致する記事がありません
      </p>
      <p className="gs-no-result__hint">別のキーワードで試してみてください</p>
    </div>
  );
}

function ResultsList({
  results,
  selectedIndex,
  onHover,
}: {
  results: SearchResult[];
  selectedIndex: number;
  onHover: (i: number) => void;
}) {
  return (
    <>
      <div className="gs-meta">{results.length} results</div>
      <ResultRows
        results={results}
        selectedIndex={selectedIndex}
        onHover={onHover}
        showMatchType
      />
    </>
  );
}

function ResultRows({
  results,
  selectedIndex,
  onHover,
  showMatchType,
}: {
  results: SearchResult[];
  selectedIndex: number;
  onHover: (i: number) => void;
  showMatchType: boolean;
}) {
  return (
    <div className="gs-results">
      {results.map((result, index) => (
        <Link
          key={result.slug}
          href={`/posts/${result.slug}`}
          className="gs-result"
          data-active={index === selectedIndex}
          onMouseEnter={() => onHover(index)}
        >
          <div>
            <h3 className="gs-result__title">{result.title}</h3>
            {(result.snippet || result.summary) && (
              <p className="gs-result__snippet">
                {result.snippet ?? result.summary}
              </p>
            )}
            <div className="gs-result__meta">
              {showMatchType && (
                <span className="gs-result__match">
                  {MATCH_LABELS[result.matchType]}
                </span>
              )}
              <time>{result.date}</time>
              {result.tags && result.tags.length > 0 && (
                <div className="gs-result__tags">
                  {result.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="gs-result__tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <svg
            className="gs-result__arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      ))}
    </div>
  );
}
