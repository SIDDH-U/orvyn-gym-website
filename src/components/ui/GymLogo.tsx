"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useDemo } from "@/context/DemoContext";

interface GymLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function GymLogo({
  className = "",
  showSubtitle = false,
  size = "md",
}: GymLogoProps) {
  const { name } = useDemo();

  // If custom logo image is provided in gym.config.ts, render the image
  if (siteConfig.logoImage) {
    const height = size === "sm" ? 28 : size === "lg" ? 44 : 36;
    return (
      <div className={`relative flex items-center ${className}`}>
        <Image
          src={siteConfig.logoImage}
          alt={name}
          height={height}
          width={height * 3}
          className="h-auto w-auto max-h-11 object-contain"
          priority
        />
      </div>
    );
  }

  // Text sizes for auto logo
  const titleSizeClass =
    size === "sm"
      ? "text-xl sm:text-2xl"
      : size === "lg"
      ? "text-3xl sm:text-4xl"
      : "text-2xl sm:text-3xl";

  const dotSizeClass = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span
          suppressHydrationWarning
          data-demo="name"
          className={`font-display font-extrabold tracking-tight text-white uppercase leading-none ${titleSizeClass}`}
        >
          {name}
        </span>
        <span
          className={`rounded-full bg-[var(--color-accent,#E4FF1A)] transition-transform group-hover:scale-125 ${dotSizeClass}`}
        />
      </div>

      {showSubtitle && siteConfig.logoSubtitle && (
        <span className="text-[9px] font-bold tracking-[0.2em] text-[#A1A5AD] uppercase leading-none mt-1">
          {siteConfig.logoSubtitle}
        </span>
      )}
    </div>
  );
}

export default GymLogo;
