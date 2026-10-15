import { MONOGRAM_BAR_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";

/**
 * Static "render" of the sculpture — shown first on every device, and kept
 * permanently when WebGL is unavailable or the device is low-powered.
 */
export function MonogramFallback({ className = "" }: { className?: string }) {
  const { width: w, height: h } = MONOGRAM_VIEWBOX;
  return (
    <svg viewBox="-110 -110 357 320" className={className} aria-hidden>
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
          <stop offset="0" stopColor="#ff202d" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff202d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={w / 2} cy={h / 2} r="150" fill="url(#fb-glow)" />
      <polygon
        points={Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return `${w / 2 + Math.cos(a) * 128},${h / 2 + Math.sin(a) * 128}`;
        }).join(" ")}
        fill="none"
        stroke="#1b1b1b"
        strokeWidth="6"
      />
      {[0, 60, 120].map((r) => (
        <line key={r} x1={w / 2 - 170} y1={h / 2} x2={w / 2 + 170} y2={h / 2} stroke="#161616" strokeWidth="1.5" transform={`rotate(${r} ${w / 2} ${h / 2})`} />
      ))}
      <g transform="translate(5 6)">
        <path d={MONOGRAM_BODY_PATH} fill="url(#fb-edge)" />
      </g>
      <path d={MONOGRAM_BODY_PATH} fill="url(#fb-chrome)" />
      <path d={MONOGRAM_BAR_PATH} fill="#ff202d" />
    </svg>
  );
}
