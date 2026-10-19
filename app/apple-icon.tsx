import { ImageResponse } from "next/og";
import { MONOGRAM_ACCENT_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
        <svg width={104} height={120} viewBox={`0 0 ${MONOGRAM_VIEWBOX.width} ${MONOGRAM_VIEWBOX.height}`}>
          <path d={MONOGRAM_BODY_PATH} fill="#fff" />
          <path d={MONOGRAM_ACCENT_PATH} fill="#FF202D" />
        </svg>
      </div>
    ),
    size,
  );
}
