/**
 * WA "Prism" monogram — single source of truth for the SVG logo, favicon,
 * Open Graph / app icons and brand files.
 *
 * Construction (viewBox 114.3 × 90): two inverted blades and an upright A,
 * separated by precision cuts of equal width. The outer edges and the cuts
 * trace a W; the centre form is the A. The A's apex — split off by the
 * crossbar cut — is the only accent-coloured element: a small upward
 * "what comes next" signal. Every version still reads in pure monochrome.
 */
export const MONOGRAM_VIEWBOX = { width: 114.3, height: 90 } as const;

export type Polygon = ReadonlyArray<readonly [number, number]>;

export const MONOGRAM_SHAPES: Record<"bladeLeft" | "bladeRight" | "base", Polygon> = {
  bladeLeft: [[0, 0], [50.3, 0], [25.15, 78.59]],
  bladeRight: [[64, 0], [114.3, 0], [89.15, 78.59]],
  base: [[45.12, 49], [69.18, 49], [82.3, 90], [32, 90]],
};

/** The A's apex — accent-coloured on colour versions. */
export const MONOGRAM_ACCENT: Polygon = [[57.15, 11.41], [65.98, 39], [48.32, 39]];

export const toPath = (poly: Polygon) => "M" + poly.map(([x, y]) => `${x} ${y}`).join(" L") + " Z";

export const MONOGRAM_BODY_PATH = Object.values(MONOGRAM_SHAPES).map(toPath).join(" ");
export const MONOGRAM_ACCENT_PATH = toPath(MONOGRAM_ACCENT);
