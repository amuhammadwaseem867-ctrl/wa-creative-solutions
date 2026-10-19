import { ImageResponse } from "next/og";
import { MONOGRAM_ACCENT_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          padding: 72,
          color: "#fff",
          fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(circle at 80% 35%, rgba(255,255,255,0.12), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width={78} height={90} viewBox={`0 0 ${MONOGRAM_VIEWBOX.width} ${MONOGRAM_VIEWBOX.height}`}>
            <path d={MONOGRAM_BODY_PATH} fill="#fff" />
            <path d={MONOGRAM_ACCENT_PATH} fill="#FF202D" />
          </svg>
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#A7A7A7" }}>WA CREATIVE SOLUTION</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>We Create What</div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>
            Comes Next<span style={{ color: "#FF202D" }}>.</span>
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#A7A7A7" }}>Brand · Web · 3D & Motion · AI Creative Solutions</div>
      </div>
    ),
    size,
  );
}
