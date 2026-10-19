"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Photo } from "@/components/ui/Photo";

export function FinalCtaSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let valid = true;
    if (!name.trim() || name.trim().length < 2) {
      setNameError("Please enter your name");
      valid = false;
    } else {
      setNameError("");
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 7) {
      setPhoneError("Please enter a valid phone number");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);

    const message = `Hi ${siteConfig.name}! I would like to claim my Free Pass via the website.\n\nName: ${name.trim()}\nPhone: ${phone.trim()}`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <section
      id="join"
      className="relative w-full overflow-hidden py-10 md:py-16 bg-[#0B0C0E] scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Anchor for sticky bar intersection observer */}
      <div id="final-cta" className="absolute top-0 left-0 h-1 w-1 pointer-events-none" />

      {/* Full-bleed background photo: cta-group.jpg clearly visible */}
      <div className="absolute inset-0 z-0">
        <Photo
          src={siteConfig.images.ctaGroup}
          alt={`${siteConfig.name} Athletes Community`}
          fill
          sizes="100vw"
          className="opacity-75 object-cover object-center"
        />

        {/* Dark gradient ONLY behind text side (left side on desktop, bottom/left on mobile) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/85 via-50% to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/90 via-60% to-transparent block md:hidden" />
      </div>

      {/* Strict Container (1200px max width sharing edges) */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent,#E4FF1A)]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--color-accent,#E4FF1A)] uppercase">
              BUILT TOGETHER
            </span>
          </div>

          {/* Headline (second line accent) */}
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.92]">
            FIND YOUR <span className="text-[var(--color-headline-accent,#E4FF1A)]">PEOPLE.</span>
          </h2>

          {/* Short Line */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-lg">
            Train. Motivate. Grow. Be part of a community that shows up every single day.
          </p>

          {/* Form or Success State */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Name Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    placeholder="Your Name"
                    className={`w-full h-12 rounded-full border bg-[#15171B]/95 px-5 text-sm text-white placeholder-gray-400 backdrop-blur-md transition-colors focus:outline-none focus:ring-2 ${
                      nameError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:border-[var(--color-accent,#E4FF1A)] focus:ring-[var(--color-accent,#E4FF1A)]/30"
                    }`}
                  />
                  {nameError && (
                    <p className="absolute -bottom-5 left-5 text-[11px] text-red-400">
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="flex-1 relative mt-2 sm:mt-0">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    placeholder="Phone Number"
                    className={`w-full h-12 rounded-full border bg-[#15171B]/95 px-5 text-sm text-white placeholder-gray-400 backdrop-blur-md transition-colors focus:outline-none focus:ring-2 ${
                      phoneError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:border-[var(--color-accent,#E4FF1A)] focus:ring-[var(--color-accent,#E4FF1A)]/30"
                    }`}
                  />
                  {phoneError && (
                    <p className="absolute -bottom-5 left-5 text-[11px] text-red-400">
                      {phoneError}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  className="group flex min-h-[48px] h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-cta,#E4FF1A)] px-6 sm:px-8 text-sm font-extrabold tracking-wider uppercase text-[var(--color-cta-text,#0B0C0E)] transition-all hover:brightness-105 active:scale-[0.98] glow-yellow shadow-xl mt-2 sm:mt-0"
                >
                  <span>CLAIM FREE PASS</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <p className="mt-3 text-xs text-[#A1A5AD]">
                Instant pass confirmation delivered via WhatsApp. No card required.
              </p>
            </form>
          ) : (
            /* Success confirmation */
            <div className="mt-6 sm:mt-8 rounded-[20px] border border-[var(--color-accent,#E4FF1A)]/30 bg-[#15171B]/95 p-5 sm:p-6 backdrop-blur-md max-w-lg">
              <div className="flex items-center gap-3 text-[var(--color-accent,#E4FF1A)]">
                <CheckCircle className="h-6 w-6 shrink-0" />
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Pass Requested Successfully!
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#A1A5AD]">
                Connecting you directly with the team on WhatsApp to confirm your visit time.
              </p>
              <div className="mt-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(`Hi ${siteConfig.name}! I claimed my Free Pass.\n\nName: ${name}\nPhone: ${phone}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-xs font-bold text-white uppercase tracking-wider"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Open WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
