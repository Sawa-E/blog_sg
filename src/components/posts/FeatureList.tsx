// src/components/posts/FeatureList.tsx（新規作成）
import type { ReactNode } from "react";

type FeatureItem = {
  icon?: string;
  title?: string;
  description: ReactNode;
};

type FeatureListProps = {
  items: FeatureItem[];
  variant?: "default" | "compact" | "cards";
};

export function FeatureList({ items, variant = "default" }: FeatureListProps) {
  if (variant === "cards") {
    return (
      <div className="my-8 grid sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            {item.icon && (
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            )}
            {item.title && (
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
            )}
            <div className="text-gray-700 text-sm leading-relaxed">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <ul className="my-6 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:scale-110 transition-transform">
              {item.icon || "✓"}
            </span>
            <div className="flex-1 text-gray-700 leading-relaxed">
              {item.title && (
                <span className="font-semibold text-gray-900">
                  {item.title}:{" "}
                </span>
              )}
              {item.description}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="my-8 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-xl border border-sky-100 bg-gradient-to-r from-white to-sky-50/30 hover:shadow-md transition-all duration-300 group"
        >
          {item.icon && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
          )}
          <div className="flex-1">
            {item.title && (
              <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
            )}
            <div className="text-gray-700 leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
