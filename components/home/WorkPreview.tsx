import { projects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

const featured = ["ember-and-oaks", "nexus", "vanta", "nova"];

export function WorkPreview() {
  const list = featured.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);
  return (
    <section className="section-y border-t border-line bg-ink-2" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title={<span id="work-title">Proof, not<br />promises.</span>}
          intro={
            <>
              Self-initiated concept projects that show how we think across branding, product, web and CGI.
              <span className="mt-3 block text-sm text-paper/60">Concept work is labelled as such — we don&apos;t invent clients or results.</span>
            </>
          }
        />
        {/* Asymmetric editorial grid */}
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12 lg:mt-24">
          {list.map((p, i) => {
            const layout = [
              "md:col-span-7",
              "md:col-span-5 md:mt-40",
              "md:col-span-5",
              "md:col-span-6 md:col-start-7 md:mt-24",
            ][i];
            const aspect = ["aspect-[16/11]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/12]"][i];
            return (
              <div key={p.slug} className={layout} data-reveal style={{ "--reveal-delay": `${(i % 2) * 120}ms` } as React.CSSProperties}>
                <ProjectCard project={p} index={projects.indexOf(p)} aspect={aspect} sizes="(min-width: 768px) 55vw, 100vw" />
              </div>
            );
          })}
        </div>
        <div className="mt-20 flex justify-center" data-reveal>
          <ButtonLink href="/work" variant="ghost">
            View all work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
