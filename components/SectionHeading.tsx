export default function SectionHeading({ numeral, label }: { numeral: string; label: string }) {
  return (
    <h2 className="font-mono text-[13px] uppercase tracking-wide text-ink-soft mb-5 mt-2 pb-2 border-b border-rule-light">
      <span className="text-accent">{numeral}.</span> {label}
    </h2>
  );
}
