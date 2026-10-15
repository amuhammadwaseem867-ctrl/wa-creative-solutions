import { fieldProjects } from "./field-projects";
import { liveProjects } from "./live-projects";

/**
 * Portfolio data.
 *
 * - `kind: "live"`  — real, deployed builds (see lib/live-projects.ts). Each links
 *   to its live site. No client relationship, testimonial or result is implied
 *   beyond what the live site itself shows.
 * - `kind: "concept"` — self-initiated design explorations, always labelled.
 */
/** Work is organised by the studio's six service fields (ids match lib/services.ts). */
export type WorkCategory = "brand-identity" | "web" | "ai" | "3d-motion" | "marketing" | "graphic";

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: "brand-identity", label: "Brand Identity" },
  { id: "web", label: "Web Design & Development" },
  { id: "ai", label: "AI Solutions" },
  { id: "3d-motion", label: "3D, CGI & Motion" },
  { id: "marketing", label: "Marketing & Content" },
  { id: "graphic", label: "Graphic Design" },
];

export type ProjectKind = "live" | "concept";

export type ProjectImage = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  categories: WorkCategory[];
  kind: ProjectKind;
  summary: string;
  overview: string;
  /** Concept projects: the brief we set ourselves and how we answered it. */
  challenge?: string;
  solution?: string;
  /** Live projects: what was built, and with what. */
  features?: string[];
  tech?: string[];
  services: string[];
  /** Optional brand palette shown on the case study. */
  palette?: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  liveUrl?: string;
};

const img = (src: string, alt: string, width: number, height: number, caption?: string): ProjectImage => ({
  src,
  alt,
  width,
  height,
  caption,
});

