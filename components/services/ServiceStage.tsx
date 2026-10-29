import Image from "next/image";
import { projects, type Project, type ProjectImage } from "@/lib/projects";
import type { Service } from "@/lib/services";
import { EmberLight } from "@/components/ui/Atmosphere";
import { BrowserFrame, PhoneFrame } from "@/components/work/Devices";
import { ServiceVisual } from "./ServiceVisual";

/**
 * Proof for each service, taken from the portfolio: live sites for the build services,
 * a Corvane board for identity and graphic design. Marketing has no project yet, so it
 * shows its diagram instead of borrowing someone else's work.
 */
const EXAMPLES: Record<string, { sites?: string[]; board?: { slug: string; file: string } }> = {
  "brand-identity": { board: { slug: "corvane", file: "02-mark.jpg" } },
  web: { sites: ["spirit", "af7", "zama-zama"] },
  ai: { sites: ["restaurant-os"] },
  "3d-motion": { sites: ["apparel-fastener", "burger-in-town"] },
  graphic: { board: { slug: "corvane", file: "04-stationery.jpg" } },
};

const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

export type ServiceExample =
  | { type: "sites"; projects: Project[] }
  | { type: "board"; project: Project; image: ProjectImage }
  | { type: "visual" };

export function exampleFor(service: Service): ServiceExample {
  const e = EXAMPLES[service.id];
  const sites = (e?.sites ?? []).map(bySlug).filter((p): p is Project => p !== undefined);
  if (sites.length) return { type: "sites", projects: sites };
  const board = e?.board && bySlug(e.board.slug);
  const image = board && [board.cover, ...board.gallery].find((g) => g.src.endsWith(e.board!.file));
  if (board && image) return { type: "board", project: board, image };
  return { type: "visual" };
}

/** A lit stage showing the service's example: browser windows, a brand board or its diagram. */
export function ServiceStage({ service, sizes, priority }: { service: Service; sizes: string; priority?: boolean }) {
  const ex = exampleFor(service);

  if (ex.type === "board") {
    return (
      <div className="corners relative">
        <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-ink-3">
          <Image
            src={ex.image.src}
            alt={ex.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>
    );
  }

  if (ex.type === "visual") {
    return (
      <div className="corners relative">
        <div className="relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden border border-white/10 bg-[#060606] text-white/85">
          <EmberLight soft className="h-[120%]" />
          <div className="cross-grid absolute inset-0 -z-30 opacity-60" aria-hidden />
          <ServiceVisual kind={service.visual} className="relative h-auto w-[62%]" />
        </div>
      </div>
    );
  }

  const [front, ...back] = ex.projects;
  return (
    <div className="corners relative">
      <div className="relative isolate overflow-hidden border border-white/10 bg-[#060606] px-[9%] pt-[11%]">
        <EmberLight soft className="h-[120%]" />
        <div className="cross-grid absolute inset-0 -z-30 opacity-60" aria-hidden />
        {/* Further builds peek out behind the front window */}
        {back.slice(0, 2).map((p, i) => (
          <BrowserFrame
            key={p.slug}
            image={p.cover}
            sizes="30vw"
            className={`absolute top-[4%] w-[62%] opacity-45 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:opacity-70 ${
              i === 0 ? "left-[2%] -rotate-[4deg] group-hover:-translate-x-[3%]" : "right-[2%] rotate-[4deg] group-hover:translate-x-[3%]"
            }`}
          />
        ))}
        <BrowserFrame image={front.cover} scroll={front.scroll} url={front.liveUrl} sizes={sizes} priority={priority} className="relative -mb-px rounded-b-none" />
      </div>
      {front.mobile && (
        <PhoneFrame
          image={front.mobile}
          sizes="(min-width: 1024px) 12vw, 22vw"
          className="absolute right-[3%] -bottom-[7%] w-[18%] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[4%]"
        />
      )}
    </div>
  );
}
