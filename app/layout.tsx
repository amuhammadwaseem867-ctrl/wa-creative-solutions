import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { absoluteUrl, contact, site, socials } from "@/lib/site";
import { services } from "@/lib/services";
import "./globals.css";

const display = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-montserrat", display: "swap" });
const sans = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Web Design, Branding & Next.js Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    title: `${site.name} | Web Design, Branding & Next.js Agency`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Search Console / Bing Webmaster verification: set the codes as build-time env vars.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

/** Only facts the business has actually published, no ratings, awards or founding dates. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/brand/wa-icon-square.svg"),
  description: site.description,
  email: contact.email,
  telephone: contact.phones[0]?.href.replace("tel:", ""),
  address: [
    { "@type": "PostalAddress", addressLocality: "Rawalpindi", addressCountry: "PK" },
    { "@type": "PostalAddress", streetAddress: "18 Lower Burg Street", addressLocality: "Cape Town", addressRegion: "Western Cape", postalCode: "8001", addressCountry: "ZA" },
  ],
  contactPoint: contact.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.href.replace("tel:", ""), contactType: "sales", ...(p.label === "South Africa" ? { areaServed: "ZA" } : {}) })),
  sameAs: socials.map((s) => s.href),
  knowsAbout: [...services.map((s) => s.title), "Next.js", "React", "E-commerce", "Search engine optimization"],
  slogan: site.tagline,
  areaServed: ["United States", "United Kingdom", "Europe", "Saudi Arabia", "United Arab Emirates", "Australia", "South Africa", "Pakistan"].map((name) => ({ "@type": "Place", name })),
  priceRange: "$$",
  currenciesAccepted: "USD",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can resolve. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
