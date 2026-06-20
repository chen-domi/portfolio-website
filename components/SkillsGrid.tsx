import { Fragment } from "react";
import type { skills as skillsType } from "@/lib/data";

export default function SkillsGrid({ skills }: { skills: typeof skillsType }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2.5 sm:gap-4.5 text-[14.5px]">
      {skills.map((s) => (
        <Fragment key={s.label}>
          <div className="font-mono text-[11px] text-accent uppercase tracking-wide pt-0.5">
            {s.label}
          </div>
          <div className="text-ink-soft">{s.value}</div>
        </Fragment>
      ))}
    </div>
  );
}
