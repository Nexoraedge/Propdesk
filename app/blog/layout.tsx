import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Real Estate CRM & Property Management Insights | PropDesk",
  description:
    "Expert guides, tips, and industry insights for Indian real estate brokers and agents. Learn how to use property management software, choose the right CRM system, and grow your brokerage.",
  keywords: [
    "real estate blog India",
    "property management software guide",
    "broker CRM tips",
    "real estate agent tips India",
    "property management advice",
    "real estate CRM system guide",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — PropDesk Real Estate Insights for Indian Brokers",
    description: "Expert guides on property management software, CRM systems, and growing your real estate brokerage in India.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
