import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const navItems = [
  { name: "Features", link: "/features" },
  { name: "Pricing", link: "/pricing" },
  { name: "Contact", link: "/contact" }
];

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "apsaraCreator Agency — Premium OnlyFans Management",
  description:
    "Scale your creator business without managing it yourself. apsaraCreator handles strategy, fan messaging, marketing, growth, and operations so you can focus on creating.",
  keywords: [
    "OnlyFans management agency",
    "OFM agency",
    "creator management",
    "fan messaging",
    "revenue optimization",
    "content strategy",
    "OnlyFans growth",
  ],
  authors: [{ name: "apsaraCreator Agency" }],
  creator: "apsaraCreator Agency",
  metadataBase: new URL("https://apsaracreator.agency"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apsaracreator.agency",
    title: "apsaraCreator Agency — Premium OnlyFans Management",
    description:
      "Scale your creator business without managing it yourself. Expert strategy, growth, and operations.",
    siteName: "apsaraCreator Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "apsaraCreator Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "apsaraCreator Agency — Premium OnlyFans Management",
    description:
      "Scale your creator business without managing it yourself.",
    images: ["/og-image.png"],
    creator: "@apsaracreatoragency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "apsaraCreator Agency",
  description:
    "Premium international OnlyFans management agency providing strategy, growth, and operations for creators.",
  url: "https://apsaracreator.agency",
  sameAs: [
    "https://twitter.com/apsaracreatoragency",
    "https://instagram.com/apsaracreatoragency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@apsaracreator.agency",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(playfair.variable, dmSans.variable, dmMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://apsaracreator.agency" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
