// src/components/posts/Toc.tsx（改善版）
"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function Toc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // 📌 本文のみを対象にする（article#article-content内のみ）
      const articleContent = document.querySelector("#article-content");
      if (!articleContent) return;

      const headings = Array.from(
        articleContent.querySelectorAll("h2, h3")
      ) as HTMLHeadingElement[];

      const seen = new Set<string>();
      const newItems: TocItem[] = [];

      headings.forEach((h) => {
        // 絵文字を除去してIDを生成
        const textWithoutEmoji = h.innerText
          .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
          .trim();
        const baseId = textWithoutEmoji.replace(/\s+/g, "-").toLowerCase();
        let id = baseId;

        let counter = 1;
        while (seen.has(id)) {
          counter++;
          id = `${baseId}-${counter}`;
        }
        seen.add(id);

        h.id = id;

        newItems.push({
          id,
          text: textWithoutEmoji,
          level: h.tagName === "H2" ? 2 : 3,
        });
      });

      setItems(newItems);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // アクティブな見出しの追跡
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className="
        hidden xl:block
        w-64
        self-start
        sticky
        top-24
        max-h-[calc(100vh-120px)]
        overflow-auto
        text-sm
      "
      aria-label="目次"
    >
      <div className="rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-4 shadow-sm">
        <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-sky-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          目次
        </p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`
                  block py-1.5 px-3 rounded-lg text-sm transition-all duration-200
                  ${item.level === 3 ? "ml-4 text-xs" : ""}
                  ${
                    activeId === item.id
                      ? "bg-sky-100 text-sky-700 font-semibold"
                      : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
