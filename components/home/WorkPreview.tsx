import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, workCategories, type Project } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";

/**
 * Curated homepage selection: two lead showcases, then four supporting projects
 * chosen to span the studio's fields. Slugs that don't exist are skipped.
 */
const LEAD = ["spirit", "apparel-fastener"];
const SUPPORTING = ["restaurant-os", "af7", "zama-zama", "corvane"];

const pick = (slugs: string[]) => slugs.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => p !== undefined);

export function WorkPreview() {
  const lead = pick(LEAD);
  const supporting = pick(SUPPORTING).slice(0, 4);
  const counts = workCategories.map((c) => ({ ...c, n: projects.filter((p) => p.categories.includes(c.id)).length })).filter((c) => c.n > 0);

  return (
    <section className="section-y relative" aria-labelledby="work-title">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={<span id="work-title">Work that speaks for itself</span>}
            intro="Real, deployed websites and platforms. Hover a screen to scroll through the live page."
          />
          <div data-reveal>
            <ButtonLink href="/work" variant="ghost">
              All {projects.length} projects
            </ButtonLink>
          </div>
        </div>

        <ol className="mt-16 space-y-[clamp(6rem,12vw,9rem)] lg:mt-20">
          {lead.map((p, i) => (
            <li key={p.slug}>
              <ProjectShowcase project={p} index={i} total={projects.length} flip={i % 2 === 1} />
            </li>
          ))}
        </ol>

        <ul className="mt-[clamp(6rem,12vw,9rem)] grid gap-x-10 gap-y-20 md:grid-cols-2">
          {supporting.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>

        {/* Browse by field */}
        <nav aria-label="Browse work by field" className="mt-20 border-t border-white/[0.08] pt-8">
          <p className="label-caps mb-5 text-white/45">Browse by field</p>
          <ul className="flex flex-wrap gap-2">
            {counts.map((c) => (
              <li key={c.id}>
                <Link href={`/work?field=${c.id}`} className="chip group">
                  {c.label}
                  <span className="opacity-55">{c.n}</span>
                  <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:rotate-45" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
