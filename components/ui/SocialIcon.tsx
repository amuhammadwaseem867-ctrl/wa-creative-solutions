/** Minimal brand glyphs (lucide no longer ships brand icons). */
export function SocialIcon({ label, size = 18 }: { label: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (label.toLowerCase()) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.2h-2.9C10.9 2.2 10 4.6 10 6.4v2.1H7.5V12H10v9.8h4V12h2.9l.4-3.5H14Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M4.5 3.2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM2.6 9.4h3.8v12H2.6v-12Zm6.3 0h3.7v1.7h.1c.5-1 1.8-2 3.7-2 3.9 0 4.6 2.6 4.6 5.9v6.4h-3.8V15.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H8.9v-12Z" />
        </svg>
      );
    default:
      return null;
  }
}
