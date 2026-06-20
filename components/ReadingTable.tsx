import type { ReadingItem } from "@/lib/data";

export default function ReadingTable({ items }: { items: ReadingItem[] }) {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {items.map((item) => (
          <tr key={item.name} className="border-b border-dotted border-rule-light last:border-none">
            <td className="font-mono text-[10.5px] text-accent uppercase tracking-wide w-20 align-top pt-3.5 pb-3 pr-1">
              {item.kind}
            </td>
            <td className="align-top py-3 pl-1">
              <div className="text-[15.5px] font-semibold">{item.name}</div>
              <div className="text-[13.5px] text-ink-soft italic">{item.by}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
