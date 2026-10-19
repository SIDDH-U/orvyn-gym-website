"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X as XIcon, Plus, Minus, Star, Crown, Dumbbell, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig, Plan } from "@/config/site";
import { useModal } from "@/context/ModalContext";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function MembershipsPage() {
  const { openModal } = useModal();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const planIcons = [
    <Dumbbell key="basic" className="h-5 w-5" />,
    <Crown key="pro" className="h-5 w-5" />,
    <Star key="elite" className="h-5 w-5" />,
    <Dumbbell key="plan4" className="h-5 w-5" />,
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-28 sm:pt-36 bg-[#0B0C0E]">
      
      {/* 1. SHORT HERO */}
      <section className="relative w-full pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
                MEMBERSHIP TIERS
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
              CHOOSE YOUR <span className="text-[#E4FF1A]">COMMITMENT.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-[#A1A5AD] leading-relaxed">
              Every membership tier includes unmetered facility access, towel service, and app integration. Upgrade, pause or cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THREE PLAN CARDS */}
      <section className="relative w-full pb-12 md:pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center rounded-full border border-white/10 bg-[#15171B] p-1.5">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#E4FF1A] text-[#0B0C0E] shadow-sm"
                    : "text-[#A1A5AD] hover:text-white"
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
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

          <div className={`grid gap-6 items-stretch ${
            siteConfig.plans.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : siteConfig.plans.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
              : siteConfig.plans.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}>
            {siteConfig.plans.map((plan: Plan, idx: number) => {
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
                  {isPro && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E4FF1A] px-4 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#0B0C0E] shadow-md flex items-center gap-1">
                      <Crown className="h-3 w-3 stroke-[2.5]" />
                      <span>{plan.badge || "MOST POPULAR"}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                        {plan.name}
                      </h2>
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
        </div>
      </section>

      {/* 3. CLEAN COMPARISON TABLE */}
      <section className="relative w-full pb-12 md:pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-[#E4FF1A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
                FEATURE MATRIX
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
              COMPARE ALL FEATURES
            </h2>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-[20px] border border-white/10 bg-[#15171B] shadow-xl">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#0B0C0E]/50">
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 w-2/5">
                    Tier Inclusions
                  </th>
                  <th className="py-4 px-4 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white w-1/5">
                    Basic
                  </th>
                  <th className="py-4 px-4 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#E4FF1A] w-1/5 bg-[#E4FF1A]/5">
                    Pro (Popular)
                  </th>
                  <th className="py-4 px-4 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white w-1/5">
                    Elite
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {siteConfig.comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-6 text-gray-300 font-medium text-xs sm:text-sm">
                      {row.name}
                    </td>

                    {/* Basic */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.basic === "boolean" ? (
                        row.basic ? (
                          <Check className="h-4 w-4 text-[#E4FF1A] mx-auto stroke-[2.5]" />
                        ) : (
                          <XIcon className="h-4 w-4 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-semibold text-gray-300">
                          {row.basic}
                        </span>
                      )}
                    </td>

                    {/* Pro */}
                    <td className="py-3.5 px-4 text-center bg-[#E4FF1A]/5">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="h-4 w-4 text-[#E4FF1A] mx-auto stroke-[2.5]" />
                        ) : (
                          <XIcon className="h-4 w-4 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-bold text-[#E4FF1A]">
                          {row.pro}
                        </span>
                      )}
                    </td>

                    {/* Elite */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.elite === "boolean" ? (
                        row.elite ? (
                          <Check className="h-4 w-4 text-[#E4FF1A] mx-auto stroke-[2.5]" />
                        ) : (
                          <XIcon className="h-4 w-4 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-bold text-white">
                          {row.elite}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION WITH SMOOTH HEIGHT ANIMATION */}
      {siteConfig.sections.showFaq && siteConfig.faqs.length > 0 && (
        <section className="relative w-full pb-12 md:pb-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent,#E4FF1A)]" />
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--color-accent,#E4FF1A)] uppercase">
                  FREQUENTLY ASKED
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
                GOT QUESTIONS? WE&apos;VE GOT ANSWERS.
              </h2>
            </div>

            <div className="max-w-3xl space-y-3.5">
              {siteConfig.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[20px] border border-white/10 bg-[#15171B] overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="flex w-full min-h-[52px] items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-1 focus:ring-[var(--color-accent,#E4FF1A)]"
                    >
                      <span className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-white pr-4">
                        {faq.question}
                      </span>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-[var(--color-accent,#E4FF1A)]">
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A1A5AD] leading-relaxed border-t border-white/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. FINAL CTA BLOCK */}
      {siteConfig.sections.showFinalCta && <FinalCtaSection />}

    </div>
  );
}
