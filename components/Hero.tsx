"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Zap,
    ArrowRight,
    Play,
    Star,
    Sparkles,
    BellRing,
    TrendingUp,
    CheckCircle2
} from "lucide-react";

// Animation Variants
const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const floatAnimation = {
    animate: {
        y: [0, -12, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

const floatAnimationDelayed = {
    animate: {
        y: [0, 12, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1
        }
    }
};

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 bg-slate-50 overflow-hidden">

            {/* ═══ DYNAMIC BACKGROUND ══════════════════════════════════════════ */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Subtle grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Glowing orbs */}
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-emerald-400/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-300/10 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* ═══ LEFT: COPY & CTAs ══════════════════════════════════════════ */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        {/* Promo Badges */}
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-white shadow-md shadow-slate-900/10 text-xs font-extrabold uppercase tracking-widest">
                                <span className="text-sm">🇮🇳</span> Made in India
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm group cursor-pointer hover:border-emerald-300 transition-colors">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                </span>
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                    Special Offer: Claim your <span className="text-emerald-600">50% discount</span>
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-[4.2rem] font-black text-slate-900 font-display leading-[1.05] tracking-tight mb-6 text-balance">
                            The Smartest <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                                Real Estate CRM
                            </span>
                            <br className="hidden lg:block" /> Built for India.
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 text-balance">
                            Stop managing leads in messy spreadsheets. PropDesk auto-matches buyers with properties, tracks your sales pipeline, and helps you close deals instantly.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                                Start 14-Day Free Trial
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="https://youtu.be/FEU5vRmuIKw" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Play className="w-3 h-3 text-emerald-700 ml-0.5" fill="currentColor" />
                                </div>
                                Watch Demo
                            </Link>
                        </motion.div>

                        {/* Social Proof Micro */}
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium border-t border-slate-200/60 pt-6">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />)}
                            </div>
                            <span className="text-slate-900 font-bold">4.9/5</span>
                            <span>from 20+ brokers</span>
                            <span className="hidden sm:inline text-slate-300">|</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime</span>
                        </motion.div>
                    </motion.div>

                    {/* ═══ RIGHT: VISUAL & FLOATING UI ════════════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        className="relative lg:ml-10 mt-12 lg:mt-0"
                    >
                        {/* Glow halo behind video */}
                        <div className="absolute inset-0 bg-linear-to-tr from-emerald-400/20 to-teal-300/20 rounded-[2.5rem] blur-2xl transform scale-105" />

                        {/* Main Video Browser Frame */}
                        <div className="relative bg-white rounded-4xl border border-slate-200/50 shadow-2xl shadow-slate-300/50 overflow-hidden">

                            {/* Browser Header */}
                            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                </div>
                                <div className="flex-1 bg-white border border-slate-200 rounded-lg h-7 flex items-center px-3 gap-2">
                                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[11px] font-medium text-slate-400">propdesk.in/demo</span>
                                </div>
                            </div>

                            {/* Video Embed */}
                            <div className="relative w-full bg-slate-900" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    src="https://www.youtube.com/embed/FEU5vRmuIKw?rel=0&modestbranding=1&autoplay=0"
                                    title="PropDesk Product Demo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </div>

                        {/* ═══ FLOATING WIDGETS ═══ */}
                        {/* Widget 1: Lead Match */}
                        <motion.div
                            variants={floatAnimation}
                            animate="animate"
                            className="absolute -left-8 md:-left-16 top-1/4 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4 z-20 hidden sm:flex"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Auto-Match</p>
                                <p className="text-sm font-bold text-slate-900">Buyer Found: 98% Match</p>
                            </div>
                        </motion.div>

                        {/* Widget 2: Sales Pipeline */}
                        <motion.div
                            variants={floatAnimationDelayed}
                            animate="animate"
                            className="absolute -right-4 md:-right-12 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4 z-20 hidden sm:flex"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pipeline</p>
                                <p className="text-sm font-bold text-slate-900">Deal Closed: ₹4.5 Cr</p>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}