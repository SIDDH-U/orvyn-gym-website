"use client";

import React, { useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export function DemoStrip() {
  const { name, isDemoDismissed, dismissDemo } = useDemo();
  const stripRef = useRef<HTMLDivElement>(null);

  // Sync actual rendered height with CSS variable --demo-h
  useEffect(() => {
    if (isDemoDismissed) {
      document.documentElement.style.setProperty("--demo-h", "0px");
      return;
    }

    if (stripRef.current) {
      const h = stripRef.current.offsetHeight;
      document.documentElement.style.setProperty("--demo-h", `${h}px`);
    }

    const handleResize = () => {
      if (stripRef.current && !isDemoDismissed) {
        const h = stripRef.current.offsetHeight;
        document.documentElement.style.setProperty("--demo-h", `${h}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDemoDismissed, name]);

  if (isDemoDismissed) return null;

  const waHref = `https://wa.me/918080076322?text=${encodeURIComponent(
    `Hi, I saw the demo website made for ${name}`
  )}`;

  return (
    <div
      ref={stripRef}
      id="demo-strip"
      role="banner"
      aria-label="Demo notice"
      className="fixed top-0 left-0 right-0 z-50 flex min-h-[40px] items-center justify-between border-b border-white/10 bg-[#0F1115]/95 px-3 sm:px-6 py-2 text-xs backdrop-blur-md shadow-md transition-all duration-300"
    >
      <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center pr-2">
        <span className="text-gray-300 text-[11px] sm:text-xs">
          Demo made for{" "}
          <strong
            suppressHydrationWarning
            data-demo="name"
            className="text-[var(--color-headline-accent,#DFFF00)] font-bold uppercase tracking-tight"
          >
            {name}
          </strong>
          . Want this on your own domain?
        </span>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <MessageSquare className="h-3 w-3 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <button
        onClick={dismissDemo}
        className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent,#E4FF1A)] shrink-0 ml-1"
        aria-label="Dismiss demo banner"
        title="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
