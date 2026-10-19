import { gymConfig, GymConfig } from "./gym.config";
import {
  specialtyConfig,
  SpecialtyConfig,
  Plan,
  Program,
  Coach,
  Review,
  FAQ,
  ComparisonFeature,
  GalleryItem,
} from "./specialty.gym.config";
import { themes, ThemeTokens } from "./themes";

export type {
  GymConfig,
  SpecialtyConfig,
  Plan,
  Program,
  Coach,
  Review,
  FAQ,
  ComparisonFeature,
  GalleryItem,
  ThemeTokens,
};

export interface StatItem {
  value: string;
  label: string;
  caption: string;
  numeric?: number;
  suffix?: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  targetId?: string;
  isExternalPage?: boolean;
}

/**
 * Build dynamic navigation links matching enabled homepage sections
 */
function buildNavLinks(sections: GymConfig["sections"]): NavLinkItem[] {
  const links: NavLinkItem[] = [];

  if (sections.showAbout) {
    links.push({ label: "ABOUT", href: "#about", targetId: "about" });
  }
  if (sections.showPrograms) {
    links.push({ label: "PROGRAMS", href: "#programs", targetId: "programs" });
  }
  if (sections.showCoaches) {
    links.push({ label: "COACHES", href: "#coaches", targetId: "coaches" });
  }
  if (sections.showMemberships) {
    links.push({ label: "MEMBERSHIPS", href: "#plans", targetId: "plans" });
  }
  if (sections.showReviews) {
    links.push({ label: "REVIEWS", href: "#reviews", targetId: "reviews" });
  }

  // Contact page is always linked
  links.push({ label: "CONTACT", href: "/contact", isExternalPage: true });

  return links;
}

/**
 * Build array of enabled stats for the StatsStrip and Hero display
 */
function buildStatsArray(stats: GymConfig["stats"]): StatItem[] {
  const result: StatItem[] = [];

  if (stats.coaches?.show !== false && stats.coaches) {
    result.push({
      value: stats.coaches.value,
      label: stats.coaches.label,
      caption: stats.coaches.caption || "Certified elite specialists",
      numeric: stats.coaches.numeric,
      suffix: stats.coaches.suffix,
    });
  }

  if (stats.openDaily?.show !== false && stats.openDaily) {
    result.push({
      value: stats.openDaily.value,
      label: stats.openDaily.label,
      caption: stats.openDaily.caption || "Train on your schedule, 7 days",
    });
  }

  if (stats.machines?.show !== false && stats.machines) {
    result.push({
      value: stats.machines.value,
      label: stats.machines.label,
      caption: stats.machines.caption || "Precision selectorized & free weights",
      numeric: stats.machines.numeric,
      suffix: stats.machines.suffix,
    });
  }

  if (stats.members?.show && stats.members) {
    result.push({
      value: stats.members.value,
      label: stats.members.label,
      caption: stats.members.caption || "Dedicated active athletes",
      numeric: stats.members.numeric,
      suffix: stats.members.suffix,
    });
  }

  return result;
}

const activeTheme: ThemeTokens = themes[gymConfig.theme] || themes.volt;

export const siteConfig = {
  // Gym identity
  name: gymConfig.name,
  shortName: gymConfig.shortName,
  tagline: gymConfig.tagline,
  subline: gymConfig.heroSubtext,
  slug: gymConfig.slug,
  logoImage: gymConfig.logoImage,
  logoSubtitle: gymConfig.logoSubtitle || "FITNESS CLUB",

  // Hero composition
  heroBadge: gymConfig.heroBadge,
  heroHeadline: gymConfig.heroHeadline,
  heroSubtext: gymConfig.heroSubtext,
  hero: {
    video: "",
    heroFocus: {
      desktop: "center 30%",
      mobile: "top center",
    },
    effects: {
      chalk: true,
      sweep: true,
    },
  },

  // Communications & contact
  phone: gymConfig.phone,
  phoneRaw: gymConfig.phoneRaw,
  whatsAppNumber: gymConfig.whatsappNumber,
  email: gymConfig.email,
  domain: gymConfig.domain,

  // Location
  address: {
    street: gymConfig.address,
    city: gymConfig.city,
    area: gymConfig.area,
    pincode: gymConfig.pincode,
    state: gymConfig.state,
    full: `${gymConfig.address}, ${gymConfig.city}, ${gymConfig.state} ${gymConfig.pincode}`,
    mapsUrl: gymConfig.mapsLink,
    embedMapUrl: gymConfig.embedMapUrl,
  },

  // Operating Hours
  hours: {
    weekday: gymConfig.hours.weekday,
    weekend: gymConfig.hours.weekend,
    saturday: gymConfig.hours.saturday || gymConfig.hours.weekday,
    sunday: gymConfig.hours.sunday || gymConfig.hours.weekend,
    monFri: gymConfig.hours.weekday,
  },

  // Socials
  socials: [
    ...(gymConfig.socials?.instagram ? [{ name: "Instagram", url: gymConfig.socials.instagram }] : []),
    ...(gymConfig.socials?.youtube ? [{ name: "YouTube", url: gymConfig.socials.youtube }] : []),
    ...(gymConfig.socials?.facebook ? [{ name: "Facebook", url: gymConfig.socials.facebook }] : []),
  ],

  // Coaching & staff
  headCoach: gymConfig.headCoach,
  coaches: specialtyConfig.coaches,

  // Specialty & discipline features
  specialtyName: specialtyConfig.specialtyName,
  marqueeText: specialtyConfig.marqueeText,
  programs: specialtyConfig.programs,
  plans: specialtyConfig.plans,
  comparisonFeatures: specialtyConfig.comparisonFeatures,
  reviewsSummary: specialtyConfig.reviewsSummary,
  reviews: specialtyConfig.reviews,
  faqs: specialtyConfig.faqs,
  gallery: specialtyConfig.gallery,
  whyUs: specialtyConfig.whyUs,
  howItWorks: specialtyConfig.howItWorks,
  images: specialtyConfig.images,

  // Stats
  rawStats: gymConfig.stats,
  stats: buildStatsArray(gymConfig.stats),

  // Dynamic Navigation & Section Flags
  sections: gymConfig.sections,
  navLinks: buildNavLinks(gymConfig.sections),
  sampleMode: gymConfig.sampleMode,

  // Theme configuration
  theme: gymConfig.theme,
  themeTokens: activeTheme,

  // Direct configs
  gym: gymConfig,
  specialty: specialtyConfig,
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
