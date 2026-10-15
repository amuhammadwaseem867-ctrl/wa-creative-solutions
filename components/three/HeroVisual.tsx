"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BlobFallback } from "./BlobFallback";

const BlobScene = dynamic(() => import("./BlobScene"), { ssr: false });

type Mode = "pending" | "static" | "3d";

function detectCapability(): { mode: Mode; quality: "high" | "low" } {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return { mode: "static", quality: "low" };
  } catch {
    return { mode: "static", quality: "low" };
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return { mode: "static", quality: "low" };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return { mode: "static", quality: "low" };
  const small = window.matchMedia("(max-width: 768px)").matches;
  const weak = cores <= 4 || memory <= 4;
  return { mode: "3d", quality: small || weak ? "low" : "high" };
}

export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [mode, setMode] = useState<Mode>("pending");
  const [quality, setQuality] = useState<"high" | "low">("low");
  const [animate, setAnimate] = useState(true);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  // Decide after the page is idle so 3D never competes with first paint.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const c = detectCapability();
      setQuality(c.quality);
      setAnimate(!reduce.matches);
      setMode(c.mode);
    };
    const hasIdle = "requestIdleCallback" in window;
    const id = hasIdle ? window.requestIdleCallback(decide, { timeout: 1500 }) : window.setTimeout(decide, 600);
    const onChange = () => setAnimate(!reduce.matches);
    reduce.addEventListener("change", onChange);
    return () => {
      reduce.removeEventListener("change", onChange);
      if (hasIdle) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  // Pointer + scroll inputs (listened on window so the canvas never blocks clicks).
  useEffect(() => {
    if (mode !== "3d") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    const onScroll = () => {
      const h = wrap.current?.closest("section")?.offsetHeight ?? window.innerHeight;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode]);

  // Stop rendering entirely when off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current;
    if (!el || mode !== "3d") return;
    let visible = true;
    const update = () => setActive(visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [mode]);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <BlobFallback className="h-auto w-[72%]" />
      </div>
      {mode === "3d" && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <BlobScene
            pointer={pointer}
            scroll={scroll}
            quality={quality}
            animate={animate}
            active={active}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
