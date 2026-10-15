import { projects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

const featured = ["ember-and-oaks", "nexus", "vanta", "nova"];

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
            title={<span id="work-title">Recent projects & explorations</span>}
            intro="Self-initiated concept projects across branding, product, web and CGI. Concept work is always labelled as such."
          />
          <div data-reveal>
            <ButtonLink href="/work" variant="ghost">
              View all projects
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14">
          {list.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
