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
      const articleContent = document.querySelector("#article-content");
      if (!articleContent) return;

      const headings = Array.from(
        articleContent.querySelectorAll("h2, h3"),
      ) as HTMLHeadingElement[];

      const seen = new Set<string>();
      const newItems: TocItem[] = [];

      headings.forEach((h) => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-label="目次">
      <div className="toc__title">On this page</div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "h3" : ""}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
