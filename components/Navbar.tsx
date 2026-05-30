"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-100/80 shadow-sm shadow-slate-100/50 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600  shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-all duration-300">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                  <Image
                    src="/prop.png"
                    alt="PropDesk"
                    width={100}
                    height={100}
                    className="object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>
              <span className="text-[18px] font-bold tracking-tight text-slate-900 font-display group-hover:text-slate-700 transition-colors">
                Prop<span className="text-emerald-600">Desk</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-[14px] font-semibold rounded-lg transition-all duration-200 group ${isActive
                      ? "text-emerald-600"
                      : "text-slate-500 hover:text-slate-900"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-emerald-500"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors duration-150 shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/20 font-display"
                >
                  Start Free Trial
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1.5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Image src="/prop.png" alt="PropDesk" width={18} height={18} className="object-contain brightness-0 invert" />
            </div>
            <span className="font-bold text-slate-900 font-display">Prop<span className="text-emerald-600">Desk</span></span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-73px)] justify-between p-5">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors font-display text-[15px]"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs text-slate-400">No credit card required</p>
          </div>
        </div>
      </div>
    </>
  );
}
