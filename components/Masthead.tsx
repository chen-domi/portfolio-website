import LiveClock from "@/components/LiveClock";
import { basePath } from "@/lib/basePath";

export default function Masthead() {
  return (
    <div className="border-b-[3px] border-rule pb-4 mb-1.5">
      <div className="flex justify-between font-mono text-[11px] tracking-wide text-ink-soft uppercase mb-4">
        <span>Boston, USA</span>
        <LiveClock />
      </div>
      <img
        src={`${basePath}/headshot-square.png`}
        alt="Dominic Chen"
        className="w-24 h-24 rounded-2xl object-cover mx-auto mb-3"
      />
      <h1 className="text-4xl font-normal tracking-tight mb-1 text-center">Dominic Chen</h1>
    </div>
  );
}
