"use client";

import { useState, type ReactNode } from "react";

type AccordionItem = {
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="mdx-accordion">
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        return (
          <div key={index} className="mdx-accordion__item" data-open={isOpen}>
            <button
              type="button"
              className="mdx-accordion__btn"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <svg
                className="mdx-accordion__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <div className="mdx-accordion__panel mdx-inner">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
