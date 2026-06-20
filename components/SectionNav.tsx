"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  numeral: string;
  label: string;
};

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const OFFSET = 100; // just below the sticky nav bar

    const pickActive = () => {
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let bestId = sections[0].id;
      let bestTop = -Infinity;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= OFFSET && top > bestTop) {
          bestTop = top;
          bestId = section.id;
        }
      }
      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(pickActive, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", pickActive, { passive: true });
    pickActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, [sections]);

  return (
    <nav className="sticky top-0 z-10 flex gap-6 bg-paper border-b border-rule py-3 mb-2 font-mono text-[13px] uppercase tracking-wide">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={`pb-2 -mb-px border-b-2 cursor-pointer ${
            section.id === activeId
              ? "text-ink border-accent"
              : "text-ink-soft border-transparent hover:text-ink"
          }`}
        >
          <span className="text-accent">{section.numeral}.</span> {section.label}
        </a>
      ))}
    </nav>
  );
}
