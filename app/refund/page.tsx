"use client";

import React from "react";
import { CheckCircle, HelpCircle, ArrowLeft, Shield, AlertTriangle, LifeBuoy } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyPage() {
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
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">Refund & Cancellation Policy</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Last Updated: {lastUpdated} · PropDesk Technologies</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm space-y-10">
          
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Cancellations
              </h2>
            </div>
            <div className="pl-13 md:pl-13 text-lg leading-relaxed text-slate-600">
              <p className="mb-4">
                We believe in providing ultimate flexibility and absolute transparency for your business. You hold full control over your PropDesk journey. 
              </p>
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-medium">
                You can cancel your PropDesk subscription at any time, directly from your administrative dashboard with zero friction. Your cancellation will take effect flawlessly at the end of your current paid billing cycle. Until then, your access remains fully active.
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Refunds
              </h2>
            </div>
            <div className="pl-13 md:pl-13 text-lg leading-relaxed text-slate-600">
              <p className="mb-4">
                Because PropDesk is a premium platform delivering immediate access to cutting-edge digital software, cloud infrastructure, and proprietary CRM services, all transactions are strictly final.
              </p>
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 text-amber-950 font-medium">
                We do not offer refunds, partial or full, for any subscription payments or setup fees that have already been processed. Once a billing cycle commences, the value of the platform is unlocked and rendered non-refundable.
              </div>
              <p className="mt-4 text-sm text-slate-500">
                We highly encourage utilizing our free trial periods (when available) to ensure PropDesk perfectly aligns with your agency's operational needs before committing to a paid subscription.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Technical Support & Assistance
              </h2>
            </div>
            <div className="pl-13 md:pl-13 text-lg leading-relaxed text-slate-600">
              <p className="mb-6">
                While our financial policies are firm, our commitment to your success is absolute. If you experience any technical issues, downtime, or require assistance optimizing your CRM workflow, our dedicated support team is on standby to assist you immediately.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
                <p className="text-sm font-bold text-slate-950 uppercase tracking-widest mb-4">Contact Our Team</p>
                
                <a href="https://wa.me/917208850778?text=Hi%20PropDesk%20Support,%20I%20need%20help%20with%20an%20issue" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Support (Fastest)</span>
                    <span className="block text-lg font-semibold text-emerald-650">+91 72088 50778</span>
                  </div>
                </a>

                <a href="tel:+918271310911" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">General Phone Support</span>
                    <span className="block text-lg font-semibold text-slate-700">+91 82713 10911</span>
                  </div>
                </a>

              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
