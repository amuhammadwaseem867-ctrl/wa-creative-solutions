import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, workCategories, type Project } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";
import { FeaturedProject } from "@/components/work/FeaturedProject";

/**
 * Curated homepage selection — one lead project plus four supporting projects,
 * chosen to span the studio's fields. Slugs that don't exist are skipped.
 */
const LEAD = "selune";
const SUPPORTING = ["restaurant-os", "corvane", "veyra", "zama-zama"];

export function WorkPreview() {
  const lead = projects.find((p) => p.slug === LEAD) ?? projects[0];
  const supporting = SUPPORTING.map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is Project => p !== undefined && p.slug !== lead.slug)
    .slice(0, 4);
  const counts = workCategories.map((c) => ({ ...c, n: projects.filter((p) => p.categories.includes(c.id)).length })).filter((c) => c.n > 0);

  return (
    <section className="section-y relative" aria-labelledby="work-title">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={<span id="work-title">Work that speaks for itself</span>}
            intro="Live builds and labelled concept projects across every discipline we offer."
          />
          <div data-reveal>
            <ButtonLink href="/work" variant="ghost">
              All {projects.length} projects
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 lg:mt-14" data-reveal>
          <FeaturedProject project={lead} priority={false} />
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {supporting.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
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
