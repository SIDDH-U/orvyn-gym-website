"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, Clock, Dumbbell } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const icons = [
    <Users key="users" className="h-5 w-5 text-[#E4FF1A] stroke-[1.5]" />,
    <Clock key="clock" className="h-5 w-5 text-[#E4FF1A] stroke-[1.5]" />,
    <Dumbbell key="dumbbell" className="h-5 w-5 text-[#E4FF1A] stroke-[1.5]" />,
  ];

  return (
    <section className="relative w-full py-6 md:py-10 bg-[#0B0C0E]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[20px] border border-white/10 bg-[#15171B] p-4 sm:p-6 shadow-xl"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-6 first:pl-0 last:pr-0"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-4">
                  {/* Icon (hidden on smallest screens to keep mobile extremely clean) */}
                  <div className="hidden xs:flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-[#E4FF1A]/20 bg-[#E4FF1A]/10">
                    {icons[idx]}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-none">
                      {stat.numeric ? (
                        <CountUp target={stat.numeric} suffix={stat.suffix} />
                      ) : (
                        stat.value
                      )}
                    </h3>
                    {/* Mobile: number + label only */}
                    <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                      {stat.label}
                    </p>
                    {/* Desktop only caption */}
                    <p className="mt-0.5 hidden md:block text-xs text-[#A1A5AD] leading-relaxed">
                      {stat.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
