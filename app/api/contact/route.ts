import { Resend } from "resend";
import { budgetOptions, labelFor, normalizeInquiry, timelineOptions, validateInquiry, type InquiryData } from "@/lib/inquiry";
import { serviceOptions } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Project inquiry endpoint.
 *
 * Required server-only environment variables:
 *   RESEND_API_KEY — Resend API key (never exposed to the client)
 *   CONTACT_EMAIL  — inbox that receives briefs (comma-separate for several)
 *   FROM_EMAIL     — verified Resend sender, e.g. "WA Creative Solution <hello@yourdomain.com>"
 *
 * The route only reports success after Resend confirms the email was accepted.
 */

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance rate limit. Use a shared store for multi-region deployments.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(429, { ok: false, message: "Too many submissions from this connection. Please wait a few minutes or email us directly." });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json(400, { ok: false, message: "Invalid request." });
  }

  // Spam protection: honeypot must be empty and the form can't be completed instantly.
  const elapsed = Number(raw.elapsedMs);
  if ((typeof raw.website === "string" && raw.website.trim() !== "") || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json(400, { ok: false, message: "Your submission was flagged by our spam protection. Please try again, or email us directly." });
  }

  const data = normalizeInquiry(raw);
  const errors = validateInquiry(data);
  if (Object.keys(errors).length) {
    return json(422, { ok: false, message: "Please correct the highlighted fields.", errors });
  }

  const { RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL || !FROM_EMAIL) {
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_EMAIL and FROM_EMAIL.");
    return json(503, {
      ok: false,
      message: "Our online form isn't connected right now, so your brief was not sent.",
    });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `New project brief — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: renderEmail(data),
      text: renderText(data),
    });
    if (error) {
      console.error("Resend error:", error);
      return json(502, { ok: false, message: "We couldn't deliver your brief just now. Please try again shortly." });
    }
  } catch (err) {
    console.error("Contact route error:", err);
    return json(500, { ok: false, message: "We couldn't deliver your brief just now. Please try again shortly." });
  }

  return json(200, {
    ok: true,
    message: `Thanks, ${data.name.split(" ")[0]}. Your brief was delivered to our inbox and we'll reply to ${data.email}.`,
  });
}

function rows(d: InquiryData): [string, string][] {
  return [
    ["Name", d.name],
    ["Company", d.company || "—"],
    ["Email", d.email],
    ["Phone / WhatsApp", d.phone || "—"],
    ["Service", labelFor(serviceOptions, d.service)],
    ["Budget", labelFor(budgetOptions, d.budget)],
    ["Timeline", labelFor(timelineOptions, d.timeline)],
    ["Context", d.context || "—"],
    ["Reference links", d.links || "—"],
    ["Description", d.description],
  ];
}

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

function renderEmail(d: InquiryData) {
  const body = rows(d)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:14px 0;border-top:1px solid #292929;vertical-align:top;width:150px;color:#FF202D;font:600 11px/1.4 monospace;letter-spacing:.12em;text-transform:uppercase">${esc(k)}</td><td style="padding:14px 0;border-top:1px solid #292929;color:#F4F4F4;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<div style="background:#080808;padding:32px;font-family:Arial,Helvetica,sans-serif;line-height:1.6"><div style="max-width:680px;margin:0 auto;background:#111111;border:1px solid #292929;padding:32px"><p style="margin:0 0 18px;color:#FF202D;font:700 11px monospace;letter-spacing:.2em">${esc(site.name.toUpperCase())}</p><h1 style="margin:0 0 24px;color:#fff;font-size:26px">New project brief</h1><table style="width:100%;border-collapse:collapse">${body}</table><p style="margin-top:28px;color:#A7A7A7;font-size:12px">Sent from the website inquiry form. Reply directly to respond to the client.</p></div></div>`;
}

const renderText = (d: InquiryData) =>
  rows(d)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
