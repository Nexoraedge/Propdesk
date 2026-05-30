"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Shield,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Building2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function ContactPage() {
  const contactCards = [
    {
      icon: MessageSquare,
      label: "Fastest Response",
      value: "WhatsApp Us",
      actionText: "Chat on WhatsApp",
      href: "https://wa.me/917208850778?text=Hi%20PropDesk%2C%20I%27d%20like%20to%20know%20more%20about%20the%20CRM.",
      sub: "Usually replies in < 10 mins",
      colorClass: "text-[#25D366]",
      bgClass: "bg-[#25D366]/10 border-[#25D366]/20",
      hoverClass: "hover:bg-[#25D366]/20",
      borderClass: "hover:border-[#25D366]/50"
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "hardikjain2030@gmail.com",
      actionText: "Send an Email",
      href: "mailto:hardikjain2030@gmail.com?subject=PropDesk%20Demo%20Inquiry",
      sub: "Response within 2 hours",
      colorClass: "text-emerald-600",
      bgClass: "bg-emerald-50 border-emerald-100",
      hoverClass: "hover:bg-emerald-100",
      borderClass: "hover:border-emerald-300"
    },
    {
      icon: Phone,
      label: "Call Sales",
      value: "+91 82713 10911",
      actionText: "Call Now",
      href: "tel:+918271310911",
      sub: "Mon – Sat, 9AM – 7PM",
      colorClass: "text-blue-600",
      bgClass: "bg-blue-50 border-blue-100",
      hoverClass: "hover:bg-blue-100",
      borderClass: "hover:border-blue-300"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden pt-24 bg-slate-50">

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200 shadow-sm">
                We're here to help
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-slate-900 font-display leading-tight text-balance">
              Get in touch with{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">PropDesk</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Whether you want to book a personalized demo, need technical support, or just have a quick question—reach out to us directly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <section className="pb-24 -mt-4 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  variants={fadeUp}
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center text-center p-8 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/40 transition-all duration-300 group ${card.borderClass} hover:-translate-y-1`}
                >
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 transition-colors duration-300 ${card.bgClass} ${card.hoverClass}`}>
                    <Icon className={`w-8 h-8 ${card.colorClass}`} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{card.label}</p>
                    <p className="text-xl font-bold text-slate-900 mb-2">{card.value}</p>
                    <p className="text-sm text-slate-500">{card.sub}</p>
                  </div>

                  {/* Explicit CTA Bottom Bar */}
                  <div className="w-full flex items-center justify-center gap-2 pt-6 mt-6 border-t border-slate-100">
                    <span className={`text-sm font-bold ${card.colorClass}`}>{card.actionText}</span>
                    <ArrowRight className={`w-4 h-4 ${card.colorClass} group-hover:translate-x-1.5 transition-transform`} />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Bottom Info Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* Office Details */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Jaipur HQ</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Ground Floor, MohanBari, Surajpole Gate,<br />
                  Jaipur, Rajasthan — 302003
                </p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900 mb-1">100% Data Privacy</h3>
                <p className="text-sm text-emerald-700/80 leading-relaxed">
                  Your data is entirely private. We never share or sell your broker database, client list, or property inventory.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ═══ SEO & FAQ SECTION ════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-32 max-w-5xl mx-auto pt-20 border-t border-slate-200/60"
          >
            {/* Header */}
            <div className="text-center space-y-5 mb-16">
              <div className="flex justify-center">
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Why PropDesk is the Future
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display text-balance">
                Modern Real Estate Software for <br className="hidden md:block" />
                India's Fast-Growing Markets
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                We are a fresh, high-velocity Indian startup on a mission to build the finest CRM system and property management tools. No more old-school excel spreadsheets.
              </p>
            </div>

            {/* SEO Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display mb-4 leading-snug">
                  Looking for the Best Property Management Software in India?
                </h3>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    As an emerging real estate startup, PropDesk is custom-built to tackle the unique, fast-paced workflows of Indian real estate brokers and property builders. Unlike generic Western tools, our platform is optimized for local needs. It supports seamless WhatsApp PDF listing shares, quick lead updates, and team collaboration.
                  </p>
                  <p>
                    Our software acts as an all-in-one <strong className="text-slate-900 font-semibold bg-emerald-50 px-1 rounded">property management software in India</strong>. It helps solo agents and growing agency teams map their inventories, keep their property catalogs 100% secure, and match them with hot buyer leads automatically.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display mb-4 leading-snug">
                  An Intelligent Real Estate CRM System & Broker Software
                </h3>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Success in real estate hinges on speed. Our highly optimized <strong className="text-slate-900 font-semibold bg-blue-50 px-1 rounded">real estate CRM system</strong> ensures that you can match property listings with client requirements instantly. Whether you handle high-volume residential plots, luxury flats, or commercial spaces, you can easily log requirements and let our automated match algorithms do the heavy lifting.
                  </p>
                  <p>
                    We are proud to serve as a specialized <strong className="text-slate-900 font-semibold bg-blue-50 px-1 rounded">broker CRM software</strong>. It streamlines sub-agent tasks, tracks leads, and allows state-specific area unit adjustments (like Gaj, Bigha, and Sq. Yards) at the click of a button.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO FAQ Accordion */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "How does the 14-day free trial work for new startup agencies?",
                    a: "Simply connect with us on WhatsApp or call our sales line to activate your 14-day free trial. There is absolutely no credit card required upfront. We will help set up your profile, format your listings, and onboard your sub-agents in under 24 hours."
                  },
                  {
                    q: "Is my property listing and client database secure?",
                    a: "Yes, absolutely. We maintain a strict security policy. As a dedicated partner to Indian brokers, we guarantee that your listings and lead databases are never shared, sold, or accessible to competing broker teams. Your data belongs exclusively to your agency."
                  },
                  {
                    q: "Do you support local Indian area unit conversions?",
                    a: "Yes! PropDesk includes built-in conversions for standard land and plot sizes, including Gaj, Bigha, Acre, Sq. Yard, and Marla. This allows you to generate localized property catalog reports instantly to share with customers."
                  }
                ].map((faq, index) => {
                  // Using a simple inline state component for the accordion to keep your file structure clean
                  const [isOpen, setIsOpen] = React.useState(index === 0); // Open first by default

                  return (
                    <div
                      key={index}
                      className={`bg-white border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-emerald-200 shadow-md shadow-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className={`font-bold pr-4 ${isOpen ? 'text-emerald-700' : 'text-slate-900'}`}>
                          {faq.q}
                        </span>
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-emerald-100 rotate-180' : 'bg-slate-50'}`}>
                          <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-emerald-600' : 'text-slate-400'}`} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}