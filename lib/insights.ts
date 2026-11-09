/**
 * INSIGHTS — articles written for the studio's target markets. Each answers a real question a
 * buyer searches for. Figures from other sites are cited in `sources` and described as rough
 * ranges, because most published price guides come from agencies with something to sell.
 */
export type Block = string | { list: string[] } | { steps: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO date first published. */
  published: string;
  readMinutes: number;
  tag: string;
  /** Region pages this article supports (slugs from lib/regions.ts). */
  regions: string[];
  intro: string;
  sections: { h: string; body: Block[] }[];
  sources?: { label: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: "small-business-website-cost-2026",
    title: "How much does a small business website cost in 2026? USA, UK, Australia and Saudi Arabia",
    description:
      "Typical 2026 price ranges for a small business website in the USA, UK, Australia and Saudi Arabia, what drives the cost, the running costs people forget, and how to compare quotes.",
    published: "2026-11-09",
    readMinutes: 7,
    tag: "Pricing",
    regions: ["usa", "uk", "australia", "saudi-arabia"],
    intro:
      "Ask five web designers what a website costs and you will get five different answers, and they are all partly right. The price depends far more on what the site has to do than on where the designer lives. Here is what published 2026 guides say, market by market, and how to tell a fair quote from a risky one.",
    sections: [
      {
        h: "The short answer",
        body: [
          "For a professionally designed small business website (five to ten pages, mobile-first, a contact or booking form and basic search optimisation), published 2026 guides cluster around these ranges. Treat them as rough: almost every guide is written by a business that sells websites.",
          {
            list: [
              "United States: about $1,500 to $5,000 with a freelancer, $3,000 to $8,000 with a local agency, and $10,000 or more for a fully custom build with content and SEO strategy.",
              "United Kingdom: about £2,000 to £8,000 for an agency-built small business site, with starter packages from roughly £1,500 and branded professional-services sites at £5,000 to £10,000.",
              "Australia: freelancers from about A$1,000 to A$10,000; some agencies advertise fixed packages from around A$3,500, and one guide puts typical agency pricing from about A$10,000.",
              "Saudi Arabia: estimates range from about SAR 8,000 to SAR 25,000 at the lower end to SAR 45,000 and more for custom design, with bilingual corporate sites quoted far higher.",
            ],
          },
        ],
      },
      {
        h: "What actually drives the price",
        body: [
          "Two sites with the same number of pages can differ in price by a factor of ten. These are the things that move it:",
          {
            list: [
              "Custom design or a template. A template is faster and cheaper; a custom design fits your brand and your customers but takes longer.",
              "Features. Online payments, bookings, a product catalogue, member logins or a dashboard each add design, development and testing time.",
              "Content. Writing the copy, taking or sourcing photos and translating pages are often left out of a quote and added later.",
              "Languages. A second language, especially a right-to-left one like Arabic, is closer to a second website than a setting.",
              "Integrations. Connecting to a CRM, accounting software, WhatsApp or a payment provider each needs work and testing.",
            ],
          },
        ],
      },
      {
        h: "The running costs people forget",
        body: [
          "The build is a one-off; the site also has to live somewhere. Budget for a domain name, hosting, email, any paid plugins or services, and someone to keep it updated and secure. One US guide puts the all-in yearly running cost of most small business sites at roughly $1,100 to $5,000 before advertising, and UK guides quote £50 to £300 a month for hosting, updates and security on a managed plan.",
          "A modern static or server-rendered site (the way we build) is usually cheap to host, because there is no database or plugin stack to patch every month.",
        ],
      },
      {
        h: "Why a cheap quote can cost more",
        body: [
          "A very low price usually means a template with your logo dropped in, no written scope and no handover. Problems show up later: the site is slow on a phone, it cannot be edited without the original designer, or the domain and hosting are in the designer's name. Rebuilding a year later is the expensive part.",
          "The opposite is also true: a high price does not guarantee enquiries. Ask what the site is meant to achieve and how the designer will measure it.",
        ],
      },
      {
        h: "How to compare quotes fairly",
        body: [
          {
            steps: [
              "Write down what the site must do: the pages, the forms, payments or bookings, and the languages.",
              "Ask every designer for a fixed written quote against that list, with what is excluded.",
              "Check the work: live sites you can open on your phone, not only mock-ups.",
              "Confirm ownership: you should own the domain, the hosting account, the code and the design files.",
              "Ask what happens after launch: support period, updates and what they cost.",
            ],
          },
        ],
      },
      {
        h: "Where we fit",
        body: [
          "We are a remote studio in Pakistan, so our prices sit below most US, UK and Australian agencies while the work is custom: designed for your brand and built with Next.js. Our pricing page lists illustrative starting prices in US dollars; after a short call we send a fixed written quote. Every project ends with you owning the code, the design files and your accounts.",
        ],
      },
    ],
    sources: [
      { label: "WebFX: how much does a website cost", url: "https://www.webfx.com/blog/web-design/how-much-does-a-website-cost/" },
      { label: "ExpertSure: UK web design companies and costs", url: "https://www.expertsure.com/uk/web-design/web-design-companies/" },
      { label: "WitsCode: web design agency pricing UK", url: "https://witscode.com/blogs/web-design-agency-pricing-uk" },
      { label: "WebPop Design: how much does a website cost UK", url: "https://www.webpopdesign.com/how-much-does-a-website-cost-uk/" },
      { label: "EG Solutions: affordable web design Sydney", url: "https://egsolutions.com.au/affordable-web-design-sydney/" },
      { label: "Apptunix: web development cost in Saudi Arabia", url: "https://www.apptunix.com/blog/web-development-cost-saudi-arabia/" },
    ],
  },
  {
    slug: "european-accessibility-act-website-guide",
    title: "The European Accessibility Act and your website: a plain-English guide",
    description:
      "The European Accessibility Act has applied since 28 June 2025. Who it covers (including sellers outside the EU), the microenterprise exemption, the standard it points to, and a practical checklist.",
    published: "2026-11-09",
    readMinutes: 6,
    tag: "Accessibility",
    regions: ["europe", "uk"],
    intro:
      "If you sell to customers in the European Union online, the European Accessibility Act (EAA) probably applies to your website or shop, even if your business is based elsewhere. Here is what it means in practice. This is a guide, not legal advice; check your own situation with a professional.",
    sections: [
      {
        h: "What the EAA is",
        body: [
          "The EAA is an EU directive that sets accessibility requirements for a list of everyday products and services, including e-commerce, banking services, e-books, transport ticketing and consumer devices. Each EU country has written it into national law, and those rules have applied since 28 June 2025.",
        ],
      },
      {
        h: "Who it covers",
        body: [
          {
            list: [
              "Businesses selling products or services to consumers in the EU through a website or app, which in practice means most online shops.",
              "Businesses outside the EU are covered too when they sell to EU customers.",
              "Products and services placed on the market before June 2025 have transition periods, but anything new or redesigned should meet the rules now.",
            ],
          },
        ],
      },
      {
        h: "The microenterprise exemption",
        body: [
          "Microenterprises that provide services are exempt. A microenterprise has fewer than 10 employees and an annual turnover or balance sheet total of no more than €2 million. The exemption covers services, not products, so check carefully if you make or import goods. Even if you are exempt, an accessible site reaches more customers and usually ranks better, so it is worth doing anyway.",
        ],
      },
      {
        h: "The standard it points to",
        body: [
          "The EAA does not list design rules itself. It relies on the harmonised European standard EN 301 549, which builds on the Web Content Accessibility Guidelines (WCAG). The version currently cited follows WCAG 2.1 Level AA. Building to WCAG 2.2 AA, the newest version, covers that and more.",
        ],
      },
      {
        h: "A practical checklist for your website",
        body: [
          {
            list: [
              "Every page can be used with a keyboard alone, with a visible focus outline.",
              "Text has enough contrast against its background, and nothing relies on colour alone.",
              "Images that carry meaning have descriptive alt text; decorative images are hidden from screen readers.",
              "Headings follow a logical order, and links and buttons say where they go or what they do.",
              "Every form field has a label, and errors explain how to fix them.",
              "Videos have captions; nothing flashes more than three times a second; motion can be reduced.",
              "Checkout, cart and account pages work with a screen reader from start to finish.",
              "An accessibility statement explains what you support and how to report a problem.",
            ],
          },
        ],
      },
      {
        h: "How we build for it",
        body: [
          "Every site we build targets WCAG 2.2 AA: semantic HTML, labelled forms, keyboard support, reduced-motion handling and contrast checks. We test with a keyboard and a screen reader before launch and can write the accessibility statement with you.",
        ],
      },
    ],
    sources: [
      { label: "Level Access: European Accessibility Act overview", url: "https://www.levelaccess.com/compliance-overview/european-accessibility-act/" },
      { label: "e-include: who the EAA applies to and what it asks for", url: "https://e-include.eu/web-accessibility/european-accessibility-act/" },
      { label: "Siteimprove: EAA frequently asked questions", url: "https://siteimprove.com/en/blog/the-european-accessibility-act-frequently-asked-questions/" },
    ],
  },
  {
    slug: "bilingual-arabic-english-website-guide",
    title: "Building a bilingual Arabic and English website: a guide for Saudi and UAE businesses",
    description:
      "Right-to-left layouts, Arabic typography, separate language URLs and hreflang, translated metadata and WhatsApp ordering: what a proper bilingual Arabic-English website needs.",
    published: "2026-11-09",
    readMinutes: 6,
    tag: "Saudi Arabia & UAE",
    regions: ["saudi-arabia", "uae"],
    intro:
      "Most customers in Saudi Arabia and the UAE search in both Arabic and English, so a business that only has one language misses half its searches. A translation widget does not fix this. Here is what a properly bilingual site needs.",
    sections: [
      {
        h: "1. A real right-to-left layout",
        body: [
          "Arabic reads right to left, so the whole layout mirrors: navigation starts on the right, text aligns right, and arrows and progress indicators point the other way. Done properly, this comes from the page's direction setting and logical CSS (start and end instead of left and right), so the Arabic version is not a fragile copy of the English one.",
          "Some things do not mirror: logos, phone numbers, product photos and media controls stay as they are.",
        ],
      },
      {
        h: "2. Arabic typography",
        body: [
          "Many Latin fonts have no Arabic letters, so the browser falls back to a system font that clashes with the brand. Choose a typeface family that covers both scripts, or pair a Latin font with an Arabic one of similar weight and character. Arabic text also needs a little more line height to stay readable.",
        ],
      },
      {
        h: "3. One URL per language",
        body: [
          "Search engines need to find each language as its own page: for example /services in English and /ar/services in Arabic. Each page should declare its language and point to its counterpart with hreflang tags, so Google shows Arabic speakers the Arabic page and English speakers the English one.",
          {
            list: [
              "Translate the page title and meta description, not only the visible text.",
              "Keep the structure of both versions the same, so each page has a true counterpart.",
              "List both languages in the sitemap.",
            ],
          },
        ],
      },
      {
        h: "4. Write, don't just translate",
        body: [
          "Machine translation is a starting point at best. Headlines and calls to action should be written for Arabic readers, ideally by a native speaker who knows your industry. Decide early whether you use Modern Standard Arabic throughout or a more local tone for marketing copy.",
        ],
      },
      {
        h: "5. Forms, numbers and ordering",
        body: [
          {
            list: [
              "Forms should accept both Arabic-Indic and Western digits in phone numbers.",
              "Prices and dates need a consistent format in each language.",
              "WhatsApp is how many customers prefer to order and ask questions; a button that sends a ready-made message with the product or service chosen removes friction.",
              "Collect only the personal data you need, and explain why, in line with Saudi Arabia's Personal Data Protection Law and the UAE's data protection rules.",
            ],
          },
        ],
      },
      {
        h: "How we approach it",
        body: [
          "We build bilingual sites with Next.js: separate Arabic and English pages, right-to-left layout from logical CSS, suitable Arabic fonts and hreflang between the two. You supply or approve the Arabic copy, and we make sure both versions rank.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-vs-wordpress-business-website",
    title: "Next.js or WordPress for a business website? An honest comparison",
    description:
      "When WordPress is the right choice, when a custom Next.js site is worth it, and how speed, security, editing and cost compare for a small or growing business.",
    published: "2026-11-09",
    readMinutes: 5,
    tag: "Technology",
    regions: ["usa", "uk", "europe", "australia"],
    intro:
      "We build with Next.js, but it is not the right tool for every business. Here is a fair comparison so you can decide what fits yours.",
    sections: [
      {
        h: "WordPress in one paragraph",
        body: [
          "WordPress powers a huge share of the web. Its strengths are a familiar editor, thousands of themes and plugins and a large pool of people who can work on it. Its weaknesses come from the same place: every plugin is code someone else wrote, which has to be updated and can slow the site down or open security holes.",
        ],
      },
      {
        h: "Next.js in one paragraph",
        body: [
          "Next.js is a framework for building sites with React. Pages can be generated in advance or on the server, so they load fast and are easy for search engines to read. There is no plugin layer: every feature is built for your site. That means more work up front, and fewer moving parts afterwards.",
        ],
      },
      {
        h: "How they compare",
        body: [
          {
            list: [
              "Speed: a well-built Next.js site is usually faster out of the box, which helps Core Web Vitals and mobile visitors. A WordPress site can be fast too, with careful theme and plugin choices.",
              "Security: Next.js sites, especially static ones, have very little to attack. WordPress needs regular core, theme and plugin updates.",
              "Editing: WordPress wins for teams who publish often and want to edit every page themselves. With Next.js, content you change often can sit in simple data files or a headless CMS.",
              "Design freedom: Next.js has no theme limits, so motion, 3D and custom interactions are straightforward.",
              "Cost: a WordPress theme site is usually cheaper to launch. A custom Next.js site costs more up front but is often cheaper to run and maintain.",
            ],
          },
        ],
      },
      {
        h: "Our rule of thumb",
        body: [
          "Choose WordPress if your team publishes several posts a week and needs to edit every page without a developer, or if your budget only allows a template. Choose Next.js if speed, a distinctive brand, custom features (bookings, catalogues, dashboards, AI assistants) or long-term security matter more. If you are unsure, tell us what the site needs to do and we will recommend honestly, even if the answer is not us.",
        ],
      },
    ],
  },
  {
    slug: "hiring-web-design-agency-abroad-checklist",
    title: "Hiring a web design agency in another country: a checklist",
    description:
      "Working with a remote web design studio abroad can save money and still deliver great work. A checklist covering portfolios, ownership, contracts, time zones, payments and handover.",
    published: "2026-11-09",
    readMinutes: 5,
    tag: "Working together",
    regions: ["usa", "uk", "europe", "saudi-arabia", "uae", "south-africa", "australia"],
    intro:
      "Plenty of businesses in the US, UK, Europe, the Gulf and Australia work with studios in other countries, including ours in Pakistan. It works well when both sides are clear about a few things from the start. Use this checklist before you sign.",
    sections: [
      {
        h: "Before you hire",
        body: [
          {
            list: [
              "Open their live work on your own phone. Screenshots are easy to fake; live sites are not.",
              "Check that projects labelled as client work really are, and that concepts are labelled as concepts.",
              "Have a video call with the people who will actually do the work.",
              "Ask how they handle time zones: when are they available for calls, and how fast do they reply?",
            ],
          },
        ],
      },
      {
        h: "In the quote and contract",
        body: [
          {
            list: [
              "A fixed written scope: pages, features, languages and what is excluded.",
              "The currency, the payment schedule and the payment method, including any transfer fees.",
              "Number of revision rounds and how extra changes are priced.",
              "Ownership: on final payment you own the code, the design files and all content created for you.",
              "Your domain, hosting and analytics accounts are registered in your name, not the agency's.",
            ],
          },
        ],
      },
      {
        h: "During the project",
        body: [
          {
            list: [
              "A shared preview link where you can see progress at every stage, on your own devices.",
              "Written updates after each milestone, so nothing depends on memory.",
              "One place for feedback, such as comments on the preview or a shared document.",
            ],
          },
        ],
      },
      {
        h: "At handover",
        body: [
          {
            list: [
              "Access to the source code repository and every account.",
              "A short guide for editing the content you will change most often.",
              "A support period for fixes, and a clear price for later updates.",
              "A check that forms, emails, analytics and redirects all work on the live domain.",
            ],
          },
        ],
      },
      {
        h: "How we work",
        body: [
          "We are a remote studio in Rawalpindi, Pakistan, working with businesses abroad. Every project has a fixed quote in US dollars, a preview link at every stage, and ends with you owning everything. Our market pages explain how our hours line up with yours.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
