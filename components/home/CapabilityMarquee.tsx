import { Spark } from "@/components/ui/Atmosphere";

const items = ["Brand Identity", "Next.js Development", "UI/UX Design", "3D & CGI", "Motion Graphics", "AI Integrations", "E-commerce", "Campaign Creative"];

export function CapabilityMarquee() {
  const row = [...items, ...items];
  return (
    <section id="capabilities" aria-label="Capabilities" className="relative overflow-hidden border-y border-white/[0.07] bg-black py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" aria-hidden />
      <ul className="marquee-track flex w-max items-center gap-12" aria-hidden>
        {row.map((item, i) => (
          <li key={i} className="flex items-center gap-12 font-display text-base font-semibold whitespace-nowrap text-white/50 uppercase md:text-lg">
            {item}
            <Spark className="h-4 w-4 text-white/40" />
          </li>
        ))}
      </ul>
      <p className="sr-only">Capabilities: {items.join(", ")}.</p>
    </section>
  );
}
