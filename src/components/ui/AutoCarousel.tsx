"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

interface AutoCarouselProps {
  children: React.ReactNode[];
  autoplayInterval?: number; // ms, e.g. 3500
  cardWidthClass?: string; // e.g. "w-[80vw] max-w-[320px]"
  gapClass?: string; // default "gap-3" (12px)
  className?: string;
  ariaLabel?: string;
  showDesktopArrows?: boolean;
}

export function AutoCarousel({
  children,
  autoplayInterval = 3500,
  cardWidthClass = "w-[80vw] max-w-[320px]",
  gapClass = "gap-3",
  className = "",
  ariaLabel = "Carousel",
  showDesktopArrows = true,
}: AutoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalItems = React.Children.count(children);
  const shouldReduceMotion = useReducedMotion();

  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInViewRef = useRef(true);

  // Sync scroll with activeIndex
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".carousel-item");
    if (!cards.length) return;

    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToCard = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>(".carousel-item");
      if (!cards[index]) return;

      const card = cards[index];
      const scrollLeft =
        card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;

      el.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      setActiveIndex(index);
      setProgress(0);
    },
    []
  );

  const nextCard = useCallback(() => {
    const nextIdx = (activeIndex + 1) % totalItems;
    scrollToCard(nextIdx);
  }, [activeIndex, totalItems, scrollToCard]);

  const prevCard = useCallback(() => {
    const prevIdx = (activeIndex - 1 + totalItems) % totalItems;
    scrollToCard(prevIdx);
  }, [activeIndex, totalItems, scrollToCard]);

  // Pause on user interaction and resume 4s after last interaction
  const triggerUserInteraction = useCallback(() => {
    isInteractingRef.current = true;
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsPaused(false);
    }, 4000);
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else if (!isInteractingRef.current) {
          setIsPaused(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Page visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsPaused(true);
      } else if (!isInteractingRef.current && isInViewRef.current) {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Autoplay timer with progress update
  useEffect(() => {
    if (shouldReduceMotion || isPaused || totalItems <= 1) {
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / autoplayInterval) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextCard();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPaused, autoplayInterval, totalItems, nextCard]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      triggerUserInteraction();
      prevCard();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      triggerUserInteraction();
      nextCard();
    }
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!isInteractingRef.current) setIsPaused(false);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => {
        if (!isInteractingRef.current) setIsPaused(false);
      }}
      aria-label={ariaLabel}
      role="region"
    >
      {/* Scrollable Container with snap-x mandatory */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={triggerUserInteraction}
        onMouseDown={triggerUserInteraction}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ overscrollBehaviorX: "contain" }}
        className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar ${gapClass} pb-4 pt-1 focus:outline-none`}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={`carousel-item flex-none snap-center ${cardWidthClass}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Controls: Dots + Desktop Arrows */}
      <div className="mt-5 flex items-center justify-between">
        {/* Pagination Dots with Autoplay Progress Bar on Active Pill */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalItems }).map((_, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  triggerUserInteraction();
                  scrollToCard(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                  isActive ? "w-8 bg-white/20" : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 bg-[var(--color-accent,#E4FF1A)] rounded-full transition-all duration-75"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Arrow Controls */}
        {showDesktopArrows && totalItems > 1 && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                triggerUserInteraction();
                prevCard();
              }}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[var(--color-accent,#E4FF1A)] hover:text-[var(--color-accent,#E4FF1A)] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                triggerUserInteraction();
                nextCard();
              }}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[var(--color-accent,#E4FF1A)] hover:text-[var(--color-accent,#E4FF1A)] active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
