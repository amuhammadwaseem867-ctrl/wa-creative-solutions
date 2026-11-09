import type { Project, ProjectImage } from "./projects";

/**
 * MOTION PROJECTS, preloaders and 3D reveals, filed under 3D, CGI & Motion and also under the
 * field they serve: Website Design for site preloaders, Brand Identity for logo reveals.
 * Videos and stills live in public/portfolio/motion/. Live preloaders were recorded from the
 * deployed sites; the 3D pieces are rendered from code in design/motion/ with
 * design/render-motion.cjs.
 */
const still = (name: string, n: 1 | 2, alt: string, caption: string): ProjectImage => ({
  src: `/portfolio/motion/${name}-${n}.jpg`,
  alt,
  width: 1280,
  height: 800,
  caption,
});
const motion = (name: string, alt: string, caption: string): ProjectImage => ({
  src: `/portfolio/motion/${name}.jpg`,
  video: `/portfolio/motion/${name}.mp4`,
  alt,
  width: 1280,
  height: 800,
  caption,
});

export const motionProjects: Project[] = [
  {
    slug: "af7-zipper-preloader",
    title: "AF7 Zipper Preloader",
    discipline: "Website Preloader · Motion",
    categories: ["3d-motion", "web"],
    kind: "live",
    summary: "A zipper closes across the screen as the AF7 website loads, then opens into the site.",
    overview:
      "AF7 makes zippers, so the website's first moment is a zipper. As the page loads, a slider pulls the teeth closed while a counter runs to 100, then the screen splits along the zipper line into the home page. It plays once per visit and waits for fonts and images, so visitors never land on a half-loaded page.",
    features: ["Zipper slider tied to real load progress", "Counter from 000 to 100", "Split reveal into the home page", "Plays once per visit", "Waits for fonts and images before revealing"],
    tech: ["Next.js", "Framer Motion"],
    services: ["Motion design", "Front-end development"],
    cover: motion("af7-zipper-preloader", "AF7 website preloader: a zipper closing as the page loads, with a load counter", "Recorded from the live site"),
    gallery: [
      still("af7-zipper-preloader", 1, "AF7 preloader mid-load, zipper half closed", "Loading"),
      still("af7-zipper-preloader", 2, "AF7 home page revealed after the preloader", "Reveal into the home page"),
    ],
    liveUrl: "https://af7-tau.vercel.app",
  },
  {
    slug: "nexframe-window-frame-preloader",
    title: "Nexframe Window Frame Preloader",
    discipline: "Website Preloader · Motion",
    categories: ["3d-motion", "web"],
    kind: "live",
    summary: "An aluminium window frame draws itself line by line before the Nexframe Systems website opens.",
    overview:
      "Nexframe Systems builds aluminium windows, doors and curtain walls, so its preloader draws one. A gold profile slides into place, the frame's lines trace out, the glass appears and the brand name settles beneath it before the page fades in.",
    features: ["Line-by-line frame drawing", "Sliding gold profile", "Glass panel reveal", "Brand lock-up", "Fades into the home page"],
    tech: ["Next.js", "Framer Motion"],
    services: ["Motion design", "Front-end development"],
    cover: motion("nexframe-frame-preloader", "Nexframe website preloader: an aluminium window frame drawing itself", "Recorded from the live site"),
    gallery: [
      still("nexframe-frame-preloader", 1, "Nexframe preloader: the gold profile sliding in", "Profile slides in"),
      still("nexframe-frame-preloader", 2, "Nexframe preloader: the finished frame with the brand name", "Frame complete"),
    ],
    liveUrl: "https://nexframe-nu.vercel.app",
  },
  {
    slug: "zama-zama-wheel-preloader",
    title: "Zama Zama Wheel Preloader",
    discipline: "Website Preloader · Motion",
    categories: ["3d-motion", "web"],
    kind: "live",
    summary: "A spinning alloy wheel and a road-red progress line greet visitors to the first Zama Zama website.",
    overview:
      "Built for the first version of the Zama Zama Auto Fitment website: a detailed alloy wheel spins above the brand name while a red line runs like a road marking, then the page opens. The current Zama Zama site at zamazama.site is a newer build.",
    features: ["Spinning alloy wheel", "Brand lock-up with tagline", "Progress line in brand red", "Timed exit into the home page"],
    tech: ["Next.js", "CSS animation"],
    services: ["Motion design", "Front-end development"],
    cover: motion("zama-zama-wheel-preloader", "Zama Zama website preloader: a spinning alloy wheel above the brand name", "Recorded from the first Zama Zama website"),
    gallery: [
      still("zama-zama-wheel-preloader", 1, "Zama Zama preloader with the spinning wheel", "Loading"),
      still("zama-zama-wheel-preloader", 2, "Zama Zama home page after the preloader", "Reveal into the home page"),
    ],
    liveUrl: "https://zama-zamawebsite.vercel.app",
  },
  {
    slug: "wa-particle-logo-intro",
    title: "WA Creative Particle Logo Intro",
    discipline: "Website Preloader · Particles",
    categories: ["3d-motion", "web"],
    kind: "live",
    summary: "Thousands of ember particles spiral in, form the WA logo, then burst as the screen splits open.",
    overview:
      "The intro to this website. Particles are sampled from the WA monogram's real paths, spiral in from a vortex and assemble the logo while a light sweep crosses it; the wordmark resolves out of blur, a counter tracks the page load, and the particles burst outward as the screen opens along a red light line.",
    features: ["Particles sampled from the logo's vector paths", "Cursor pushes particles aside", "Light sweep and warm glow", "Load counter and progress bar", "Shutter exit along a red light line", "Once per visit; skipped for reduced motion"],
    tech: ["Canvas 2D", "React", "CSS animation"],
    services: ["Motion design", "Creative development"],
    cover: motion("wa-particle-logo-intro", "WA Creative website intro: particles forming the WA logo", "Recorded from this website"),
    gallery: [
      still("wa-particle-logo-intro", 1, "Particles spiralling in before the logo forms", "Vortex"),
      still("wa-particle-logo-intro", 2, "The WA Creative home page after the intro", "Reveal into the home page"),
    ],
    liveUrl: "https://wacreativesolution.com",
  },
  {
    slug: "wa-3d-logo-reveal",
    title: "WA Creative 3D Logo Reveal",
    discipline: "3D Logo Animation · Brand Identity",
    categories: ["3d-motion", "brand-identity"],
    kind: "concept",
    summary: "The WA hexagon and letters fly in from depth, lock together in glossy 3D and catch a sweep of light.",
    overview:
      "An in-house 3D animation of our own mark. The red hexagon and the WA letters are extruded from the logo's real vector paths, enter from opposite depths, lock into place and turn slowly as a light passes across the surface, before the wordmark resolves underneath. Made for social media, video intros and presentations.",
    challenge: "A flat logo animation looks like every other template. The brief was a reveal that feels physical without losing the precision of the mark.",
    solution: "Real geometry from the logo paths, bevelled edges that catch light, a glossy red frame against matte white letters, and a single light sweep timed to the moment the pieces lock.",
    services: ["3D logo animation", "Lighting", "Motion design"],
    cover: motion("wa-3d-logo-reveal", "WA Creative logo in 3D: red hexagon and white letters", "Rendered in real-time 3D"),
    gallery: [
      still("wa-3d-logo-reveal", 1, "WA letters and hexagon flying in from depth", "Pieces fly in"),
      still("wa-3d-logo-reveal", 2, "The finished 3D WA logo with the wordmark", "Final lock-up"),
    ],
  },
  {
    slug: "corvane-brass-mark-reveal",
    title: "Corvane Brass Mark Reveal",
    discipline: "3D Logo Animation · Brand Identity",
    categories: ["3d-motion", "brand-identity"],
    kind: "concept",
    summary: "The Corvane raven rises in brushed brass onto the brand's horizon line, lit like a museum piece.",
    overview:
      "A 3D logo reveal for Corvane, our private-wealth brand concept. The horizon line draws first; the raven-and-C symbol, extruded from its compass-drawn geometry in brushed brass, rises from flat onto that line, a soft light passes over the metal and the wordmark settles beneath.",
    challenge: "Quiet-luxury brands cannot shout. The animation had to feel expensive through restraint: slow, precise and almost silent.",
    solution: "One material, one light move and one camera-free composition. The beak lands exactly on the horizon line, the rule the whole identity is built on.",
    services: ["3D logo animation", "Materials and lighting", "Motion design"],
    cover: motion("corvane-brass-mark-reveal", "Corvane raven symbol in brushed brass on ink green", "Rendered in real-time 3D"),
    gallery: [
      still("corvane-brass-mark-reveal", 1, "The brass mark rising from flat", "The mark rises"),
      still("corvane-brass-mark-reveal", 2, "The Corvane mark resting on the horizon line with the wordmark", "Final lock-up"),
    ],
  },
  {
    slug: "cellcraft-3d-phone-preloader",
    title: "CellCraft 3D Phone Preloader",
    discipline: "Website Preloader · 3D Concept",
    categories: ["3d-motion", "web"],
    kind: "concept",
    summary: "A gold-framed phone turns in 3D while its own screen counts the store loading, then shows the homepage hero.",
    overview:
      "A preloader concept for the CellCraft smartphone store, not yet on the live site. The phone itself is the loader: it turns into view, a champagne-gold ring fills on its screen as the page loads, and at 100% the screen becomes the store's hero, “The art of the flagship”.",
    challenge: "Phone stores all look alike. The loader should say “premium phones” before a single product appears.",
    solution: "A 3D phone in the brand's gold and black, with the loading state drawn live on its screen, so the wait itself shows the product.",
    services: ["3D modelling", "Motion design", "Concept"],
    cover: motion("cellcraft-3d-phone-preloader", "CellCraft preloader concept: a 3D phone with a loading ring on its screen", "Rendered in real-time 3D"),
    gallery: [
      still("cellcraft-3d-phone-preloader", 1, "The phone turning into view as loading begins", "Loading begins"),
      still("cellcraft-3d-phone-preloader", 2, "The phone screen showing the CellCraft hero at 100%", "Hero on screen"),
    ],
  },
];
