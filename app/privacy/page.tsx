"use client";

import React from "react";
import { Shield, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Legal Document</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">Privacy Policy</h1>
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
              1. Introduction
            </h2>
            <p className="leading-relaxed">
              PropDesk Technologies ("we," "our," or "us") respects your privacy and is committed to protecting the personal data of our users, agents, brokers, and real estate agencies using the PropDesk CRM and Property Management Software platform. 
            </p>
            <p className="leading-relaxed">
              This Privacy Policy explains how we collect, use, store, share, and protect your information when you visit our website at <Link href="/" className="text-emerald-650 hover:underline font-medium">propdesk.in</Link>, utilize our CRM services, and interface with our mobile/web applications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              2. Data We Collect
            </h2>
            <p className="leading-relaxed">
              To provide a seamless property management and lead-matching experience, we collect information across three main categories:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Account Registration & Billing Info:</strong> Your name, agency/firm name, business email, WhatsApp number, physical business address, and billing particulars.</li>
              <li><strong>CRM Operations Data:</strong> Information you input into the system, including your properties, listings, client leads, match requirements, sub-agent accounts, and customized communication logs.</li>
              <li><strong>Usage & Device Analytics:</strong> IP addresses, browser types, device operating systems, pages visited, conversion metrics, and system log times.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              3. Integrity and Absolute Confidentiality of Broker Data
            </h2>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-emerald-950 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                Our Core Guarantee to Real Estate Professionals
              </h3>
              <p className="text-sm text-emerald-900/80 leading-relaxed">
                We understand that your property listings, inventory, and buyer leads are the bedrock of your business. <strong>PropDesk absolutely guarantees never to share, rent, sell, leak, or monetize your database with competing brokers, agencies, or external listing syndicators.</strong> Your database remains strictly private to you and your authorized sub-agents.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              4. How We Use Your Information
            </h2>
            <p className="leading-relaxed">
              We process collected data to serve you better, specifically:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Provision and optimization of the PropDesk CRM and auto-matching tools.</li>
              <li>Processing secure subscription billing and maintaining user accounts.</li>
              <li>Sending system updates, alerts, WhatsApp notifications, and direct technical support answers.</li>
              <li>Complying with regulatory obligations under Indian law, including local property regulations and corporate tax rules.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              5. Data Security & Hosting
            </h2>
            <p className="leading-relaxed">
              PropDesk implements industry-standard transport layer security (SSL/TLS encryption) and robust cloud-server architectures to keep your CRM data protected. Access control is limited exclusively to authorized systems and credentials created by you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              6. Your Rights
            </h2>
            <p className="leading-relaxed">
              As a user, you hold complete autonomy over your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Export:</strong> Download your listings and lead lists anytime as secure spreadsheets.</li>
              <li><strong>Correction & Deletion:</strong> Modify or permanently purge data entries directly through the CRM dashboard.</li>
              <li><strong>Cancellation:</strong> Terminate your 14-day free trial or active subscription with instant system de-registration.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              7. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions regarding this Privacy Policy, your data handling rights, or security protocols, please feel free to reach out:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 max-w-md">
              <p className="text-sm font-bold text-slate-950">PropDesk Support Officer</p>
              <p className="text-sm">📧 Email: <a href="mailto:hardikjain2030@gmail.com" className="text-emerald-650 hover:underline font-medium">hardikjain2030@gmail.com</a></p>
              <p className="text-sm">💬 WhatsApp Support (Fastest): <a href="https://wa.me/917208850778?text=Hi%20PropDesk%20Support" target="_blank" rel="noopener noreferrer" className="text-emerald-650 hover:underline font-bold">+91 72088 50778</a></p>
              <p className="text-sm">📞 Phone Hotline: <a href="tel:+918271310911" className="text-emerald-650 hover:underline font-medium">+91 82713 10911</a></p>
              <p className="text-sm text-slate-500">🏢 Office: Ground Floor, MohanBari, Surajpole Gate, Jaipur, Rajasthan, India</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
