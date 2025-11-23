// src/components/posts/Alert.tsx（新規作成）
import type { ReactNode } from "react";

type AlertProps = {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
};

export function Alert({
  type = "info",
  title,
  children,
  dismissible = false,
}: AlertProps) {
  const styles = {
    info: {
      bg: "bg-blue-50 border-blue-300",
      icon: "ℹ️",
      iconBg: "bg-blue-100",
      titleColor: "text-blue-900",
    },
    success: {
      bg: "bg-green-50 border-green-300",
      icon: "✅",
      iconBg: "bg-green-100",
      titleColor: "text-green-900",
    },
    warning: {
      bg: "bg-amber-50 border-amber-300",
      icon: "⚠️",
      iconBg: "bg-amber-100",
      titleColor: "text-amber-900",
    },
    error: {
      bg: "bg-red-50 border-red-300",
      icon: "❌",
      iconBg: "bg-red-100",
      titleColor: "text-red-900",
    },
  };

  const style = styles[type];

  return (
    <div className={`my-6 rounded-xl border-l-4 ${style.bg} p-5 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${style.iconBg} flex items-center justify-center`}
        >
          <span className="text-lg">{style.icon}</span>
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold mb-2 ${style.titleColor}`}>{title}</h4>
          )}
          <div className="text-gray-700 leading-relaxed">{children}</div>
        </div>
        {dismissible && (
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
