"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Dumbbell } from "lucide-react";
import { siteConfig } from "@/config/site";

interface PhotoProps extends Omit<ImageProps, "onError"> {
  hasOverlay?: boolean;
  overlayClass?: string;
  focalPoint?: string;
  containerClassName?: string;
}

export function Photo({
  src,
  alt,
  className = "",
  hasOverlay = false,
  overlayClass = "",
  focalPoint,
  containerClassName = "",
  priority = false,
  fill = true,
  ...props
}: PhotoProps) {
  const [hasError, setHasError] = useState(false);

  // Global photo treatment filter: saturate(.7) contrast(1.08) brightness(.82)
  const filterStyle = {
    filter: "saturate(0.7) contrast(1.08) brightness(0.82)",
    objectPosition: focalPoint || undefined,
  };

  if (hasError || !src) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#15171B] to-[#0B0C0E] border border-white/5 ${
          fill ? "w-full h-full absolute inset-0" : ""
        } ${containerClassName}`}
      >
        <Dumbbell className="h-10 w-10 text-white/10 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "w-full h-full absolute inset-0" : ""
      } ${containerClassName}`}
    >
      <Image
        src={src}
        alt={alt || `${siteConfig.name} Gym`}
        fill={fill}
        priority={priority}
        onError={() => setHasError(true)}
        style={filterStyle}
        className={`object-cover transition-opacity duration-300 ${className}`}
        {...props}
      />

      {/* Bottom-up gradient when text sits on the image */}
      {hasOverlay && (
        <div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-[rgba(11,12,14,0.92)] via-[rgba(11,12,14,0.4)] to-transparent ${overlayClass}`}
        />
      )}
    </div>
  );
}
