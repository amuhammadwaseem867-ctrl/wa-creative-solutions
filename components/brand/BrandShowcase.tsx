import { Logo, Monogram } from "./Logo";
import { LogoReveal } from "./LogoReveal";

/** Presents the identity system: construction, colour versions and lock-ups. */
export function BrandShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-6">
      <figure className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] border border-line bg-ink-2 md:col-span-4 md:row-span-2 md:aspect-auto md:min-h-[420px]">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <LogoReveal className="relative w-1/2 max-w-[340px]" delay={200} />
        <figcaption className="label-caps absolute bottom-5 left-5 text-mute">Prism mark · W in the cuts, A at the centre</figcaption>
      </figure>
      <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-[18px] bg-paper md:col-span-2">
        <Logo tone="accent-dark" className="text-[1.6rem]" />
        <figcaption className="label-caps text-mute-dark">On light</figcaption>
      </figure>
      <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-[18px] bg-red-deep md:col-span-2">
        <Logo tone="white" className="text-[1.6rem]" />
        <figcaption className="label-caps text-paper/80">On red</figcaption>
      </figure>
      {(["accent", "accent-dark", "white", "black"] as const).map((tone) => (
        <figure
          key={tone}
          className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-[18px] border border-line md:col-span-3 lg:col-span-3 xl:col-span-3 ${
            tone === "black" || tone === "accent-dark" ? "bg-paper-2" : "bg-ink"
          }`}
        >
          <Monogram tone={tone} className="h-1/4 w-auto" />
          <figcaption className={`label-caps ${tone === "black" || tone === "accent-dark" ? "text-mute-dark" : "text-mute"}`}>
            {{ accent: "Primary · dark", "accent-dark": "Primary · light", white: "Mono white", black: "Mono black" }[tone]}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
