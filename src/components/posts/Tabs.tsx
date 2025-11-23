// src/components/posts/Tabs.tsx（新規作成）
"use client";

import { useState, type ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
  icon?: string;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8">
      {/* タブヘッダー */}
      <div className="flex flex-wrap gap-2 border-b-2 border-sky-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              px-5 py-3 rounded-t-lg font-semibold text-sm transition-all duration-300
              flex items-center gap-2
              ${
                activeTab === index
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md -mb-0.5 border-b-2 border-sky-500"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-6 shadow-sm animate-fade-in">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
