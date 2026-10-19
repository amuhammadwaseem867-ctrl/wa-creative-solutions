import type { NextConfig } from "next";

/** Set by the GitHub Pages workflow: build a fully static site into ./out. */
const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
      // GitHub Pages serves folders, so /work/ → /work/index.html.
      trailingSlash: true,
      images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
    }
  : {};

export default nextConfig;
