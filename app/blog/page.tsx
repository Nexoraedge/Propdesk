"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Tag, BookOpen, Sparkles, User, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const categoryColors: Record<string, string> = {
  "Product Guide": "bg-blue-50 text-blue-700 border-blue-100",
  "Buyer's Guide": "bg-purple-50 text-purple-700 border-purple-100",
  "Industry Insights": "bg-amber-50 text-amber-700 border-amber-100",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Product Guide", "Buyer's Guide", "Industry Insights"];

  const featured = blogPosts[0];
  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen overflow-hidden pt-24 bg-slate-50">

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 relative bg-white border-b border-slate-200/50">
        <div className="absolute inset-0 bg-linear-to-b from-slate-50/50 to-transparent pointer-events-none" />
        {/* Glow halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 shadow-sm">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                PropDesk Knowledge Hub
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-900 font-display leading-[1.1] tracking-tight text-balance">
              Real Estate Insights for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                New India's Builders
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Expert strategies, property management checklists, and software guides built exclusively to scale startup agencies and modern brokers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CATEGORY FILTER BAR ═══════════════════════════════════════════════ */}
      <section className="py-8 bg-white border-b border-slate-250 sticky top-[73px] z-20 shadow-sm shadow-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${activeCategory === cat
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "text-slate-500 hover:text-slate-950 hover:bg-slate-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARTICLES & GRID SECTION ══════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Featured Post Card (Show only when 'All' or matches Featured category) */}
          {activeCategory === "All" && featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Featured Publication</h2>

              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-slate-900 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-900/35 border border-slate-800 transition-all duration-300 relative"
              >
                {/* Featured Image Background */}
                {featured.content.match(/!\[.*?\]\((.*?)\)/) && (
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500">
                    <img 
                      src={featured.content.match(/!\[.*?\]\((.*?)\)/)?.[1]} 
                      alt={featured.title}
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
                  </div>
                )}

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="p-8 md:p-14 lg:p-16 relative z-10 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${categoryColors[featured.category] || "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                        {featured.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        {featured.readTime} min read
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-display leading-[1.15] mb-6 group-hover:text-emerald-450 transition-colors duration-205 max-w-4xl text-balance">
                      {featured.title}
                    </h3>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-medium">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm border border-slate-700">
                        {featured.author.initials}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{featured.author.name}</p>
                        <p className="text-slate-500 text-xs font-medium">{featured.author.role}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-emerald-400 font-bold text-sm group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid Header */}
          <div className="space-y-6 pt-10">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900 font-display">
                {activeCategory === "All" ? "Latest Publications" : `${activeCategory} Articles`}
              </h2>
              <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-sm">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={post.slug}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-white border border-slate-200 rounded-4xl p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-200 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      {/* Cover Image */}
                      {post.content.match(/!\[.*?\]\((.*?)\)/) && (
                        <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                          <img src={post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}

                      {/* Header metadata */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <span className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-[11px] font-bold border tracking-wider uppercase ${categoryColors[post.category] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime} min
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 font-display leading-snug mb-3 group-hover:text-emerald-700 transition-colors flex-1 text-balance">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-500 text-[11px] font-semibold rounded-full border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100 transition-all">
                            <Tag className="w-2.5 h-2.5 text-slate-400 group-hover:text-emerald-500" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {post.author.initials}
                          </div>
                          <div>
                            <p className="text-slate-900 text-xs font-bold leading-none mb-0.5">{post.author.name}</p>
                            <p className="text-slate-400 text-[10px] font-medium leading-none">{post.author.role}</p>
                          </div>
                        </div>
                        <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HIGH-IMPACT PREMIUM BOTTOM CTA ═══════════════════════════════════ */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-900/20"
          >
            {/* Minimalist Geometric Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-10 md:p-16 lg:p-24 gap-12 lg:gap-20">

              {/* Left Side: Typography */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                    Startup Launch Offer
                  </span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-display leading-[1.1] tracking-tight">
                  Stop managing leads in Excel. <br className="hidden md:block" />
                  <span className="text-emerald-400">Start closing deals.</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join the fastest-growing network of Indian real estate agents. Set up your team in 5 minutes, migrate your property database for free, and start your trial.
                </motion.p>
              </div>

              {/* Right Side: Action Box */}
              <motion.div
                variants={fadeUp}
                className="w-full lg:w-[420px] shrink-0 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative"
              >
                {/* 50% Off Promo Badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-2 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" fill="currentColor" />
                  Claim 14-Day Free Trial
                </div>

                <div className="space-y-4 mt-4">
                  <Link href="/contact" className="w-full flex items-center justify-center gap-3 px-8 py-4.5 bg-white hover:bg-slate-50 text-slate-900 font-extrabold rounded-2xl transition-all hover:scale-[1.02] shadow-xl group">
                    Start Free Trial Now
                    <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link href="/features" className="w-full flex items-center justify-center gap-3 px-8 py-4.5 bg-transparent hover:bg-white/5 border border-slate-600 hover:border-slate-400 text-white font-bold rounded-2xl transition-all">
                    Explore CRM Features
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <ul className="space-y-3">
                    {[
                      "No credit card required upfront",
                      "Free data migration service",
                      "Cancel anytime, no contract lock-ins"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
