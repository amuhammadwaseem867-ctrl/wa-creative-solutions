"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Info, Minus, Plus, RotateCcw } from "lucide-react";
import { estimatorConfig, formatPrice, type Option } from "@/lib/pricing";
import { calculateEstimate, defaultEstimateInput, type Estimate, type EstimateInput } from "@/lib/estimate";

/** Maps estimator project types to the inquiry form's service values. */
const serviceForType: Record<string, string> = {
  landing: "web",
  business: "web",
  ecommerce: "web",
  webapp: "web",
  brand: "brand-identity",
  cgi: "3d-motion",
  campaign: "marketing",
};

export type EstimateHandoff = { service: string; context: string };

export function summariseEstimate(e: Extract<Estimate, { status: "ok" }>, input: EstimateInput) {
  const c = estimatorConfig;
  const parts = [
    `Estimator: ${e.type.label}, ${e.units} ${e.type.unitLabel}`,
    `${c.complexity.find((x) => x.id === input.complexity)?.label} complexity`,
  ];
  if (e.type.allowsAddons) {
    const m = c.motion.find((x) => x.id === input.motion);
    const a = c.ai.find((x) => x.id === input.ai);
    if (m && m.price) parts.push(m.label);
    if (a && a.price) parts.push(a.label);
  }
  if (e.monthlyLabel) parts.push(`${e.monthlyLabel} (${formatPrice(e.monthly)}/mo)`);
  parts.push(`Indicative range ${formatPrice(e.low)}–${formatPrice(e.high)}`);
  return parts.join(" · ");
}