export const conceptProjects: Project[] = [
  {
    slug: "ember-and-oaks",
    title: "Ember & Oak",
    discipline: "Brand Identity · Packaging · Web",
    categories: ["brand-identity", "graphic", "web"],
    kind: "concept",
    summary: "A luxury coffee brand built around slow craft, origin stories and an editorial e-commerce experience.",
    overview:
      "Ember & Oak is a concept specialty-coffee brand shaped around carefully sourced beans and the rituals that make coffee memorable. Warm natural tones, refined typography and an editorial visual language create a brand that feels timeless, tactile and quietly premium.",
    challenge:
      "Specialty coffee is crowded with near-identical kraft-paper aesthetics. The brief was to signal craftsmanship and origin without leaning on clichés — and to carry that feeling from a bag on the shelf to a product page on a phone.",
    solution:
      "We built a flexible mark and an origin-led packaging system where each bean (Brazil, Colombia, Ethiopia) gets its own character within one family. The website translates the physical identity into an immersive editorial journey — story, packaging, craft and signature blends — designed for product discovery.",
    services: ["Brand strategy", "Logo system", "Packaging design", "Art direction", "Website UI design"],
    cover: img("/portfolio/project-01/cover.png", "Ember & Oak brand cover with coffee packaging", 1672, 941),
    gallery: [
      img("/portfolio/project-01/brand identity.png", "Ember & Oak brand identity overview", 1672, 941, "Brand identity"),
      img("/portfolio/project-01/logo variation.png", "Ember & Oak logo variations", 1672, 941, "Logo system"),
      img("/portfolio/project-01/color pallete.png", "Ember & Oak colour palette", 1672, 941, "Colour palette"),
      img("/portfolio/project-01/typography.png", "Ember & Oak typography specimen", 1672, 941, "Typography"),
      img("/portfolio/project-01/brand application.png", "Ember & Oak brand applications", 1672, 941, "Brand application"),
      img("/portfolio/project-01/brazil.png", "Brazil origin coffee packaging", 1672, 941, "Origin — Brazil"),
      img("/portfolio/project-01/colombia.png", "Colombia origin coffee packaging", 1672, 941, "Origin — Colombia"),
      img("/portfolio/project-01/ethiopia.png", "Ethiopia origin coffee packaging", 1672, 941, "Origin — Ethiopia"),
      img("/portfolio/project-01/cafe experience 1.PNG", "Ember & Oak café interior concept", 1846, 1016, "Café experience"),
      img("/portfolio/project-01/01-navbar-hero.PNG", "Ember & Oak website hero section", 1898, 1030, "Website — hero"),
      img("/portfolio/project-01/02-navbar-story.PNG", "Ember & Oak website story section", 1899, 1009, "Website — story"),
      img("/portfolio/project-01/03-navbar-packaging.PNG", "Ember & Oak website packaging section", 1327, 1033, "Website — packaging"),
      img("/portfolio/project-01/04-navbar-craft.png", "Ember & Oak website craft section", 1422, 974, "Website — craft"),
      img("/portfolio/project-01/05-navbar-signature.PNG", "Ember & Oak website signature blends", 1322, 903, "Website — signature blends"),
    ],
  },
  {
    slug: "nova",
    title: "Nova",
    discipline: "Product Design · UI/UX",
    categories: ["web"],
    kind: "concept",
    summary: "A productivity platform concept that brings projects, tasks, teams and performance into one focused workspace.",
    overview:
      "Nova is a productivity platform concept designed to bring projects, tasks, teams and performance into one focused digital environment. The interface pairs a precise visual system with calm, information-dense layouts.",
    challenge:
      "Productivity tools tend to bury important work under menus and noise. The goal was an interface that surfaces what matters right now while still giving managers depth when they need it.",
    solution:
      "A focused command-centre dashboard, structured project and task views, analytics that turn activity into insight, and a mobile experience that keeps the same hierarchy on a small screen — all governed by one typography, colour and spacing system.",
    services: ["Product strategy", "UI/UX design", "Design system", "Visual identity", "Prototyping"],
    cover: img("/portfolio/project-02/cover.png", "Nova productivity platform cover", 1254, 1254),
    gallery: [
      img("/portfolio/project-02/01-nova-cover.png", "Nova product overview", 1672, 941, "Overview"),
      img("/portfolio/project-02/02-nova-logo-system.png", "Nova logo system", 1448, 1086, "Logo system"),
      img("/portfolio/project-02/03-nova-visual-identity.png", "Nova visual identity", 1448, 1086, "Visual identity"),
      img("/portfolio/project-02/04-nova-dashboard.png", "Nova dashboard interface", 1586, 992, "Dashboard"),
      img("/portfolio/project-02/05-nova-projects.png", "Nova projects view", 1586, 992, "Projects"),
      img("/portfolio/project-02/06-nova-tasks.png", "Nova tasks view", 1586, 992, "Tasks"),
      img("/portfolio/project-02/07-nova-analytics.png", "Nova analytics view", 1586, 992, "Analytics"),
      img("/portfolio/project-02/08-nova-project-detail.png", "Nova project detail view", 1586, 992, "Project detail"),
      img("/portfolio/project-02/09-nova-mobile-experience.png", "Nova mobile screens", 1448, 1086, "Mobile experience"),
      img("/portfolio/project-02/10-nova-final-showcase.png", "Nova final showcase", 1672, 941, "Showcase"),
    ],
  },
  {
    slug: "mono",
    title: "Mono",
    discipline: "Brand Identity · Art Direction",
    categories: ["brand-identity", "graphic"],
    kind: "concept",
    summary: "A monochrome identity system built on typography, structure and visual restraint.",
    overview:
      "Mono is a contemporary brand identity created with a strong focus on simplicity, structure and visual recognition. The system was designed to stay consistent across stationery, packaging, signage and social.",
    challenge:
      "A minimal identity can easily become anonymous. The challenge was to make restraint recognisable — distinctive enough to own a space without relying on colour or decoration.",
    solution:
      "A constructed mark built on a precise grid, a restrained black-white-red palette, typography that balances personality with clarity, and a guideline system that extends naturally from business cards to billboards.",
    services: ["Brand strategy", "Logo design", "Brand guidelines", "Stationery", "Packaging", "Art direction"],
    cover: img("/portfolio/project-03/cover.png", "Mono brand identity stationery flat-lay", 1024, 1536),
    gallery: [
      img("/portfolio/project-03/logo-primary.png", "Mono primary logo", 1536, 1024, "Primary logo"),
      img("/portfolio/project-03/logo-grid.png", "Mono logo construction grid", 1536, 1024, "Construction grid"),
      img("/portfolio/project-03/logo-mark.png", "Mono logo mark", 1536, 1024, "Logo mark"),
      img("/portfolio/project-03/color-palette.png", "Mono colour palette", 1536, 1024, "Colour"),
      img("/portfolio/project-03/typography.png", "Mono typography", 1536, 1024, "Typography"),
      img("/portfolio/project-03/brand-guidelines.png", "Mono brand guidelines", 1536, 1024, "Guidelines"),
      img("/portfolio/project-03/stationery.png", "Mono stationery set", 1536, 1024, "Stationery"),
      img("/portfolio/project-03/business-card.png", "Mono business cards", 1536, 1024, "Business cards"),
      img("/portfolio/project-03/packaging.png", "Mono packaging", 1536, 1024, "Packaging"),
      img("/portfolio/project-03/storefront.png", "Mono storefront signage", 1536, 1024, "Storefront"),
      img("/portfolio/project-03/billboard.png", "Mono billboard", 1536, 1024, "Out of home"),
      img("/portfolio/project-03/social-media.png", "Mono social media templates", 1536, 1024, "Social"),
    ],
  },
  {
    slug: "nexus",
    title: "Nexus",
    discipline: "AI Experience · Product · CGI",
    categories: ["ai", "3d-motion"],
    kind: "concept",
    summary: "A fictional AI automation platform connecting data, intelligence and workflows in one system.",
    overview:
      "Nexus is a fictional AI automation platform that connects data, intelligence and workflows into one unified digital system. The concept explores how complex automation can feel understandable and trustworthy.",
    challenge:
      "AI products often look either like generic dashboards or like science fiction. The brief was to make an invisible process — data moving through models into decisions — tangible and credible.",
    solution:
      "A CGI hero system visualises data flowing through a central 'intelligence core', supported by a product UI for workflows, analytics, recommendations and security, plus a mobile layer and brand guidelines.",
    services: ["Product concept", "UI/UX design", "3D / CGI visuals", "Brand identity", "Data visualisation"],
    cover: img("/portfolio/project-05/cover.png", "Nexus AI system CGI poster", 1024, 1536),
    gallery: [
      img("/portfolio/project-05/data-flow.png", "Nexus data flow visual", 1536, 1024, "Data flow"),
      img("/portfolio/project-05/infrastructure.png", "Nexus infrastructure render", 1536, 1024, "Infrastructure"),
      img("/portfolio/project-05/dashboard.png", "Nexus dashboard", 1586, 992, "Dashboard"),
      img("/portfolio/project-05/workflows.png", "Nexus workflows", 1535, 1024, "Workflows"),
      img("/portfolio/project-05/automation.png", "Nexus automation screen", 1586, 992, "Automation"),
      img("/portfolio/project-05/intelligence.png", "Nexus intelligence screen", 1586, 992, "Intelligence"),
      img("/portfolio/project-05/analytics.png", "Nexus analytics screen", 1586, 992, "Analytics"),
      img("/portfolio/project-05/recommendations.png", "Nexus recommendations", 1535, 1024, "Recommendations"),
      img("/portfolio/project-05/security.png", "Nexus security", 1535, 1024, "Security"),
      img("/portfolio/project-05/mobile.png", "Nexus mobile app", 941, 1672, "Mobile"),
      img("/portfolio/project-05/brand-guidelines.png", "Nexus brand guidelines", 1536, 1024, "Guidelines"),
    ],
  },
  {
    slug: "vanta",
    title: "Vanta",
    discipline: "Luxury Identity · Digital · CGI",
    categories: ["brand-identity", "3d-motion", "web"],
    kind: "concept",
    summary: "A dark luxury fashion and lifestyle identity extended into spaces, membership and web.",
    overview:
      "Vanta is a fictional high-end fashion and lifestyle brand built around restraint, atmosphere and timeless visual language. It communicates quality without ever raising its voice.",
    challenge:
      "Luxury brands live or die by consistency. The identity had to feel equally at home in an architectural space, on a membership card and inside a reservation flow on a phone.",
    solution:
      "A monogram-led system, CGI-rendered interiors and materials, a membership ecosystem and a website that turns the brand into an experience — reservations, journal and membership designed as one quiet, premium journey.",
    services: ["Brand identity", "CGI spaces", "Membership design", "Website UI", "Campaign art direction"],
    cover: img("/portfolio/project-06/cover.png", "Vanta lounge interior CGI", 1024, 1536),
    gallery: [
      img("/portfolio/project-06/monogram.png", "Vanta monogram", 1254, 1254, "Monogram"),
      img("/portfolio/project-06/architecture.png", "Vanta architecture render", 1536, 1024, "Architecture"),
      img("/portfolio/project-06/lounge.png", "Vanta lounge render", 1536, 1024, "Lounge"),
      img("/portfolio/project-06/materials.png", "Vanta material study", 1536, 1024, "Materials"),
      img("/portfolio/project-06/membership-card.png", "Vanta membership card", 1536, 1024, "Membership card"),
      img("/portfolio/project-06/website-01.png", "Vanta website home", 1586, 992, "Website"),
      img("/portfolio/project-06/website-002.png", "Vanta website membership", 1586, 992, "Website — membership"),
      img("/portfolio/project-06/reservation.png", "Vanta reservation flow", 1536, 1024, "Reservation"),
      img("/portfolio/project-06/mobile-reservation.png", "Vanta mobile reservation", 941, 1672, "Mobile reservation"),
      img("/portfolio/project-06/campaign-01.png", "Vanta campaign visual", 1536, 1024, "Campaign"),
      img("/portfolio/project-06/brand-guidelines.png", "Vanta brand guidelines", 1536, 1024, "Guidelines"),
    ],
  },
  {
    slug: "noorah",
    title: "Noorah",
    discipline: "Mascot · Brand Identity · Content",
    categories: ["brand-identity", "marketing"],
    kind: "concept",
    summary: "A character-led lifestyle identity that turns a personality into a complete content system.",
    overview:
      "Noorah is a playful mascot identity created to give a lifestyle brand a recognisable personality, visual voice and emotional connection across beauty, fashion and self-care content.",
    challenge:
      "Creator brands need to feel personal while staying consistent across hundreds of posts, thumbnails and products.",
    solution:
      "An expressive character mark, a soft but refined visual language, photography direction, social and YouTube templates, and merchandise — a system that lets the personality scale.",
    services: ["Mascot design", "Brand identity", "Content system", "Social templates", "Merchandise"],
    cover: img("/portfolio/project-07/cover.png", "Noorah mascot identity cover", 1024, 1536),
    gallery: [
      img("/portfolio/project-07/logoshowcase.jpg", "Noorah logo showcase", 5721, 3750, "Logo"),
      img("/portfolio/project-07/moodboard.jpg", "Noorah moodboard", 5721, 3751, "Moodboard"),
      img("/portfolio/project-07/typography.jpg", "Noorah typography", 5713, 3751, "Typography"),
      img("/portfolio/project-07/brandphotography.jpg", "Noorah brand photography", 5713, 3751, "Photography"),
      img("/portfolio/project-07/socialmediakit.jpg", "Noorah social media kit", 5714, 3751, "Social kit"),
      img("/portfolio/project-07/thumbnailsystem.jpg", "Noorah thumbnail system", 5714, 3751, "Thumbnail system"),
      img("/portfolio/project-07/youtubebranding.jpg", "Noorah YouTube branding", 5713, 3751, "YouTube branding"),
      img("/portfolio/project-07/merchandisecollection.jpg", "Noorah merchandise", 5713, 3751, "Merchandise"),
    ],
  },
];

export const projects: Project[] = [...liveProjects, ...fieldProjects, ...conceptProjects];

/** Projects for one service field, live work first. */
export const projectsForField = (field: WorkCategory) => projects.filter((p) => p.categories.includes(field));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
