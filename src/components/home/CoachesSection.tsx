"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { siteConfig, Coach } from "@/config/site";
import { useModal } from "@/context/ModalContext";
import { Photo } from "@/components/ui/Photo";
import { AutoCarousel } from "@/components/ui/AutoCarousel";

function CoachCard({
  coach,
  onClick,
}: {
  coach: Coach;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full rounded-[20px] overflow-hidden border border-white/10 bg-[#15171B] cursor-pointer shadow-xl transition-all duration-300 hover:border-[#E4FF1A]/60 hover:-translate-y-1.5"
    >
      {/* Coach Photo (4:5 aspect ratio) with Initials Fallback */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#15171B] to-[#0B0C0E]">
        <Photo
          src={coach.image}
          alt={coach.name}
          fill
          hasOverlay
          sizes="(max-width: 1024px) 80vw, 25vw"
          className="transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Initials Badge fallback / overlay */}
        <div className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 border border-white/15 text-[11px] font-extrabold text-[#E4FF1A] backdrop-blur-md">
          {coach.initials}
        </div>
      </div>

      {/* Coach Info */}
      <div className="p-4 sm:p-5 bg-[#15171B]">
        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#E4FF1A] transition-colors leading-tight">
          {coach.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-[#E4FF1A] uppercase tracking-wide">
          {coach.speciality}
        </p>

        {/* Credentials line: WRAPS (no ellipsis) */}
        <div className="mt-2.5 flex items-start gap-1.5 border-t border-white/10 pt-2.5 text-[11px] text-[#A1A5AD] leading-tight">
          <Award className="h-3.5 w-3.5 text-[#E4FF1A] shrink-0 mt-0.5" />
          <span className="break-words">{coach.certification}</span>
        </div>
      </div>
    </div>
  );
}

export function CoachesSection() {
  const { openModal } = useModal();

  return (
    <section
      id="coaches"
      className="relative w-full py-12 md:py-[88px] bg-[#0B0C0E] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
              COACHING STAFF
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[0.95]">
            MEET YOUR COACHES.
          </h2>
          <p className="mt-2.5 max-w-xl text-sm sm:text-base text-[#A1A5AD]">
            Certified specialists in Olympic lifting, athletic conditioning, and injury prevention.
          </p>
        </div>

        {/* Desktop Static 4-Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {siteConfig.coaches.map((coach, idx) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <CoachCard
                coach={coach}
                onClick={() => openModal(`Training with ${coach.name}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet: Shared <AutoCarousel> with 4s autoplay */}
        <div className="block lg:hidden">
          <AutoCarousel
            autoplayInterval={4000}
            cardWidthClass="w-[80vw] max-w-[320px]"
            gapClass="gap-3"
            ariaLabel="Coaches carousel"
          >
            {siteConfig.coaches.map((coach) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                onClick={() => openModal(`Training with ${coach.name}`)}
              />
            ))}
          </AutoCarousel>
        </div>
      </div>
    </section>
  );
}
