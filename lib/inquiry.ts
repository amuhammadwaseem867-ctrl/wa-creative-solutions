import { serviceOptions } from "./services";

/** Shared between the client form and the API route so rules never drift. */
export const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1500", label: "$500 – $1,500" },
  { value: "1500-5000", label: "$1,500 – $5,000" },
  { value: "5000-15000", label: "$5,000 – $15,000" },
  { value: "15000-plus", label: "$15,000+" },
  { value: "unsure", label: "Not sure yet" },
];

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1 – 3 months" },
  { value: "3-plus-months", label: "3+ months" },
  { value: "flexible", label: "Flexible" },
];

export type InquiryData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  links: string;
  consent: boolean;
  /** Optional context, e.g. selected package or estimator summary. */
  context: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryData, string>>;

export const LIMITS = { name: 100, company: 120, email: 160, phone: 40, description: 4000, links: 1000, context: 1500 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,}$/;

const allowed = (list: { value: string }[], v: string) => list.some((o) => o.value === v);

export function normalizeInquiry(raw: Record<string, unknown>): InquiryData {
  const s = (k: keyof InquiryData) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  return {
    name: s("name"),
    company: s("company"),
    email: s("email").toLowerCase(),
    phone: s("phone"),
    service: s("service"),
    budget: s("budget"),
    timeline: s("timeline"),
    description: s("description"),
    links: s("links"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    context: s("context"),
  };
}

export function validateInquiry(d: InquiryData): InquiryErrors {
  const e: InquiryErrors = {};
  if (d.name.length < 2) e.name = "Please enter your name.";
  else if (d.name.length > LIMITS.name) e.name = "Name is too long.";
  if (d.company.length > LIMITS.company) e.company = "Company name is too long.";
  if (!d.email) e.email = "Please enter your email address.";
  else if (!EMAIL.test(d.email) || d.email.length > LIMITS.email) e.email = "Please enter a valid email address.";
  if (d.phone && (!PHONE.test(d.phone) || d.phone.length > LIMITS.phone)) e.phone = "Please enter a valid phone or WhatsApp number.";
  if (!allowed(serviceOptions, d.service)) e.service = "Please choose the service you need.";
  if (!allowed(budgetOptions, d.budget)) e.budget = "Please choose an estimated budget.";
  if (!allowed(timelineOptions, d.timeline)) e.timeline = "Please choose an expected timeline.";
  if (d.description.length < 20) e.description = "Tell us a little more — at least 20 characters.";
  else if (d.description.length > LIMITS.description) e.description = `Please keep the description under ${LIMITS.description} characters.`;
  if (d.links.length > LIMITS.links) e.links = "Too many links — please shorten this field.";
  else if (d.links) {
    const bad = d.links.split(/[\s,]+/).filter(Boolean).find((l) => !/^https?:\/\/\S+\.\S+/i.test(l));
    if (bad) e.links = "Links should start with http:// or https:// and be separated by spaces or new lines.";
  }
  if (d.context.length > LIMITS.context) e.context = "Context is too long.";
  if (!d.consent) e.consent = "Please confirm you agree to the privacy policy.";
  return e;
}

export const labelFor = (list: { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label ?? v;
