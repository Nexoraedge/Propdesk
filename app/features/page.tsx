"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Users,
  Building2,
  BarChart3,
  Shield,
  MessageSquare,
  Calculator,
  Bell,
  Globe,
  Star,
  Check,
  X,
  Bot,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    image: "/assets/dashbaord.png",
    alt: "PropDesk Dashboard — Real Estate Management Software India",
    title: "Your real estate command centre",
    points: [
      "Live stats: active clients, total properties, upcoming follow-ups",
      "Hot opportunity cards — instant view of best match leads",
      "Recent activity feed for your entire team",
      "Quick action buttons for common tasks",
    ],
  },
  {
    id: "properties",
    label: "Properties",
    icon: Building2,
    image: "/assets/properties.png",
    alt: "Property Inventory Management — PropDesk Real Estate Software",
    title: "Your complete property inventory",
    points: [
      "List all types: plots, apartments, villas, commercial",
      "Filter by status, locality, type, BHK, price range",
      "Mark sold, available, or under-negotiation in one click",
      "Export full reports for client presentations",
    ],
  },
  {
    id: "smart-match",
    label: "Smart Match",
    icon: Zap,
    image: "/assets/smar_match.png",
    alt: "Smart Property Matching Engine — PropDesk CRM for Brokers",
    title: "AI-powered property-to-buyer matching",
    points: [
      "Side-by-side match analysis with confidence scoring",
      "Matches based on budget, type, area units, location",
      "High / Medium / Low confidence ratings",
      "Share matches to buyer WhatsApp in one tap",
    ],
  },
  {
    id: "leads",
    label: "Clients & Leads",
    icon: Users,
    image: "/assets/leads.png",
    alt: "Real Estate Lead CRM — Client Pipeline Management PropDesk",
    title: "Complete buyer and seller pipeline",
    points: [
      "Track every lead from inquiry to deal closure",
      "Filter by budget, property type, agent, status",
      "Log calls, notes, and WhatsApp conversations",
      "Assign leads with custom permission levels",
    ],
  },
  {
    id: "copilot",
    label: "PropDesk Copilot",
    icon: Bot,
    image: "/assets/aibot.png", // Re-using a nice image for now since they said "share u the ss" - they can replace it later or it's fine.
    alt: "PropDesk Copilot AI — Real Estate Artificial Intelligence",
    title: "Your personal Real Estate AI",
    points: [
      "Natural language property searching (e.g. 'Find a 3BHK in Gurgaon under 2Cr')",
      "Instant matching within 3 seconds across your entire database",
      "Auto-drafting of leads and clients just by typing notes",
      "Pull pipeline stats, revenue, and leaderboards instantly",
    ],
  },
];

const propDeskVsOld = [
  { feature: "Auto property-to-buyer matching", propdesk: true, excel: false },
  { feature: "WhatsApp PDF sharing", propdesk: true, excel: false },
  { feature: "Indian area unit support (Gaj, Bigha)", propdesk: true, excel: false },
  { feature: "Secure database access roles", propdesk: true, excel: false },
  { feature: "Real-time team activity tracking", propdesk: true, excel: false },
  { feature: "Automated follow-up reminders", propdesk: true, excel: false },
  { feature: "Cloud backup & mobile access", propdesk: true, excel: false },
  { feature: "Commission & deal tracking", propdesk: true, excel: false },
  { feature: "AI Copilot & Natural Language Search", propdesk: true, excel: false },
];

const modules = [
  { icon: Building2, title: "Property Management", desc: "Manage unlimited listings across all property types with photos, documents, and status tracking." },
  { icon: Users, title: "Lead & Client CRM", desc: "Full buyer/seller pipeline from inquiry to token with automated follow-up reminders." },
  { icon: Zap, title: "Smart Match Engine", desc: "Instantly surface perfect property-to-buyer matches using AI-powered algorithms." },
  { icon: MessageSquare, title: "WhatsApp Sharing", desc: "Generate professional property PDFs and share directly to buyer WhatsApp in one click." },
  { icon: Calculator, title: "Indian Unit Converter", desc: "Native Gaj, Bigha, Kanal, Marla support with automatic Sq. Ft. conversions." },
  { icon: Shield, title: "Role Security", desc: "Ensure database security by defining strict viewing rules and access roles for agents." },
  { icon: Bell, title: "Smart Notifications", desc: "Never miss a follow-up with intelligent push notifications and task reminders." },
  { icon: Globe, title: "Cloud & Mobile", desc: "Access everything from any device, online or offline on slow 3G connections." },
  { icon: Bot, title: "PropDesk Copilot", desc: "Your personal AI Executive. Find matches, add leads, and pull stats using natural language." },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="overflow-hidden pt-24">

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="badge-emerald">All Features</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display leading-tight text-balance">
              Every tool your real estate{" "}
              <span className="gradient-text">brokerage needs</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              PropDesk is the all-in-one property management software and CRM system built specifically for Indian brokers, independent agents, and growing real estate agencies.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4">
                Start 14-Day Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-4">
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTERACTIVE FEATURE TABS ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mb-4">
              See PropDesk in action
            </h2>
            <p className="text-slate-500 text-lg">Real screenshots from the product — no mockups, no stock photos.</p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
            >
              {/* Text */}
              <div className="lg:col-span-2 space-y-5">
                <h3 className="text-2xl font-extrabold text-slate-900 font-display leading-snug">
                  {currentTab.title}
                </h3>
                <ul className="space-y-3">
                  {currentTab.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600">{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary inline-flex mt-2">
                  Try This Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Screenshot */}
              <div className="lg:col-span-3">
                <div className="browser-frame">
                  <div className="browser-bar">
                    <div className="browser-dot browser-dot-red" />
                    <div className="browser-dot browser-dot-yellow" />
                    <div className="browser-dot browser-dot-green" />
                    <div className="flex-1 mx-3 bg-white rounded-md h-6 flex items-center px-3">
                      <span className="text-[11px] text-slate-400">app.propdesk.in/{currentTab.id}</span>
                    </div>
                  </div>
                  <Image
                    src={currentTab.image}
                    alt={currentTab.alt}
                    width={900}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ MODULES GRID ═══════════════════════════════════════════════════════ */}
      <section className="py-24 section-dark">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">
              9 powerful modules. One platform.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Everything integrated so you never switch between apps again.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="card-dark p-6 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-600/30 transition-all">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2 font-display">{m.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mb-4">
              PropDesk vs Excel & WhatsApp groups
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg">
              Stop losing deals to disorganized workflows.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">
              <div>Feature</div>
              <div className="text-center">PropDesk</div>
              <div className="text-center">Excel / WhatsApp</div>
            </div>
            {propDeskVsOld.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 items-center text-sm ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                <div className="text-slate-700 font-medium">{row.feature}</div>
                <div className="flex justify-center">
                  <Check className="w-5 h-5 text-emerald-600 bg-emerald-50 rounded-full p-0.5" />
                </div>
                <div className="flex justify-center">
                  <X className="w-5 h-5 text-red-400 bg-red-50 rounded-full p-0.5" />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/contact" className="btn-primary px-8 py-4">
              Switch to PropDesk — Free for 14 Days <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
