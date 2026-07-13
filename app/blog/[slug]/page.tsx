"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Tag, Share2 } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("![") && line.includes("](")) {
      const altMatch = line.match(/!\[(.*?)\]/);
      const urlMatch = line.match(/\((.*?)\)/);
      if (urlMatch) {
        elements.push(
          <div key={i} className="my-10 rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40">
            <img src={urlMatch[1]} alt={altMatch?.[1] || "Blog image"} className="w-full h-auto object-cover" />
          </div>
        );
      }
    } else if (line.startsWith("@[youtube](") && line.endsWith(")")) {
      const videoId = line.slice(11, -1);
      elements.push(
        <div key={i} className="my-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-100 relative w-full bg-slate-900" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display mt-12 mb-5 leading-snug">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-slate-800 font-display mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={i} className="font-bold text-slate-900 mt-4 mb-1">{line.slice(2, -2)}</p>
      );
    } else if (line.startsWith("✓ ")) {
      elements.push(
        <div key={i} className="flex items-start gap-2.5 ml-4">
          <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
          <span className="text-slate-700">{line.slice(2)}</span>
        </div>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-slate-700 ml-6 list-disc leading-relaxed">
          {line.slice(2)}
        </li>
      );
    } else if (line === "") {
      elements.push(<div key={i} className="h-2" />);
    } else if (line.length > 0) {
      // inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pi} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={i} className="text-slate-600 leading-relaxed text-[17px]">{parts}</p>
      );
    }

    i++;
  }
  return elements;
}

const categoryColors: Record<string, string> = {
  "Product Guide": "bg-blue-50 text-blue-700 border-blue-100",
  "Buyer's Guide": "bg-purple-50 text-purple-700 border-purple-100",
  "Industry Insights": "bg-amber-50 text-amber-700 border-amber-100",
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = getBlogPost(resolvedParams.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="overflow-hidden pt-24 bg-white">

      {/* ═══ ARTICLE HEADER ════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-linear-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show" className="space-y-5">

            {/* Back link */}
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[post.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
              <span className="text-slate-300">·</span>
              <time className="text-slate-400 text-xs">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display leading-tight text-balance">
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed">
              {post.excerpt}
            </motion.p>

            {/* Author + share */}
            <motion.div variants={fadeUp} className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{post.author.name}</p>
                  <p className="text-slate-400 text-xs">{post.author.role}</p>
                </div>
              </div>
              <button
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ARTICLE BODY ══════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose-like space-y-3"
          >
            {renderMarkdown(post.content)}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-100">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-full transition-colors cursor-default">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA box */}
          <div className="mt-14 bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-center">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-3">Ready to get started?</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display mb-4">
              Try PropDesk free for 14 days
            </h3>
            <p className="text-slate-400 mb-6 text-base">
              No credit card required. Full access to all features. Setup in under 5 minutes.
            </p>
            <Link href="/contact" className="btn-primary px-8 py-4 inline-flex">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ RELATED POSTS ═════════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900 font-display mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="card p-6 group hover:border-emerald-200 transition-all">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border mb-3 ${categoryColors[rp.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                    {rp.category}
                  </span>
                  <h3 className="font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors mb-3 text-balance">
                    {rp.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
