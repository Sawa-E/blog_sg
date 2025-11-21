// src/components/posts/Callout.tsx
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "note";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const colorMap: Record<CalloutType, string> = {
  info: "border-sky-300 bg-sky-50/80 text-sky-900",
  warning: "border-amber-300 bg-amber-50/80 text-amber-900",
  tip: "border-emerald-300 bg-emerald-50/80 text-emerald-900",
  note: "border-slate-300 bg-slate-50 text-slate-900",
};

const iconMap: Record<CalloutType, string> = {
  info: "💡",
  warning: "⚠️",
  tip: "✨",
  note: "📝",
};

/**
 * Callout component for highlighting important information in blog posts
 * Can be used in MDX content
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const color = colorMap[type];
  const icon = iconMap[type];

  return (
    <section
      className={`
        my-4 rounded-xl border px-4 py-3 text-sm shadow-sm
        ${color}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="mt-[2px] text-lg" aria-hidden="true">
          {icon}
        </div>
        <div>
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
    </section>
  );
}
