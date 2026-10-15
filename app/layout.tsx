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
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
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
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

/** Only facts the business has actually published — no ratings, awards or founding dates. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/brand/wa-monogram-accent.svg"),
  description: site.description,
  email: contact.email,
  telephone: contact.phones[0]?.href.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Rawalpindi", addressCountry: "PK" },
  sameAs: socials.map((s) => s.href),
  knowsAbout: services.map((s) => s.title),
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
