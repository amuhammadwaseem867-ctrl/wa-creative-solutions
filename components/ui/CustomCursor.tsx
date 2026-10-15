"use client";

import { useEffect, useRef } from "react";

/**
 * A trailing ring that complements — never replaces — the native cursor.
 * Desktop fine-pointer only; disabled under reduced motion.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, active = false;
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${active ? 1.8 : 1})`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      active = !!(e.target as Element)?.closest?.("a, button, [role=button], input, select, textarea, label, summary");
      el.dataset.active = String(active);
    };
    const hide = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-8 w-8 rounded-full border border-white/50 opacity-0 transition-[opacity,border-color,background-color] duration-300 data-[active=true]:border-transparent data-[active=true]:bg-white/10 [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  );
}
