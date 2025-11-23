// src/components/posts/TagSearch.tsx（修正版）
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Tag = {
  name: string;
  count: number;
};

type TagSearchProps = {
  allTags: Tag[];
};

export function TagSearch({ allTags }: TagSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // タグをフィルタリング（派生値として計算）
  const filteredTags =
    query.length > 0
      ? allTags
          .filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8)
      : [];

  const isOpen = filteredTags.length > 0;

  // クエリが変わったら選択位置をリセット
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0); // クエリ変更時に直接リセット
  };

  // 外側クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // キーボード操作
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredTags.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTags.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredTags[selectedIndex]) {
          window.location.href = `/tags/${filteredTags[selectedIndex].name}`;
        }
        break;
      case "Escape":
        e.preventDefault();
        setQuery("");
        inputRef.current?.blur();
        break;
    }
  };

  // タグの色を生成（ハッシュから）
  const getTagColor = (tag: string) => {
    const colors = [
      "bg-sky-100 text-sky-700 border-sky-200",
      "bg-cyan-100 text-cyan-700 border-cyan-200",
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-teal-100 text-teal-700 border-teal-200",
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    ];
    const hash = tag
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="relative w-full max-w-md">
      {/* 検索入力 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="タグを検索... (例: diary, mdx)"
          className="w-full px-4 py-3 pl-11 pr-10 rounded-xl border-2 border-sky-200 bg-white/80 backdrop-blur-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all duration-200"
        />

        {/* 検索アイコン */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500"
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

        {/* クリアボタン */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-600"
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
        )}
      </div>

      {/* サジェストドロップダウン */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 rounded-xl border-2 border-sky-200 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden animate-fade-in"
        >
          {/* ヘッダー */}
          <div className="px-4 py-2 bg-gradient-to-r from-sky-100 to-cyan-100 border-b border-sky-200">
            <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
              {filteredTags.length}件のタグが見つかりました
            </p>
          </div>

          {/* タグリスト */}
          <div className="max-h-80 overflow-y-auto">
            {filteredTags.map((tag, index) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name}`}
                className={`
                  block px-4 py-3 transition-all duration-150
                  ${
                    index === selectedIndex
                      ? "bg-sky-100 border-l-4 border-sky-500"
                      : "hover:bg-sky-50 border-l-4 border-transparent"
                  }
                `}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* タグ名 */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(
                        tag.name
                      )}`}
                    >
                      #{tag.name}
                    </span>
                  </div>

                  {/* 記事数 */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="font-medium">{tag.count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* フッター（キーボードヒント） */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded">
                ↑↓
              </kbd>
              選択
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded">
                Enter
              </kbd>
              開く
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded">
                Esc
              </kbd>
              閉じる
            </span>
          </div>
        </div>
      )}

      {/* 検索結果なし */}
      {query.length > 0 && !isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 rounded-xl border-2 border-sky-200 bg-white/95 backdrop-blur-sm shadow-xl p-6 text-center animate-fade-in"
        >
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-700 font-medium mb-1">
            「{query}」に一致するタグが見つかりませんでした
          </p>
          <p className="text-sm text-gray-500">
            別のキーワードで試してみてください
          </p>
        </div>
      )}
    </div>
  );
}
