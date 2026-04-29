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
  const Tag = variant === "compact" ? "ul" : "div";

  return (
    <Tag className={`mdx-features mdx-features--${variant}`}>
      {items.map((item, index) => {
        const Item = variant === "compact" ? "li" : "div";
        return (
          <Item key={index} className="mdx-features__item">
            {item.icon !== undefined && (
              <span className="mdx-features__icon" aria-hidden="true">
                {item.icon || (variant === "compact" ? "✓" : "")}
              </span>
            )}
            <div className="mdx-features__content">
              {item.title && <h4 className="mdx-features__title">{item.title}</h4>}
              <div className="mdx-features__desc mdx-inner">{item.description}</div>
            </div>
          </Item>
        );
      })}
    </Tag>
  );
}
