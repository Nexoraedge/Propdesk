import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Features — Property Management Software & Real Estate CRM | PropDesk",
  description:
    "Explore all PropDesk features: Smart Property Matching Engine, Lead CRM, WhatsApp PDF sharing, Indian area unit conversion, sub-agent management, role-based access security, and more. The complete real estate CRM system built for Indian brokers.",
  keywords: [
    "real estate CRM features",
    "property management software features India",
    "broker CRM tools",
    "smart property matching engine",
    "WhatsApp real estate sharing",
    "Indian real estate software features",
    "Gaj Bigha converter",
    "sub-agent management CRM",
  ],
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features — PropDesk Real Estate CRM & Property Management Software",
    description: "Smart matching engine, lead CRM, WhatsApp PDF sharing, Indian area units, role-based access controls and more — all in one platform.",
    url: "/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
