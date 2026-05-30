"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Zap, ShieldCheck, Headphones, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden z-10 bg-white">
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-slate-100" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/30 rounded-3xl p-12 md:p-16 border border-emerald-100/60 text-center relative overflow-hidden shadow-sm shadow-emerald-100/20">
          
          {/* Subtle grid pattern background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center p-3 bg-white border border-emerald-100 rounded-2xl text-emerald-650 mb-6 shadow-sm">
            <Rocket className="w-5 h-5 text-emerald-600" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 font-display">
            Ready to Say Goodbye to <br className="hidden sm:inline" />
            <span className="text-emerald-700">Messy Excel Sheets & Lost Diaries?</span>
          </h2>
          
          <p className="text-base md:text-lg text-slate-650 max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-medium text-slate-600">
            Join thousands of real estate professionals across India who use PropDesk to auto-match properties, automate team tasks, and close deals 3x faster.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <Link
              href="/contact"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all duration-205 rounded-xl shadow-sm font-display cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              Book Free Live Demo
            </Link>
            
            <a
              href="https://wa.me/917208850778?text=Hi%20PropDesk%20Team%2C%20I%27d%20like%20to%20learn%2520more%20about%20your%20software."
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 transition-all duration-205 rounded-xl font-display shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600/10" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-emerald-100/60 max-w-3xl mx-auto text-xs font-semibold text-slate-500">
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>14-Day Free Trial</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Headphones className="w-5 h-5 text-emerald-600" />
              <span>24/7 Dedicated Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
