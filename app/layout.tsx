import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thepropdesk.in"),
  title: {
    default: "PropDesk — Property Management Software & Real Estate CRM for Indian Brokers",
    template: "%s | PropDesk",
  },
  description:
    "PropDesk is India's leading real estate CRM system and property management software built for brokers, agents, and agencies. Auto-match buyers to properties, manage 500+ listings, automate follow-ups, and close deals faster. 14-day free trial.",
  keywords: [
    "property management software India",
    "real estate CRM system",
    "broker CRM software",
    "lead management for real estate agents",
    "property listing software",
    "real estate software for Indian brokers",
    "best CRM for real estate India",
    "real estate agency software",
    "property management CRM",
    "broker software India",
    "Gaj Bigha converter",
    "Indian real estate CRM",
    "PropDesk",
    "real estate automation India",
    "smart property matching",
    "WhatsApp real estate CRM",
  ],
  authors: [{ name: "PropDesk Technologies" }],
  creator: "PropDesk",
  publisher: "PropDesk Technologies Pvt. Ltd.",
  icons: {
    icon: "/prop.png",
    shortcut: "/prop.png",
    apple: "/prop.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thepropdesk.in",
    title: "PropDesk — Property Management Software & Real Estate CRM for India",
    description:
      "Auto-match buyers to properties, manage listings, automate follow-ups. India's smartest real estate CRM for brokers and agencies. Start your 14-day free trial.",
    siteName: "PropDesk",
    images: [
      {
        url: "/twitter-banner.png",
        width: 1200,
        height: 630,
        alt: "PropDesk — Real Estate CRM & Property Management Software Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PropDesk — Property Management Software & Real Estate CRM for India",
    description:
      "India's smartest real estate CRM and property management software for brokers and agencies. 14-day free trial.",
    images: ["/twitter-banner.png"],
  },
  alternates: { canonical: "/" },
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
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PropDesk",
      operatingSystem: "Web, iOS, Android",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Real Estate CRM Software",
      description:
        "PropDesk is India's leading property management software and real estate CRM system for brokers, agents, and agencies. Features include smart property matching, lead pipeline management, WhatsApp PDF sharing, Indian area unit conversion, and sub-agent management.",
      url: "https://thepropdesk.in",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "999",
        highPrice: "3999",
        priceCurrency: "INR",
        offerCount: "3",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "200",
        bestRating: "5",
      },
    },
    {
      "@type": "Organization",
      name: "PropDesk Technologies Pvt. Ltd.",
      url: "https://thepropdesk.in",
      logo: "https://thepropdesk.in/prop.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-72088-50778",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "9th Floor, DLF Cyber City, Phase 3",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122002",
        addressCountry: "IN",
      },
      sameAs: [
        "https://x.com/The_PropDesk",
        "https://www.facebook.com/people/PropDesk/61575434111623/",
        "https://www.instagram.com/prop_desk_crm/",
        "https://www.youtube.com/@PropertyDesk_01"
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-white text-slate-900 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-slate-900">
        <Navbar />
        <main className="grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
