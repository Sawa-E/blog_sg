// src/components/search/GlobalSearch.tsx（完全修正版）
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts/type";

type SearchResult = PostMeta & {
  matchType: "title" | "summary" | "tag" | "content";
  snippet?: string;
};

type GlobalSearchProps = {
  isOpen: boolean;
  onClose: () => void;
  allPosts: PostMeta[];
};

export function GlobalSearch({ isOpen, onClose, allPosts }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 検索実行
  const searchPosts = (searchQuery: string): SearchResult[] => {
    if (searchQuery.length === 0) return [];

    const lowerQuery = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    allPosts.forEach((post) => {
      // タイトルで検索
      if (post.title.toLowerCase().includes(lowerQuery)) {
        results.push({ ...post, matchType: "title" });
        return;
      }

      // サマリで検索
      if (post.summary?.toLowerCase().includes(lowerQuery)) {
        const index = post.summary.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, index - 30);
        const end = Math.min(
          post.summary.length,
          index + lowerQuery.length + 30
        );
        const snippet =
          (start > 0 ? "..." : "") +
          post.summary.slice(start, end) +
          (end < post.summary.length ? "..." : "");

        results.push({ ...post, matchType: "summary", snippet });
        return;
      }

      // 本文（content）で検索
      if (post.content?.toLowerCase().includes(lowerQuery)) {
        const index = post.content.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, index - 40);
        const end = Math.min(
          post.content.length,
          index + lowerQuery.length + 40
        );

        // MDX記号を除去してスニペット生成
        let snippet = post.content
          .slice(start, end)
          .replace(/[#*_`\[\]]/g, "") // MDX記号を除去
          .replace(/\n+/g, " ") // 改行をスペースに
          .trim();

        snippet =
          (start > 0 ? "..." : "") +
          snippet +
          (end < post.content.length ? "..." : "");

        results.push({ ...post, matchType: "content", snippet });
        return;
      }

      // タグで検索
      if (post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
        results.push({ ...post, matchType: "tag" });
        return;
      }
    });

    return results.slice(0, 10); // 最大10件
  };

  const searchResults = searchPosts(query);

  // モーダルが開いたら入力欄にフォーカス
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // isOpenが変わったときにクエリをリセット
  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  // クエリが変わったら選択位置をリセット
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  // キーボード操作
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            window.location.href = `/posts/${searchResults[selectedIndex].slug}`;
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, onClose]);

  // モーダル外クリックで閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("global-search-backdrop")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // マッチタイプのアイコンと色
  const getMatchStyle = (matchType: SearchResult["matchType"]) => {
    switch (matchType) {
      case "title":
        return {
          icon: "📄",
          label: "タイトル",
          color: "text-sky-600 bg-sky-50",
        };
      case "summary":
        return {
          icon: "📝",
          label: "概要",
          color: "text-cyan-600 bg-cyan-50",
        };
      case "content":
        return {
          icon: "📖",
          label: "本文",
          color: "text-blue-600 bg-blue-50",
        };
      case "tag":
        return {
          icon: "🏷️",
          label: "タグ",
          color: "text-emerald-600 bg-emerald-50",
        };
      default:
        return {
          icon: "📄",
          label: "その他",
          color: "text-gray-600 bg-gray-50",
        };
    }
  };

  return (
    <div className="global-search-backdrop fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* 検索ヘッダー */}
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-white">記事を検索</h2>
            <button
              onClick={onClose}
              className="ml-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="閉じる"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 検索入力 */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="記事のタイトル、本文、タグで検索..."
            className="w-full px-5 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:outline-none text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* 検索結果 */}
        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {query.length === 0 ? (
            // 初期状態
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 mb-2">記事を検索してみましょう</p>
              <p className="text-sm text-gray-500">
                タイトル、本文、タグから検索できます
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            // 検索結果あり
            <div>
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {searchResults.length}件の記事が見つかりました
                </p>
              </div>

              <div>
                {searchResults.map((result, index) => {
                  const matchStyle = getMatchStyle(result.matchType);

                  return (
                    <Link
                      key={result.slug}
                      href={`/posts/${result.slug}`}
                      className={`
                        block px-6 py-4 transition-all duration-150 border-l-4
                        ${
                          index === selectedIndex
                            ? "bg-sky-50 border-sky-500"
                            : "hover:bg-gray-50 border-transparent"
                        }
                      `}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-start gap-4">
                        {/* マッチタイプバッジ */}
                        <div className="flex-shrink-0 mt-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${matchStyle.color}`}
                          >
                            <span>{matchStyle.icon}</span>
                            <span>{matchStyle.label}</span>
                          </span>
                        </div>

                        {/* 記事情報 */}
                        <div className="flex-1 min-w-0">
                          {/* タイトル */}
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                            {result.title}
                          </h3>

                          {/* スニペット or サマリ */}
                          {result.snippet ? (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {result.snippet}
                            </p>
                          ) : result.summary ? (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {result.summary}
                            </p>
                          ) : null}

                          {/* メタ情報 */}
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
          ) : (
            // 検索結果なし
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">😢</div>
              <p className="text-gray-700 font-medium mb-2">
                「{query}」に一致する記事が見つかりませんでした
              </p>
              <p className="text-sm text-gray-500">
                別のキーワードで試してみてください
              </p>
            </div>
          )}
        </div>

        {/* フッター（キーボードヒント） */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded shadow-sm">
              ↑↓
            </kbd>
            選択
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded shadow-sm">
              Enter
            </kbd>
            開く
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded shadow-sm">
              Esc
            </kbd>
            閉じる
          </span>
        </div>
      </div>
    </div>
  );
}
