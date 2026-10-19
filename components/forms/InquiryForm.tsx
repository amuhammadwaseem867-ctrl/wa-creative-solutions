"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Loader2, X } from "lucide-react";
import { budgetOptions, LIMITS, normalizeInquiry, timelineOptions, validateInquiry, type InquiryData, type InquiryErrors } from "@/lib/inquiry";
import { serviceOptions } from "@/lib/services";
import { STATIC_SITE } from "@/lib/hosting";
import { contact } from "@/lib/site";

export type InquiryPrefill = {
  service?: string;
  budget?: string;
  context?: string;
  /** Change to re-apply the prefill to an already-mounted form. */
  nonce?: number;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; fallback: boolean };

const label = (opts: ReadonlyArray<{ value: string; label: string }>, v: string) => opts.find((o) => o.value === v)?.label ?? v;

/** Builds a mailto: link carrying the whole brief (static hosting fallback). */
function mailtoBrief(d: InquiryData) {
  const lines = [
    `Name: ${d.name}`,
    d.company && `Business: ${d.company}`,
    `Email: ${d.email}`,
    d.phone && `Phone / WhatsApp: ${d.phone}`,
    `Service: ${label(serviceOptions, d.service)}`,
    `Budget: ${label(budgetOptions, d.budget)}`,
    `Timeline: ${label(timelineOptions, d.timeline)}`,
    d.context && `Context: ${d.context}`,
    "",
    d.description,
    d.links && `\nReferences:\n${d.links}`,
  ].filter((l): l is string => typeof l === "string" && l.length > 0);
  const subject = `Project brief — ${d.name}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const empty: InquiryData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  description: "",
  links: "",
  consent: false,
  context: "",
};

export function InquiryForm({ prefill, submitLabel = "Send project brief" }: { prefill?: InquiryPrefill; submitLabel?: string }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [data, setData] = useState<InquiryData>(() => ({
    ...empty,
    service: prefill?.service ?? "",
    budget: prefill?.budget ?? "",
    context: prefill?.context ?? "",
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryData, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Re-apply prefill when the parent hands over new context (e.g. from the estimator).
  const [appliedNonce, setAppliedNonce] = useState(prefill?.nonce);
  if (prefill?.nonce !== appliedNonce) {
    setAppliedNonce(prefill?.nonce);
    setData((d) => ({
      ...d,
      service: prefill?.service ?? d.service,
      budget: prefill?.budget ?? d.budget,
      context: prefill?.context ?? d.context,
    }));
  }

  const update = <K extends keyof InquiryData>(k: K, v: InquiryData[K]) => {
    const next = { ...data, [k]: v };
    setData(next);
    if (touched[k]) setErrors(validateInquiry(next));
  };
  // Validate on blur only once something was entered, and never when focus is moving to the
  // submit button — an error appearing mid-click would shift the button out from under the pointer.
  const blur = (k: keyof InquiryData, e: React.FocusEvent) => {
    const next = e.relatedTarget as HTMLElement | null;
    if (next?.getAttribute("type") === "submit") return;
    const value = data[k];
    if (!touched[k] && (value === "" || value === false)) return;
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateInquiry(data));
  };
  const err = (k: keyof InquiryData) => (touched[k] ? errors[k] : undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    const form = e.currentTarget;
    const clean = normalizeInquiry(data as unknown as Record<string, unknown>);
    const v = validateInquiry(clean);
    setErrors(v);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const firstInvalid = Object.keys(v)[0];
    if (firstInvalid) {
      (form.querySelector(`[name="${firstInvalid}"]`) as HTMLElement | null)?.focus();
      return;
    }

    if (STATIC_SITE) {
      // No server on static hosting: open the visitor's email app with the brief written out.
      window.location.href = mailtoBrief(clean);
      setStatus({
        kind: "success",
        message: `Your email app should now open with the brief ready to send — press send to deliver it. If nothing opened, email ${contact.email} directly.`,
      });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clean,
          // Spam protection: honeypot + time-to-complete.
          website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: InquiryErrors };
      if (res.ok && body.ok) {
        setStatus({ kind: "success", message: body.message ?? "Your brief has been delivered." });
        setData({ ...empty });
        setTouched({});
      } else {
        if (body.errors) setErrors(body.errors);
        setStatus({
          kind: "error",
          message: body.message ?? "Something went wrong while sending your brief.",
          fallback: res.status >= 500 || res.status === 429,
        });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again.", fallback: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-ink-2 p-8 outline-none sm:p-12">
        <CheckCircle2 className="text-red" size={36} aria-hidden />
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{STATIC_SITE ? "Almost there." : "Brief received."}</h3>
        <p className="mt-3 max-w-lg text-mute">{status.message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => setStatus({ kind: "idle" })}>
            Send another brief
          </button>
          <Link href="/work" className="btn btn-ghost">
            <span>Browse our work</span>
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  const fieldProps = (k: keyof InquiryData) => ({
    id: id(k),
    name: k,
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? id(`${k}-err`) : undefined,
    onBlur: (e: React.FocusEvent) => blur(k, e),
  });
  const renderError = (k: keyof InquiryData) =>
    err(k) ? (
      <p id={id(`${k}-err`)} className="field-error">
        {err(k)}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={id("req")}>
      <p id={id("req")} className="text-sm text-mute">
        Fields marked <span className="text-red">*</span> are required.
      </p>

      {status.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="flex gap-3 border border-red/60 bg-red/10 p-4 outline-none">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red" aria-hidden />
          <div className="text-sm">
            <p className="font-medium text-paper">{status.message}</p>
            {status.fallback && (
              <p className="mt-1 text-paper/75">
                Your details are still on this page. Please try again, or send them to{" "}
                <a className="underline underline-offset-2" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      )}

      {data.context && (
        <div className="flex items-start justify-between gap-4 border border-line bg-ink-3 p-4 text-sm">
          <p>
            <span className="label-caps mb-1 block text-mute">Attached to your brief</span>
            {data.context}
          </p>
          <button type="button" onClick={() => update("context", "")} className="shrink-0 text-mute hover:text-paper" aria-label="Remove attached context">
            <X size={16} aria-hidden />
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="field-label">
            Name <span className="text-red">*</span>
          </label>
          <input {...fieldProps("name")} className="field" autoComplete="name" maxLength={LIMITS.name} required value={data.name} onChange={(e) => update("name", e.target.value)} />
          {renderError("name")}
        </div>
        <div>
          <label htmlFor={id("company")} className="field-label">
            Business / company
          </label>
          <input {...fieldProps("company")} className="field" autoComplete="organization" maxLength={LIMITS.company} value={data.company} onChange={(e) => update("company", e.target.value)} />
          {renderError("company")}
        </div>
        <div>
          <label htmlFor={id("email")} className="field-label">
            Email <span className="text-red">*</span>
          </label>
          <input {...fieldProps("email")} type="email" className="field" autoComplete="email" inputMode="email" maxLength={LIMITS.email} required value={data.email} onChange={(e) => update("email", e.target.value)} />
          {renderError("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="field-label">
            Phone / WhatsApp <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input {...fieldProps("phone")} type="tel" className="field" autoComplete="tel" maxLength={LIMITS.phone} value={data.phone} onChange={(e) => update("phone", e.target.value)} />
          {renderError("phone")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor={id("service")} className="field-label">
            Service required <span className="text-red">*</span>
          </label>
          <select {...fieldProps("service")} className="field" required value={data.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Select…</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {renderError("service")}
        </div>
        <div>
          <label htmlFor={id("budget")} className="field-label">
            Estimated budget <span className="text-red">*</span>
          </label>
          <select {...fieldProps("budget")} className="field" required value={data.budget} onChange={(e) => update("budget", e.target.value)}>
            <option value="">Select…</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {renderError("budget")}
        </div>
        <div>
          <label htmlFor={id("timeline")} className="field-label">
            Expected timeline <span className="text-red">*</span>
          </label>
          <select {...fieldProps("timeline")} className="field" required value={data.timeline} onChange={(e) => update("timeline", e.target.value)}>
            <option value="">Select…</option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {renderError("timeline")}
        </div>
      </div>

      <div>
        <label htmlFor={id("description")} className="field-label">
          Project description <span className="text-red">*</span>
        </label>
        <textarea
          {...fieldProps("description")}
          rows={6}
          className="field resize-y"
          maxLength={LIMITS.description}
          required
          placeholder="What are you building, who is it for, and what does success look like?"
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <div className="flex justify-between gap-4">
          {renderError("description")}
          <span className="mt-2 ml-auto font-display text-xs text-mute">
            {data.description.length}/{LIMITS.description}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor={id("links")} className="field-label">
          Reference links <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          {...fieldProps("links")}
          rows={2}
          className="field resize-y"
          maxLength={LIMITS.links}
          placeholder="https://… (websites, brands or work you like — one per line)"
          value={data.links}
          onChange={(e) => update("links", e.target.value)}
        />
        {renderError("links")}
      </div>

      {/* Honeypot — hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-paper/85">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#ff202d]"
            checked={data.consent}
            onChange={(e) => {
              // Validate against the new value so a stale "please confirm" error never lingers.
              const next = { ...data, consent: e.target.checked };
              setData(next);
              setTouched((t) => ({ ...t, consent: true }));
              setErrors(validateInquiry(next));
            }}
          />
          <span>
            I agree that WA Creative Solution may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-paper">
              privacy policy
            </Link>
            . <span className="text-red">*</span>
          </span>
        </label>
        {renderError("consent")}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status.kind === "submitting"} aria-busy={status.kind === "submitting"}>
          {status.kind === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>{submitLabel}</span>
              <ArrowUpRight size={16} aria-hidden />
            </>
          )}
        </button>
        <p className="text-sm text-mute">
          Prefer email?{" "}
          <a href={`mailto:${contact.email}`} className="underline underline-offset-2 hover:text-paper">
            {contact.email}
          </a>
        </p>
      </div>
    </form>
  );
}
