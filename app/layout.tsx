import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.wacreativesolution.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "WA Creative Solutions | Web Design, Branding & Development Agency",
    template:
      "%s | WA Creative Solutions",
  },

  description:
    "WA Creative Solutions is a creative technology studio in Rawalpindi, Pakistan specializing in branding, UI/UX design, web design, Next.js development and digital experiences.",

  keywords: [
    "WA Creative Solutions",
    "web design agency Rawalpindi",
    "web development company Rawalpindi",
    "website design Pakistan",
    "Next.js development Pakistan",
    "branding agency Rawalpindi",
    "brand identity Pakistan",
    "UI UX design Pakistan",
    "graphic design Rawalpindi",
    "creative agency Pakistan",
  ],

  authors: [
    {
      name: "WA Creative Solutions",
    },
  ],

  creator: "WA Creative Solutions",
  publisher: "WA Creative Solutions",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "WA Creative Solutions",

    title:
      "WA Creative Solutions | Web Design, Branding & Development Agency",

    description:
      "Branding, UI/UX, web design, Next.js development and digital experiences by WA Creative Solutions.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WA Creative Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "WA Creative Solutions | Web Design & Development",

    description:
      "Branding, UI/UX, websites and digital experiences by WA Creative Solutions.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}