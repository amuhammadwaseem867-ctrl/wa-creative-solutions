"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gently pulls its child toward the pointer. Desktop (fine pointer) only,
 * disabled for reduced motion, and the travel is capped so targets never
 * move out from under the cursor.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(-10, Math.min(10, (e.clientX - (r.left + r.width / 2)) * strength));
      const y = Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * strength));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => (el.style.transform = `translate3d(${x}px, ${y}px, 0)`));
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-flex transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] will-change-transform">
      {children}
    </span>
  );
}
