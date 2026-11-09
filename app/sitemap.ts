import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { regions } from "@/lib/regions";
import { articles } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";
import { STATIC_SITE } from "@/lib/hosting";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

/** The static export serves every page at a trailing-slash URL; list those so no sitemap entry redirects. */
const pageUrl = (path: string) => absoluteUrl(STATIC_SITE && !path.endsWith("/") ? `${path}/` : path);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/web-design-agency", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/ar", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: pageUrl(p.path), lastModified, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...regions.map((r) => ({ url: pageUrl(`/web-design-agency/${r.slug}`), lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: pageUrl(`/insights/${a.slug}`), lastModified: new Date(a.published), changeFrequency: "yearly" as const, priority: 0.7 })),
    ...projects.map((p) => ({
      url: pageUrl(`/work/${p.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [absoluteUrl(p.cover.src)],
    })),
  ];
}
