/**
 * Static "render" of the liquid-chrome form — shown first on every device and
 * kept when WebGL is unavailable, the device is low-powered, or Save-Data is on.
 */
export function BlobFallback({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="bf-base" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#f5f5f6" />
          <stop offset="0.22" stopColor="#9d9da2" />
          <stop offset="0.48" stopColor="#2a2a2d" />
          <stop offset="0.72" stopColor="#0c0c0d" />
          <stop offset="0.9" stopColor="#3a3a3e" />
          <stop offset="1" stopColor="#8a8a90" />
        </radialGradient>
        <linearGradient id="bf-rim" x1="1" y1="0.2" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ff202d" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#ff202d" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bf-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="bf-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path
        d="M200 40c72 0 128 38 150 104 20 60-6 128-58 170-48 39-122 52-180 22-58-31-88-96-78-160C44 103 118 40 200 40Z"
        fill="url(#bf-base)"
      />
      <path
        d="M200 40c72 0 128 38 150 104 20 60-6 128-58 170-48 39-122 52-180 22-58-31-88-96-78-160C44 103 118 40 200 40Z"
        fill="url(#bf-rim)"
      />
      <ellipse cx="150" cy="118" rx="58" ry="26" fill="url(#bf-spec)" transform="rotate(-24 150 118)" filter="url(#bf-soft)" />
      <ellipse cx="292" cy="268" rx="22" ry="54" fill="#fff" opacity="0.18" transform="rotate(28 292 268)" filter="url(#bf-soft)" />
    </svg>
  );
}
