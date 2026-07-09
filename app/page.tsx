"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Check,
  MessageSquare,
  Users,
  Bell,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Star,
  Shield,
  BarChart3,
  Layers,
  Globe,
  Lock,
  TrendingUp,
  Building2,
  Play,
  Target,
  BarChart,
  Clock,
  Bot,
  Home as HomeIcon,
  MapPin
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Stat Counter Component ───────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-white font-display mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{label}</div>
    </motion.div>
  );
}

// ─── Feature Screenshot Block ──────────────────────────────────────────────
function FeatureBlock({
  badge,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
}: {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
    >
      {/* Text */}
      <div className="flex-1 space-y-6">
        <motion.div variants={fadeUp}>
          <span className="badge-emerald">{badge}</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display leading-tight text-balance">
          {title}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed">
          {description}
        </motion.p>
        <motion.ul variants={stagger} className="space-y-3">
          {bullets.map((b, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{b}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Screenshot */}
      <motion.div
        variants={fadeIn}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex-1 w-full max-w-xl cursor-default"
      >
        <div className="browser-frame shadow-xl shadow-slate-200/60">
          <div className="browser-bar">
            <div className="browser-dot browser-dot-red" />
            <div className="browser-dot browser-dot-yellow" />
            <div className="browser-dot browser-dot-green" />
            <div className="flex-1 mx-3 bg-white rounded-md h-6 flex items-center px-3">
              <span className="text-[11px] text-slate-400 truncate">thepropdesk.in</span>
            </div>
          </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={900}
            height={600}
            className="w-full object-cover"
            priority={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const features = [
    {
      icon: Zap,
      title: "Smart Match Engine",
      description: "Instantly auto-match buyer requirements with your entire property inventory in milliseconds.",
    },
    {
      icon: BarChart3,
      title: "Lead Pipeline CRM",
      description: "Track every lead from first inquiry to token payment with automated follow-up reminders.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Assign leads, secure client records, and track sub-agent performance in real time.",
    },
    {
      icon: Calculator,
      title: "Indian Unit Converter",
      description: "Native support for Gaj, Bigha, Kanal, Marla — auto-converts to Sq. Ft for matching.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp PDF Sharing",
      description: "Generate and share professional property brochures directly to buyer WhatsApp in 1 click.",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "256-bit encryption. Your listings and client data are 100% private and protected.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Senior Broker, Gurgaon",
      rating: 5,
      text: "PropDesk completely transformed how I manage my 300+ property listings. The smart matching engine alone saves me 3 hours every day. Best real estate CRM in India, no doubt.",
      avatar: "RM",
    },
    {
      name: "Priya Sharma",
      role: "Agency Owner, Bangalore",
      rating: 5,
      text: "We manage 12 sub-agents with PropDesk. The role-based security and activity audit features are essential for our data security. Grew our closures by 40% in 6 months.",
      avatar: "PS",
    },
    {
      name: "Aakash Jain",
      role: "Property Developer, Jaipur",
      rating: 5,
      text: "The WhatsApp PDF listing feature is absolutely brilliant. Clients love receiving professional brochures instantly. Our conversion rate from inquiry to site visit jumped significantly.",
      avatar: "AJ",
    },
  ];

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
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "How does PropDesk compare to using Excel for property management?",
      a: "Excel has zero automation. PropDesk auto-matches buyers to properties, sends follow-up reminders, generates WhatsApp PDFs, secures database access for team members, and gives you a real-time analytics dashboard — all from your phone or laptop.",
    },
    {
      q: "Is my broker database and client information secure?",
      a: "Yes. We use 256-bit bank-grade encryption. Your property listings and lead information are 100% private, isolated per agency, and visible only to you and members you explicitly invite.",
    },
    {
      q: "Can I import my existing Excel listings and diary entries?",
      a: "Absolutely. Upload your Excel files in one click, and our onboarding team provides free setup assistance to migrate all your manual registers into PropDesk — usually done within 24 hours.",
    },
    {
      q: "How does the Smart Property Matching Engine work?",
      a: "Whenever you add a new property or lead, PropDesk instantly scans your entire database and lists matches based on budget, area, local units (Gaj/Bigha), and client preferences — no manual searching required.",
    },
    {
      q: "Does PropDesk work on mobile with slow internet?",
      a: "Yes. PropDesk is fully mobile-optimized and runs perfectly on 3G/4G connections. Agents regularly use it on site visits and client meetings without any issues.",
    },
  ];

  return (
    <div className="overflow-hidden">

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 bg-[#fafafa] overflow-hidden">
        {/* Abstract Mesh Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-teal-100/40 rounded-full blur-[100px] mix-blend-multiply" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-emerald-50/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center max-w-5xl mx-auto mb-20"
          >

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 mt-4 font-display leading-[1.05] tracking-tight mb-8 text-balance relative">
              <span className="block text-slate-800">Best Real Estate CRM &</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 pb-2">
                Property Management Software
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              Ditch the diary. Close deals faster. The smartest software built exclusively for Indian brokers to auto-match buyers and manage teams on the cloud.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/contact" className="btn-12">
                <span>Start 14-Day Free Trial</span>
              </Link>
              <Link href="https://youtu.be/FEU5vRmuIKw" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 bg-white text-slate-700 font-bold text-lg px-8 py-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-slate-700" />
                </div>
                See How It Works
              </Link>
            </motion.div>

            {/* Social proof micro */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-700">JS</div>
                  <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-700">AK</div>
                  <div className="w-6 h-6 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-amber-700">RM</div>
                </div>
                <span>Loved by 20+ top agencies</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base">🇮🇳</span>
                <span>Proudly Made in India</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Video Embed */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="relative max-w-5xl mx-auto"
          >
            {/* Glow halo */}
            <div className="absolute -inset-10 bg-gradient-to-b from-emerald-400/20 to-transparent rounded-[3rem] blur-3xl -z-10" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 ring-1 ring-slate-900/5 bg-white transform transition-transform duration-700 hover:scale-[1.01]">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-500 font-medium shadow-sm">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    thepropdesk.in
                  </div>
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>
              {/* 16:9 responsive video */}
              <div className="relative w-full bg-slate-900" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/FEU5vRmuIKw?rel=0&modestbranding=1&autoplay=0"
                  title="PropDesk Product Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- AI Copilot Section (Premium Light Mode) --- */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden text-slate-900 border-t border-slate-100">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/50 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold tracking-wide text-emerald-600 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Introducing PropDesk Copilot
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-playfair tracking-tight text-slate-900 leading-[1.15]">
                Your personal <br />
                <span className="text-[#051a67] italic font-light">Real Estate AI</span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                Say goodbye to manual data entry and endless searching. Our intelligent Copilot understands your natural language, matches clients with properties instantly, and automates your entire workflow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                    <Target className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Precision Matching</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Find exact property matches for any client in under 3 seconds.</p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                    <BarChart className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Instant Analytics</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Pull your pipeline stats, revenue, or team leaderboard instantly.</p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Auto-Drafting</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Add new clients or properties just by typing naturally.</p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                    <Shield className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Secure Access</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Agents only see their own data, perfectly sandboxed.</p>
                </div>
              </div>
            </div>

            {/* Right Side Mockup */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mr-0">
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-[2.5rem] blur-2xl opacity-60"></div>
              <div className="relative bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col h-[520px]">
                {/* Mockup Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shadow-md">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">PropDesk Copilot</h4>
                    <span className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                    </span>
                  </div>
                </div>

                {/* Mockup Chat Body */}
                <div className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col justify-end bg-slate-50/50">
                  {/* User Message */}
                  <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <div className="bg-slate-900 text-sm text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                      Find me premium 3BHK flats above 1.5 Cr in Vaishali Nagar for a new client.
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Bot className="w-4 h-4 text-slate-700" />
                    </div>
                    <div className="space-y-4 w-full">
                      <div className="text-sm text-slate-700 leading-relaxed">
                        I found 2 perfect matches for your client. Here are the premium 3BHK options currently available in Vaishali Nagar:
                      </div>

                      {/* Property Cards Mockup */}
                      <div className="space-y-3">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                              <HomeIcon className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">The Royal Residency</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" /> Vaishali Nagar
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">₹1.8 Cr</div>
                            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Available</div>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                              <HomeIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">Skyline Heights 3BHK</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" /> Vaishali Nagar
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">₹2.1 Cr</div>
                            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Available</div>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white px-2 py-1.5 rounded-md border border-slate-200 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Found in 1.2s
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mockup Input Box */}
                <div className="p-5 bg-white border-t border-slate-100">
                  <div className="bg-slate-50 border border-slate-200 rounded-full px-5 py-3 flex items-center justify-between shadow-inner">
                    <span className="text-sm text-slate-400">Ask Copilot anything...</span>
                    <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center shadow-md">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-slate-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em] mb-10"
          >
            Trusted by real estate professionals across India
          </motion.p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          >
            {[
              { value: "20+", label: "Top Agencies Joined" },
              { value: "50% Off", label: "Launch Offer" },
              { value: "100%", label: "Client Retention" },
              { value: "14 Days", label: "Free Trial" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center px-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURE SCREENSHOTS ════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

          <FeatureBlock
            badge="Smart Match Engine"
            title="Find matches in milliseconds"
            description="Stop scrolling. Our AI instantly matches buyer requirements against your entire property inventory and scores the best fits."
            bullets={[
              "Instant side-by-side match intelligence",
              "Supports Gaj, Bigha, Kanal, Marla",
              "1-click WhatsApp property sharing",
            ]}
            imageSrc="/assets/smar_match.png"
            imageAlt="PropDesk Smart Match Engine — AI Property Matching for Real Estate CRM"
          />

          <FeatureBlock
            badge="Inventory Management"
            title="Your entire portfolio, in your pocket"
            description="A lightning-fast, searchable database for all your listings. Filter, manage, and share properties instantly from your phone."
            bullets={[
              "Unlimited listings with photos & notes",
              "Instant PDF portfolio generation",
              "Track properties from available to sold",
            ]}
            imageSrc="/assets/properties.png"
            imageAlt="PropDesk Property Inventory — Real Estate Property Management Software India"
            reverse
          />

          <FeatureBlock
            badge="Client CRM"
            title="Never miss a follow-up again"
            description="A complete real estate pipeline. Track every client from first contact to token payment, and let automated reminders do the heavy lifting."
            bullets={[
              "Complete buyer and seller database",
              "Automated follow-up push notifications",
              "Track pipeline stages easily",
            ]}
            imageSrc="/assets/leads.png"
            imageAlt="PropDesk Lead CRM — Real Estate Lead Management Software for Indian Agents"
          />
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══════════════════════════════════════════════════════ */}
      <section className="py-24 section-dark">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="badge-white">Everything you need</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">
              Real Estate Agency Software built for how Indian brokers actually work
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg">
              Every feature is designed around the real challenges of Indian real estate — not some generic global CRM.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="card-dark p-7 group">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-600/30 group-hover:border-emerald-500/40 transition-all">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white text-[17px] font-bold mb-2 font-display">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="badge-emerald">Customer Stories</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mb-4">
              Brokers across India are closing more deals
            </motion.h2>
          </motion.div>

          <div className="overflow-hidden w-full max-w-7xl mx-auto relative mt-12 py-4">
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="card p-7 flex flex-col w-[320px] md:w-[400px] flex-shrink-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <blockquote className="text-slate-600 leading-relaxed mb-6 flex-1">
                    "{t.text}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING SNAPSHOT ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6">
              Simple pricing. No surprises.
            </h2>
            <p className="text-slate-500 text-lg">
              Every plan includes a full 14-day free trial. No credit card required to start.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-bold ${billing === "monthly" ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 cursor-pointer ${billing === "annual" ? "bg-emerald-650" : "bg-slate-200"
                }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${billing === "annual" ? "translate-x-7" : "translate-x-0"
                  }`}
              />
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${billing === "annual" ? "text-slate-900" : "text-slate-400"}`}>
              Annually
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 20%
              </span>
            </span>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
          >
            {plans.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-300 ${p.popular
                  ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/40 md:-translate-y-4 border border-slate-700"
                  : "bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-slate-300"
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest ${p.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className={`text-2xl font-black mb-2 font-display ${p.popular ? "text-white" : "text-slate-900"}`}>
                  {p.name}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 font-medium ${p.popular ? "text-slate-400" : "text-slate-550"}`}>
                  {p.description}
                </p>

                <div className={`flex items-baseline gap-1 mb-8 pb-8 border-b ${p.popular ? "border-slate-800" : "border-slate-100"}`}>
                  {p.customPricing ? (
                    <span className={`text-5xl font-black tracking-tight ${p.popular ? "text-white" : "text-slate-900"}`}>
                      Custom
                    </span>
                  ) : (
                    <>
                      {((billing === "monthly" && p.originalMonthlyPrice) || (billing === "annual" && p.originalAnnualPrice)) && (
                        <div className="flex items-center text-slate-400 mr-2 font-extrabold text-xl relative">
                          ₹{billing === "annual" ? p.originalAnnualPrice?.toLocaleString("en-IN") : p.originalMonthlyPrice?.toLocaleString("en-IN")}
                          <div className="absolute inset-0 w-[110%] -left-[5%] h-[2.5px] bg-red-500 top-1/2 -rotate-12 rounded-full"></div>
                        </div>
                      )}
                      <span className={`text-lg font-bold text-slate-400`}>₹</span>
                      <span className={`text-5xl font-black tracking-tight ${p.popular ? "text-white" : "text-slate-900"}`}>
                        {billing === "annual" ? p.annualPrice.toLocaleString("en-IN") : p.monthlyPrice.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-sm font-medium text-slate-400`}>/mo</span>
                    </>
                  )}
                </div>

                {billing === "annual" && !p.customPricing && (
                  <p className={`text-xs mb-6 -mt-4 font-bold ${p.popular ? "text-emerald-400" : "text-emerald-600"}`}>
                    Billed ₹{(p.annualPrice * 12).toLocaleString("en-IN")}/year
                  </p>
                )}

                {billing === "annual" && p.customPricing && (
                  <div className="h-6 mb-6 -mt-4" />
                )}

                <ul className="space-y-4 mb-10 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm">
                      {f === "PropDesk Copilot AI" ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.popular ? 'bg-emerald-500/20 text-emerald-450' : 'bg-emerald-50 text-emerald-650'}`}>
                          <Bot className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.popular ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                          <Check className={`w-3 h-3 ${p.popular ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={3} />
                        </div>
                      )}
                      <span className={`font-medium ${p.popular ? "text-slate-300" : "text-slate-650"} flex items-center gap-2`}>
                        {f}
                        {f === "PropDesk Copilot AI" && (
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-extrabold ${p.popular ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-sm" : "bg-emerald-100 text-emerald-700"}`}>
                            New
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full text-center py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${p.popular
                    ? "bg-emerald-500 hover:bg-emerald-450 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:-translate-y-0.5"
                    }`}
                >
                  {p.customPricing ? "Contact Sales" : "Start 14-Day Free Trial"} <ArrowRight className="w-4 h-4" />
                </Link>

                <p className={`text-center text-xs mt-4 ${p.popular ? "text-slate-400" : "text-slate-550"}`}>
                  {p.customPricing ? "Custom setup & onboarding included" : "Cancel anytime. No credit card required."}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/pricing" className="text-emerald-650 font-bold hover:text-emerald-700 text-sm flex items-center gap-1.5 justify-center group hover:underline">
              See full feature comparison <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display mb-4">
              Frequently asked questions about our Real Estate CRM
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500">
              Everything you need to know about PropDesk property management software.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="card overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═════════════════════════════════════════════════════════ */}
      <section className="py-24 section-dark">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="badge-white">Get Started Free</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight">
              Ready to transform your{" "}
              <span className="gradient-text-hero">real estate business?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-xl max-w-2xl mx-auto">
              Join the smart brokers who use PropDesk to manage their property inventory, automate lead follow-ups, and close more deals. Grab our 50% off launch offer today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Start 14-Day Free Trial — It's Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/features" className="btn-ghost-dark text-base px-8 py-4">
                Explore Features
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-500 text-sm">
              No credit card needed · Setup in 5 minutes · Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
