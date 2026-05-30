import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Real Estate CRM Plans for Brokers & Agencies | PropDesk",
  description:
    "Simple, transparent pricing for PropDesk real estate CRM and property management software. Plans for solo brokers, growing agencies, and enterprise firms. 14-day free trial, no credit card required.",
  keywords: [
    "PropDesk pricing",
    "real estate CRM pricing India",
    "property management software cost",
    "broker CRM plans",
    "real estate software subscription India",
    "affordable CRM for brokers",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — PropDesk Real Estate CRM",
    description: "Transparent plans for brokers and agencies. 14-day free trial on all plans. No credit card required.",
    url: "/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
