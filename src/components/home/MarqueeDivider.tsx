"use client";

import React from "react";

export function MarqueeDivider() {
  const marqueeItems = Array(12).fill("STRENGTH ★ COMMUNITY ★ RESULTS ★");

  return (
    <div className="relative w-full overflow-hidden py-8 bg-[#0B0C0E]">
      {/* Tilted yellow band */}
      <div className="relative -rotate-2 scale-105 sm:scale-102 bg-[#E4FF1A] py-3.5 sm:py-4.5 shadow-xl select-none group cursor-default">
        <div className="flex w-max items-center whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((text, idx) => (
            <span
              key={idx}
              className="mx-3 sm:mx-4 font-display text-lg sm:text-2xl font-extrabold tracking-wider uppercase text-[#0B0C0E]"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
