"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Phone, User, MessageSquare } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { siteConfig } from "@/config/site";

export function FreePassModal() {
  const { isOpen, closeModal, selectedPlan } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      // Reset state on close
      setIsSubmitted(false);
      setName("");
      setPhone("");
      setNameError("");
      setPhoneError("");
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  const validate = () => {
    let valid = true;
    if (!name.trim() || name.trim().length < 2) {
      setNameError("Please enter your full name");
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

    const message = `Hi ${siteConfig.name}! I would like to claim my Free Pass (${selectedPlan}).\n\nName: ${name.trim()}\nPhone: ${phone.trim()}`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp after brief moment so user sees the confirmation state
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-[20px] border border-white/10 bg-[#15171B] p-6 sm:p-8 text-white shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E4FF1A]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-[#E4FF1A]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#E4FF1A] uppercase mb-2">
                    {selectedPlan || "VIP DAY PASS"}
                  </span>
                  <h2
                    id="modal-title"
                    className="font-display text-3xl font-extrabold uppercase tracking-tight text-white leading-none"
                  >
                    CLAIM YOUR FREE PASS
                  </h2>
                  <p className="mt-2 text-sm text-[#A1A5AD]">
                    Experience our facility, test the equipment, and meet the coaches with zero obligation.
                  </p>
                </div>

                {/* Form with 20px left padding, no empty icon gap */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                      Full Name
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      placeholder="e.g. Alex Hunter"
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

                  <div>
                    <label className="mb-1 block text-xs font-semibold tracking-wider text-[#A1A5AD] uppercase">
                      Phone Number (WhatsApp)
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#E4FF1A] px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#d6f20d] active:scale-[0.98] glow-yellow-sm mt-2"
                  >
                    <span>CLAIM FREE PASS</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-[11px] text-[#A1A5AD]">
                    Pass sends instantly via WhatsApp. No spam, ever.
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4FF1A]/20 text-[#E4FF1A]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  YOU&apos;RE ON THE LIST!
                </h3>
                <p className="mt-2 text-sm text-[#A1A5AD]">
                  Opening WhatsApp to connect with our team and activate your pass immediately...
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(`Hi ${siteConfig.name}! I would like to claim my Free Pass (${selectedPlan}).\n\nName: ${name}\nPhone: ${phone}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Open WhatsApp Directly</span>
                  </a>

                  <button
                    onClick={closeModal}
                    className="rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
