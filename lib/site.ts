/**
 * Central brand, contact and social configuration.
 *
 * Contact details below were already published on the previous version of
 * this site. Anything not yet supplied is left `null` and simply isn't
 * rendered, never replace it with an invented value.
 */
export const site = {
  name: "WA Creative Solution",
  shortName: "WA Creative",
  tagline: "We Create What Comes Next.",
  altTagline: "Creativity, Engineered for the Future.",
  statement:
    "We transform ambitious ideas into extraordinary digital experiences through intelligent design, immersive technology, and creative innovation.",
  description:
    "WA Creative Solution is a web design and branding agency building custom websites, Next.js web apps, e-commerce stores, 3D and AI-powered experiences for businesses in the USA, UK, Europe, Saudi Arabia, the UAE, South Africa and Australia.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.wacreativesolution.com").replace(/\/$/, ""),
  locale: "en",
  availability: "Available for Selected Projects",
} as const;

export const contact = {
  email: "amuhammadwaseem867@gmail.com",
  phones: [
    { display: "+92 311 5962551", href: "tel:+923115962551" },
    { display: "+92 346 5187384", href: "tel:+923465187384" },
    { display: "+27 61 069 7051", href: "tel:+27610697051", label: "South Africa" },
  ] as { display: string; href: string; label?: string }[],
  /** WhatsApp link, set when a WhatsApp business number is confirmed. */
  whatsapp: null as string | null,
  location: "Rawalpindi, Pakistan",
  /** Every published address; the first is the studio's base. */
  locations: [
    { label: "Pakistan", address: "Rawalpindi, Pakistan" },
    { label: "South Africa", address: "18 Lower Burg Street, Cape Town, Western Cape, 8001, South Africa" },
  ],
  /** Typical first-reply window shown next to forms. Adjust to match reality. */
  responseTime: "within two business days",
} as const;

export type SocialLink = { label: string; href: string };

/** Only verified profiles. Add Behance/Dribbble etc. once real URLs exist. */
export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/wacreativesstudio/" },
  { label: "Facebook", href: "https://www.facebook.com/people/WA-Creative-Solutions/61593247537659/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-waseem-akram-996015425/" },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
