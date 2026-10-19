"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/projects";

/**
 * Index (list) view of the portfolio. On fine-pointer devices a preview of the
 * hovered project follows the cursor; touch devices get inline thumbnails instead.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [canHover, setCanHover] = useState(false);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Smoothly trail the cursor (disabled for reduced motion: the preview simply jumps).
  useEffect(() => {
    if (!canHover) return;
    const el = preview.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (reduce) {
        cx = x;
        cy = y;
      }
    };
    const tick = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      el.style.transform = `translate3d(${cx + 28}px, ${cy - 140}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, [canHover]);

  return (
    <div className="relative mt-4" onPointerLeave={() => setActive(null)}>
      <ol>
        {projects.map((p, i) => {
          const fields = workCategories.filter((c) => p.categories.includes(c.id)).map((c) => c.label);
          return (
            <li key={p.slug} className="border-b border-white/[0.08]">
              <Link
                href={`/work/${p.slug}`}
                onPointerEnter={() => setActive(p)}
                onFocus={() => setActive(p)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 sm:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_7rem_auto] sm:py-8"
              >
                <span className="hidden text-sm font-medium text-white/35 tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                {!canHover && (
                  <span className="relative block aspect-[16/10] w-20 overflow-hidden bg-ink-3 sm:hidden">
                    <Image src={p.cover.src} alt="" fill sizes="80px" className="object-cover object-top" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.4rem,3.4vw,2.7rem)] leading-[1.08] text-balance font-semibold tracking-[-0.02em] text-paper/85 transition-all duration-500 group-hover:translate-x-2 group-hover:text-paper">
                    {p.title}
                  </span>
                  <span className="mt-1 block truncate text-sm text-white/45 sm:hidden">{fields.join(" · ")}</span>
                </span>
                <span className="hidden truncate text-sm text-white/50 sm:block">{fields.join(" · ")}</span>
                <span className="hidden text-xs font-semibold tracking-[0.14em] text-white/50 uppercase sm:flex sm:items-center sm:gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${p.kind === "live" ? "bg-[#3ddc84]" : "bg-white/40"}`} aria-hidden />
                  {p.kind === "live" ? "Live" : "Concept"}
                </span>
                <span className="flex h-10 w-10 items-center justify-center border border-white/10 text-paper transition-all duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowUpRight size={17} aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {canHover && (
        <div
          ref={preview}
          aria-hidden
          className={`pointer-events-none fixed top-0 left-0 z-40 w-[340px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-[opacity,scale] duration-300 ${
            active ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {projects.map((p) => (
            <div key={p.slug} className={`relative aspect-[16/10] ${active?.slug === p.slug ? "block" : "hidden"}`}>
              <Image src={p.cover.src} alt="" fill sizes="340px" loading="eager" className="object-cover object-top" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
