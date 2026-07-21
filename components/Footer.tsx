"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Youtube, Twitter, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden flex flex-col">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">



        {/* Main footer grid */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit" title="PropDesk Home">
              <Image
                src="/prop.png"
                alt="PropDesk - Real Estate CRM Logo"
                width={48}
                height={48}
                className="object-contain rounded drop-shadow-lg transition-transform group-hover:scale-105"
              />
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
                Prop<span className="text-emerald-400">Desk</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The newly emerging force of New India's real estate building — a powerful CRM and property management software engineered to scale modern agents, brokers, and high-growth agencies.
            </p>

            {/* Social Links */}
            <nav aria-label="Social Media Links" className="flex items-center gap-3">
              {[
                { icon: Twitter, label: "X (formerly Twitter)", href: "https://x.com/The_PropDesk" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Corestack/61575434111623/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/prop_desk_crm/" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@PropertyDesk_01" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow PropDesk on ${label}`}
                  title={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-600/20 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Product links */}
          <nav aria-label="Product Navigation">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6 font-display">Product</h3>
            <ul className="space-y-4">
              {[
                { label: "Features Overview", href: "/features" },
                { label: "Pricing Plans", href: "/pricing" },
                { label: "Real Estate Blog", href: "/blog" },
                { label: "Book a Demo", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-150 font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company links */}
          <nav aria-label="Use Cases Navigation">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6 font-display">Use Cases</h3>
            <ul className="space-y-4">
              {[
                "Solo Brokers",
                "Agency Teams",
                "Developer Firms",
                "Property Managers",
              ].map((label) => (
                <li key={label}>
                  <Link href="/features" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-150 font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-display">Get in Touch</h3>
            <address className="not-italic space-y-4">
              <a href="tel:+917208850778" className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-emerald-450 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-200 shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Call Support</span>
                  <span className="block text-sm font-semibold text-slate-350 group-hover:text-white transition-colors">+91 82713 10911</span>
                </div>
              </a>

              <a href="mailto:hardikjain2030@gmail.com" className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-emerald-450 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-200 shrink-0">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</span>
                  <span className="block text-sm font-semibold text-slate-350 group-hover:text-white transition-colors truncate max-w-[200px] lg:max-w-none">hardikjain2030@gmail.com</span>
                </div>
              </a>

              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">HQ Address</span>
                  <span className="block text-xs font-semibold text-slate-400 leading-relaxed">
                    MohanBari, Surjpolegate,<br />
                    Jaipur, Rajasthan — 302003
                  </span>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* MASSIVE FULL-WIDTH BRAND TYPOGRAPHY */}
      <div className="w-full overflow-hidden flex justify-center items-center pointer-events-none select-none pb-8 pt-4">
        <h1 className="text-[13vw] font-black leading-[0.75] tracking-tighter text-white whitespace-nowrap">
          Prop<span className="text-emerald-500">Desk</span>
        </h1>
      </div>

      {/* Bottom Legal & Credit Bar */}
      <div className="relative border-t border-white/10 bg-slate-900/50 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col xl:flex-row items-center justify-between gap-y-6 gap-x-8 text-sm text-slate-400">
          
          {/* Left Side: Copyright & Certifications */}
          <div className="flex flex-wrap justify-center xl:justify-start items-center gap-x-4 gap-y-3">
            <span className="font-semibold text-slate-300 whitespace-nowrap">© {currentYear} PropDesk</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="font-medium text-slate-400 whitespace-nowrap">Made with ❤️ in India 🇮🇳</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <div className="flex items-center gap-2 whitespace-nowrap" title="Recognized by Govt. of India (MSME)">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="font-medium text-slate-300 text-xs sm:text-sm">
                Govt. Registered MSME <span className="text-slate-500 ml-1">({`UDYAM-RJ-17-0630850`})</span>
              </span>
            </div>
          </div>

          {/* Right Side: Links & Credits */}
          <div className="flex flex-wrap justify-center xl:justify-end items-center gap-x-6 gap-y-4">
            <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-6">
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors whitespace-nowrap">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors whitespace-nowrap">RERA Disclaimer</Link>
            </div>

            <div className="hidden sm:block w-px h-4 bg-slate-700"></div>

            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 whitespace-nowrap text-[13px]">
              <span className="text-slate-400">Designed by</span>
              <a
                href="https://www.youtube.com/@Dhonidev-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:text-emerald-300 transition-all"
                title="Visit DhoniDev-Ai on YouTube"
              >
                DhoniDev-Ai
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}