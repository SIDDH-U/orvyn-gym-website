"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteConfig, Review } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { AutoCarousel } from "@/components/ui/AutoCarousel";

export function ReviewsSection() {
  const reviews = siteConfig.reviews;
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentReview = reviews[activeDesktopIndex];
  const containerRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(true);

  // IntersectionObserver to pause desktop auto-cycle when off-screen
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

  // Desktop Spotlight auto-crossfade (5s cycle with progress bar, pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const intervalMs = 5000;
    const stepMs = 50;
    const increment = (stepMs / intervalMs) * 100;

    const timer = setInterval(() => {
      if (!isInViewRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          setActiveDesktopIndex((idx) => (idx + 1) % reviews.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isHovered, reviews.length]);

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="relative w-full py-12 md:py-[88px] bg-[#0B0C0E] scroll-mt-24 sm:scroll-mt-28 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
              MEMBER TRANSFORMATIONS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[0.95]">
            REAL RESULTS.
          </h2>
          {/* Rating line from config */}
          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#E4FF1A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#E4FF1A]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A1A5AD]">
              {siteConfig.reviewsSummary}
            </span>
          </div>
        </div>

        {/* ================= DESKTOP: Spotlight Layout (Photo Left, Quote Right, Avatars Row) ================= */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hidden lg:grid lg:grid-cols-12 gap-10 items-center rounded-[24px] border border-white/10 bg-[#15171B] p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Left: Large Member Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden border border-white/10 shadow-xl bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Photo
                    src={currentReview.photo}
                    alt={currentReview.name}
                    fill
                    hasOverlay
                    sizes="400px"
                  />
                  {/* Result Pill on Photo */}
                  <div className="absolute bottom-4 left-4 z-10 rounded-full bg-[#E4FF1A] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0B0C0E] shadow-lg">
                    {currentReview.result}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Big Quote + Member Info + Thumbnails Row */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
            <div>
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#E4FF1A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#E4FF1A]" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-[#E4FF1A]/20" />
              </div>

              {/* Crossfading Quote */}
              <div className="min-h-[140px] flex items-center mt-5">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentReview.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="font-display text-2xl lg:text-3xl font-bold uppercase text-white leading-snug tracking-tight"
                  >
                    &ldquo;{currentReview.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Name & Since */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <h4 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
                  {currentReview.name}
                </h4>
                <p className="text-xs text-[#A1A5AD]">
                  {currentReview.since}
                </p>
              </div>
            </div>

            {/* Row of small avatar thumbnails */}
            <div className="mt-8 pt-4">
              <div className="flex items-center gap-3">
                {reviews.map((rev, idx) => {
                  const isActive = activeDesktopIndex === idx;
                  return (
                    <button
                      key={rev.id}
                      onClick={() => {
                        setActiveDesktopIndex(idx);
                        setProgress(0);
                      }}
                      className={`relative h-11 w-11 rounded-full overflow-hidden border-2 transition-all ${
                        isActive
                          ? "border-[#E4FF1A] scale-110 shadow-[0_0_12px_rgba(228,255,26,0.5)]"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Photo
                        src={rev.photo}
                        alt={rev.name}
                        fill
                        sizes="44px"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Thin yellow progress bar indicating auto-crossfade */}
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E4FF1A] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE: <AutoCarousel> (autoplay 4.5s, width ~88vw) ================= */}
        <div className="block lg:hidden">
          <AutoCarousel
            autoplayInterval={4500}
            cardWidthClass="w-[88vw] max-w-[360px]"
            gapClass="gap-3"
            ariaLabel="Member reviews carousel"
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="relative flex flex-col justify-between rounded-[20px] border border-white/10 bg-[#15171B] p-6 shadow-xl h-full min-h-[300px]"
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#E4FF1A] via-[#E4FF1A]/60 to-transparent rounded-t-[20px]" />

                {/* Big faint yellow quote mark */}
                <Quote className="absolute top-4 right-4 h-12 w-12 text-[#E4FF1A]/10 pointer-events-none" />

                <div>
                  {/* Top: Member photo with yellow ring + Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full p-0.5 bg-[#E4FF1A] shrink-0">
                        <div className="relative h-full w-full rounded-full overflow-hidden bg-gray-900">
                          <Photo
                            src={rev.photo}
                            alt={rev.name}
                            fill
                            sizes="48px"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold uppercase text-white leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-[#A1A5AD]">{rev.since}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#E4FF1A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#E4FF1A]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-gray-200 leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom: Yellow Result Pill */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A5AD]">
                    VERIFIED RESULT
                  </span>
                  <div className="rounded-full bg-[#E4FF1A] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0B0C0E]">
                    {rev.result}
                  </div>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>

      </div>
    </section>
  );
}
