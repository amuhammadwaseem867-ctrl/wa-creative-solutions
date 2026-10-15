import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects, workCategories } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.discipline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const categories = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  const landscapeCover = project.cover.width > project.cover.height;
  const logoCover = project.cover.width < 600;

  return (
    <article>
      <header className="relative pt-[calc(var(--header-h)+3rem)]">
        <div className="container-site">
          <Link href="/work" className="label-mono inline-flex items-center gap-2 text-mute hover:text-paper">
            <ArrowLeft size={14} aria-hidden /> All work
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono fade-up mb-6 flex flex-wrap items-center gap-3 text-mute">
                <span className="rounded-full border border-red/60 px-3 py-1 text-red">{project.concept ? "Concept project" : project.client}</span>
                {project.discipline}
              </p>
              <h1 className="text-mega rise overflow-hidden pb-[0.05em] font-bold">
                <span>{project.title}</span>
              </h1>
            </div>
            <p className="text-lead fade-up text-paper/80 lg:col-span-4" style={{ "--d": "200ms" } as React.CSSProperties}>
              {project.summary}
            </p>
          </div>
        </div>
        <div className="container-site mt-14">
          <div className={`relative overflow-hidden rounded-[18px] bg-ink-3 ${landscapeCover ? "aspect-[16/9]" : "aspect-[4/5] sm:aspect-[16/10]"}`}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="100vw"
              className={logoCover ? "object-contain p-[12%]" : "object-cover"}
            />
          </div>
        </div>
      </header>

      <section className="section-y" aria-label="Project overview">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <dl className="grid content-start gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <div>
              <dt className="label-mono text-mute">Type</dt>
              <dd className="mt-2">{project.concept ? "Self-initiated concept (no client)" : project.client}</dd>
            </div>
            <div>
              <dt className="label-mono text-mute">Category</dt>
              <dd className="mt-2">{categories.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="label-mono text-mute">Services delivered</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1.5 text-sm text-paper/85">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {project.liveUrl && (
              <div>
                <dt className="sr-only">Live prototype</dt>
                <dd>
                  <ButtonLink href={project.liveUrl} variant="ghost">
                    View live prototype
                  </ButtonLink>
                </dd>
              </div>
            )}
          </dl>
          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            <div data-reveal>
              <h2 className="label-mono mb-5 text-red">Overview</h2>
              <p className="text-[clamp(1.3rem,2.2vw,1.85rem)] leading-[1.35] tracking-[-0.015em] text-paper">{project.overview}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <div data-reveal>
                <h2 className="label-mono mb-4 text-mute">The challenge</h2>
                <p className="text-paper/80">{project.challenge}</p>
              </div>
              <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <h2 className="label-mono mb-4 text-mute">The solution</h2>
                <p className="text-paper/80">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="pb-[clamp(5rem,11vw,10rem)]" aria-label="Project gallery">
          <div className="container-site grid gap-6 md:grid-cols-2 md:gap-8">
            {project.gallery.map((img, idx) => {
              const portrait = img.height > img.width;
              // Every third landscape image spans full width for editorial rhythm.
              const wide = !portrait && idx % 3 === 0;
              return (
                <figure key={img.src} className={wide ? "md:col-span-2" : ""} data-reveal>
                  <div className="overflow-hidden rounded-[14px] bg-ink-3">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes={wide ? "(min-width: 1440px) 1360px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="h-auto w-full"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="label-mono mt-3 flex justify-between text-mute">
                      <span>{img.caption}</span>
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group container-site flex items-center justify-between gap-6 py-16 md:py-24">
          <span>
            <span className="label-mono block text-mute">Next project</span>
            <span className="mt-4 block font-display text-[clamp(2.6rem,8vw,7rem)] leading-none font-bold tracking-[-0.05em] transition-colors group-hover:text-red">
              {next.title}
            </span>
          </span>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-red group-hover:bg-red-deep md:h-24 md:w-24">
            <ArrowUpRight aria-hidden />
          </span>
        </Link>
      </nav>
      <ContactCTA title="Want something built like this?" />
    </article>
  );
}
