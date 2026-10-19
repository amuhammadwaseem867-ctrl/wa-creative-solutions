import { Check, Minus } from "lucide-react";
import { comparisonRows, packages } from "@/lib/pricing";

export function ComparisonTable() {
  return (
    <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]" tabIndex={0} role="region" aria-label="Package comparison table (scrolls horizontally)">
      <table className="w-full min-w-[760px] border-collapse text-left text-[0.95rem]">
        <caption className="sr-only">What each package includes</caption>
        <thead>
          <tr className="border-b border-white/15">
            <th scope="col" className="label-bracket py-4 pr-4 !text-[0.68rem]">Feature</th>
            {packages.map((p) => (
              <th key={p.id} scope="col" className="py-4 pr-4 font-display text-sm font-semibold tracking-[0.04em] text-paper uppercase">
                {p.name.split(" / ")[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.label} className="border-b border-white/[0.07] transition-colors hover:bg-white/[0.02]">
              <th scope="row" className="py-4 pr-4 font-medium text-paper/90">{row.label}</th>
              {packages.map((p) => {
                const v = row.values[p.id];
                return (
                  <td key={p.id} className="py-4 pr-4 text-white/60">
                    {v === true ? (
                      <Check size={18} className="text-[#ff7a45]" aria-label="Included" />
                    ) : v === false ? (
                      <Minus size={18} className="text-white/30" aria-label="Not included" />
                    ) : (
                      v
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
