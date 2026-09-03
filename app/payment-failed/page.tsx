"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentFailedPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="max-w-md w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-400" />

        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-8 border border-red-500/20"
          >
            <XCircle className="w-12 h-12 text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight mb-4"
          >
            Payment Failed
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 mb-8 leading-relaxed text-base"
          >
            We couldn't process your payment. Your account has not been charged. Please try again with a different payment method.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center gap-5 mb-8 text-left w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Need Help?</p>
              <p className="text-xs text-slate-400 mt-1 leading-snug">If the issue persists, contact our support team or check your bank.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full flex flex-col gap-3"
          >
            <Link href="/pricing" className="w-full">
              <button className="group w-full bg-white text-black hover:bg-slate-200 h-14 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Try Again
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
