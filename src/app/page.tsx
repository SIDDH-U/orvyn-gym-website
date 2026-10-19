import { HeroSection } from "@/components/home/HeroSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AboutSection } from "@/components/home/AboutSection";
import { MarqueeDivider } from "@/components/home/MarqueeDivider";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { CoachesSection } from "@/components/home/CoachesSection";
import { MembershipsSection } from "@/components/home/MembershipsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const { sections } = siteConfig;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO (Always displayed) */}
      <HeroSection />

      {/* 2. STATS STRIP */}
      {sections.showStats && <StatsStrip />}

      {/* 3. ABOUT / COMMUNITY (#about) */}
      {sections.showAbout && <AboutSection />}

      {/* 4. MARQUEE DIVIDER */}
      {sections.showMarquee && <MarqueeDivider />}

      {/* 5. PROGRAMS (#programs) */}
      {sections.showPrograms && <ProgramsSection />}

      {/* 6. COACHES (#coaches) */}
      {sections.showCoaches && <CoachesSection />}

      {/* 7. MEMBERSHIPS (#plans) */}
      {sections.showMemberships && <MembershipsSection />}

      {/* 8. REVIEWS (#reviews) */}
      {sections.showReviews && <ReviewsSection />}

      {/* 9. FINAL CTA (#join) */}
      {sections.showFinalCta && <FinalCtaSection />}
    </div>
  );
}
