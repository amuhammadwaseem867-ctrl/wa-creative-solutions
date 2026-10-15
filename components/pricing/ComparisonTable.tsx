import { Check, Minus } from "lucide-react";
import { comparisonRows, packages } from "@/lib/pricing";

export function ComparisonTable() {
  return (
    <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]" tabIndex={0} role="region" aria-label="Package comparison table (scrolls horizontally)">
      <table className="w-full min-w-[760px] border-collapse text-left text-[0.95rem]">
        <caption className="sr-only">What each package includes</caption>
        <thead>
          <tr className="border-b border-[#cfcfcf]">
            <th scope="col" className="label-mono py-4 pr-4 font-normal text-mute-dark">Feature</th>
            {packages.map((p) => (
              <th key={p.id} scope="col" className="py-4 pr-4 font-display text-lg font-semibold tracking-[-0.02em]">
                {p.name.split(" / ")[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.label} className="border-b border-[#dedede]">
              <th scope="row" className="py-4 pr-4 font-medium">{row.label}</th>
              {packages.map((p) => {
                const v = row.values[p.id];
                return (
                  <td key={p.id} className="py-4 pr-4 text-mute-dark">
                    {v === true ? (
                      <Check size={18} className="text-red-deep" aria-label="Included" />
                    ) : v === false ? (
                      <Minus size={18} className="text-[#9a9a9a]" aria-label="Not included" />
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
