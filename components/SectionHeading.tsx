export default function SectionHeading({
  numeral,
  children,
}: {
  numeral: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="font-mono text-[13px] uppercase tracking-wide border-b border-rule pb-2 mt-12 mb-6 flex gap-2.5 items-baseline">
      <span className="text-accent">{numeral}.</span> {children}
    </h2>
  );
}
