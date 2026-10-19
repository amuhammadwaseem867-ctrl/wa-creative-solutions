import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects, workCategories } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/lib/site";
import { EmberLight, StarField } from "@/components/ui/Atmosphere";

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
  const fields = workCategories.filter((c) => project.categories.includes(c.id));
  const live = project.kind === "live";
  // The cover is already shown full-width above, so don't repeat it in the gallery.
  const gallery = project.gallery.filter((g) => g.src !== project.cover.src);
  const galleryRows = layoutGallery(gallery);
  const landscapeCover = project.cover.width > project.cover.height;
  const logoCover = project.cover.width < 600;

  return (
    <article>
      <header className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)]">
        <EmberLight x="72%" soft className="h-[70%]" />
        <StarField />
        <div className="container-site">
          <Link href="/work" className="label-bracket inline-flex items-center gap-2 hover:text-paper">
            <ArrowLeft size={14} aria-hidden /> All work
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-caps fade-up mb-6 flex flex-wrap items-center gap-3 text-mute">
                <span className="inline-flex items-center gap-2 border border-white/20 px-3 py-1 text-paper">
                  {live && <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" aria-hidden />}
                  {live ? "Live project" : "Concept project"}
                </span>
                {project.discipline}
              </p>
              {/* Project names keep their own casing (e.g. RestaurantOS) */}
              <h1 className="text-mega rise overflow-hidden pb-[0.05em] tracking-[-0.02em] normal-case">
                <span>{project.title}</span>
              </h1>
            </div>
            <div className="fade-up lg:col-span-4" style={{ "--d": "200ms" } as React.CSSProperties}>
              <p className="text-lead text-paper/80">{project.summary}</p>
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} className="mt-7">
                  Visit live site
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
        <div className="container-site mt-14">
          <div className={`relative overflow-hidden bg-ink-3 ${landscapeCover ? "aspect-[16/9]" : "aspect-[4/5] sm:aspect-[16/10]"}`}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="100vw"
              className={logoCover ? "object-contain p-[12%]" : "object-cover object-top"}
            />
          </div>
        </div>
      </header>

      <section className="section-y" aria-label="Project overview">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <dl className="grid content-start gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <div>
              <dt className="label-caps text-mute">Type</dt>
              <dd className="mt-2">{live ? "Live, deployed build" : "Self-initiated concept (no client)"}</dd>
            </div>
            <div>
              <dt className="label-caps text-mute">{fields.length > 1 ? "Fields" : "Field"}</dt>
              <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {fields.map((f) => (
                  <Link key={f.id} href={`/work?field=${f.id}`} className="link-underline text-paper">
                    {f.label}
                  </Link>
                ))}
              </dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="label-caps text-mute">Services delivered</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="border border-line px-3 py-1.5 text-sm text-paper/85">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {project.tech && project.tech.length > 0 && (
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="label-caps text-mute">Built with</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-white/[0.06] px-3 py-1.5 text-sm text-paper/85">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <dt className="label-caps text-mute">Live site</dt>
                <dd className="mt-2">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline break-all text-paper">
                    {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                  </a>
                </dd>
              </div>
            )}
            {project.palette && project.palette.length > 0 && (
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="label-caps text-mute">Palette</dt>
                <dd className="mt-3 flex overflow-hidden border border-white/10">
                  {project.palette.map((c) => (
                    <span key={c} className="flex h-16 flex-1 items-end p-2 text-[0.62rem] font-medium tracking-wide uppercase" style={{ background: c, color: luminance(c) > 0.5 ? "#080808" : "#ffffff" }}>
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            <div data-reveal>
              <h2 className="label-caps mb-5 text-white/45">Overview</h2>
              <p className="text-[clamp(1.3rem,2.2vw,1.85rem)] leading-[1.35] tracking-[-0.015em] text-paper">{project.overview}</p>
            </div>
            {project.challenge && project.solution && (
              <div className="grid gap-10 md:grid-cols-2">
                <div data-reveal>
                  <h2 className="label-caps mb-4 text-mute">The challenge</h2>
                  <p className="text-paper/80">{project.challenge}</p>
                </div>
                <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                  <h2 className="label-caps mb-4 text-mute">The solution</h2>
                  <p className="text-paper/80">{project.solution}</p>
                </div>
              </div>
            )}
            {project.features && project.features.length > 0 && (
              <div data-reveal>
                <h2 className="label-caps mb-5 text-mute">What we built</h2>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-paper/80">
                      <Check size={17} className="mt-1 shrink-0 text-white/40" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {galleryRows.length > 0 && (
        <section className="pb-[clamp(5rem,11vw,10rem)]" aria-label="Project gallery">
          <div className="container-site space-y-6 md:space-y-8">
            {galleryRows.map((row, r) => (
              <div
                key={r}
                className={`grid gap-6 md:gap-8 ${row.length === 3 ? "grid-cols-3" : row.length === 2 ? "md:grid-cols-2" : ""}`}
              >
                {row.map(({ img, n }) => (
                  <figure
                    key={img.src}
                    data-reveal
                    className={row.length === 1 && img.width / img.height < 1.15 ? `mx-auto w-full ${img.width / img.height < 0.62 ? "max-w-sm" : "max-w-2xl"}` : undefined}
                  >
                    <div className="overflow-hidden bg-ink-3">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes={row.length === 1 ? "(min-width: 1280px) 1200px, 100vw" : row.length === 2 ? "(min-width: 768px) 50vw, 100vw" : "33vw"}
                        className="h-auto w-full"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-3 flex justify-between gap-4 text-xs font-medium tracking-[0.1em] text-white/45 uppercase">
                        <span>{img.caption}</span>
                        <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group container-site flex items-center justify-between gap-6 py-16 md:py-24">
          <span>
            <span className="label-caps block text-mute">Next project</span>
            <span className="mt-4 block font-display text-[clamp(2.6rem,8vw,7rem)] leading-none font-semibold tracking-[-0.03em] transition-colors group-hover:text-white/70">
              {next.title}
            </span>
          </span>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink md:h-24 md:w-24">
            <ArrowUpRight aria-hidden />
          </span>
        </Link>
      </nav>
      <ContactCTA title="Want something built like this?" />
    </article>
  );
}

/** Relative luminance of a hex colour (0 = black, 1 = white), for legible swatch labels. */
function luminance(hex: string) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

type GalleryItem = { img: (typeof projects)[number]["gallery"][number]; n: number };

/**
 * Editorial gallery rhythm: landscape boards run full-width; tall boards pair up two per row;
 * phone-shaped screens group three per row.
 */
function layoutGallery(images: GalleryItem["img"][]) {
  const rows: GalleryItem[][] = [];
  let pending: GalleryItem[] = [];
  let pendingKind: "tall" | "phone" | null = null;
  const flush = () => {
    if (pending.length) rows.push(pending);
    pending = [];
    pendingKind = null;
  };
  images.forEach((img, i) => {
    const ratio = img.width / img.height;
    const item = { img, n: i + 1 };
    if (ratio >= 1.15) {
      flush();
      rows.push([item]);
      return;
    }
    const kind = ratio < 0.62 ? "phone" : "tall";
    if (pendingKind && pendingKind !== kind) flush();
    pendingKind = kind;
    pending.push(item);
    if (pending.length === (kind === "phone" ? 3 : 2)) flush();
  });
  flush();
  return rows;
}
