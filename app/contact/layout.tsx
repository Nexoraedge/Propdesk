import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Book a Demo — PropDesk Real Estate CRM",
  description:
    "Book a free live demo of PropDesk property management software. Talk to our team about your real estate brokerage needs. 14-day free trial included. No credit card required.",
  keywords: [
    "PropDesk demo",
    "book real estate CRM demo",
    "property management software India contact",
    "PropDesk support",
    "real estate CRM free trial",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact PropDesk — Book a Free Demo",
    description: "Talk to our team and start your 14-day free trial of PropDesk real estate CRM software.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
