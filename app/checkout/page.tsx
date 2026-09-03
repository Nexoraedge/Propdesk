"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Loader2, Minus, Plus, Tag, ShieldCheck, Zap, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const agencyId = searchParams.get("agencyId");

  // State
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [agencyData, setAgencyData] = useState<any>(null);
  const [seats, setSeats] = useState(1);
  const [cycle, setCycle] = useState<"monthly" | "6months">("monthly");
  const [coupon, setCoupon] = useState("");
  const [discountInfo, setDiscountInfo] = useState<{ type: string, value: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const SEAT_PRICE_MONTHLY = 499;
  const SEAT_PRICE_6MONTHS = 2394; // approx 399/mo

  useEffect(() => {
    if (!agencyId) {
      setLoading(false);
      return;
    }

    // Fetch agency details
    fetch(`/api/billing/agency-details?agencyId=${agencyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.agency) {
          setAgencyData(data.agency);
          setSeats(Math.max(1, data.agency.max_users || 1));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [agencyId]);

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    setCouponError("");
    setDiscountInfo(null);
    try {
      const res = await fetch(`/api/billing/validate-coupon?code=${coupon}`);
      const data = await res.json();
      if (data.valid) {
        setDiscountInfo({ type: data.discount_type, value: data.discount_value });
      } else {
        setCouponError("Invalid or expired coupon");
      }
    } catch (e) {
      setCouponError("Failed to validate coupon");
    }
  };

  // Pricing calculations
  const calculateTotal = () => {
    let basePrice = cycle === "monthly" ? SEAT_PRICE_MONTHLY : SEAT_PRICE_6MONTHS;

    let proratedMultiplier = 1;
    if (agencyData && agencyData.subscription_status === 'active' && agencyData.subscription_end_date) {
      const endDate = new Date(agencyData.subscription_end_date);
      const now = new Date();
      const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

      if (seats > agencyData.max_users && daysLeft > 0 && daysLeft < (cycle === 'monthly' ? 30 : 180)) {
        const cycleDays = cycle === 'monthly' ? 30 : 180;
        proratedMultiplier = daysLeft / cycleDays;
      }
    }

    let total = (basePrice * seats) * proratedMultiplier;

    if (discountInfo) {
      if (discountInfo.type === "percentage") {
        total = total - (total * (discountInfo.value / 100));
      } else if (discountInfo.type === "fixed") {
        total = Math.max(0, total - discountInfo.value);
      }
    }

    return Math.round(total);
  };

  const totalAmount = calculateTotal();

  const activeAgents = agencyData?.active_agents_count || 1;
  const isDowngradeBlocked = agencyData && seats < activeAgents;

  const handleCheckout = async () => {
    if (isDowngradeBlocked) return;
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("agencyId", agencyId || "");
      formData.append("seats", seats.toString());
      formData.append("cycle", cycle);
      if (coupon) formData.append("couponCode", coupon);
      formData.append("calculatedAmount", totalAmount.toString());

      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.redirected) {
        window.location.href = res.url;
      } else {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Checkout failed: " + (data.error || "Unknown error"));
          setProcessing(false);
        }
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during checkout.");
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  if (!agencyId || !agencyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Missing Agency ID</h2>
          <p className="text-slate-500">Please access this page from your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4" /> Secure Checkout
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Complete your subscription
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Scale your real estate business with the exact number of seats you need.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column - Configuration */}
          <div className="lg:col-span-7 space-y-6">

            {/* Cycle Toggle */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Billing Cycle</h3>
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setCycle("monthly")}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${cycle === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setCycle("6months")}
                  className={`relative py-3 rounded-xl font-bold text-sm transition-all ${cycle === "6months" ? "bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200" : "text-slate-500 hover:text-slate-700"}`}
                >
                  6 Months (Save 20%)
                </button>
              </div>
            </div>

            {/* Seat Selector */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Team Seats</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">₹{cycle === 'monthly' ? SEAT_PRICE_MONTHLY : SEAT_PRICE_6MONTHS} per seat / {cycle === 'monthly' ? 'mo' : '6 mo'}</p>
                </div>
                <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-sm border border-slate-200">
                  {seats} Seats Selected
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <div className="flex-1 text-center text-4xl font-black text-slate-900">
                  {seats}
                </div>
                <button
                  onClick={() => setSeats(seats + 1)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {isDowngradeBlocked && (
                <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-600 leading-relaxed">
                    You currently have <strong className="font-bold">{activeAgents} active team members</strong> in your CRM. Please deactivate members in your dashboard first to reduce seats below this number.
                  </p>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-slate-400" /> Have a coupon?
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium uppercase tracking-wider transition-all"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-6 h-12 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-sm font-medium mt-3 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> {couponError}</p>}
              {discountInfo && <p className="text-emerald-600 text-sm font-bold mt-3 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Coupon applied successfully!</p>}
            </div>
          </div>

          {/* Right Column - Summary & Agency Info */}
          <div className="lg:col-span-5 space-y-6">

            {/* Agency Trust Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
              {agencyData.logo_url ? (
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                  <img src={agencyData.logo_url} alt={agencyData.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200">
                  <Building2 className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Billing For
                </p>
                <p className="text-lg font-extrabold text-slate-900 truncate">{agencyData.name}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-24 shadow-2xl shadow-slate-900/20">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                Order Summary
                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">PROPDESK V2</span>
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-slate-300 font-medium">
                  <span>{seats} Seats ({cycle === 'monthly' ? 'Monthly' : '6 Months'})</span>
                  <span>₹{cycle === 'monthly' ? SEAT_PRICE_MONTHLY * seats : SEAT_PRICE_6MONTHS * seats}</span>
                </div>

                {agencyData && agencyData.subscription_status === 'active' && seats > agencyData.max_users && (
                  <div className="flex justify-between items-center text-emerald-400 font-medium text-sm bg-emerald-400/10 p-3 rounded-xl">
                    <span>Prorated (Mid-cycle upgrade)</span>
                    <span>Applied</span>
                  </div>
                )}

                {discountInfo && (
                  <div className="flex justify-between items-center text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>
                      {discountInfo.type === 'percentage'
                        ? `-${discountInfo.value}%`
                        : `-₹${discountInfo.value}`}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 font-medium">Total to pay</span>
                  <div className="text-right">
                    <span className="text-5xl font-black tracking-tight">₹{totalAmount}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-3 text-right flex items-center justify-end gap-1.5">
                  Includes 18% GST. Secure via PhonePe.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={processing || isDowngradeBlocked}
                className="w-full h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
              >
                {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Proceed to Payment <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
