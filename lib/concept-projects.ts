import type { Project, ProjectImage } from "./projects";

/**
 * CONCEPT PROJECTS, self-initiated brand and graphic design explorations, always labelled
 * as concepts. Images are WebP exports in public/portfolio/concepts/<slug>/.
 */
const img = (slug: string, file: string, alt: string, width: number, height: number, caption?: string): ProjectImage => ({
  src: `/portfolio/concepts/${slug}/${file}.webp`,
  alt,
  width,
  height,
  caption,
});

export const conceptProjects: Project[] = [
  {
    slug: "ember-and-oak",
    title: "Ember & Oak",
    discipline: "Brand Identity · Packaging · Web",
    categories: ["graphic", "brand-identity", "web"],
    kind: "concept",
    summary: "A luxury coffee brand built around slow craft, origin stories and an editorial e-commerce experience.",
    overview:
      "Ember & Oak is a concept specialty-coffee brand shaped around carefully sourced beans and the rituals that make coffee memorable. Warm natural tones, refined typography and an editorial visual language create a brand that feels timeless, tactile and quietly premium.",
    challenge:
      "Specialty coffee is crowded with near-identical kraft-paper aesthetics. The brief was to signal craftsmanship and origin without leaning on clichés, and to carry that feeling from a bag on the shelf to a product page on a phone.",
    solution:
      "We built a flexible mark and an origin-led packaging system where each bean (Brazil, Colombia, Ethiopia) gets its own character within one family. The website translates the physical identity into an editorial journey through story, packaging, craft and signature blends, designed for product discovery.",
    services: ["Brand strategy", "Logo system", "Packaging design", "Art direction", "Website UI design"],
    cover: img("ember-and-oak", "cover", "Ember & Oak brand cover with coffee packaging", 1672, 941),
    gallery: [
      img("ember-and-oak", "brand-identity", "Ember & Oak brand identity overview", 1672, 941, "Brand identity"),
      img("ember-and-oak", "logo-variation", "Ember & Oak logo variations", 1672, 941, "Logo system"),
      img("ember-and-oak", "color-pallete", "Ember & Oak colour palette", 1672, 941, "Colour palette"),
      img("ember-and-oak", "typography", "Ember & Oak typography specimen", 1672, 941, "Typography"),
      img("ember-and-oak", "brand-application", "Ember & Oak brand applications", 1672, 941, "Brand application"),
      img("ember-and-oak", "brazil", "Brazil origin coffee packaging", 1672, 941, "Origin: Brazil"),
      img("ember-and-oak", "colombia", "Colombia origin coffee packaging", 1672, 941, "Origin: Colombia"),
      img("ember-and-oak", "ethiopia", "Ethiopia origin coffee packaging", 1672, 941, "Origin: Ethiopia"),
      img("ember-and-oak", "cafe-experience-1", "Ember & Oak café interior concept", 1846, 1016, "Café experience"),
      img("ember-and-oak", "01-navbar-hero", "Ember & Oak website hero section", 1898, 1030, "Website: hero"),
      img("ember-and-oak", "02-navbar-story", "Ember & Oak website story section", 1899, 1009, "Website: story"),
      img("ember-and-oak", "03-navbar-packaging", "Ember & Oak website packaging section", 1327, 1033, "Website: packaging"),
      img("ember-and-oak", "04-navbar-craft", "Ember & Oak website craft section", 1422, 974, "Website: craft"),
      img("ember-and-oak", "05-navbar-signature", "Ember & Oak website signature blends", 1322, 903, "Website: signature blends"),
    ],
  },
  {
    slug: "mono",
    title: "Mono",
    discipline: "Brand Identity · Art Direction",
    categories: ["graphic", "brand-identity"],
    kind: "concept",
    summary: "A monochrome identity system built on typography, structure and visual restraint.",
    overview:
      "Mono is a contemporary brand identity created with a strong focus on simplicity, structure and visual recognition. The system was designed to stay consistent across stationery, packaging, signage and social media.",
    challenge:
      "A minimal identity can easily become anonymous. The challenge was to make restraint recognisable: distinctive enough to own a space without relying on colour or decoration.",
    solution:
      "A constructed mark built on a precise grid, a restrained black, white and red palette, typography that balances personality with clarity, and a guideline system that extends naturally from business cards to billboards.",
    services: ["Brand strategy", "Logo design", "Brand guidelines", "Stationery", "Packaging", "Art direction"],
    cover: img("mono", "stationery", "Mono stationery set", 1536, 1024),
    gallery: [
      img("mono", "cover", "Mono brand identity stationery flat-lay", 1024, 1536, "Identity flat-lay"),
      img("mono", "logo-primary", "Mono primary logo", 1536, 1024, "Primary logo"),
      img("mono", "logo-grid", "Mono logo construction grid", 1536, 1024, "Construction grid"),
      img("mono", "logo-mark", "Mono logo mark", 1536, 1024, "Logo mark"),
      img("mono", "color-palette", "Mono colour palette", 1536, 1024, "Colour"),
      img("mono", "typography", "Mono typography", 1536, 1024, "Typography"),
      img("mono", "brand-guidelines", "Mono brand guidelines", 1536, 1024, "Guidelines"),
      img("mono", "business-card", "Mono business cards", 1536, 1024, "Business cards"),
      img("mono", "letterhead", "Mono letterhead", 1536, 1024, "Letterhead"),
      img("mono", "envelope", "Mono envelope", 1536, 1024, "Envelope"),
      img("mono", "packaging", "Mono packaging", 1536, 1024, "Packaging"),
      img("mono", "storefront", "Mono storefront signage", 1536, 1024, "Storefront"),
      img("mono", "billboard", "Mono billboard", 1536, 1024, "Out of home"),
      img("mono", "presentation", "Mono presentation slides", 1536, 1024, "Presentation"),
      img("mono", "social-media", "Mono social media templates", 1536, 1024, "Social"),
    ],
  },
  {
    slug: "noorah",
    title: "Noorah",
    discipline: "Mascot · Brand Identity · Content",
    categories: ["graphic", "brand-identity", "marketing"],
    kind: "concept",
    summary: "A character-led lifestyle identity that turns a personality into a complete content system.",
    overview:
      "Noorah is a playful mascot identity created to give a lifestyle brand a recognisable personality, visual voice and emotional connection across beauty, fashion and self-care content.",
    challenge: "Creator brands need to feel personal while staying consistent across hundreds of posts, thumbnails and products.",
    solution:
      "An expressive character mark, a soft but refined visual language, photography direction, social and YouTube templates, and merchandise: a system that lets the personality scale.",
    services: ["Mascot design", "Brand identity", "Content system", "Social templates", "Merchandise"],
    cover: {
      src: "/portfolio/concepts/noorah/01-cover.jpg",
      alt: "Noorah cover: the script wordmark and tagline beside the illustrated character in an arched frame, with social, thumbnail and merchandise previews",
      width: 1600,
      height: 1000,
    },
    gallery: [
      img("noorah", "cover", "Noorah mascot identity poster", 1024, 1536, "Identity"),
      img("noorah", "logoshowcase", "Noorah logo showcase: primary, icon, typography, badge, monochrome, reverse and soft beige versions", 2000, 1311, "Logo system"),
      img("noorah", "brand-story", "Noorah brand story", 2000, 1311, "Brand story"),
      img("noorah", "moodboard", "Noorah moodboard", 2000, 1311, "Moodboard"),
      img("noorah", "typography", "Noorah typography", 2000, 1313, "Typography"),
      img("noorah", "brandphotography", "Noorah brand photography", 2000, 1313, "Photography"),
      img("noorah", "contentidentity", "Noorah content identity", 2000, 1313, "Content identity"),
      img("noorah", "socialmediakit", "Noorah social media kit", 2000, 1313, "Social kit"),
      img("noorah", "thumbnailsystem", "Noorah thumbnail system", 2000, 1313, "Thumbnail system"),
      img("noorah", "youtubebranding", "Noorah YouTube branding", 2000, 1313, "YouTube branding"),
      img("noorah", "brandinaction", "Noorah brand in action", 2000, 1313, "Brand in action"),
      img("noorah", "merchandisecollection", "Noorah merchandise", 2000, 1313, "Merchandise"),
    ],
  },
];
