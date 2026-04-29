"use client";

import { useEffect, useState } from "react";

type Options<T> = {
  items: T[];
  enabled?: boolean;
  onSelect?: (item: T) => void;
  onEscape?: () => void;
};

export function useListNavigation<T>({
  items,
  enabled = true,
  onSelect,
  onEscape,
}: Options<T>) {
  const [rawIndex, setRawIndex] = useState(0);
  const selectedIndex = items.length === 0 ? 0 : Math.min(rawIndex, items.length - 1);

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (items.length === 0 && e.key !== "Escape") return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setRawIndex((p) => (p < items.length - 1 ? p + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setRawIndex((p) => (p > 0 ? p - 1 : items.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (items[selectedIndex] && onSelect) onSelect(items[selectedIndex]);
          break;
        case "Escape":
          e.preventDefault();
          onEscape?.();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, items, selectedIndex, onSelect, onEscape]);

  return { selectedIndex, setSelectedIndex: setRawIndex };
}
