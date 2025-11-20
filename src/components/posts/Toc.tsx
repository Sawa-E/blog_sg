"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function Toc() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const seen = new Set<string>();
    const newItems: TocItem[] = [];

    headings.forEach((h) => {
      const baseId = h.innerText.replace(/\s+/g, "-");
      let id = baseId;

      // 重複防止：存在したら番号を振る
      let counter = 1;
      while (seen.has(id)) {
        counter++;
        id = `${baseId}-${counter}`;
      }
      seen.add(id);

      // 実際のDOMにもIDをつける（#anchor 用）
      h.id = id;

      newItems.push({
        id,
        text: h.innerText,
        level: h.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(newItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      className="
        hidden xl:block
        w-64
        ml-4
        self-start
        sticky
        top-24
        max-h-[80vh]
        overflow-auto
        text-sm
        text-gray-700
      "
    >
      <p className="font-semibold mb-2">目次</p>
      <ul className="space-y-1 border-l pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block hover:text-blue-600 ${
                item.level === 3 ? "ml-3 text-[13px]" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
