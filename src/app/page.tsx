import { HeroSection } from "@/components/home/HeroSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AboutSection } from "@/components/home/AboutSection";
import { MarqueeDivider } from "@/components/home/MarqueeDivider";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { CoachesSection } from "@/components/home/CoachesSection";
import { MembershipsSection } from "@/components/home/MembershipsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. STATS STRIP */}
      <StatsStrip />

      {/* 3. ABOUT / COMMUNITY (#about) */}
      <AboutSection />

      {/* 4. MARQUEE DIVIDER */}
      <MarqueeDivider />

      {/* 5. PROGRAMS (#programs) */}
      <ProgramsSection />

      {/* 6. COACHES (#coaches) */}
      <CoachesSection />

      {/* 7. MEMBERSHIPS (#plans) */}
      <MembershipsSection />

      {/* 8. REVIEWS (#reviews - replaces before/after slider) */}
      <ReviewsSection />

      {/* 9. FINAL CTA (#join) */}
      <FinalCtaSection />
    </div>
  );
}
