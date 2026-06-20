"use client";

import { useState } from "react";

type Tab = {
  id: string;
  numeral: string;
  label: string;
  content: React.ReactNode;
};

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div>
      <nav className="flex gap-6 border-b border-rule mt-12 mb-6 font-mono text-[13px] uppercase tracking-wide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`pb-2 -mb-px border-b-2 cursor-pointer ${
              tab.id === activeId
                ? "text-ink border-accent"
                : "text-ink-soft border-transparent hover:text-ink"
            }`}
          >
            <span className="text-accent">{tab.numeral}.</span> {tab.label}
          </button>
        ))}
      </nav>
      {active.content}
    </div>
  );
}
