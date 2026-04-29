import type { ReactNode } from "react";

type SummaryBoxProps = {
  title?: string;
  children: ReactNode;
};

export function SummaryBox({ title = "まとめ", children }: SummaryBoxProps) {
  return (
    <section className="mdx-summary">
      <header className="mdx-summary__head">
        <span className="mdx-summary__eyebrow">Summary</span>
        <h2 className="mdx-summary__title">{title}</h2>
      </header>
      <div className="mdx-summary__body mdx-inner">{children}</div>
    </section>
  );
}
