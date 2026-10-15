/**
 * CENTRAL PRICING CONFIGURATION
 * ------------------------------------------------------------------
 * All prices are ILLUSTRATIVE starting prices in USD — not verified
 * market rates. Edit values here; the packages, comparison table,
 * estimator and FAQ update automatically.
 */
export const currency = { code: "USD", locale: "en-US" } as const;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(value);

export type Package = {
  id: "starter" | "professional" | "premium" | "enterprise";
  code: string;
  name: string;
  /** null = custom quote */
  startingAt: number | null;
  audience: string;
  includes: string[];
  revisionRounds: number | null;
  cta: string;
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "starter",
    code: "A",
    name: "Starter",
    startingAt: 199,
    audience: "For individuals and small businesses establishing a professional presence.",
    includes: [
      "One-page landing website or a small defined design assignment",
      "Responsive design for an included landing page",
      "Essential contact section",
      "Basic on-page SEO setup for websites",
      "Two revision rounds",
      "Clearly defined delivery scope",
      "Project handover",
    ],
    revisionRounds: 2,
    cta: "Choose Starter",
  },
  {
    id: "professional",
    code: "B",
    name: "Professional",
    startingAt: 699,
    audience: "For growing businesses ready to build a stronger digital identity.",
    includes: [
      "Multi-section or small multi-page website within an agreed scope",
      "Custom UI/UX direction",
      "Responsive layouts",
      "Brand-aligned visual system",
      "Contact form integration",
      "Basic technical SEO setup",
      "Performance optimisation",
      "Three revision rounds",
      "Handover documentation",
    ],
    revisionRounds: 3,
    cta: "Choose Professional",
    featured: true,
  },
  {
    id: "premium",
    code: "C",
    name: "Premium",
    startingAt: 1499,
    audience: "For ambitious brands seeking a distinctive digital experience.",
    includes: [
      "Custom multi-page website",
      "Advanced visual direction",
      "Selected 3D or motion elements",
      "Advanced interactions",
      "Carefully optimised responsive experience",
      "Technical SEO foundations",
      "Analytics integration where access is supplied",
      "Testing and launch support",
      "Four revision rounds",
    ],
    revisionRounds: 4,
    cta: "Choose Premium",
  },
  {
    id: "enterprise",
    code: "D",
    name: "Creative Technology / Enterprise",
    startingAt: null,
    audience:
      "For complex websites, e-commerce, custom applications, AI integrations, CGI campaigns and ongoing creative partnerships.",
    includes: [
      "Discovery and technical scoping",
      "Custom design and development",
      "Optional AI integrations",
      "Advanced motion or 3D features",
      "Integration planning",
      "Defined milestones and deliverables",
      "Dedicated project communication",
      "Custom support arrangements",
    ],
    revisionRounds: null,
    cta: "Request a Custom Quote",
  },
];

/** Rows for the comparison table: which packages include each capability. */
export const comparisonRows: { label: string; values: Record<Package["id"], string | boolean> }[] = [
  { label: "Scope", values: { starter: "1 page / small task", professional: "Small multi-page", premium: "Custom multi-page", enterprise: "Scoped together" } },
  { label: "Responsive design", values: { starter: true, professional: true, premium: true, enterprise: true } },
  { label: "Custom UI/UX direction", values: { starter: false, professional: true, premium: true, enterprise: true } },
  { label: "Contact form integration", values: { starter: "Contact section", professional: true, premium: true, enterprise: true } },
  { label: "SEO setup", values: { starter: "Basic on-page", professional: "Basic technical", premium: "Technical foundations", enterprise: "As scoped" } },
  { label: "3D or motion elements", values: { starter: false, professional: false, premium: "Selected", enterprise: "Advanced" } },
  { label: "Analytics integration", values: { starter: false, professional: false, premium: "If access supplied", enterprise: "As scoped" } },
  { label: "AI integrations", values: { starter: false, professional: false, premium: false, enterprise: "Optional" } },
  { label: "Revision rounds", values: { starter: "2", professional: "3", premium: "4", enterprise: "Per milestone" } },
  { label: "Handover", values: { starter: "Handover", professional: "Documentation", premium: "Launch support", enterprise: "Custom support" } },
];

