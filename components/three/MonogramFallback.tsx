import { MONOGRAM_BAR_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";

/**
 * Static "render" of the sculpture — shown first on every device, and kept
 * permanently when WebGL is unavailable or the device is low-powered.
 */
export function MonogramFallback({ className = "" }: { className?: string }) {
  const { width: w, height: h } = MONOGRAM_VIEWBOX;
  return (
    <svg viewBox="-62 -78 261.2 256" className={className} aria-hidden>
      <defs>
        <linearGradient id="fb-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#8d8d8f" />
          <stop offset="0.52" stopColor="#f2f2f2" />
          <stop offset="0.7" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#bdbdbf" />
        </linearGradient>
        <linearGradient id="fb-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0c0c0c" />
        </linearGradient>
        <radialGradient id="fb-glow" cx="0.3" cy="0.7" r="0.6">
          <stop offset="0" stopColor="#ff202d" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ff202d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={w / 2} cy={h / 2} r="125" fill="url(#fb-glow)" />
      <polygon
        points={Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return `${w / 2 + Math.cos(a) * 112},${h / 2 + Math.sin(a) * 112}`;
        }).join(" ")}
        fill="none"
        stroke="#1b1b1b"
        strokeWidth="4"
      />
      <g transform="translate(5 6)">
        <path d={MONOGRAM_BODY_PATH} fill="url(#fb-edge)" />
      </g>
      <path d={MONOGRAM_BODY_PATH} fill="url(#fb-chrome)" />
      <path d={MONOGRAM_BAR_PATH} fill="#ff202d" />
    </svg>
  );
}
