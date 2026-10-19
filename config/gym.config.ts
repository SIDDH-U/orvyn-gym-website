import { ThemeName } from "./themes";

export interface GymConfig {
  // Brand identity
  name: string;
  shortName: string;
  tagline: string;
  slug: string;
  logoImage?: string; // Optional path to custom logo image, otherwise auto-text logo is generated
  logoSubtitle?: string; // Optional subtitle rendered under/with auto logo

  // Hero section text composition
  heroBadge: string;
  heroHeadline: {
    line1: string; // Top line (white on desktop & mobile)
    line2: string; // Bottom line (accent neon lime on desktop & mobile)
  };
  heroSubtext: string;

  // Contact & communications
  phone: string; // Display format, e.g. "+1 (555) 389-2044"
  phoneRaw: string; // Raw digits with country code for tel:, e.g. "+15553892044"
  whatsappNumber: string; // Digits only, used for all wa.me links, e.g. "15553892044"
  email: string;
  domain: string; // Canonical URL, e.g. "https://orvynfitness.com"

  // Location & mapping
  address: string;
  city: string;
  area: string;
  pincode: string;
  state: string;
  mapsLink: string;
  embedMapUrl?: string; // Optional iframe map URL

  // Operating hours
  hours: {
    weekday: string;
    weekend: string;
    saturday?: string;
    sunday?: string;
  };

  // Social media profiles (optional)
  socials?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };

  // Head coach overview
  headCoach?: {
    name: string;
    title: string;
    yearsExperience: number | string;
  };

  // Numerical & badge stats (overridable or hideable)
  stats: {
    coaches?: { value: string; label: string; caption?: string; show?: boolean; numeric?: number; suffix?: string };
    openDaily?: { value: string; label: string; caption?: string; show?: boolean };
    machines?: { value: string; label: string; caption?: string; show?: boolean; numeric?: number; suffix?: string };
    members?: { value: string; label: string; caption?: string; show?: boolean; numeric?: number; suffix?: string };
    yearsRunning?: { value: string; label: string; caption?: string; show?: boolean; numeric?: number; suffix?: string };
    rating?: { value: string; label: string; caption?: string; show?: boolean };
    reviewCount?: { value: string; label: string; caption?: string; show?: boolean; numeric?: number; suffix?: string };
  };

  // Active theme preset ("volt" | "ember" | "crimson" | "ice")
  theme: ThemeName;

  // Granular section display toggles
  sections: {
    showStats: boolean;
    showAbout: boolean;
    showMarquee: boolean;
    showPrograms: boolean;
    showCoaches: boolean;
    showMemberships: boolean;
    showReviews: boolean;
    showFinalCta: boolean;
    showMap: boolean;
    showFaq: boolean;
    showGallery: boolean;
    showJoinPopup: boolean;
    showStickyBar: boolean;
  };

  // Sample mode toggle: when true, sample badges appear on coaches, reviews, stats
  sampleMode: boolean;
}

/**
 * =========================================================================
 * GYM CONFIGURATION (THE ONLY FILE EDITED PER GYM)
 * =========================================================================
 */
export const gymConfig: GymConfig = {
  name: "ORVYN",
  shortName: "ORVYN",
  tagline: "TRAIN HARDER. LIVE STRONGER.",
  slug: "orvyn-gym",
  logoSubtitle: "FITNESS CLUB",
  // logoImage: "/images/gym/logo.png", // Uncomment to use custom logo image

  heroBadge: "DISCIPLINE BUILDS FREEDOM",
  heroHeadline: {
    line1: "TRAIN HARDER.",
    line2: "LIVE STRONGER.",
  },
  heroSubtext: "A premium gym for people who want more from themselves.",

  phone: "+1 (555) 389-2044",
  phoneRaw: "+15553892044",
  whatsappNumber: "15553892044",
  email: "hello@orvynfitness.com",
  domain: "https://orvynfitness.com",

  address: "742 Evergreen Blvd, Suite 100",
  city: "Los Angeles",
  area: "Downtown",
  pincode: "90028",
  state: "CA",
  mapsLink: "https://maps.google.com/?q=ORVYN+Fitness+Los+Angeles",
  embedMapUrl: "",

  hours: {
    weekday: "5:00 AM – 11:00 PM",
    weekend: "5:00 AM – 9:00 PM",
    saturday: "5:00 AM – 11:00 PM",
    sunday: "5:00 AM – 9:00 PM",
  },

  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },

  headCoach: {
    name: "Alex Vance",
    title: "Head of Strength & Olympic Lifting",
    yearsExperience: 10,
  },

  stats: {
    coaches: {
      value: "12+",
      numeric: 12,
      suffix: "+",
      label: "Coaches",
      caption: "Certified elite specialists",
      show: true,
    },
    openDaily: {
      value: "5AM–11PM",
      label: "Open Daily",
      caption: "Train on your schedule, 7 days",
      show: true,
    },
    machines: {
      value: "60+",
      numeric: 60,
      suffix: "+",
      label: "Machines",
      caption: "Precision selectorized & free weights",
      show: true,
    },
    members: {
      value: "850+",
      numeric: 850,
      suffix: "+",
      label: "Active Members",
      caption: "Dedicated community of athletes",
      show: true,
    },
    yearsRunning: {
      value: "8+",
      numeric: 8,
      suffix: "+",
      label: "Years Strong",
      caption: "Transforming lives since 2018",
      show: true,
    },
    rating: {
      value: "4.9",
      label: "Average Rating",
      caption: "From 300+ verified member reviews",
      show: true,
    },
    reviewCount: {
      value: "300+",
      numeric: 300,
      suffix: "+",
      label: "Member Reviews",
      caption: "Rated 5-stars across platforms",
      show: true,
    },
  },

  theme: "volt",

  sections: {
    showStats: true,
    showAbout: true,
    showMarquee: true,
    showPrograms: true,
    showCoaches: true,
    showMemberships: true,
    showReviews: true,
    showFinalCta: true,
    showMap: true,
    showFaq: true,
    showGallery: false,
    showJoinPopup: true,
    showStickyBar: true,
  },

  sampleMode: true,
};

export default gymConfig;
