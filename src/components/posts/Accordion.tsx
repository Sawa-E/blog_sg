// src/components/posts/Accordion.tsx（新規作成）
"use client";

import { useState, type ReactNode } from "react";

type AccordionItem = {
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-8 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left group"
            >
              <span className="font-bold text-gray-900 pr-4 group-hover:text-sky-700 transition-colors">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-sky-600 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-sky-100 pt-4 animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
