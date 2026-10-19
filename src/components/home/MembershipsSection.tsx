"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Check, ArrowRight, Star, Crown, Dumbbell, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, Plan } from "@/config/site";
import { useModal } from "@/context/ModalContext";

export function MembershipsSection() {
  const { openModal } = useModal();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedMobileIndex, setSelectedMobileIndex] = useState(1); // Start on PRO (index 1)
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(true);
  const touchStartXRef = useRef<number | null>(null);

  const plans = siteConfig.plans;
  const safeMobileIndex = Math.min(selectedMobileIndex, Math.max(0, plans.length - 1));
  const currentMobilePlan = plans[safeMobileIndex] || plans[0];

  // Distinct icons for up to 4 plans
  const planIcons = [
    <Dumbbell key="basic" className="h-5 w-5" />,
    <Crown key="pro" className="h-5 w-5" />,
    <Star key="elite" className="h-5 w-5" />,
    <Dumbbell key="plan4" className="h-5 w-5" />,
  ];

  // Stop autoplay permanently on first interaction
  const markInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  // IntersectionObserver to pause autoplay when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile Autoplay: cycle Basic > Pro > Elite every 5s, stops permanently on first user interaction
  useEffect(() => {
    if (hasInteracted) return;

    const interval = setInterval(() => {
      if (isInViewRef.current && !hasInteracted) {
        setSelectedMobileIndex((prev) => (prev + 1) % plans.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [hasInteracted, plans.length]);

  // Touch swipe handlers for mobile card
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      markInteraction();
      if (diff > 0) {
        // swipe left -> next plan
        setSelectedMobileIndex((prev) => (prev + 1) % plans.length);
      } else {
        // swipe right -> prev plan
        setSelectedMobileIndex((prev) => (prev - 1 + plans.length) % plans.length);
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="plans"
      ref={containerRef}
      className="relative w-full py-12 md:py-[88px] bg-[#0B0C0E] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
                MEMBERSHIP PLANS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[0.95]">
              FIND YOUR PLAN.
            </h2>
            <p className="mt-2.5 max-w-lg text-sm sm:text-base text-[#A1A5AD]">
              Flexible, transparent options for every goal. No hidden fees or lock-in contracts.
            </p>
          </div>

          {/* Only ONE "Compare all features" link */}
          <Link
            href="/memberships"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#E4FF1A] hover:underline"
          >
            <span>Compare all features</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Billing Cycle Toggle (Monthly vs Yearly - Save 20%) */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center rounded-full border border-white/10 bg-[#15171B] p-1.5">
            <button
              onClick={() => {
                markInteraction();
                setBillingCycle("monthly");
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#E4FF1A] text-[#0B0C0E] shadow-sm"
                  : "text-[#A1A5AD] hover:text-white"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => {
                markInteraction();
                setBillingCycle("yearly");
              }}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === "yearly"
                  ? "bg-[#E4FF1A] text-[#0B0C0E] shadow-sm"
                  : "text-[#A1A5AD] hover:text-white"
              }`}
            >
              <span>YEARLY</span>
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-[#E4FF1A] font-extrabold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* ================= DESKTOP: 1-4 Cards Handled Cleanly With No Gaps ================= */}
        <div className={`hidden md:grid gap-6 items-stretch ${
          plans.length === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : plans.length === 2
            ? "grid-cols-2 max-w-3xl mx-auto"
            : plans.length === 3
            ? "grid-cols-3"
            : "grid-cols-2 lg:grid-cols-4"
        }`}>
          {plans.map((plan: Plan, idx: number) => {
            const isPro = plan.popular;
            const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[20px] p-6 sm:p-8 transition-all duration-300 shadow-xl ${
                  isPro
                    ? "border-2 border-[#E4FF1A] bg-[#15171B] md:-translate-y-3 md:shadow-[0_0_30px_rgba(228,255,26,0.15)] z-10"
                    : "border border-white/10 bg-[#15171B] hover:border-white/20"
                }`}
              >
                {/* Most Popular Badge on PRO */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E4FF1A] px-4 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#0B0C0E] shadow-md flex items-center gap-1">
                    <Crown className="h-3 w-3 stroke-[2.5]" />
                    <span>{plan.badge || "MOST POPULAR"}</span>
                  </div>
                )}

                <div>
                  {/* Title & Distinct Icon */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                      {plan.name}
                    </h3>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isPro
                          ? "bg-[#E4FF1A] text-[#0B0C0E]"
                          : "border border-white/10 bg-white/5 text-gray-300"
                      }`}
                    >
                      {planIcons[idx]}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                      ${price}
                    </span>
                    <span className="text-xs font-semibold text-[#A1A5AD] uppercase tracking-wide">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#A1A5AD] leading-relaxed min-h-[32px]">
                    {plan.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E4FF1A]/10 text-[#E4FF1A] mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-xs text-gray-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-2">
                  <button
                    onClick={() => openModal(`${plan.name} Membership`)}
                    className={`group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all active:scale-[0.98] ${
                      isPro
                        ? "bg-[#E4FF1A] text-[#0B0C0E] hover:bg-[#d4ef0e] glow-yellow shadow-lg"
                        : "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE: Plan Switcher (Segmented Control + Single Card) ================= */}
        <div className="block md:hidden">
          {/* Segmented Control Tabs (BASIC / PRO / ELITE) */}
          <div className="relative flex rounded-full border border-white/10 bg-[#15171B] p-1.5 mb-6">
            {plans.map((plan, idx) => {
              const isSelected = selectedMobileIndex === idx;
              return (
                <button
                  key={plan.id}
                  onClick={() => {
                    markInteraction();
                    setSelectedMobileIndex(idx);
                  }}
                  className={`relative flex-1 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider transition-colors z-10 flex items-center justify-center gap-1 ${
                    isSelected ? "text-[#0B0C0E]" : "text-[#A1A5AD] hover:text-white"
                  }`}
                >
                  <span>{plan.name}</span>
                  {plan.popular && !isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
                  )}
                  {isSelected && (
                    <motion.div
                      layoutId="activePlanTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#E4FF1A] -z-10 shadow-md"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Single Transitioning Card with fixed min-height so nothing jumps */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-[440px] rounded-[20px] border-2 border-[#E4FF1A] bg-[#15171B] p-6 shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMobilePlan.id + billingCycle}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col justify-between flex-1"
              >
                <div>
                  {/* Top Bar: Plan Title + Popular Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                        {currentMobilePlan.name}
                      </h3>
                      {currentMobilePlan.popular && (
                        <span className="rounded-full bg-[#E4FF1A] px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase text-[#0B0C0E]">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4FF1A] text-[#0B0C0E]">
                      {planIcons[selectedMobileIndex]}
                    </div>
                  </div>

                  {/* Price with number roll */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <motion.span
                      key={billingCycle === "yearly" ? currentMobilePlan.yearlyPrice : currentMobilePlan.monthlyPrice}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-4xl font-extrabold tracking-tight text-white"
                    >
                      ${billingCycle === "yearly" ? currentMobilePlan.yearlyPrice : currentMobilePlan.monthlyPrice}
                    </motion.span>
                    <span className="text-xs font-semibold text-[#A1A5AD] uppercase tracking-wide">
                      {currentMobilePlan.period}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#A1A5AD] leading-relaxed">
                    {currentMobilePlan.description}
                  </p>

                  {/* Checklist */}
                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                    {currentMobilePlan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E4FF1A]/10 text-[#E4FF1A] mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-xs text-gray-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full-width CTA button with prefilled plan */}
                <div className="mt-6 pt-3">
                  <button
                    onClick={() => {
                      markInteraction();
                      openModal(`${currentMobilePlan.name} Membership`);
                    }}
                    className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#E4FF1A] py-3.5 px-6 text-xs font-bold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#d4ef0e] active:scale-[0.98] glow-yellow shadow-lg"
                  >
                    <span>{currentMobilePlan.ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[10px] text-[#A1A5AD] mt-2">
                    Swipe left/right to compare tiers
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
