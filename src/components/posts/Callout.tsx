// src/components/posts/Callout.tsx（モダン版）
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "note" | "success" | "danger";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const styleMap: Record<
  CalloutType,
  {
    container: string;
    icon: string;
    iconBg: string;
    emoji: string;
  }
> = {
  info: {
    container: "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
    emoji: "💡",
  },
  warning: {
    container: "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50",
    icon: "text-amber-600",
    iconBg: "bg-amber-100",
    emoji: "⚠️",
  },
  tip: {
    container:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-100",
    emoji: "✨",
  },
  note: {
    container: "border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50",
    icon: "text-slate-600",
    iconBg: "bg-slate-100",
    emoji: "📝",
  },
  success: {
    container: "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    emoji: "✅",
  },
  danger: {
    container: "border-red-200 bg-gradient-to-br from-red-50 to-pink-50",
    icon: "text-red-600",
    iconBg: "bg-red-100",
    emoji: "🚨",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = styleMap[type];

  return (
    <div
      className={`
        my-6 rounded-xl border-2 ${style.container}
        p-5 shadow-sm hover:shadow-md transition-all duration-300
        relative overflow-hidden group
      `}
    >
      {/* 装飾的な背景パターン */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" className={style.icon}>
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      <div className="flex items-start gap-4 relative z-10">
        {/* アイコン */}
        <div
          className={`
            flex-shrink-0 w-10 h-10 rounded-lg ${style.iconBg}
            flex items-center justify-center
            shadow-sm group-hover:scale-110 transition-transform duration-300
          `}
        >
          <span className="text-xl" aria-hidden="true">
            {style.emoji}
          </span>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-bold mb-2 ${style.icon} text-lg`}>{title}</h4>
          )}
          <div className="text-gray-700 leading-relaxed prose-callout">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
