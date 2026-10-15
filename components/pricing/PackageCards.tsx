import { Check } from "lucide-react";
import { formatPrice, packages } from "@/lib/pricing";
import { ButtonLink } from "@/components/ui/Button";

export function PackageCards() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {packages.map((p, i) => (
        <li
          key={p.id}
          id={`package-${p.id}`}
          className={`relative flex scroll-mt-28 flex-col rounded-[18px] border p-7 lg:p-8 ${
            p.featured ? "border-red/70 bg-ink-3 shadow-[0_30px_80px_-40px_rgba(255,32,45,0.55)]" : "border-line bg-ink-2"
          }`}
          data-reveal
          style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
        >
          <div className="label-mono flex items-center justify-between text-mute">
            <span>Package {p.code}</span>
            {p.featured && <span className="rounded-full bg-red-deep px-2.5 py-1 text-paper">Most chosen</span>}
          </div>
          <h3 className="mt-8 font-display text-[1.7rem] leading-tight font-semibold tracking-[-0.03em]">{p.name}</h3>
          <p className="mt-4">
            {p.startingAt !== null ? (
              <>
                <span className="label-mono block text-mute">Starting at</span>
                <span className="font-display text-[3.2rem] leading-none font-semibold tracking-[-0.05em]">{formatPrice(p.startingAt)}</span>
              </>
            ) : (
              <>
                <span className="label-mono block text-mute">Pricing</span>
                <span className="font-display text-[3.2rem] leading-none font-semibold tracking-[-0.05em]">Custom quote</span>
              </>
            )}
          </p>
          <p className="mt-5 text-[0.95rem] text-mute">{p.audience}</p>
          <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-7 text-[0.94rem]">
            {p.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={16} className="mt-1 shrink-0 text-red" aria-hidden />
                <span className="text-paper/85">{item}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href={`/contact?package=${p.id}`} variant={p.featured ? "primary" : "ghost"} className="mt-8 w-full">
            {p.cta}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
