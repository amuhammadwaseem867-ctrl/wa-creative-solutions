"use client";

import { useEffect, useRef, useState } from "react";
import { MONOGRAM_BODY_PATH, MONOGRAM_ACCENT_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";
import { site } from "@/lib/site";

const KEY = "wa-intro-seen";
const WORD = "WA CREATIVE";

/** Timeline, in seconds from the moment the particles start. */
const T = { form: 1.7, minHold: 2.9, maxWait: 5.5, exit: 1.3 };

type P = { tx: number; ty: number; a0: number; r0: number; d: number; s: number; red: boolean; x: number; y: number; vx: number; vy: number; ox: number; oy: number };

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Cinematic intro, once per browser session: ember particles spiral in and assemble into the
 * WA monogram, a light sweep crosses it, then they burst outward while the screen splits open.
 * An inline script decides before first paint whether to show it (skipped on repeat views and
 * for reduced motion) and holds the hero's entrance animations until the shutter opens.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    const release = () => document.documentElement.classList.remove("pl-on");
    if (!el || !cv || el.hasAttribute("data-skip")) {
      release();
      setDone(true);
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);
    const cx = W / 2;
    const cy = H * 0.44;

    // Sample the monogram into particle targets.
    const mh = Math.min(H * 0.34, W * 0.42, 300);
    const mw = (mh * MONOGRAM_VIEWBOX.width) / MONOGRAM_VIEWBOX.height;
    const off = document.createElement("canvas");
    off.width = Math.ceil(mw);
    off.height = Math.ceil(mh);
    const o = off.getContext("2d")!;
    o.scale(mh / MONOGRAM_VIEWBOX.height, mh / MONOGRAM_VIEWBOX.height);
    o.fillStyle = "#f00";
    o.fill(new Path2D(MONOGRAM_ACCENT_PATH), "evenodd");
    o.fillStyle = "#fff";
    o.fill(new Path2D(MONOGRAM_BODY_PATH));
    const px = o.getImageData(0, 0, off.width, off.height).data;
    const step = Math.max(2, Math.round(mh / (W < 700 ? 95 : 135)));
    const R = Math.hypot(W, H) * 0.62;
    const ps: P[] = [];
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        const i = (y * off.width + x) * 4;
        if (px[i + 3] < 128) continue;
        const tx = cx - mw / 2 + x + (Math.random() - 0.5) * step * 0.6;
        const ty = cy - mh / 2 + y + (Math.random() - 0.5) * step * 0.6;
        ps.push({
          tx,
          ty,
          a0: Math.random() * Math.PI * 2,
          r0: R * (0.55 + Math.random() * 0.6),
          d: Math.random() * 0.55 + (Math.hypot(tx - cx, ty - cy) / mh) * 0.25,
          s: 0.8 + Math.random() * 1.5,
          red: px[i + 1] < 128,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          ox: 0,
          oy: 0,
        });
      }
    }
    // Ambient dust drifting in the light.
    const dust = Array.from({ length: W < 700 ? 60 : 140 }, () => ({ x: Math.random() * W, y: Math.random() * H, v: 0.1 + Math.random() * 0.4, s: Math.random() * 1.4 + 0.3 }));

    let mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => (mouse = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let exitAt = 0;
    let raf = 0;
    let formed = false;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      if (!exitAt && t > T.minHold && (loaded || t > T.maxWait)) {
        exitAt = t;
        el.classList.add("pl-exit");
        release();
        for (const p of ps) {
          const a = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.6;
          const sp = 6 + Math.random() * 22;
          p.vx = Math.cos(a) * sp;
          p.vy = Math.sin(a) * sp - 2;
        }
      }
      if (!formed && t > T.form * 0.8) {
        formed = true;
        el.classList.add("pl-formed");
      }
      const progress = exitAt ? 1 : Math.min(0.99, (t / T.minHold) * (loaded ? 1 : 0.92));
      if (count.current) count.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
      el.style.setProperty("--p", String(progress));

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const ex = exitAt ? Math.min(1, (t - exitAt) / T.exit) : 0;
      ctx.globalAlpha = 0.5 * (1 - ex);
      ctx.fillStyle = "#ffb27a";
      for (const d of dust) {
        d.y -= d.v;
        if (d.y < -4) d.y = H + 4;
        ctx.fillRect(d.x, d.y, d.s, d.s);
      }

      // A warm glow gathers behind the mark as it forms.
      const glow = Math.min(1, Math.max(0, (t - 0.6) / T.form)) * (1 - ex);
      if (glow > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, mh * 0.95);
        g.addColorStop(0, `rgba(255,70,40,${0.22 * glow})`);
        g.addColorStop(0.5, `rgba(200,16,32,${0.1 * glow})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(cx - mh, cy - mh, mh * 2, mh * 2);
      }

      // Light sweep across the formed mark.
      const sweep = (t - T.form - 0.15) / 0.9;
      const sweepPos = cx - mw + sweep * mw * 2.4;

      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? "#ff3a2a" : "#fff4ea";
        for (const p of ps) {
          if (p.red !== (pass === 0)) continue;
          let alpha = 1;
          if (!exitAt) {
            const k = easeOutExpo(Math.max(0, Math.min(1, (t - p.d) / (T.form - 0.5))));
            const a = p.a0 + (1 - k) * 4.2; // spiral in
            const r = p.r0 * (1 - k);
            const bx = p.tx + Math.cos(a) * r;
            const by = p.ty + Math.sin(a) * r;
            // The cursor pushes particles aside; they spring back.
            const dx = bx + p.ox - mouse.x;
            const dy = by + p.oy - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (k > 0.9 && dist < 90) {
              const f = (1 - dist / 90) * 3;
              p.ox += (dx / (dist || 1)) * f;
              p.oy += (dy / (dist || 1)) * f;
            }
            p.ox *= 0.9;
            p.oy *= 0.9;
            const shimmer = k > 0.98 ? Math.sin(t * 6 + p.a0 * 9) * 0.35 : 0;
            p.x = bx + p.ox + shimmer;
            p.y = by + p.oy;
            alpha = 0.25 + k * 0.75;
          } else {
            p.vx *= 0.97;
            p.vy = p.vy * 0.97 + 0.15;
            p.x += p.vx;
            p.y += p.vy;
            alpha = 1 - ex;
          }
          const lit = sweep > 0 && sweep < 1.2 ? Math.max(0, 1 - Math.abs(p.x + (p.y - cy) * 0.5 - sweepPos) / 38) : 0;
          ctx.globalAlpha = Math.min(1, alpha * (0.85 + lit));
          const s = p.s * (1 + lit * 1.6);
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
      }

      if (exitAt && ex >= 1) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("load", onLoad);
      release();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden suppressHydrationWarning>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var e=document.currentScript.parentElement,h=document.documentElement;try{if(sessionStorage.getItem("${KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){e.setAttribute("data-skip","");return}}catch(_){}h.classList.add("pl-on");setTimeout(function(){h.classList.remove("pl-on")},8000)})()`,
        }}
      />
      <div className="pl-half pl-top">
        <div className="pl-ember" />
      </div>
      <div className="pl-half pl-bottom" />
      <div className="pl-line" />
      <canvas ref={canvas} className="pl-canvas" />
      <div className="pl-ui">
        <div className="pl-brand">
          <p className="pl-word">
            {[...WORD].map((c, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>
                {c === " " ? " " : c}
              </span>
            ))}
          </p>
          <p className="pl-sub">Solution</p>
          <p className="pl-tag">{site.tagline}</p>
        </div>
        <div className="pl-meta">
          <span>[ Brand — Web — 3D — AI ]</span>
          <span>
            <span ref={count}>000</span> %
          </span>
        </div>
        <div className="pl-bar" />
      </div>
    </div>
  );
}
