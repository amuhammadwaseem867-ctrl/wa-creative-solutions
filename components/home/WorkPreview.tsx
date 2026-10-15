import { projects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

const featured = ["restaurant-os", "zama-zama", "apparel-fastener", "spirit", "alhaytham-school", "af7"];

export function WorkPreview() {
  const list = featured.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <section className="section-y relative" aria-labelledby="work-title">
      <div className="container-site">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            className="text-center md:text-left"
            eyebrow="Selected work"
            title={<span id="work-title">Built, shipped and live</span>}
            intro="Websites, stores and full web applications in production — every project links to the live build."
          />
          <div data-reveal>
            <ButtonLink href="/work" variant="ghost">
              View all projects
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <ProjectCard project={p} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
