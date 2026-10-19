"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  ArrowUpRight,
  Target,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("Build Muscle & Strength");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const goalOptions = [
    "Build Muscle & Strength",
    "Fat Loss & Conditioning",
    "Olympic Lifting & Athletic Performance",
    "Functional Mobility & Injury Recovery",
    "1-on-1 Personal Training",
  ];

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

    const waText = `Hi ${siteConfig.name}! I am reaching out from the website contact page.\n\nName: ${name.trim()}\nPhone: ${phone.trim()}\nGoal: ${goal}${message ? `\nMessage: ${message.trim()}` : ""}`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-28 sm:pt-36 bg-[#0B0C0E]">
      
      {/* 1. SHORT HERO */}
      <section className="relative w-full pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4FF1A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4FF1A] uppercase">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
              CONNECT WITH <span className="text-[#E4FF1A]">ORVYN.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#A1A5AD] leading-relaxed">
              Stop by for a tour, ask a question, or talk to an expert coach about your training goals. We are ready when you are.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & INFO CARDS SECTION */}
      <section className="relative w-full pb-12 sm:pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Contact Form (Submits to WhatsApp) */}
            <div className="lg:col-span-7 rounded-[20px] border border-white/10 bg-[#15171B] p-6 sm:p-10 shadow-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                SEND US A MESSAGE
              </h2>
              <p className="mt-1 text-sm text-[#A1A5AD]">
                Submissions connect directly to our coaching desk on WhatsApp for instant replies.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name (20px left padding: px-5) */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (nameError) setNameError("");
                        }}
                        placeholder="e.g. Jordan Hayes"
                        className={`w-full rounded-xl border bg-black/40 px-5 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 ${
                          nameError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:border-[#E4FF1A] focus:ring-[#E4FF1A]/30"
                        }`}
                      />
                      {nameError && (
                        <p className="mt-1 text-xs text-red-400">{nameError}</p>
                      )}
                    </div>

                    {/* Phone (20px left padding: px-5) */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                        Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full rounded-xl border bg-black/40 px-5 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 ${
                          phoneError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:border-[#E4FF1A] focus:ring-[#E4FF1A]/30"
                        }`}
                      />
                      {phoneError && (
                        <p className="mt-1 text-xs text-red-400">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  {/* Goal Dropdown */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                      Primary Fitness Goal
                    </label>
                    <div className="relative">
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-sm text-white transition-colors focus:border-[#E4FF1A] focus:outline-none focus:ring-2 focus:ring-[#E4FF1A]/30 appearance-none cursor-pointer"
                      >
                        {goalOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#15171B] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <Target className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                      Message or Questions (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your training experience or questions..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#E4FF1A] focus:outline-none focus:ring-2 focus:ring-[#E4FF1A]/30 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#E4FF1A] px-8 py-3.5 text-sm font-extrabold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#d4ef0e] active:scale-[0.98] glow-yellow shadow-xl"
                  >
                    <span>SEND VIA WHATSAPP</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4FF1A]/20 text-[#E4FF1A]">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    MESSAGE READY!
                  </h3>
                  <p className="mt-2 text-sm text-[#A1A5AD] max-w-sm mx-auto">
                    Opening WhatsApp now to transmit your message directly to our desk staff...
                  </p>
                  <div className="mt-6">
                    <a
                      href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(`Hi ${siteConfig.name}! Name: ${name}, Phone: ${phone}, Goal: ${goal}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Open WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Hours Card + Address Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Hours Card */}
              <div className="rounded-[20px] border border-white/10 bg-[#15171B] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4FF1A]/10 text-[#E4FF1A]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                      OPERATING HOURS
                    </h3>
                    <p className="text-xs text-[#A1A5AD]">Open 365 days a year</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monday – Friday</span>
                    <span className="font-bold text-white">{siteConfig.hours.monFri}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Saturday</span>
                    <span className="font-bold text-white">{siteConfig.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sunday</span>
                    <span className="font-bold text-white">{siteConfig.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="rounded-[20px] border border-white/10 bg-[#15171B] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4FF1A]/10 text-[#E4FF1A]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                      FACILITY LOCATION
                    </h3>
                    <p className="text-xs text-[#A1A5AD]">Free member underground parking</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                  <p className="text-gray-200 leading-relaxed font-medium">
                    {siteConfig.address.full}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#A1A5AD]">
                    <Phone className="h-3.5 w-3.5 text-[#E4FF1A]" />
                    <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                      {siteConfig.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A1A5AD]">
                    <Mail className="h-3.5 w-3.5 text-[#E4FF1A]" />
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Big WhatsApp Quick Action Card */}
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(`Hi ${siteConfig.name}! I would like to learn more about gym memberships.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[20px] border border-[#25D366]/40 bg-gradient-to-r from-[#25D366]/20 to-[#15171B] p-6 shadow-xl transition-all duration-300 hover:border-[#25D366] hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25D366]">
                      QUICK RESPONSE
                    </span>
                    <h4 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                      CHAT ON WHATSAPP
                    </h4>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[#25D366] transition-transform group-hover:translate-x-1" />
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* 3. MAP PLACEHOLDER BLOCK WITH "OPEN IN MAPS" BUTTON */}
      <section className="relative w-full pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-[20px] overflow-hidden border border-white/10 bg-[#121418] shadow-2xl flex items-center justify-center">
            {/* Dark Styled Map Grid Graphics */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E4FF1A_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0C0E]/50 to-[#0B0C0E]/90 pointer-events-none" />

            {/* Stylized Street Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
              <path d="M0,100 L400,100 L600,250 L1200,250" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              <path d="M200,0 L200,420" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              <path d="M800,0 L800,420" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              <path d="M0,320 L1200,320" stroke="#E4FF1A" strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
            </svg>

            {/* Gym Location Pin & Beacon */}
            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-[#0B0C0E]/90 backdrop-blur-md rounded-[20px] border border-white/15 max-w-sm shadow-2xl">
              <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E4FF1A] text-[#0B0C0E] shadow-[0_0_20px_rgba(228,255,26,0.5)] animate-bounce">
                <MapPin className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                {siteConfig.name} HEADQUARTERS
              </h3>
              <p className="mt-1 text-xs text-[#A1A5AD]">
                {siteConfig.address.full}
              </p>

              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-[44px] items-center gap-2 rounded-full bg-[#E4FF1A] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0B0C0E] transition-all hover:bg-[#d4ef0e] active:scale-[0.98] glow-yellow-sm"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