export const pricingPolicies = {
  excluded: [
    "Hosting and domain registration",
    "Third-party subscriptions (CMS, e-commerce platforms, plugins, email services)",
    "Paid stock photography, video, fonts or 3D assets",
    "External API usage costs (including AI model usage)",
    "Copywriting and translation unless agreed in the scope",
    "Ongoing maintenance or retainers unless separately configured",
  ],
  revisions:
    "A revision round is one consolidated set of feedback on the current deliverable, returned within the agreed window. Revisions refine the approved direction; they don't restart it.",
  changeRequests:
    "Anything outside the written scope — new pages, features, deliverables or a change of direction after approval — is a change request. We'll estimate it in writing and only proceed once you approve the cost and timeline impact.",
  notes: [
    "All prices are starting prices and will be confirmed in a written quote after scoping.",
    "Final pricing depends on scope, complexity, revisions, deliverables and project requirements.",
    "We never offer unlimited work — every project has a defined scope.",
  ],
};

/* ------------------------------------------------------------------ */
/* ESTIMATOR RULES                                                     */
/* ------------------------------------------------------------------ */

export type ProjectType = {
  id: string;
  label: string;
  description: string;
  base: number;
  unitLabel: string;
  /** Units covered by the base price. */
  includedUnits: number;
  perExtraUnit: number;
  minUnits: number;
  maxUnits: number;
  /** Whether the AI / 3D add-ons make sense for this type. */
  allowsAddons: boolean;
};

export type Option = { id: string; label: string; price: number; hint?: string };

export const estimatorConfig = {
  projectTypes: [
    { id: "landing", label: "Landing page", description: "Single high-impact page", base: 199, unitLabel: "sections", includedUnits: 5, perExtraUnit: 40, minUnits: 1, maxUnits: 12, allowsAddons: true },
    { id: "business", label: "Business website", description: "Multi-page company site", base: 699, unitLabel: "pages", includedUnits: 5, perExtraUnit: 90, minUnits: 1, maxUnits: 30, allowsAddons: true },
    { id: "ecommerce", label: "E-commerce", description: "Online store & product pages", base: 1499, unitLabel: "page templates", includedUnits: 6, perExtraUnit: 120, minUnits: 3, maxUnits: 25, allowsAddons: true },
    { id: "webapp", label: "Web application", description: "Custom Next.js product", base: 2500, unitLabel: "core screens", includedUnits: 6, perExtraUnit: 180, minUnits: 3, maxUnits: 40, allowsAddons: true },
    { id: "brand", label: "Brand identity", description: "Logo & identity system", base: 299, unitLabel: "brand applications", includedUnits: 3, perExtraUnit: 45, minUnits: 1, maxUnits: 20, allowsAddons: false },
    { id: "cgi", label: "3D / CGI visuals", description: "Product renders or animation", base: 349, unitLabel: "renders or shots", includedUnits: 2, perExtraUnit: 120, minUnits: 1, maxUnits: 30, allowsAddons: false },
    { id: "campaign", label: "Campaign & content", description: "Social & ad creative set", base: 249, unitLabel: "assets", includedUnits: 6, perExtraUnit: 25, minUnits: 1, maxUnits: 60, allowsAddons: false },
  ] satisfies ProjectType[],

  complexity: [
    { id: "essential", label: "Essential", multiplier: 1, hint: "Clean, proven patterns" },
    { id: "custom", label: "Custom", multiplier: 1.3, hint: "Bespoke design direction" },
    { id: "advanced", label: "Advanced", multiplier: 1.65, hint: "Complex logic or art direction" },
  ],

  motion: [
    { id: "none", label: "None", price: 0 },
    { id: "subtle", label: "Subtle motion", price: 150, hint: "Reveals & micro-interactions" },
    { id: "advanced", label: "Advanced motion", price: 450, hint: "Scroll choreography" },
    { id: "3d-hero", label: "3D hero object", price: 650, hint: "One interactive WebGL scene" },
    { id: "3d-showcase", label: "3D showcase", price: 1200, hint: "Interactive product viewer" },
  ] satisfies Option[],

  ai: [
    { id: "none", label: "None", price: 0 },
    { id: "chatbot", label: "AI chat assistant", price: 450, hint: "Trained on your content" },
    { id: "automation", label: "Workflow automation", price: 800, hint: "Connect forms, CRM, email" },
    { id: "custom", label: "Custom AI feature", price: 1500, hint: "Bespoke integration" },
  ] satisfies Option[],

  maintenance: [
    { id: "none", label: "No maintenance", price: 0 },
    { id: "care", label: "Care plan", price: 49, hint: "Updates, backups, small fixes" },
    { id: "growth", label: "Growth plan", price: 149, hint: "Care + monthly improvements" },
  ] satisfies Option[],

  /** Upper bound of the indicative range = subtotal × this factor. */
  rangeFactor: 1.3,
  roundTo: 10,
};
