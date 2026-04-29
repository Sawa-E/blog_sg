"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts/type";
import { MATCH_STYLES, searchPosts, type SearchResult } from "@/lib/search";
import { useListNavigation } from "@/hooks/useListNavigation";
import { Icon, ICON_PATHS } from "@/components/common/Icon";

type GlobalSearchProps = {
  isOpen: boolean;
  onClose: () => void;
  allPosts: PostMeta[];
};

const KEY_HINTS = [
  { key: "↑↓", label: "選択" },
  { key: "Enter", label: "開く" },
  { key: "Esc", label: "閉じる" },
];

export function GlobalSearch({ isOpen, onClose, allPosts }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchPosts(allPosts, query);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const { selectedIndex, setSelectedIndex } = useListNavigation<SearchResult>({
    items: results,
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
      if (target.classList.contains("global-search-backdrop")) handleClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="global-search-backdrop fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <Icon d={ICON_PATHS.search} className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">記事を検索</h2>
            <button
              onClick={handleClose}
              className="ml-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="閉じる"
            >
              <Icon d={ICON_PATHS.close} className="w-5 h-5" />
            </button>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事のタイトル、本文、タグで検索..."
            className="w-full px-5 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:outline-none text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.length === 0 ? (
            <EmptyState />
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

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-500">
          {KEY_HINTS.map((hint) => (
            <span key={hint.key} className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded shadow-sm">
                {hint.key}
              </kbd>
              {hint.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-8 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-gray-600 mb-2">記事を検索してみましょう</p>
      <p className="text-sm text-gray-500">
        タイトル、本文、タグから検索できます
      </p>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="p-8 text-center">
      <div className="text-6xl mb-4">😢</div>
      <p className="text-gray-700 font-medium mb-2">
        「{query}」に一致する記事が見つかりませんでした
      </p>
      <p className="text-sm text-gray-500">別のキーワードで試してみてください</p>
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
    <div>
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {results.length}件の記事が見つかりました
        </p>
      </div>
      <div>
        {results.map((result, index) => {
          const style = MATCH_STYLES[result.matchType];
          return (
            <Link
              key={result.slug}
              href={`/posts/${result.slug}`}
              className={`block px-6 py-4 transition-all duration-150 border-l-4 ${
                index === selectedIndex
                  ? "bg-sky-50 border-sky-500"
                  : "hover:bg-gray-50 border-transparent"
              }`}
              onMouseEnter={() => onHover(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${style.color}`}
                  >
                    <span>{style.icon}</span>
                    <span>{style.label}</span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                    {result.title}
                  </h3>
                  {(result.snippet || result.summary) && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {result.snippet ?? result.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <time>{result.date}</time>
                    {result.tags && result.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
