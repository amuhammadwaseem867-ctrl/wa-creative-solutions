/**
 * Static hosting (GitHub Pages) has no server: no route handlers, no email sending, no AI chat.
 * The GitHub Pages workflow builds with NEXT_PUBLIC_STATIC_EXPORT=1; server-dependent
 * features check this flag and fall back to something that still works honestly.
 */
export const STATIC_SITE = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** Path prefix when the site is served from a sub-path (e.g. user.github.io/repo). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a public-folder path for plain <img> tags (next/image handles this via its loader). */
export const asset = (path: string) => `${BASE_PATH}${path}`;

/**
 * Where the API lives. Empty on the server build (same origin). The GitHub Pages build points
 * it at the Netlify deployment, which keeps running the API routes with their secret keys.
 */
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/$/, "");
