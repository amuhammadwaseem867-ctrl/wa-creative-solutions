import { Check } from "lucide-react";
import { formatPrice, packages } from "@/lib/pricing";
import { ButtonLink } from "@/components/ui/Button";

export function PackageCards({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {packages.map((p, i) => {
        const items = compact ? p.includes.slice(0, 4) : p.includes;
        return (
          <li
            key={p.id}
            id={compact ? undefined : `package-${p.id}`}
            className={`relative flex scroll-mt-28 flex-col rounded-[1.25rem] p-7 ${
              p.featured
                ? "border border-red/60 bg-gradient-to-b from-red/[0.12] to-white/[0.02] shadow-[0_30px_80px_-40px_rgba(255,32,45,0.7)]"
                : "card"
            }`}
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            {p.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-red-deep px-3 py-1 text-xs font-semibold text-paper shadow-lg">
                Most popular
              </span>
            )}
            <p className="text-sm font-medium text-white/50">Package {p.code}</p>
            <h3 className="mt-1 text-xl">{p.name}</h3>
            <p className="mt-6 flex items-baseline gap-1.5">
              {p.startingAt !== null ? (
                <>
                  <span className="text-sm text-white/50">from</span>
                  <span className="font-display text-[2.6rem] leading-none font-extrabold tracking-tight text-paper">
                    {formatPrice(p.startingAt)}
                  </span>
                </>
              ) : (
                <span className="font-display text-[2.2rem] leading-none font-extrabold tracking-tight text-paper">Custom</span>
              )}
            </p>
            <p className="mt-4 text-sm text-white/55">{p.audience}</p>
            <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.08] pt-6 text-sm">
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-red/15 text-red">
                    <Check size={11} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-white/75">{item}</span>
                </li>
              ))}
              {compact && p.includes.length > items.length && (
                <li className="pl-7.5 text-white/45">+ {p.includes.length - items.length} more</li>
              )}
            </ul>
            <ButtonLink
              href={compact ? `/pricing#package-${p.id}` : `/contact?package=${p.id}`}
              variant={p.featured ? "primary" : "ghost"}
              className="mt-7 w-full"
            >
              {compact ? "View details" : p.cta}
            </ButtonLink>
          </li>
        );
      })}
    </ul>
  );
}
