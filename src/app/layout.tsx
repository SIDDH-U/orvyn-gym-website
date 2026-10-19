import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FreePassModal } from "@/components/FreePassModal";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

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
  title: "ORVYN | Elite Training Facility & Performance Gym",
  description:
    "Train harder. Live stronger. Join ORVYN — the premier strength, conditioning, and functional fitness gym with world-class coaching, precision equipment, and a dedicated community.",
  keywords: [
    "ORVYN gym",
    "premium fitness club",
    "strength and conditioning",
    "personal training",
    "powerlifting",
    "functional classes",
  ],
  authors: [{ name: "ORVYN Fitness" }],
  openGraph: {
    title: "ORVYN | Elite Training Facility & Performance Gym",
    description: "Train harder. Live stronger. Claim your free VIP day pass.",
    type: "website",
    locale: "en_US",
    siteName: "ORVYN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="relative min-h-screen bg-[#0B0C0E] text-white font-sans overflow-x-hidden selection:bg-[#E4FF1A] selection:text-[#0B0C0E]">
        {/* Fixed 2px Yellow Scroll Progress Bar at very top */}
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
          <FreePassModal />

          {/* Mobile-Only Sticky Floating Action Bar */}
          <MobileStickyBar />
        </ModalProvider>
      </body>
    </html>
  );
}
