// src/components/posts/SummaryBox.tsx
import type { ReactNode } from "react";

type SummaryBoxProps = {
  title?: string;
  children: ReactNode;
};

/**
 * SummaryBox component for displaying article summaries
 * Callout と同じレイアウトで、色とアイコンだけ変えた版
 * MDX から <SummaryBox>〜</SummaryBox> で使用
 */
export function SummaryBox({
  title = "今日のまとめ",
  children,
}: SummaryBoxProps) {
  return (
    <section
      className="
        my-6 rounded-xl border px-4 py-3 text-sm shadow-sm
        border-sky-200 bg-sky-50/80 text-sky-950
      "
    >
      <div className="flex items-start gap-3">
        {/* 左アイコン（Callout と同じノリ） */}
        <div className="mt-[2px] text-lg" aria-hidden="true">
          📘
        </div>

        <div className="min-w-0">
          {/* タイトル行 */}
          {title && (
            <div className="font-semibold mb-1 text-sky-900">{title}</div>
          )}

          {/* 本文（箇条書きなど） */}
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
    </section>
  );
}
