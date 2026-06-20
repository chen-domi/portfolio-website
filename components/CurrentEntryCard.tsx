export default function CurrentEntryCard({
  title,
  tools,
  body,
}: {
  title: string;
  tools: string;
  body: string;
}) {
  return (
    <div className="bg-accent/5 border border-rule-light rounded-sm px-5 py-4.5 mb-2">
      <p className="font-mono text-[10.5px] text-accent uppercase tracking-wide mb-2">
        in progress
      </p>
      <h3 className="text-[19px] font-semibold mt-0 mb-1.5">{title}</h3>
      <p className="font-mono text-[11px] text-ink-soft tracking-wide mb-2.5">{tools}</p>
      <p className="text-ink-soft text-[15px] mb-0">{body}</p>
    </div>
  );
}
