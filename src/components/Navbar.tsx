"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useModal } from "@/context/ModalContext";

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
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
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

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const lastScrollY = useRef(0);

  // Scroll Direction Listener: Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 30) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 90) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-Spy: Track which section is in view on Home page (Hero in view = NO active link)
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname === "/contact") setActiveSection("contact");
      else if (pathname === "/memberships") setActiveSection("plans");
      else setActiveSection("");
      return;
    }

    const sectionIds = ["about", "programs", "coaches", "plans", "reviews"];

    const handleScrollSpy = () => {
      const heroThreshold = window.innerHeight * 0.4;

      // When hero is in view (before #about has crossed 40% of viewport), NO nav link is active
      const firstSection = document.getElementById("about");
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > heroThreshold) {
          setActiveSection("");
          return;
        }
      } else if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      // Check sections from bottom to top
      // A section becomes active only when its top passes about 40% of the viewport height
      let currentSection = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= heroThreshold) {
            currentSection = id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle navigation click (smooth scroll on home, or route push from other pages)
  const handleNavClick = (
    e: React.MouseEvent,
    link: { href: string; targetId?: string; isExternalPage?: boolean }
  ) => {
    setMobileMenuOpen(false);

    if (link.isExternalPage) {
      // Direct page navigation
      return;
    }

    if (link.targetId) {
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(link.targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${link.targetId}`);
        }
      } else {
        // From other pages like /contact or /memberships -> go to /#targetId
        e.preventDefault();
        router.push(`/#${link.targetId}`);
      }
    }
  };

  const navLinks = siteConfig.navLinks;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-4 transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-28 pointer-events-none" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="flex w-full max-w-[1200px] items-center justify-between rounded-full border border-white/10 bg-[rgba(11,12,14,0.92)] py-2.5 px-4 sm:px-6 lg:px-7 shadow-2xl backdrop-blur-xl transition-all"
        >
          {/* Logo (Scrolls to top on Home, or goes to /) */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("");
              }
            }}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#E4FF1A] rounded-full px-2 py-1 shrink-0"
          >
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              {siteConfig.name}
            </span>
            <span className="h-2 w-2 rounded-full bg-[#E4FF1A] transition-transform group-hover:scale-125" />
          </Link>

          {/* Desktop Nav Links (Visible only on 1024px+ to avoid cramping) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive =
                (link.isExternalPage && pathname === link.href) ||
                (link.targetId && activeSection === link.targetId);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-1 text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-colors hover:text-[#E4FF1A] focus:outline-none focus:ring-1 focus:ring-[#E4FF1A] rounded ${
                    isActive ? "text-[#E4FF1A]" : "text-[#A1A5AD]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Sliding yellow underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E4FF1A] rounded-full shadow-[0_0_8px_rgba(228,255,26,0.6)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal()}
              className="group hidden sm:inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#E4FF1A] px-5 py-2 text-xs font-extrabold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#d4ef0e] active:scale-[0.98] glow-yellow-sm"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile/Tablet Hamburger (Switches below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E4FF1A]"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Menu Overlay (Links 01-06) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0B0C0E] px-6 py-8 text-white lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link
                href="/"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setActiveSection("");
                  }
                }}
                className="flex items-center gap-2"
              >
                <span className="font-display text-3xl font-extrabold tracking-tight text-white uppercase">
                  {siteConfig.name}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#E4FF1A]" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E4FF1A]"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Staggered Numbered Nav Links (01 to 06) */}
            <nav className="flex flex-col gap-4 sm:gap-5 py-6" aria-label="Mobile Navigation">
              {navLinks.map((link, idx) => {
                const num = String(idx + 1).padStart(2, "0");
                const isActive =
                  (link.isExternalPage && pathname === link.href) ||
                  (link.targetId && activeSection === link.targetId);

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="group flex items-baseline gap-4 py-1.5"
                    >
                      <span className="text-xs font-mono font-bold text-[#E4FF1A]">
                        {num}
                      </span>
                      <span
                        className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight uppercase transition-colors ${
                          isActive ? "text-[#E4FF1A]" : "text-white/85 group-hover:text-white"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions + Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="space-y-4 pt-5 border-t border-white/10"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="group flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#E4FF1A] py-3.5 text-sm font-extrabold tracking-wider uppercase text-[#0B0C0E] transition-all hover:bg-[#d4ef0e] glow-yellow active:scale-[0.98]"
              >
                <span>JOIN NOW — FREE PASS</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#A1A5AD] px-1">
                <span>{siteConfig.hours.monFri}</span>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-[#E4FF1A] hover:underline font-bold"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {/* Socials Row */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-[#E4FF1A]"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-[#E4FF1A]"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-[#E4FF1A]"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-black"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
