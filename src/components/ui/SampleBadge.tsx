"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface SampleBadgeProps {
  className?: string;
}

export function SampleBadge({ className = "" }: SampleBadgeProps) {
  if (!siteConfig.sampleMode) return null;

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest bg-white/10 text-white/70 border border-white/15 backdrop-blur-sm select-none ${className}`}
    >
      Sample
    </span>
  );
}

export default SampleBadge;
