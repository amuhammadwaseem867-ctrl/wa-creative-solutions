/**
 * WA monogram geometry — a single source of truth shared by the SVG logo,
 * the favicon/OG renderers and the extruded 3D sculpture.
 *
 * Construction (viewBox 137.2 × 100): two parallel "W" blades flank a sharp
 * "A". The A's crossbar is a precision cut — two thin slits separate it from
 * the legs, so the mark still reads in pure monochrome.
 */
export const MONOGRAM_VIEWBOX = { width: 137.2, height: 100 } as const;

export type Polygon = ReadonlyArray<readonly [number, number]>;

export const MONOGRAM_SHAPES: Record<"bladeLeft" | "bladeRight" | "apex" | "legLeft" | "legRight", Polygon> = {
  bladeLeft: [[0, 0], [14, 0], [40, 100], [26, 100]],
  bladeRight: [[123.2, 0], [137.2, 0], [111.2, 100], [97.2, 100]],
  apex: [[52.48, 62], [68.6, 0], [84.72, 62], [70.72, 62], [68.6, 53.85], [66.48, 62]],
  legLeft: [[48.58, 77], [62.58, 77], [56.6, 100], [42.6, 100]],
  legRight: [[74.62, 77], [88.62, 77], [94.6, 100], [80.6, 100]],
};

/** The crossbar — rendered in the accent colour on colour versions. */
export const MONOGRAM_BAR: Polygon = [[51.83, 64.5], [85.37, 64.5], [87.97, 74.5], [49.23, 74.5]];

export const toPath = (poly: Polygon) =>
  "M" + poly.map(([x, y]) => `${x} ${y}`).join(" L") + " Z";

export const MONOGRAM_BODY_PATH = Object.values(MONOGRAM_SHAPES).map(toPath).join(" ");
export const MONOGRAM_BAR_PATH = toPath(MONOGRAM_BAR);
