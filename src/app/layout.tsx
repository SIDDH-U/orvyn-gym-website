import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FreePassModal } from "@/components/FreePassModal";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { siteConfig } from "@/config/site";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Elite Training Facility & Performance Gym in ${siteConfig.address.city}`,
  description: `${siteConfig.tagline} Join ${siteConfig.name} — the premier strength, conditioning, and functional fitness gym in ${siteConfig.address.city} with world-class coaching, precision equipment, and a dedicated community.`,
  keywords: [
    `${siteConfig.name} gym`,
    `gym in ${siteConfig.address.city}`,
    "premium fitness club",
    "strength and conditioning",
    "personal training",
    "powerlifting",
    "functional classes",
  ],
  authors: [{ name: `${siteConfig.name} Fitness` }],
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Elite Training Facility & Performance Gym in ${siteConfig.address.city}`,
    description: `${siteConfig.tagline} Claim your free VIP day pass.`,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: siteConfig.domain,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeTokens.background,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: siteConfig.name,
    description: `${siteConfig.tagline} - Gym in ${siteConfig.address.city}, ${siteConfig.address.state}`,
    image: `${siteConfig.domain}${siteConfig.images.heroDesktop}`,
    url: siteConfig.domain,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "05:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "05:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <html
      lang="en"
      data-theme={siteConfig.theme}
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-[var(--color-background,#0B0C0E)] text-white font-sans overflow-x-hidden selection:bg-[var(--color-accent,#E4FF1A)] selection:text-[var(--color-cta-text,#0B0C0E)]">
        {/* Fixed Scroll Progress Bar at very top */}
        <ScrollProgressBar />

        {/* Subtle Film Grain Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        <ModalProvider>
          {/* Global Floating Pill Navigation */}
          <Navbar />

          {/* Page Content with bottom padding on mobile for sticky bar */}
          <main className="flex-1 w-full pb-20 md:pb-0">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Global Free Pass Modal */}
          {siteConfig.sections.showJoinPopup && <FreePassModal />}

          {/* Mobile-Only Sticky Floating Action Bar */}
          {siteConfig.sections.showStickyBar && <MobileStickyBar />}
        </ModalProvider>
      </body>
    </html>
  );
}
