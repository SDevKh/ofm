import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EliteCreator Agency — Premium OnlyFans Management",
  description:
    "Scale your creator business without managing it yourself. EliteCreator handles strategy, fan messaging, marketing, growth, and operations so you can focus on creating.",
  keywords: [
    "OnlyFans management agency",
    "OFM agency",
    "creator management",
    "fan messaging",
    "revenue optimization",
    "content strategy",
    "OnlyFans growth",
  ],
  authors: [{ name: "EliteCreator Agency" }],
  creator: "EliteCreator Agency",
  metadataBase: new URL("https://elitecreator.agency"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elitecreator.agency",
    title: "EliteCreator Agency — Premium OnlyFans Management",
    description:
      "Scale your creator business without managing it yourself. Expert strategy, growth, and operations.",
    siteName: "EliteCreator Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EliteCreator Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EliteCreator Agency — Premium OnlyFans Management",
    description:
      "Scale your creator business without managing it yourself.",
    images: ["/og-image.png"],
    creator: "@elitecreatoragency",
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
  name: "EliteCreator Agency",
  description:
    "Premium international OnlyFans management agency providing strategy, growth, and operations for creators.",
  url: "https://elitecreator.agency",
  sameAs: [
    "https://twitter.com/elitecreatoragency",
    "https://instagram.com/elitecreatoragency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@elitecreator.agency",
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://elitecreator.agency" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
