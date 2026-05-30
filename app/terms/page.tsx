"use client";

import React from "react";
import { FileText, CheckCircle, HelpCircle, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "May 30, 2026";

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-700">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Legal Document</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">Terms of Service</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Last Updated: {lastUpdated} · PropDesk Technologies</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By registering for, accessing, or using the website at <Link href="/" className="text-emerald-650 hover:underline font-medium">propdesk.in</Link>, its subscription services, sub-agent tools, and any related applications, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must immediately cease all access and utilization.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              2. 14-Day Free Trial & Subscriptions
            </h2>
            <p className="leading-relaxed">
              We offer users an introductory <strong>14-day free trial</strong> to evaluate PropDesk.
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>No Credit Card Required:</strong> Access to the 14-day free trial does not require providing credit card, banking, or upfront payment info.</li>
              <li><strong>Billing Initiation:</strong> At the conclusion of the 14-day trial period, you must choose a paid plan and complete payment details to maintain active access to data records and premium CRM features.</li>
              <li><strong>Cancellations:</strong> Paid subscription fees are non-refundable but can be canceled at any time, which guarantees that no subsequent recurring subscription charges will occur.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              3. CRM User Accounts and Data Integrity
            </h2>
            <p className="leading-relaxed">
              To utilize PropDesk, you must create a secure agency account and act as the administrator.
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>You are solely responsible for all activities and credentials created under your administrator dashboard, including sub-agent accounts.</li>
              <li><strong>Zero Inter-Broker Poaching:</strong> Brokers are prohibited from using the platform to capture or intentionally map other users' properties or private data unless explicit shared-broker permission is authorized.</li>
              <li>We reserve the right to immediately suspend accounts violating basic compliance guidelines or performing malicious web data scraping.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              4. Fair Use, Unit Conversions, and Calculations
            </h2>
            <p className="leading-relaxed">
              PropDesk contains functional calculation tools, including Gaj/Bigha area conversion calculators. While designed with extreme compliance accuracy to match standard Indian local measurement practices, calculations are provided for broker convenience. Final area verifications remain the ultimate professional responsibility of the RERA broker and developer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              5. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              The proprietary interfaces, smart auto-matching logic algorithms, color schemes, brand emblems, and software core code are the exclusive intellectual property of PropDesk Technologies. You may not duplicate, reverse engineer, or scrape any proprietary logic structures of the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              6. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              In no event shall PropDesk Technologies, nor its directors, employees, or developers, be liable for any indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, our service, including lost deals, system downtime, or client communication errors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              7. Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of India, and any disputes shall be exclusively subject to the courts situated in Gurugram, Haryana.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              8. Contact Legal Team
            </h2>
            <p className="leading-relaxed">
              For any clarification regarding our Terms of Service or regulatory compliance rules, please reach out to our team:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 max-w-md">
              <p className="text-sm font-bold text-slate-950">PropDesk Technologies</p>
              <p className="text-sm">📧 Legal Queries: <a href="mailto:hardikjain2030@gmail.com" className="text-emerald-650 hover:underline font-medium">hardikjain2030@gmail.com</a></p>
              <p className="text-sm">💬 WhatsApp Support (Fastest): <a href="https://wa.me/917208850778?text=Hi%20PropDesk%2520Support" target="_blank" rel="noopener noreferrer" className="text-emerald-650 hover:underline font-bold">+91 72088 50778</a></p>
              <p className="text-sm">📞 Phone Support: <a href="tel:+918271310911" className="text-emerald-650 hover:underline font-medium">+91 82713 10911</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
