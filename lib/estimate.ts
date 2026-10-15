import { estimatorConfig, type ProjectType } from "./pricing";

export type EstimateInput = {
  projectType: string | null;
  units: number;
  complexity: string;
  motion: string;
  ai: string;
  maintenance: string;
};

export type LineItem = { label: string; amount: number; detail?: string };

export type Estimate =
  | { status: "empty" }
  | {
      status: "ok";
      type: ProjectType;
      units: number;
      lines: LineItem[];
      subtotal: number;
      low: number;
      high: number;
      monthly: number;
      monthlyLabel: string | null;
      warnings: string[];
    };

export const defaultEstimateInput: EstimateInput = {
  projectType: null,
  units: 1,
  complexity: "essential",
  motion: "none",
  ai: "none",
  maintenance: "none",
};

const round = (n: number) => Math.round(n / estimatorConfig.roundTo) * estimatorConfig.roundTo;

const pick = <T extends { id: string }>(list: readonly T[], id: string) => list.find((o) => o.id === id) ?? list[0];

export function clampUnits(type: ProjectType, units: number) {
  if (!Number.isFinite(units)) return type.includedUnits;
  return Math.min(type.maxUnits, Math.max(type.minUnits, Math.round(units)));
}

/** Pure, transparent calculation — every number shown to the user comes from here. */
export function calculateEstimate(input: EstimateInput): Estimate {
  const type = estimatorConfig.projectTypes.find((t) => t.id === input.projectType);
  if (!type) return { status: "empty" };

  const warnings: string[] = [];
  const units = clampUnits(type, input.units);
  if (units !== input.units) {
    warnings.push(`${type.unitLabel[0].toUpperCase()}${type.unitLabel.slice(1)} adjusted to the supported range (${type.minUnits}–${type.maxUnits}).`);
  }

  const lines: LineItem[] = [{ label: `${type.label} — base`, amount: type.base, detail: `Includes ${type.includedUnits} ${type.unitLabel}` }];

  const extra = Math.max(0, units - type.includedUnits);
  if (extra > 0) {
    lines.push({ label: `Additional ${type.unitLabel}`, amount: extra * type.perExtraUnit, detail: `${extra} × ${type.perExtraUnit}` });
  }

  const complexity = pick(estimatorConfig.complexity, input.complexity);
  const scoped = lines.reduce((s, l) => s + l.amount, 0);
  if (complexity.multiplier !== 1) {
    lines.push({
      label: `${complexity.label} complexity`,
      amount: Math.round(scoped * (complexity.multiplier - 1)),
      detail: `+${Math.round((complexity.multiplier - 1) * 100)}% of design & build`,
    });
  }

  if (type.allowsAddons) {
    const motion = pick(estimatorConfig.motion, input.motion);
    if (motion.price) lines.push({ label: motion.label, amount: motion.price, detail: motion.hint });
    const ai = pick(estimatorConfig.ai, input.ai);
    if (ai.price) lines.push({ label: ai.label, amount: ai.price, detail: ai.hint });
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const maintenance = pick(estimatorConfig.maintenance, input.maintenance);

  return {
    status: "ok",
    type,
    units,
    lines,
    subtotal,
    low: round(subtotal),
    high: round(subtotal * estimatorConfig.rangeFactor),
    monthly: maintenance.price,
    monthlyLabel: maintenance.price ? maintenance.label : null,
    warnings,
  };
}
