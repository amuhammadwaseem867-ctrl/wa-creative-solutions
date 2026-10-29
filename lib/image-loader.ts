/**
 * next/image loader for the static export: there's no image optimiser on GitHub Pages,
 * so images are served as-is from the public folder (with the base path, if any).
 */
export default function staticImageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  // The width query is ignored by the static host; it keeps each srcset entry distinct.
  // The version changes on every deploy, so browsers never keep a replaced screenshot.
  const v = process.env.NEXT_PUBLIC_ASSET_VERSION;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}${v ? `&v=${v}` : ""}`;
}
