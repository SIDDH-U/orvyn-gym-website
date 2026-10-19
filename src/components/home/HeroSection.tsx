"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Users, Clock, Dumbbell } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useModal } from "@/context/ModalContext";
import { ChalkDustCanvas } from "./ChalkDustCanvas";

export function HeroSection() {
  const { openModal } = useModal();
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = connection?.saveData;
    if (siteConfig.hero.video && !shouldReduceMotion && !isSaveData) {
      setCanPlayVideo(true);
    }
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than text
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] md:min-h-[700px] w-full overflow-hidden bg-[#0B0C0E] flex flex-col justify-between items-center"
    >
      {/* ================= LAYER 1: HERO IMAGE (PRESERVED EXACTLY) ================= */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {canPlayVideo && siteConfig.hero.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={siteConfig.images.heroDesktop}
            className="w-full h-full object-cover"
            style={{
              filter: "saturate(0.7) contrast(1.08) brightness(0.82)",
            }}
          >
            <source src={siteConfig.hero.video} type="video/mp4" />
          </video>
        ) : (
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            {/* Desktop Hero Image (Landscape 16:9) */}
            <div className="hidden md:block w-full h-full relative">
              <Image
                src={siteConfig.images.heroDesktop}
                alt="ORVYN Elite Athlete Training"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{
                  filter: "saturate(0.7) contrast(1.08) brightness(0.82)",
                  objectPosition: siteConfig.hero.heroFocus.desktop,
                }}
              />
            </div>

            {/* Mobile Hero Image (Portrait 9:16) */}
            <div className="block md:hidden w-full h-full relative">
              <Image
                src={siteConfig.images.heroMobile}
                alt="ORVYN Athlete Training"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{
                  filter: "saturate(0.7) contrast(1.08) brightness(0.82)",
                  objectPosition: siteConfig.hero.heroFocus.mobile,
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ================= LAYER 2: DARK GRADIENTS (PRESERVED EXACTLY) ================= */}
        {/* Desktop Gradients */}
        <div className="hidden md:block absolute inset-0 z-[1] bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/70 to-transparent pointer-events-none" />
        <div className="hidden md:block absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent pointer-events-none" />

        {/* Mobile Gradient */}
        <div className="block md:hidden absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/85 via-50% to-transparent pointer-events-none" />
      </motion.div>

      {/* ================= LAYER 3: LIGHT SWEEP (CSS ONLY, POINTER-EVENTS NONE) ================= */}
      {siteConfig.hero.effects?.sweep !== false && (
        <div className="hero-sweep-container" aria-hidden="true">
          <div className="hero-sweep-element" />
        </div>
      )}

      {/* ================= LAYER 4: CHALK DUST (CANVAS, POINTER-EVENTS NONE) ================= */}
      {siteConfig.hero.effects?.chalk !== false && <ChalkDustCanvas />}

      {/* ================= LAYER 5: HERO CONTENT ================= */}

      {/* --- DESKTOP HERO CONTENT (EXACTLY PRESERVED) --- */}
      <div className="hidden md:flex relative z-10 mx-auto w-full max-w-[1200px] h-full flex-col justify-between items-center px-6 lg:px-8 pt-32 pb-8 text-center">
        {/* Central Text Group (Centered in middle of hero) */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center my-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#DFFF00]" />
            <span className="text-xs font-semibold tracking-widest text-[#A1A5AD] uppercase">
              DISCIPLINE BUILDS FREEDOM
            </span>
          </motion.div>

          {/* Headline: Single line on desktop */}
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-center text-[clamp(52px,6.2vw,86px)] lg:whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              <span className="text-white">TRAIN HARDER. </span>
              <span className="text-[#DFFF00]">LIVE STRONGER.</span>
            </motion.h1>
          </div>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4 max-w-xl mx-auto text-center text-base text-[#A1A5AD] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          >
            {siteConfig.subline}
          </motion.p>
        </div>

        {/* Lower Portion: CTA + Statistics + Scroll Indicator */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Primary CTA Button */}
          <motion.div
            id="hero-cta-desktop"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => openModal()}
              className="group flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#DFFF00] px-8 py-3.5 text-sm font-extrabold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#ccee00] active:scale-[0.98] glow-yellow shadow-xl"
            >
              <span>START FREE TRIAL</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Desktop Statistics: Single row with neon lime dots & subtle vertical dividers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-6 flex items-center justify-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-white"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DFFF00]" />
              12+ COACHES
            </span>
            <span className="h-3.5 w-px bg-white/20" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DFFF00]" />
              5AM–11PM OPEN DAILY
            </span>
            <span className="h-3.5 w-px bg-white/20" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DFFF00]" />
              60+ MACHINES
            </span>
          </motion.div>

          {/* Desktop Scroll Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-6 flex flex-col items-center pointer-events-none text-[#A1A5AD]/80"
            aria-hidden="true"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">SCROLL</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#DFFF00] mt-0.5 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* --- MOBILE HERO CONTENT (FIXED COHESIVE VERTICAL COMPOSITION) --- */}
      <div className="md:hidden relative z-10 w-full h-full min-h-[100svh] flex flex-col justify-between items-center px-4 pt-20 pb-4 text-center">
        {/* Mobile Main Content: Positioned around visual center, slightly above midpoint */}
        <div className="w-full flex flex-col items-center my-auto">
          
          {/* 1. Centered Text Block: Eyebrow + Headline + Description as ONE vertically grouped block */}
          <div className="w-full max-w-[340px] xs:max-w-[360px] mx-auto flex flex-col items-center px-2">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-2 mb-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#DFFF00]" />
              <span className="text-[11px] font-semibold tracking-widest text-[#A1A5AD] uppercase">
                DISCIPLINE BUILDS FREEDOM
              </span>
            </motion.div>

            {/* Headline: 2 deliberate lines with comfortable 0.16em line spacing, never touching */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display font-extrabold uppercase tracking-tight text-center flex flex-col items-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              <span className="text-white text-[clamp(44px,11.5vw,52px)] leading-[0.96] block whitespace-nowrap">
                TRAIN HARDER.
              </span>
              <span className="text-[#DFFF00] text-[clamp(44px,11.5vw,52px)] leading-[0.96] block whitespace-nowrap mt-[0.16em]">
                LIVE STRONGER.
              </span>
            </motion.h1>

            {/* Supporting Description: Compact, wrapped into 2 balanced lines */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-3.5 max-w-[260px] xs:max-w-[280px] mx-auto text-xs xs:text-sm text-[#A1A5AD] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            >
              {siteConfig.subline}
            </motion.p>
          </div>

          {/* 2. Primary CTA Button (Centered beneath description with clear gap) */}
          <motion.div
            id="hero-cta-mobile"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 xs:mt-7 w-full flex justify-center"
          >
            <button
              onClick={() => openModal()}
              className="group flex min-h-[48px] w-full max-w-[280px] xs:max-w-[300px] items-center justify-center gap-2 rounded-full bg-[#DFFF00] px-7 py-3.5 text-xs font-extrabold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#ccee00] active:scale-[0.98] glow-yellow shadow-xl"
            >
              <span>START FREE TRIAL</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* 3. Three Integrated Statistics Columns (Directly on background, no black pill) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-5 w-full max-w-[320px] xs:max-w-[350px] mx-auto grid grid-cols-3 divide-x divide-white/10 text-center"
          >
            {/* Column 1 */}
            <div className="flex flex-col items-center px-1.5">
              <Users className="h-4 w-4 xs:h-5 xs:w-5 text-[#DFFF00] mb-1" />
              <span className="font-display text-base xs:text-lg font-extrabold text-white leading-tight">
                12+
              </span>
              <span className="text-[10px] font-bold tracking-wider text-[#A1A5AD] uppercase mt-0.5">
                COACHES
              </span>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center px-1.5">
              <Clock className="h-4 w-4 xs:h-5 xs:w-5 text-[#DFFF00] mb-1" />
              <span className="font-display text-base xs:text-lg font-extrabold text-white leading-tight">
                5AM–11PM
              </span>
              <span className="text-[10px] font-bold tracking-wider text-[#A1A5AD] uppercase mt-0.5">
                OPEN DAILY
              </span>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center px-1.5">
              <Dumbbell className="h-4 w-4 xs:h-5 xs:w-5 text-[#DFFF00] mb-1" />
              <span className="font-display text-base xs:text-lg font-extrabold text-white leading-tight">
                60+
              </span>
              <span className="text-[10px] font-bold tracking-wider text-[#A1A5AD] uppercase mt-0.5">
                MACHINES
              </span>
            </div>
          </motion.div>

        </div>

        {/* 4. Scroll Cue (Near bottom of hero, visually separate) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col items-center pointer-events-none text-[#A1A5AD]/80 pb-1"
          aria-hidden="true"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest">SCROLL</span>
          <ChevronDown className="h-3 w-3 text-[#DFFF00] mt-0.5 animate-bounce" />
        </motion.div>
      </div>

    </section>
  );
}
