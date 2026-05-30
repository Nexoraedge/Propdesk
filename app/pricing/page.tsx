"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Star } from "lucide-react";

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
    monthlyPrice: 999,
    annualPrice: 799,
    customPricing: false,
    description: "Great for solo brokers moving away from diaries and Excel.",
    features: [
      "1 Admin Account",
      "Up to 500 property listings",
      "Up to 500 active clients",
      "2-Sec Smart Matching",
      "WhatsApp & PDF sharing",
      "Excel Data Export",
    ],
    notIncluded: ["Sub-agent accounts", "Team Activity Log", "Custom Branding"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    badge: "Growing Agencies",
    monthlyPrice: 1999,
    annualPrice: 1599,
    customPricing: false,
    description: "Perfect for small teams managing multiple agents and clients.",
    features: [
      "3 Agent Accounts included",
      "+ ₹799/mo per additional agent",
      "Up to 1500 property listings",
      "Up to 1500 active clients",
      "Cloud Photo Storage",
      "Automated Follow-up Reminders",
      "Real-Time Team Activity Log",
    ],
    notIncluded: ["Unlimited listings", "Custom Agency Logo"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    badge: "Enterprise Firms",
    monthlyPrice: 0,
    annualPrice: 0,
    customPricing: true,
    description: "For large property dealers, developer firms, and franchises.",
    features: [
      "Unlimited property listings",
      "Unlimited agent accounts",
      "Unlimited active clients",
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest"><Zap className="w-3.5 h-3.5" />Simple, Transparent Pricing</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display leading-tight text-balance">
              Simple Pricing for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Real Estate Agents</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed">
              Every plan includes a full 14-day free trial. No credit card required. Cancel anytime.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 pt-2">
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
              <span className={`text-sm font-semibold ${billing === "annual" ? "text-slate-900" : "text-slate-400"}`}>
                Annual{" "}
                <span className="ml-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">Save 20%</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PLAN CARDS ════════════════════════════════════════════════════════ */}
      <section className="pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl flex flex-col ${plan.popular
                  ? "bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-slate-900/20 md:-translate-y-4"
                  : "bg-white border border-slate-200 shadow-sm"
                  } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="mb-1">
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    {plan.badge}
                  </span>
                </div>
                <h2 className={`text-2xl font-extrabold font-display mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm leading-relaxed mb-6 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className={`flex items-baseline gap-1 mb-6 pb-6 border-b ${plan.popular ? "border-white/10" : "border-slate-100"}`}>
                  {plan.customPricing ? (
                    <span className={`text-4xl font-extrabold font-display ${plan.popular ? "text-white" : "text-slate-900"}`}>
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className={`text-sm font-bold ${plan.popular ? "text-slate-400" : "text-slate-400"}`}>₹</span>
                      <span className={`text-5xl font-extrabold font-display ${plan.popular ? "text-white" : "text-slate-900"}`}>
                        {billing === "annual" ? plan.annualPrice.toLocaleString("en-IN") : plan.monthlyPrice.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-sm ${plan.popular ? "text-slate-400" : "text-slate-400"}`}>/mo</span>
                    </>
                  )}
                </div>

                {billing === "annual" && !plan.customPricing && (
                  <p className={`text-xs mb-4 -mt-4 font-semibold ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    Billed ₹{(plan.annualPrice * 12).toLocaleString("en-IN")}/year — save ₹{((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString("en-IN")}
                  </p>
                )}

                {/* Maintain spacing if annual is selected but custom pricing is shown */}
                {billing === "annual" && plan.customPricing && (
                  <p className="text-xs mb-4 -mt-4 font-semibold opacity-0">Spacer</p>
                )}

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`} />
                      <span className={plan.popular ? "text-slate-300" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f, fi) => (
                    <li key={`no-${fi}`} className="flex items-center gap-2.5 text-sm opacity-40">
                      <span className="w-4 h-4 flex-shrink-0 text-slate-400">—</span>
                      <span className={plan.popular ? "text-slate-500" : "text-slate-400"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all ${plan.popular
                    ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/30"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                >
                  {plan.cta}
                </Link>
                <p className={`text-center text-[11px] mt-2 ${plan.popular ? "text-slate-500" : "text-slate-400"}`}>
                  {plan.customPricing ? "Talk to our team" : "14-day free trial · No credit card"}
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
                  <span className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${activeFaq === i ? "rotate-180" : ""}`}>▾</span>
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
