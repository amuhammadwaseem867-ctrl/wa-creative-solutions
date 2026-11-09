"use client";

import { useEffect, useRef } from "react";
import type { ProjectImage } from "@/lib/projects";
import { asset } from "@/lib/hosting";

/**
 * A muted, looping motion piece (preloader or 3D reveal). It plays only while on screen,
 * and stays on its poster frame for visitors who prefer reduced motion.
 */
export function MotionVideo({ image, className = "" }: { image: ProjectImage & { video: string }; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={asset(image.video)}
      poster={asset(image.src)}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={image.alt}
      className={className}
    />
  );
}
