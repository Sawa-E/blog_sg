// src/components/posts/SummaryBox.tsx
import type { ReactNode } from "react";

type SummaryBoxProps = {
  title?: string;
  children: ReactNode;
};

export function SummaryBox({
  title = "今日のまとめ",
  children,
}: SummaryBoxProps) {
  return (
    <section className="my-8 rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3">
      <div
        className="text-sm font-semibold text-sky-800 mb-2 flex items-center gap-2"
        role="heading"
        aria-level={3}
      >
        <span>📘</span>
        <span>{title}</span>
      </div>

      <div className="text-sm text-gray-800 leading-relaxed">{children}</div>
    </section>
  );
}