function OptionGroup({
  legend,
  name,
  options,
  value,
  onChange,
  disabled,
  priceSuffix = "",
}: {
  legend: string;
  name: string;
  options: readonly (Option | { id: string; label: string; hint?: string; multiplier?: number })[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  priceSuffix?: string;
}) {
  return (
    <fieldset disabled={disabled} className="disabled:opacity-40">
      <legend className="field-label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const price = "price" in o ? o.price : undefined;
          return (
            <label key={o.id} className="cursor-pointer has-disabled:cursor-not-allowed">
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={value === o.id}
                onChange={() => onChange(o.id)}
                className="peer sr-only"
              />
              <span className="chip normal-case tracking-normal peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red">
                <span className="font-sans text-[0.9rem]">{o.label}</span>
                {price ? <span className="opacity-60">+{formatPrice(price)}{priceSuffix}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Estimator({ onRequestQuote }: { onRequestQuote: (h: EstimateHandoff) => void }) {
  const [input, setInput] = useState<EstimateInput>(defaultEstimateInput);
  const [unitsText, setUnitsText] = useState("");
  const reduce = useReducedMotion();
  const unitsId = useId();

  const estimate = useMemo(() => calculateEstimate(input), [input]);
  const type = estimatorConfig.projectTypes.find((t) => t.id === input.projectType);

  const set = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setInput((s) => ({ ...s, [k]: v }));

  const selectType = (id: string) => {
    const t = estimatorConfig.projectTypes.find((x) => x.id === id)!;
    setInput((s) => ({
      ...s,
      projectType: id,
      units: t.includedUnits,
      ...(t.allowsAddons ? {} : { motion: "none", ai: "none" }),
    }));
    setUnitsText(String(t.includedUnits));
  };

  const unitsError = (() => {
    if (!type) return null;
    if (unitsText.trim() === "") return "Enter a quantity.";
    const n = Number(unitsText);
    if (!Number.isInteger(n)) return "Use a whole number.";
    if (n < type.minUnits || n > type.maxUnits) return `Choose between ${type.minUnits} and ${type.maxUnits}. Larger scopes are quoted individually.`;
    return null;
  })();

  const changeUnits = (text: string) => {
    setUnitsText(text);
    const n = Number(text);
    if (type && text.trim() !== "" && Number.isInteger(n) && n >= type.minUnits && n <= type.maxUnits) set("units", n);
  };
  const step = (d: number) => {
    if (!type) return;
    const n = Math.min(type.maxUnits, Math.max(type.minUnits, (Number(unitsText) || input.units) + d));
    setUnitsText(String(n));
    set("units", n);
  };

  const reset = () => {
    setInput(defaultEstimateInput);
    setUnitsText("");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Controls */}
      <form className="space-y-10 lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Project estimator">
        <fieldset>
          <legend className="field-label">1 — Project type</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {estimatorConfig.projectTypes.map((t) => (
              <label key={t.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="projectType"
                  value={t.id}
                  checked={input.projectType === t.id}
                  onChange={() => selectType(t.id)}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col gap-1 border border-line bg-ink-2 p-4 transition-colors hover:border-[#454545] peer-checked:border-red peer-checked:bg-ink-3 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-semibold tracking-[-0.02em]">{t.label}</span>
                    <span className="label-caps text-mute">from {formatPrice(t.base)}</span>
                  </span>
                  <span className="text-sm text-mute">{t.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={type ? "" : "pointer-events-none opacity-40"} aria-disabled={!type}>
          <div className="space-y-10">
            <div>
              <label htmlFor={unitsId} className="field-label">
                2 — Number of {type ? type.unitLabel : "pages / deliverables"}
              </label>
              <div className="flex items-center gap-2">
                <button type="button" className="chip h-[3.25rem] w-[3.25rem] justify-center p-0" onClick={() => step(-1)} aria-label="Decrease" disabled={!type}>
                  <Minus size={16} aria-hidden />
                </button>
                <input
                  id={unitsId}
                  type="number"
                  inputMode="numeric"
                  min={type?.minUnits}
                  max={type?.maxUnits}
                  value={unitsText}
                  onChange={(e) => changeUnits(e.target.value)}
                  disabled={!type}
                  aria-invalid={!!unitsError}
                  aria-describedby={`${unitsId}-hint`}
                  className="field w-28 text-center font-display text-xl"
                />
                <button type="button" className="chip h-[3.25rem] w-[3.25rem] justify-center p-0" onClick={() => step(1)} aria-label="Increase" disabled={!type}>
                  <Plus size={16} aria-hidden />
                </button>
              </div>
              <p id={`${unitsId}-hint`} className={unitsError ? "field-error" : "mt-2 text-sm text-mute"}>
                {unitsError ??
                  (type
                    ? `${type.includedUnits} included in the base price · ${formatPrice(type.perExtraUnit)} per additional`
                    : "Select a project type first.")}
              </p>
            </div>

            <OptionGroup
              legend="3 — Complexity"
              name="complexity"
              options={estimatorConfig.complexity}
              value={input.complexity}
              onChange={(v) => set("complexity", v)}
              disabled={!type}
            />

            <div className="space-y-10">
              <OptionGroup
                legend="4 — 3D & animation"
                name="motion"
                options={estimatorConfig.motion}
                value={input.motion}
                onChange={(v) => set("motion", v)}
                disabled={!type || !type.allowsAddons}
              />
              <OptionGroup
                legend="5 — AI integration"
                name="ai"
                options={estimatorConfig.ai}
                value={input.ai}
                onChange={(v) => set("ai", v)}
                disabled={!type || !type.allowsAddons}
              />
              {type && !type.allowsAddons && (
                <p className="-mt-6 flex items-start gap-2 text-sm text-mute">
                  <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
                  Web add-ons don&apos;t apply to {type.label.toLowerCase()} — describe extras in your quote request.
                </p>
              )}
            </div>

            <OptionGroup
              legend="6 — Ongoing maintenance (optional, billed monthly)"
              name="maintenance"
              options={estimatorConfig.maintenance}
              value={input.maintenance}
              onChange={(v) => set("maintenance", v)}
              disabled={!type}
              priceSuffix="/mo"
            />
          </div>
        </div>
      </form>

      {/* Live summary */}
      <aside className="lg:col-span-5" aria-label="Estimate summary">
        <div className="border border-line bg-ink-2 p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <div className="flex items-center justify-between">
            <p className="label-caps text-mute">Indicative estimate</p>
            <button type="button" onClick={reset} className="label-caps inline-flex items-center gap-2 text-mute hover:text-paper disabled:opacity-40" disabled={!input.projectType}>
              <RotateCcw size={13} aria-hidden /> Reset
            </button>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {estimate.status === "empty" ? (
              <div className="py-12 text-center">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Start with a project type</p>
                <p className="mt-2 text-sm text-mute">Your itemised breakdown will appear here and update as you go.</p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={`${estimate.low}-${estimate.high}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="mt-6 font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-semibold tracking-[-0.05em]"
                  >
                    {formatPrice(estimate.low)}
                    <span className="text-mute"> – </span>
                    {formatPrice(estimate.high)}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-mute">One-time project fee, USD</p>

                <table className="mt-8 w-full text-sm">
                  <caption className="label-caps mb-3 text-left text-mute">Breakdown</caption>
                  <tbody>
                    {estimate.lines.map((l) => (
                      <tr key={l.label} className="border-t border-line align-top">
                        <th scope="row" className="py-3 pr-3 text-left font-normal">
                          {l.label}
                          {l.detail && <span className="block text-xs text-mute">{l.detail}</span>}
                        </th>
                        <td className="py-3 text-right font-display whitespace-nowrap">{formatPrice(l.amount)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-paper/40">
                      <th scope="row" className="py-3 text-left font-medium">Subtotal</th>
                      <td className="py-3 text-right font-display font-medium">{formatPrice(estimate.subtotal)}</td>
                    </tr>
                    {estimate.monthlyLabel && (
                      <tr className="border-t border-line">
                        <th scope="row" className="py-3 text-left font-normal">
                          {estimate.monthlyLabel}
                          <span className="block text-xs text-mute">Billed monthly, separate from project fee</span>
                        </th>
                        <td className="py-3 text-right font-display">{formatPrice(estimate.monthly)}/mo</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {estimate.warnings.map((w) => (
                  <p key={w} className="field-error">{w}</p>
                ))}
                <p className="mt-4 text-xs text-mute">
                  Range = subtotal to subtotal × {estimatorConfig.rangeFactor} to allow for content, integrations and revisions discovered during scoping.
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary mt-8 w-full"
            disabled={estimate.status !== "ok" || !!unitsError}
            onClick={() =>
              estimate.status === "ok" &&
              onRequestQuote({ service: serviceForType[estimate.type.id] ?? "multiple", context: summariseEstimate(estimate, input) })
            }
          >
            <span>Request a Formal Quote</span>
            <ArrowUpRight size={16} aria-hidden />
          </button>
          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-mute">
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
            Preliminary estimate only — not a binding quotation. No payment is collected here. Hosting, domains, third-party subscriptions,
            stock assets and API costs are excluded.
          </p>
        </div>
      </aside>
    </div>
  );
}
