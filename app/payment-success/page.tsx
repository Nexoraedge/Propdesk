import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Server } from 'lucide-react';


export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            Subscription Active
          </h1>
          
          <p className="text-slate-400 mb-8 leading-relaxed">
            Your payment was successful! Our servers are processing the upgrade and your CRM will be synced within <strong className="text-white">60 seconds</strong>.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 mb-8 text-left w-full">
            <Server className="w-8 h-8 text-blue-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Next Steps</p>
              <p className="text-xs text-slate-400 mt-1">Return to your CRM window and refresh the page to continue working.</p>
            </div>
          </div>

          <Link href="https://app.thepropdesk.in" className="w-full">
            <button className="w-full bg-white text-black hover:bg-slate-200 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              Go to CRM Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
