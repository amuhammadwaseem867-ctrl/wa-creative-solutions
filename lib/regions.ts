/**
 * MARKETS — one landing page per region at /web-design-agency/<slug>.
 * Each page is written for that market: time-zone overlap with Pakistan (PKT, UTC+5, no daylight
 * saving), the rules that shape a website there, and the work most relevant to it. Claims stay
 * honest: the studio is remote, based in Rawalpindi, with a South African address in Cape Town.
 * Only claim local work that is real. Edit freely; keep each page specific so it never reads as a copy of the others.
 */
export type Region = {
  slug: string;
  name: string;
  /** "US businesses", "UK businesses", … — used in headings. */
  audience: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** How our working day lines up with theirs. */
  overlap: { label: string; body: string };
  /** What businesses in this market usually need from a website. */
  needs: { title: string; body: string }[];
  /** Portfolio slugs to show, most relevant first. */
  work: string[];
  faq: { q: string; a: string }[];
};

export const regions: Region[] = [
  {
    slug: "usa",
    name: "United States",
    audience: "US businesses",
    title: "Web Design & Next.js Agency for US Businesses",
    description:
      "Custom websites, Next.js development, branding and e-commerce for US businesses, built remotely by WA Creative Solution with fixed quotes in USD.",
    h1: "Web design and development for US businesses",
    intro:
      "We design and build fast, custom websites, online stores and web apps for businesses across the United States, working remotely from Pakistan. You get senior design and Next.js engineering, a fixed quote in US dollars, and a working preview link you can click through at every stage.",
    overlap: {
      label: "Your mornings, our evenings",
      body: "Pakistan is 9 to 10 hours ahead of New York and 12 to 13 ahead of Los Angeles. We overlap with US Eastern mornings for calls, and work continues while you sleep, so feedback you send at the end of your day is usually answered by the next morning.",
    },
    needs: [
      { title: "Accessible by default", body: "We build to WCAG 2.2 AA: real headings, labelled forms, keyboard navigation and contrast that passes. It is good practice, and it lowers the risk of the accessibility complaints US sites increasingly face." },
      { title: "Payments and bookings", body: "Stripe checkouts and subscriptions, booking forms and lead capture that lands in your inbox. RestaurantOS, one of our builds, bills each branch through Stripe with verified webhooks." },
      { title: "Speed that helps you rank", body: "Next.js pages that render on the server, images in modern formats and no page-builder bloat, so your site passes Core Web Vitals on a phone." },
      { title: "Search-ready from launch", body: "Titles, descriptions, structured data, a sitemap and clean URLs are part of every build, so Google can understand each page from day one." },
    ],
    work: ["restaurant-os", "spirit", "zama-zama"],
    faq: [
      { q: "Can a studio in Pakistan really work with a US business?", a: "Yes. Everything we do is remote: discovery calls on Google Meet or Zoom, a shared preview link for every stage, and written updates. Overlap with US Eastern mornings makes live calls easy to schedule." },
      { q: "How do you price US projects?", a: "All our prices are in US dollars. Our pricing page lists illustrative starting prices; after a short call we send a fixed written quote for your exact scope." },
      { q: "Who owns the website when it's finished?", a: "You do. On final payment you receive the source code, the design files and admin access, and your domain and hosting stay in your own accounts." },
      { q: "Do you help with Google rankings?", a: "Every site ships with technical SEO in place. Rankings also depend on your content, reviews and links over time, so we explain what moves them and never promise a guaranteed position." },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    audience: "UK businesses",
    title: "Web Design & Branding Agency for UK Businesses",
    description:
      "Brand identity, custom websites and Next.js development for UK businesses. Remote studio, UK-morning overlap, UK GDPR-aware builds and fixed quotes.",
    h1: "Web design and branding for UK businesses",
    intro:
      "We create brand identities, websites and online shops for UK companies, from sole traders to growing teams. The studio is remote and based in Pakistan, which keeps quotes fixed and fair while the work is held to the same standard as a London agency: considered design, clean code and pages that load fast.",
    overlap: {
      label: "Most of your working morning",
      body: "Pakistan is 4 to 5 hours ahead of the UK. Our afternoon is your morning, so calls, reviews and quick fixes happen within your working day rather than overnight.",
    },
    needs: [
      { title: "UK GDPR and cookies", body: "Contact forms that ask only for what they need, a plain-English privacy notice and analytics that do not drop advertising cookies, so a consent banner is often not needed at all." },
      { title: "A brand that holds together", body: "Logo, colour, type and templates designed as one system, so your website, invoices, vans and social posts look like the same company." },
      { title: "Accessible and fast", body: "Built to WCAG 2.2 AA, with server-rendered pages that load quickly on 4G. Public-sector suppliers and larger customers increasingly ask for both." },
      { title: "Local search", body: "Pages for each service and area you cover, consistent business details and structured data, ready to pair with your Google Business Profile." },
    ],
    work: ["apparel-fastener", "spirit", "corvane"],
    faq: [
      { q: "Do you invoice in pounds?", a: "Our prices and quotes are in US dollars. Your bank or payment provider converts at the day's rate, and the quote is fixed for the agreed scope." },
      { q: "Will my website comply with UK GDPR?", a: "We build forms, analytics and privacy pages with UK GDPR and PECR in mind and keep data collection to the minimum. Your legal obligations remain yours, so have your policies reviewed if you handle sensitive data." },
      { q: "Can you redesign my existing site without losing rankings?", a: "Yes. We map your old URLs to the new ones with redirects, keep the content that ranks and improve titles and speed, so a redesign protects the traffic you already have." },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    audience: "European businesses",
    title: "Web Design Agency for European Businesses",
    description:
      "GDPR-aware, accessible websites, multilingual Next.js builds and brand identity for businesses across Europe, from a remote studio with fixed quotes.",
    h1: "Websites and brands for businesses across Europe",
    intro:
      "We work with European companies that want a website built properly: accessible, privacy-aware, fast, and ready for more than one language. The studio is remote and based in Pakistan, three to four hours ahead of Central Europe, which keeps our days well aligned.",
    overlap: {
      label: "A shared working morning",
      body: "Pakistan is 3 to 4 hours ahead of Central European Time and 2 to 3 ahead of Eastern Europe. Your mornings fall in our afternoons, so most questions are answered the same day.",
    },
    needs: [
      { title: "Ready for the European Accessibility Act", body: "The EAA has applied to many online shops and digital services since June 2025. We build to WCAG 2.2 AA, test with a keyboard and screen reader, and document what we checked." },
      { title: "GDPR from the first line", body: "Minimal forms, privacy-friendly analytics, no third-party trackers by default and fonts served from your own domain, so visitor data stays where it should." },
      { title: "More than one language", body: "Next.js sites with proper language versions, hreflang tags and translated metadata, so each market finds the right page in search." },
      { title: "E-commerce that performs", body: "Fast product pages, clear checkout paths and structured product data, built for conversion rather than plugins." },
    ],
    work: ["spirit", "af7", "nexframe-systems"],
    faq: [
      { q: "Can you build a multilingual website?", a: "Yes. We build each language as its own set of pages with translated titles and descriptions and hreflang tags. You supply or approve the translations; we build them in." },
      { q: "How do you handle GDPR?", a: "We collect only the data a form needs, avoid advertising trackers, self-host fonts and write a clear privacy notice with you. Final legal responsibility stays with your business." },
      { q: "Do you work with agencies as a white-label partner?", a: "Yes. We can design and build under your brand for your clients, with your agency's process and review steps." },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    audience: "Saudi businesses",
    title: "Web Design & Development Agency for Saudi Arabia",
    description:
      "Bilingual Arabic-English websites, e-commerce, branding and Next.js development for businesses in Riyadh, Jeddah and across Saudi Arabia.",
    h1: "Web design and development for Saudi businesses",
    intro:
      "We design and build websites, online stores and brand identities for businesses in Riyadh, Jeddah, Dammam and across the Kingdom. Pakistan is only two hours ahead of Saudi Arabia, so we work through your day with you, and we build for how Saudi customers actually buy: on a phone, often over WhatsApp.",
    overlap: {
      label: "Nearly the whole working day",
      body: "Pakistan is 2 hours ahead of Riyadh. Our working hours cover almost all of yours, and four of your five working days (Sunday to Thursday) are also ours, so projects move quickly.",
    },
    needs: [
      { title: "Arabic and English, done properly", body: "Bilingual sites with a true right-to-left Arabic layout, Arabic typography and separate, translated pages for search, rather than a translation widget." },
      { title: "Ordering on WhatsApp", body: "Product and menu pages that send a ready-made order to your WhatsApp, the way BR9 Cafe and CellCraft take orders, alongside or instead of a full checkout." },
      { title: "Brands for a growing market", body: "Identity systems that work in Arabic and Latin script, on signage, packaging and social media." },
      { title: "Data handled with care", body: "Forms and analytics designed around Saudi Arabia's Personal Data Protection Law: collect what you need, explain why, and keep it secure." },
    ],
    work: ["br9-cafe", "cellcraft", "restaurant-os"],
    faq: [
      { q: "Can you build an Arabic website?", a: "Yes. We build bilingual Arabic and English sites with a right-to-left layout for Arabic, suitable Arabic fonts and separate pages for each language so both rank in search. You supply or approve the Arabic copy." },
      { q: "Do you work with Saudi working days?", a: "We work Monday to Friday, two hours ahead of Riyadh, so we share four of your five working days (Monday to Thursday). Messages sent on a Sunday are answered first thing on Monday." },
      { q: "How are projects priced?", a: "Quotes are in US dollars and fixed for the agreed scope. Our pricing page lists illustrative starting prices for each package." },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    audience: "UAE businesses",
    title: "Web Design & Branding Agency for Dubai and the UAE",
    description:
      "Premium websites, bilingual Arabic-English builds, e-commerce and brand identity for businesses in Dubai, Abu Dhabi and across the UAE.",
    h1: "Web design and branding for Dubai and the UAE",
    intro:
      "We design premium websites, online stores and brand identities for businesses in Dubai, Abu Dhabi and Sharjah. The UAE market expects polish, so our work leads with art direction, motion and fast, bilingual pages. Pakistan is just one hour ahead of the UAE, so we work your hours.",
    overlap: {
      label: "Your working day, one hour apart",
      body: "Pakistan is 1 hour ahead of the UAE. Calls, reviews and fixes happen in real time, Monday to Friday.",
    },
    needs: [
      { title: "Premium, motion-led design", body: "Scroll motion, 3D and editorial layouts like Apparel Fastener and SPIRIT, built so they stay fast on a phone." },
      { title: "Arabic and English", body: "Right-to-left Arabic layouts and separate language pages, so you rank for searches in both languages." },
      { title: "WhatsApp and lead capture", body: "Enquiry flows that reach your team on WhatsApp or email immediately, with the details you need to reply." },
      { title: "Brand systems", body: "Logos and identities designed to work across signage, social media and print, in both scripts." },
    ],
    work: ["apparel-fastener", "spirit", "cellcraft"],
    faq: [
      { q: "Do you have an office in Dubai?", a: "No. We are a remote studio based in Rawalpindi, Pakistan, one hour ahead of the UAE. We meet by video call and share a live preview link at every stage." },
      { q: "Can you build a bilingual website?", a: "Yes. Arabic and English, with a proper right-to-left layout and translated metadata for search." },
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    audience: "South African businesses",
    title: "Web Design Agency in Cape Town for South African Businesses",
    description:
      "Custom websites, online stores, WhatsApp ordering and branding for South African businesses. Cape Town address, a local number and live work for Cape Town clients.",
    h1: "Web design for South African businesses",
    intro:
      "We design and build websites, online stores and brands for businesses across South Africa, from Cape Town to Johannesburg and Durban. Our South African address is 18 Lower Burg Street in Cape Town, and you can call us on a local number. Some of our strongest work is already live for Cape Town businesses.",
    overlap: {
      label: "Almost your whole working day",
      body: "Pakistan is 3 hours ahead of South Africa. Our working day covers most of yours, Monday to Friday, so calls and fixes happen the same day.",
    },
    needs: [
      { title: "Light, fast pages", body: "Mobile data costs matter to your customers, so we keep pages light: modern image formats, no heavy page builders and quick loading on a phone." },
      { title: "WhatsApp first", body: "Ordering, quotes and bookings that land in your WhatsApp, the way CellCraft sells phones and Zama Zama takes bay bookings." },
      { title: "POPIA-aware forms", body: "Forms that collect only what you need and explain why, in line with the Protection of Personal Information Act, and no advertising trackers by default." },
      { title: "Local search", body: "A page for each service and area you cover, consistent business details and structured data, ready for your Google Business Profile." },
    ],
    work: ["zama-zama", "cellcraft", "global-q-solutions"],
    faq: [
      { q: "Do you have a South African address?", a: "Yes: 18 Lower Burg Street, Cape Town, Western Cape, 8001. You can also call us on +27 61 069 7051. The design and development team works remotely from Pakistan, three hours ahead of you." },
      { q: "Have you built sites for South African businesses?", a: "Yes. Zama Zama Autofitment in Mitchell's Plain and the CellCraft phone store are live, and we prepared a redesign proposal for a Cape Town debt-counselling firm. All three are on our Work page." },
      { q: "Can you show prices in Rand?", a: "Yes. Product prices on your site can be in Rand, as CellCraft's are. Our own quotes are in US dollars and fixed for the agreed scope." },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    audience: "Australian businesses",
    title: "Web Design Agency for Australian Small Businesses",
    description:
      "Custom websites, booking and quote forms, e-commerce and branding for Australian businesses, from a remote studio with fixed USD quotes.",
    h1: "Web design for Australian small businesses",
    intro:
      "We build websites for Australian trades, service businesses, cafes and online stores: fast, mobile-first sites that get customers to call, book or request a quote. The studio is remote and based in Pakistan; our mornings overlap your afternoons.",
    overlap: {
      label: "Your afternoons, our mornings",
      body: "Sydney and Melbourne are 5 to 6 hours ahead of Pakistan, and Perth 3 hours. When your day winds down, ours is in full swing, and you wake up to progress.",
    },
    needs: [
      { title: "Quotes and bookings on a phone", body: "Click-to-call, instant estimators and booking forms, like the quote estimator on Heartwood Tree Co. and the bay booking on Zama Zama." },
      { title: "Local search", body: "A page for each service and suburb you cover, consistent business details and structured data, ready to pair with your Google Business Profile." },
      { title: "Privacy and accessibility", body: "Forms and analytics built with the Australian Privacy Principles in mind, and pages built to WCAG 2.2 AA." },
      { title: "Sites you can update", body: "Clear handover and simple ways to change prices, menus and photos without calling a developer." },
    ],
    work: ["zama-zama", "heartwood-tree-co", "br9-cafe"],
    faq: [
      { q: "Do you work with trades and service businesses?", a: "Yes. Service sites are some of our favourite work: clear services, prices, areas covered and a fast path to a call or a quote." },
      { q: "How do time zones work?", a: "Sydney is 5 to 6 hours ahead of us. We schedule calls in your afternoon and send updates you can review the next morning." },
      { q: "What does a website cost?", a: "Our pricing page lists illustrative starting prices in US dollars. After a short call we send a fixed written quote for your scope." },
    ],
  },
];

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
