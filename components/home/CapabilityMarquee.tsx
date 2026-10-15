const items = ["Brand Identity", "Next.js Engineering", "3D & CGI", "Motion Design", "AI Experiences", "UI/UX", "Campaign Creative", "Editorial Design"];

export function CapabilityMarquee() {
  const row = [...items, ...items];
  return (
    <section id="capabilities" aria-label="Capabilities" className="overflow-hidden border-y border-line bg-ink-2 py-6">
      <ul className="marquee-track flex w-max gap-10" aria-hidden>
        {row.map((item, i) => (
          <li key={i} className="flex items-center gap-10 font-display text-2xl font-medium tracking-[-0.03em] whitespace-nowrap text-paper/85 md:text-3xl">
            {item}
            <span className="inline-block h-2 w-2 rotate-45 bg-red" />
          </li>
        ))}
      </ul>
      <p className="sr-only">Capabilities: {items.join(", ")}.</p>
    </section>
  );
}
