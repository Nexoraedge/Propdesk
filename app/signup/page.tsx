"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, RefreshCw, HeadphonesIcon } from "lucide-react";
import Link from 'next/link';

function SignupFormInner() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [affiliateCode, setAffiliateCode] = useState(searchParams?.get("ref") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Resend state
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, companyName, affiliateCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess("");
    setError("");
    setCountdown(60);

    try {
      const res = await fetch("/api/signup/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend invite");
      }

      setResendSuccess("Invitation resent successfully! Please check your spam folder.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">We invited you via email!</h3>
        <p className="text-slate-600 mb-4 text-lg">
          It takes 2-3 minutes to set up your account. We've sent an invite link to <strong className="text-slate-900">{email}</strong>.
        </p>
        <p className="text-sm font-medium text-amber-600 mb-8 bg-amber-50 p-3 rounded-xl border border-amber-100">
          Please check your spam or promotions folder in case you don't see it.
        </p>

        {error && (
          <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 mb-6 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">
            {resendSuccess}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleResend}
            disabled={isResending || countdown > 0}
            className="flex-1 bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isResending ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            {countdown > 0 ? `Resend Invite (${countdown}s)` : "Resend Invite"}
          </button>

          <Link href="/contact" className="flex-1">
            <button className="w-full bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Start your 14-day free trial</h1>
        <p className="text-slate-500 text-lg">No credit card required. Setup takes 30 seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
            Agency / Company Name
          </label>
          <input
            id="company"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-900 font-medium"
            placeholder="e.g. Acme Properties"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Work Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-900 font-medium"
            placeholder="you@company.com"
          />
        </div>

        {/* <div>
          <label htmlFor="affiliate" className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
            <span>Affiliate / Referral Code</span>
            <span className="text-slate-400 font-normal">Optional</span>
          </label>
          <input
            id="affiliate"
            type="text"
            value={affiliateCode}
            onChange={(e) => setAffiliateCode(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all uppercase text-slate-900 font-medium tracking-wide"
            placeholder="e.g. VIP2026"
          />
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-xs text-center text-slate-400 mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-20 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 relative z-10 border border-slate-100">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>}>
          <SignupFormInner />
        </Suspense>
      </div>
    </div>
  );
}
