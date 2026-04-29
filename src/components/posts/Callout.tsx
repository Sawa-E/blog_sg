import type { ReactNode } from "react";

export type CalloutType =
  | "info"
  | "warning"
  | "tip"
  | "note"
  | "success"
  | "danger"
  | "error";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const ICON_MAP: Record<Exclude<CalloutType, "error">, string> = {
  info: "i",
  tip: "✦",
  note: "·",
  success: "✓",
  warning: "!",
  danger: "!",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const normalizedType = type === "error" ? "danger" : type;
  const icon = ICON_MAP[normalizedType];

  return (
    <aside className={`mdx-callout mdx-callout--${normalizedType}`} role="note">
      <span className="mdx-callout__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="mdx-callout__body mdx-inner">
        {title && <p className="mdx-callout__title">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
