// src/components/posts/SummaryBox.tsx（モダン版）
import type { ReactNode } from "react";

type SummaryBoxProps = {
  title?: string;
  children: ReactNode;
};

export function SummaryBox({ title = "まとめ", children }: SummaryBoxProps) {
  return (
    <div className="my-8 relative">
      {/* 装飾的なトップバー */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 rounded-t-xl" />

      <div className="rounded-xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/30 to-cyan-50/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* ヘッダー */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-sky-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center shadow-md">
              <span className="text-2xl">📘</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* コンテンツ */}
          <div className="text-gray-700 leading-relaxed prose-summary">
            {children}
          </div>
        </div>

        {/* 下部の装飾ライン */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 rounded-b-xl opacity-60" />
      </div>
    </div>
  );
}
