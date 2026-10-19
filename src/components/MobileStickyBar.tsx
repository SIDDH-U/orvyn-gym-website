"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { siteConfig } from "@/config/site";

export function MobileStickyBar() {
  const { openModal } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero-cta");
      const finalCtaElement = document.getElementById("final-cta");
      const footerElement = document.getElementById("footer");

      const scrollY = window.scrollY;

      // Check if hero CTA or hero area is still visible
      let heroVisible = false;
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        heroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      } else {
        heroVisible = scrollY < 400;
      }

      // Check if final CTA or footer is in viewport
      let bottomVisible = false;
      if (finalCtaElement) {
        const rect = finalCtaElement.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          bottomVisible = true;
        }
      }
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
          bottomVisible = true;
        }
      }

      if (!heroVisible && !bottomVisible && scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/95 to-transparent pointer-events-none"
        >
          <div className="flex items-center gap-2.5 max-w-[420px] mx-auto pointer-events-auto">
            {/* Slimmer (48px) Join Now Button with soft glow */}
            <button
              onClick={() => openModal()}
              className="group flex-1 flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#E4FF1A] px-5 text-xs font-extrabold tracking-wider uppercase text-[#0B0C0E] shadow-[0_0_16px_rgba(228,255,26,0.22)] active:scale-[0.98] transition-all hover:bg-[#d4ef0e]"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Slimmer (48px) Round Call Button */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              aria-label={`Call ${siteConfig.name}`}
              className="flex h-12 w-12 min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#15171B] text-white shadow-md active:scale-95 transition-transform hover:border-[var(--color-accent,#E4FF1A)] hover:text-[var(--color-accent,#E4FF1A)]"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
