import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
