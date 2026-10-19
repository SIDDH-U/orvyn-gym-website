"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1 1.4-1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.5C9.35 7.5 9.06 7.57 8.81 7.84C8.56 8.11 7.85 8.77 7.85 10.13C7.85 11.49 8.84 12.8 8.98 12.98C9.11 13.17 10.92 15.96 13.7 17.16C16.02 18.16 16.49 17.96 16.99 17.91C17.48 17.87 18.59 17.26 18.82 16.62C19.05 15.99 19.05 15.44 18.98 15.33C18.91 15.22 18.73 15.15 18.45 15.01C18.17 14.88 16.81 14.21 16.55 14.12C16.3 14.03 16.12 13.99 15.94 14.26C15.76 14.53 15.24 15.15 15.08 15.33C14.93 15.51 14.77 15.53 14.5 15.4C14.22 15.26 13.33 14.97 12.28 14.03C11.46 13.3 10.9 12.4 10.76 12.15C10.62 11.91 10.74 11.77 10.88 11.63C11 11.5 11.16 11.29 11.3 11.13C11.44 10.97 11.49 10.86 11.58 10.68C11.67 10.5 11.63 10.34 11.56 10.2C11.49 10.07 10.95 8.75 10.72 8.21C10.5 7.68 10.28 7.75 10.11 7.74C9.96 7.74 9.77 7.73 9.59 7.73L9.53 7.5Z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = 2026;

  return (
    <footer id="footer" className="relative border-t border-white/10 bg-[#0B0C0E] text-[#A1A5AD] pt-12 pb-24 md:pb-14">
      {/* Strict container aligned with rest of site */}
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 pb-10 border-b border-white/5">
          {/* Col 1: Brand & Socials */}
          <div className="col-span-2 md:col-span-1 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="font-display text-3xl font-extrabold tracking-tight text-white uppercase">
                {siteConfig.name}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#E4FF1A]" />
            </Link>
            <p className="text-xs text-[#A1A5AD] leading-relaxed max-w-sm">
              A premium gym for people who want more from themselves. Train harder. Live stronger.
            </p>

            {/* Social Icons with real WhatsApp in accent color */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[#E4FF1A] hover:text-[#E4FF1A]"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[#E4FF1A] hover:text-[#E4FF1A]"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[#E4FF1A] hover:text-[#E4FF1A]"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4FF1A]/30 bg-[#E4FF1A]/10 text-[#E4FF1A] transition-colors hover:bg-[#E4FF1A] hover:text-[#0B0C0E]"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Matches Nav + Compare Plans) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <Link href="/#about" className="hover:text-[#E4FF1A] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#E4FF1A] transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/#coaches" className="hover:text-[#E4FF1A] transition-colors">
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="/#plans" className="hover:text-[#E4FF1A] transition-colors">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#E4FF1A] transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E4FF1A] transition-colors">
                  Contact
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/memberships" className="text-[#E4FF1A] hover:underline font-semibold flex items-center gap-1">
                  <span>Compare plans</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours (One line per day, no wrapping) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center whitespace-nowrap gap-3">
                <span className="text-gray-400">Mon – Fri</span>
                <span className="text-white font-bold">{siteConfig.hours.monFri}</span>
              </div>
              <div className="flex justify-between items-center whitespace-nowrap gap-3">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white font-bold">{siteConfig.hours.saturday}</span>
              </div>
              <div className="flex justify-between items-center whitespace-nowrap gap-3">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white font-bold">{siteConfig.hours.sunday}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Get In Touch
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 text-white hover:text-[#E4FF1A] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#E4FF1A]" />
                <span>{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-[#E4FF1A] transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#E4FF1A]" />
                <span className="truncate">{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-2 pt-0.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E4FF1A] mt-0.5" />
                <span className="text-xs text-gray-300">{siteConfig.address.full}</span>
              </div>
              <div className="pt-1.5">
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E4FF1A] hover:underline"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-gray-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
