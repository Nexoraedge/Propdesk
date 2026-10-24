"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";

interface DiwaliTopBarProps {
  onOpenModal: () => void;
  onClose: () => void;
}

export default function DiwaliTopBar({ onOpenModal, onClose }: DiwaliTopBarProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="relative z-50 overflow-hidden bg-gradient-to-r from-[#7c111c] via-[#b45309] to-[#78121f] text-white border-b border-amber-400/30 shadow-md shadow-amber-950/20"
    >
      {/* Luminous Shimmer Strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
          
          {/* Left / Offer Content */}
          <div
            onClick={onOpenModal}
            className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-3 cursor-pointer group"
          >
            {/* Animated Diya & Badge */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-base sm:text-lg animate-bounce select-none">🪔</span>
              <span className="bg-amber-400/25 text-amber-200 border border-amber-300/40 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
                Diwali Dhamaka • 50% OFF
              </span>
            </div>

            {/* Offer details */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-100 font-medium">
              <span className="hidden md:inline text-amber-200 font-semibold">Festive Special:</span>
              <span className="text-amber-100">
                Single User <span className="line-through text-slate-300/80 text-[11px] sm:text-xs">₹999</span>{" "}
                <strong className="text-yellow-300 font-extrabold text-xs sm:text-sm">₹499/mo</strong>
              </span>
              <span className="text-amber-300/60">•</span>
              <span className="text-amber-100">
                Agency Plan <span className="line-through text-slate-300/80 text-[11px] sm:text-xs">₹2,999</span>{" "}
                <strong className="text-yellow-300 font-extrabold text-xs sm:text-sm">₹1,499/mo</strong>
              </span>
            </div>
          </div>

          {/* Right Action & Close */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 text-slate-950 font-black px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs rounded-full shadow-md shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-900 fill-amber-900" />
              <span>Claim Offer</span>
              <ArrowRight className="w-3 h-3 hidden sm:inline" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded-full text-amber-200/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
              aria-label="Dismiss Diwali offer banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
