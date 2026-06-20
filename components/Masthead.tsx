import LiveClock from "@/components/LiveClock";

export default function Masthead() {
  return (
    <div className="border-b-[3px] border-rule pb-4 mb-1.5">
      <div className="flex justify-between font-mono text-[11px] tracking-wide text-ink-soft uppercase mb-4">
        <span>Boston, USA</span>
        <LiveClock />
      </div>
      <h1 className="text-4xl font-normal tracking-tight mb-1">Dominic Chen</h1>
    </div>
  );
}
