import type { BuiltEntry } from "@/lib/data";

export default function BuiltEntryCard({ entry }: { entry: BuiltEntry }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1.5 sm:gap-5.5 mb-8">
      <div className="font-mono text-[11px] text-ink-soft pt-0.5">{entry.date}</div>
      <div>
        <h3 className="text-[19px] font-semibold mb-1.5 mt-0">{entry.title}</h3>
        <p className="text-[14px] text-accent italic mb-2">{entry.result}</p>
        <p className="font-mono text-[11px] text-ink-soft mb-2.5 tracking-wide">
          {entry.tools}
        </p>
        <p className="text-ink-soft text-[15px] mb-2.5">{entry.body}</p>
        {entry.footnote && (
          <p className="text-[12.5px] text-ink-soft italic">{entry.footnote}</p>
        )}
        {entry.link && (
          <a
            href={entry.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] mt-1 inline-block text-ink border-b border-ink no-underline"
          >
            {entry.link.label}
          </a>
        )}
      </div>
    </div>
  );
}
