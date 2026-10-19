"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, Program } from "@/config/site";
import { useModal } from "@/context/ModalContext";
import { Photo } from "@/components/ui/Photo";
import { AutoCarousel } from "@/components/ui/AutoCarousel";

function ProgramCard({
  program,
  onClick,
}: {
  program: Program;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full rounded-[20px] overflow-hidden border border-white/10 bg-[#15171B] aspect-[4/5] cursor-pointer shadow-xl transition-all duration-300 hover:border-[#E4FF1A]/60 hover:-translate-y-1.5"
    >
      {/* Photo with global treatment and strong bottom gradient */}
      <Photo
        src={program.image}
        alt={program.title}
        fill
        hasOverlay
        sizes="(max-width: 1024px) 80vw, 25vw"
        className="transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Strong dark bottom gradient specifically for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/70 to-transparent pointer-events-none" />

      {/* Tag Pill (Top Left) */}
      <div className="absolute top-4 left-4 z-10">
        <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white">
          {program.tag}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end">
        <h3 className="font-display text-2xl font-extrabold uppercase text-white tracking-tight leading-none group-hover:text-[#E4FF1A] transition-colors">
          {program.title}
        </h3>
        {/* ONE-line description */}
        <p className="mt-2 text-xs sm:text-sm text-[#A1A5AD] truncate leading-normal">
          {program.description}
        </p>

        {/* Sliding Yellow Label & Arrow on Hover */}
        <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E4FF1A]">
            EXPLORE
          </span>
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#E4FF1A] text-[#0B0C0E] transition-transform duration-300 group-hover:translate-x-1">
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProgramsSection() {
  const { openModal } = useModal();

  return (
    <section
      id="programs"
      className="relative w-full py-12 md:py-[88px] bg-[#0B0C0E] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
              PROGRAMS & DISCIPLINES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[0.95]">
            TRAIN YOUR WAY.
          </h2>
          <p className="mt-2.5 max-w-xl text-sm sm:text-base text-[#A1A5AD]">
            Built for raw progression, peak metabolic conditioning, and lasting athletic longevity.
          </p>
        </div>

        {/* Desktop Static 4-Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {siteConfig.programs.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <ProgramCard
                program={program}
                onClick={() => openModal(program.title)}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet: Shared <AutoCarousel> with 3.5s autoplay */}
        <div className="block lg:hidden">
          <AutoCarousel
            autoplayInterval={3500}
            cardWidthClass="w-[80vw] max-w-[320px]"
            gapClass="gap-3"
            ariaLabel="Training programs carousel"
          >
            {siteConfig.programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onClick={() => openModal(program.title)}
              />
            ))}
          </AutoCarousel>
        </div>
      </div>
    </section>
  );
}
