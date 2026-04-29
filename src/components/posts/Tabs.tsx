"use client";

import { useState, useId, type ReactNode } from "react";

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
  const id = useId();

  return (
    <div className="mdx-tabs">
      <div className="mdx-tabs__list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            className="mdx-tabs__tab"
            onClick={() => setActiveTab(index)}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel-${activeTab}`}
        aria-labelledby={`${id}-tab-${activeTab}`}
        className="mdx-tabs__panel mdx-inner"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
