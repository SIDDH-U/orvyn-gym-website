"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useModal } from "@/context/ModalContext";
import { Photo } from "@/components/ui/Photo";

export function AboutSection() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.08]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-12 md:py-[88px] bg-[#0B0C0E] overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Circular Photo (max width min(68vw, 280px) on mobile) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-[var(--color-accent,#E4FF1A)]/10 blur-2xl pointer-events-none" />

              {/* Accent ring frame */}
              <div className="relative w-[min(68vw,280px)] h-[min(68vw,280px)] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full p-2.5 sm:p-3.5 bg-[var(--color-accent,#E4FF1A)] shadow-2xl">
                <div className="relative h-full w-full rounded-full overflow-hidden bg-[#15171B]">
                  <motion.div style={{ scale: imgScale }} className="relative h-full w-full">
                    {/* Clean photo without any baked-in text */}
                    <Photo
                      src={siteConfig.images.aboutCommunity}
                      alt={`${siteConfig.name} Gym Community Training`}
                      fill
                      priority={false}
                      sizes="(max-width: 640px) 280px, 400px"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Single Circular Badge with Rotating SVG Text-on-Path & Arrow */}
              <div className="absolute -bottom-2 -right-2 sm:bottom-1 sm:right-1 z-20 flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#0B0C0E] border-2 border-[var(--color-accent,#E4FF1A)] shadow-2xl">
                <motion.svg
                  viewBox="0 0 100 100"
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <path
                    id="badgeCirclePathRev"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-extrabold uppercase tracking-[0.18em] fill-white">
                    <textPath href="#badgeCirclePathRev" startOffset="0%">
                      STRONGER PEOPLE • BRIGHTER DAYS •
                    </textPath>
                  </text>
                </motion.svg>

                {/* Center Arrow */}
                <div className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[var(--color-accent,#E4FF1A)] text-[var(--color-cta-text,#0B0C0E)] shadow-md">
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content - Strict Left Alignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent,#E4FF1A)]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--color-accent,#E4FF1A)] uppercase">
                OUR COMMUNITY
              </span>
            </div>

            {/* Headline (Max 2 lines) */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[0.95]">
              MORE THAN JUST A GYM.
            </h2>

            {/* ONE short sentence on mobile; secondary line on desktop */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#A1A5AD] leading-relaxed">
              At {siteConfig.name}, you&apos;ll find support, discipline and a community that pushes you to be your best.
            </p>
            <p className="hidden md:block mt-2 text-base text-[#A1A5AD] leading-relaxed">
              A place to train, grow and belong with like-minded athletes.
            </p>

            {/* One Button */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => openModal("Community Member")}
                className="group flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--color-cta,#E4FF1A)] px-7 py-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-[var(--color-cta-text,#0B0C0E)] transition-all hover:brightness-105 active:scale-[0.98] glow-yellow-sm"
              >
                <span>JOIN OUR COMMUNITY</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
