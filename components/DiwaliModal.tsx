"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, ArrowRight, Copy, CheckCircle2, ShieldCheck, Zap, Users } from "lucide-react";

interface DiwaliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiwaliModal({ isOpen, onClose }: DiwaliModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const copyCoupon = () => {
    navigator.clipboard.writeText("DIWALI50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-3xl my-auto bg-gradient-to-b from-[#210912] via-[#160a1e] to-[#0c0714] border-2 border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-500/20 text-white overflow-hidden z-10"
          >
            {/* Auspicious Rangoli / Mandala Watermark SVG */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />

            {/* Subtle Mandala SVG in background */}
            <svg
              className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none translate-x-1/3 -translate-y-1/3"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none" />
              <path d="M100 0 L100 200 M0 100 L200 100 M29 29 L171 171 M29 171 L171 29" stroke="white" strokeWidth="1" />
            </svg>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20 group"
              aria-label="Close Diwali offer modal"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Modal Content */}
            <div className="p-5 sm:p-8 max-h-[88vh] overflow-y-auto">

              {/* Header */}
              <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
                {/* Festive pill */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-bold text-amber-200 uppercase tracking-widest shadow-sm mb-3">
                  <span className="text-sm">🪔</span>
                  <span>Shubh Diwali Mega Sale • Flat 50% OFF</span>
                  <span className="text-sm">✨</span>
                </div>

                {/* Headline */}
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                  Light Up Your Real Estate Business with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
                    50% OFF
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 font-medium leading-relaxed">
                  Celebrate this festive season with India&apos;s leading Real Estate CRM & Property Management software.
                  Auto-match buyers, automate WhatsApp follow-ups, and double your deals.
                </p>
              </div>

              {/* Offer Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">

                {/* ─── Plan 1: Single User (Starter) ─── */}
                <div className="relative rounded-2xl bg-white/[0.04] border border-amber-500/30 hover:border-amber-400/60 transition-all p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Starter Plan
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        50% OFF
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">Solo Broker / Dealer</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-4">
                      Perfect for individual brokers moving away from diaries and manual registers.
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 mb-5 pb-4 border-b border-white/10">
                      <span className="line-through text-slate-400 text-sm font-semibold">₹999</span>
                      <div className="flex items-baseline">
                        <span className="text-sm font-bold text-amber-300">₹</span>
                        <span className="text-3xl sm:text-4xl font-black text-amber-300 font-display tracking-tight">499</span>
                        <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>PropDesk Copilot AI</strong> included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>1 Admin Full-Access Account</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Unlimited property listings & leads</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Instant WhatsApp & PDF Brochure Generator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Smart Buyer Auto-Matching Engine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Indian Units (Gaj, Bigha, Kanal, Marla)</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/signup?plan=starter"
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-xl font-bold text-center bg-white/10 hover:bg-white/15 text-white border border-amber-400/40 hover:border-amber-300 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm group-hover:bg-amber-400/10 cursor-pointer shadow-sm"
                  >
                    <span>Claim Starter for ₹499/mo</span>
                    <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* ─── Plan 2: Agency Plan (Teams of 4+) ─── */}
                <div className="relative rounded-2xl bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-amber-500/5 border-2 border-amber-400 shadow-xl shadow-amber-500/15 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm group hover:shadow-amber-500/25 transition-all">

                  {/* Floating Best Value Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-1">
                    <span>👑</span>
                    <span>Most Popular Agency Deal</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        Agency Plan
                      </span>
                      <span className="bg-amber-400/25 text-amber-200 border border-amber-300/50 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        50% FESTIVE
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">Agency & Team Package</h3>
                    <p className="text-xs text-slate-300 mt-1 mb-4">
                      Built for high-velocity real estate agencies managing multiple sub-agents and leads.
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 mb-5 pb-4 border-b border-amber-400/20">
                      <span className="line-through text-slate-400 text-sm font-semibold">₹2,999</span>
                      <div className="flex items-baseline">
                        <span className="text-sm font-bold text-amber-300">₹</span>
                        <span className="text-3xl sm:text-4xl font-black text-amber-300 font-display tracking-tight">1,499</span>
                        <span className="text-xs text-slate-300 font-medium ml-1">/ month</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 text-xs text-slate-100 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>4 Agent Accounts included</strong> (+₹400/mo extra agent)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>PropDesk Copilot AI</strong> for entire agency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Real-Time Team Activity Log & Lead Assignment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Sub-Agent Performance Analytics & Permissions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Automated Client Follow-up Reminders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Priority 24/7 Festive Setup & Support</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/signup?plan=agency"
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-xl font-black text-center bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Claim Agency Deal for ₹1,499/mo</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </Link>
                </div>

              </div>


              {/* Footer Trust & Guarantee */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>14-Day Free Trial • Instant Activation • No Credit Card Required</span>
                </div>

                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors font-medium ml-auto sm:ml-0"
                >
                  Compare full plan features →
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
