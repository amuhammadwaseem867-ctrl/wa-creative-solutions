export type ServiceVisual = "identity" | "web" | "ai" | "cgi" | "campaign" | "editorial";

export type Service = {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  outcomes: string[];
  visual: ServiceVisual;
  /** Value used to pre-select the service in the inquiry form. */
  inquiryValue: string;
};

export const services: Service[] = [
  {
    id: "brand-identity",
    index: "01",
    title: "Brand Identity & Strategy",
    short: "Identities engineered to be recognised, remembered and reused.",
    description:
      "We define what your brand stands for, then build a visual system precise enough to scale — from the mark itself to the rules that keep every touchpoint consistent.",
    deliverables: [
      "Logo design",
      "Complete brand identity systems",
      "Brand guidelines",
      "Packaging design",
      "Corporate stationery",
      "Brand strategy",
    ],
    outcomes: ["Primary & secondary marks", "Colour, type and grid system", "Guideline document"],
    visual: "identity",
    inquiryValue: "brand-identity",
  },
  {
    id: "web",
    index: "02",
    title: "Website Design & Development",
    short: "Fast, considered websites built to turn attention into enquiries.",
    description:
      "Strategy-led UI/UX and hand-built Next.js engineering. Every layout is designed around a clear conversion path and shipped with performance, accessibility and SEO foundations in place.",
    deliverables: [
      "Premium business websites",
      "Custom landing pages",
      "E-commerce websites",
      "Interactive portfolio websites",
      "Next.js web applications",
      "UI/UX design",
      "Conversion-focused website optimisation",
    ],
    outcomes: ["Responsive design system", "Production Next.js build", "Handover documentation"],
    visual: "web",
    inquiryValue: "web",
  },
  {
    id: "ai",
    index: "03",
    title: "AI Creative Solutions",
    short: "Practical AI that sharpens creative work and customer experience.",
    description:
      "We help teams adopt AI where it genuinely helps — faster concept development, smarter workflows and assistants that answer customers in your brand's voice, with humans kept in the loop.",
    deliverables: [
      "AI-assisted creative workflows",
      "Creative concept development",
      "AI-powered business experiences",
      "Workflow automation consulting",
      "AI chatbot integrations",
      "Intelligent customer experience solutions",
    ],
    outcomes: ["Opportunity mapping", "Prototype or integration", "Usage and safety guidelines"],
    visual: "ai",
    inquiryValue: "ai",
  },
  {
    id: "3d-motion",
    index: "04",
    title: "3D, CGI & Motion",
    short: "Products and brands rendered with cinematic precision.",
    description:
      "From photoreal product visualisation to animated logo reveals, we use 3D and motion to show what photography can't — materials, mechanisms and moments that make people stop scrolling.",
    deliverables: [
      "3D product visualisation",
      "CGI advertisements",
      "Motion graphics",
      "Logo animation",
      "Product launch visuals",
      "Cinematic brand films",
    ],
    outcomes: ["Styleframes", "Rendered stills or animation", "Platform-ready exports"],
    visual: "cgi",
    inquiryValue: "3d-motion",
  },
  {
    id: "marketing",
    index: "05",
    title: "Digital Marketing & Content",
    short: "Campaign creative built as a system, not a one-off post.",
    description:
      "We direct and design the content that carries your brand day to day — reusable templates, campaign concepts and ad assets that stay consistent across every channel.",
    deliverables: [
      "Social media design",
      "Campaign creative",
      "Digital advertising assets",
      "Content systems",
      "Creative direction",
    ],
    outcomes: ["Campaign concept", "Template library", "Sized ad and social assets"],
    visual: "campaign",
    inquiryValue: "marketing",
  },
  {
    id: "graphic",
    index: "06",
    title: "Graphic & Communication Design",
    short: "Clear, editorial communication for print and screen.",
    description:
      "Presentations, collateral and editorial layouts designed with the same rigour as a brand system — so the information is easy to read and unmistakably yours.",
    deliverables: [
      "Marketing collateral",
      "Presentation design",
      "Print-ready materials",
      "Advertising campaigns",
      "Editorial design",
    ],
    outcomes: ["Layout system", "Print-ready files", "Editable source templates"],
    visual: "editorial",
    inquiryValue: "graphic",
  },
];

/** Options for the "service required" field — kept in sync with the catalogue. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.inquiryValue, label: s.title })),
  { value: "multiple", label: "Multiple services / not sure yet" },
];
