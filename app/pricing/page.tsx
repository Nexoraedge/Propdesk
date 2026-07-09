"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Star, Bot } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

type BillingPeriod = "monthly" | "annual";

const plans = [
  {
    name: "Starter",
    badge: "Solo Brokers",
    originalMonthlyPrice: 999,
    monthlyPrice: 499,
    originalAnnualPrice: 999,
    annualPrice: 399,
    customPricing: false,
    description: "Great for solo brokers moving away from diaries and Excel.",
    features: [
      "PropDesk Copilot AI",
      "1 Admin Account",
      "Unlimited property listings",
      "Unlimited leads",
      "WhatsApp & PDF sharing",
      "Broker Management",
      "Daily reminders",
    ],
    notIncluded: ["Team Activity Log", "Custom Branding"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    badge: "Growing Agencies",
    originalMonthlyPrice: 1999,
    monthlyPrice: 1499,
    originalAnnualPrice: 1999,
    annualPrice: 1199,
    customPricing: false,
    description: "Perfect for small teams managing multiple agents and clients.",
    features: [
      "PropDesk Copilot AI",
      "4 Agent Accounts included",
      "+ ₹449/mo per additional agent",
      "Unlimited property listings",
      "Unlimited leads",
      "Automated Follow-up Reminders",
      "Real-Time Team Activity Log",
    ],
    notIncluded: ["Custom Agency Logo"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    badge: "Enterprise Firms",
    originalMonthlyPrice: 0,
    monthlyPrice: 0,
    originalAnnualPrice: 0,
    annualPrice: 0,
    customPricing: true,
    description: "For large property dealers, developer firms, and franchises.",
    features: [
      "PropDesk Copilot AI",
      "Unlimited property listings",
      "Unlimited leads",
      "Unlimited agent accounts",
      "Custom Agency Logo Branding",
      "Dedicated account manager",
      "Priority 24/7 Support Desk",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "What's included in the 14-day free trial?",
    a: "Everything. You get full access to all features in your chosen plan — no restrictions, no credit card required. If you don't love it, just don't subscribe after 14 days.",
  },
  {
    q: "Is my client data safe on your servers?",
    a: "Absolutely. All your listings and client details are secured using industry-standard enterprise encryption. Only you and authorized agents you invite can access your data.",
  },
  {
    q: "Can I export my data if I decide to leave?",
    a: "Yes, your data is yours. PropDesk provides a one-click Microsoft Excel export feature so you can download your entire inventory and client contacts list whenever you want.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes — pay annually and save 20% compared to monthly billing. Annual plans are billed upfront for the full year.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking. All payments are processed securely.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden pt-24">

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden border-b border-slate-100">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-50/50 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/4" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"><Zap className="w-3.5 h-3.5" />Simple, Transparent Pricing</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-medium font-playfair tracking-tight text-slate-900 leading-[1.15] text-balance">
              Simple Pricing for <br />
              <span className="text-[#051a67] italic font-light">Real Estate Agents</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
              Every plan includes a full 14-day free trial. No credit card required. Cancel anytime.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-sm font-semibold ${billing === "monthly" ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 cursor-pointer ${billing === "annual" ? "bg-emerald-600" : "bg-slate-200"
                  }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${billing === "annual" ? "translate-x-7" : "translate-x-0"
                    }`}
                />
              </button>
              <span className={`text-sm font-semibold flex items-center gap-2 ${billing === "annual" ? "text-slate-900" : "text-slate-400"}`}>
                Annual
                <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PLAN CARDS ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50/50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`relative rounded-[2.5rem] flex flex-col p-8 md:p-10 transition-all duration-300 ${plan.popular
                  ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/40 md:-translate-y-4 border border-slate-700"
                  : "bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-slate-300"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    {plan.badge}
                  </span>
                </div>
                
                <h3 className={`text-3xl font-black mb-2 font-display ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-6 font-medium ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className={`flex items-baseline gap-1 mb-8 pb-8 border-b ${plan.popular ? "border-slate-800" : "border-slate-100"}`}>
                  {plan.customPricing ? (
                    <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-slate-900"}`}>
                      Custom
                    </span>
                  ) : (
                    <>
                      {/* Original Price Strikethrough */}
                      {((billing === "monthly" && plan.originalMonthlyPrice) || (billing === "annual" && plan.originalAnnualPrice)) && (
                        <div className="flex items-center text-slate-400 mr-2 font-extrabold text-xl relative">
                          ₹{billing === "annual" ? plan.originalAnnualPrice?.toLocaleString("en-IN") : plan.originalMonthlyPrice?.toLocaleString("en-IN")}
                          <div className="absolute inset-0 w-[110%] -left-[5%] h-[2.5px] bg-red-500 top-1/2 -rotate-12 rounded-full"></div>
                        </div>
                      )}
                      <span className={`text-lg font-bold text-slate-400`}>₹</span>
                      <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-slate-900"}`}>
                        {billing === "annual" ? plan.annualPrice.toLocaleString("en-IN") : plan.monthlyPrice.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-sm font-medium text-slate-400`}>/mo</span>
                    </>
                  )}
                </div>

                {billing === "annual" && !plan.customPricing && (
                  <p className={`text-xs mb-6 -mt-4 font-bold ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    Billed ₹{(plan.annualPrice * 12).toLocaleString("en-IN")}/year
                  </p>
                )}

                {billing === "annual" && plan.customPricing && (
                  <div className="h-6 mb-6 -mt-4" />
                )}

                <div className="space-y-6 flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        {feature === "PropDesk Copilot AI" ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-emerald-500/20 text-emerald-450' : 'bg-emerald-50 text-emerald-650'}`}>
                            <Bot className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                            <Check className={`w-3 h-3 ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={3} />
                          </div>
                        )}
                        <span className={`font-medium ${plan.popular ? "text-slate-300" : "text-slate-650"} flex items-center gap-2`}>
                          {feature}
                          {feature === "PropDesk Copilot AI" && (
                            <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-extrabold ${plan.popular ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-sm" : "bg-emerald-100 text-emerald-700"}`}>
                              New
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f, fi) => (
                      <li key={`no-${fi}`} className="flex items-center gap-3 text-sm opacity-40">
                        <span className="w-5 h-5 flex items-center justify-center shrink-0 text-slate-400">—</span>
                        <span className={`font-medium ${plan.popular ? "text-slate-500" : "text-slate-400"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`w-full text-center py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 mt-8 ${plan.popular
                    ? "bg-emerald-500 hover:bg-emerald-450 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:-translate-y-0.5"
                    }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
                <p className={`text-center text-xs mt-4 ${plan.popular ? "text-slate-400" : "text-slate-550"}`}>
                  {plan.customPricing ? "Custom setup & onboarding included" : "Cancel anytime. No credit card required."}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST SIGNALS ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Top Agencies Joined" },
              { value: "50% Off", label: "Launch Offer (1st Month)" },
              { value: "100%", label: "Dedicated Support" },
              { value: "14 Days", label: "Free Trial to Explore" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl font-extrabold text-slate-900 font-display">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 font-display mb-4">Pricing FAQs</h2>
            <p className="text-slate-500">Everything about our plans and billing.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <span className={`text-slate-400 transition-transform duration-200 shrink-0 ${activeFaq === i ? "rotate-180" : ""}`}>▾</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-sm">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
              Start Your 14-Day Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">No credit card · No risk · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
