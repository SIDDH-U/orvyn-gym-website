export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number; // monthly equivalent when billed annually (-20%)
  period: string;
  description: string;
  popular: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface Coach {
  id: string;
  name: string;
  initials: string;
  speciality: string;
  certification: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  since: string;
  quote: string;
  result: string;
  rating: number;
  photo: string;
  initials: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category?: string;
}

export interface SpecialtyConfig {
  specialtyName: string; // e.g. "Strength & Performance", "CrossFit", "Yoga", "Boxing"
  heroHeadlineDefault: {
    line1: string;
    line2: string;
  };
  marqueeText: string;
  programs: Program[];
  coaches: Coach[];
  plans: Plan[];
  comparisonFeatures: ComparisonFeature[];
  reviewsSummary: string;
  reviews: Review[];
  faqs: FAQ[];
  gallery: GalleryItem[];
  whyUs: Array<{ title: string; description: string; icon?: string }>;
  howItWorks: Array<{ step: string; title: string; description: string }>;
  images: {
    heroDesktop: string;
    heroMobile: string;
    aboutCommunity: string;
    ctaGroup: string;
  };
}

/**
 * =========================================================================
 * SPECIALTY CONFIGURATION
 * Separates training disciplines, coach rosters, pricing tiers, FAQs and reviews
 * from the individual gym location settings.
 * =========================================================================
 */
export const specialtyConfig: SpecialtyConfig = {
  specialtyName: "Strength & Performance",
  heroHeadlineDefault: {
    line1: "TRAIN HARDER.",
    line2: "LIVE STRONGER.",
  },
  marqueeText: "STRENGTH ★ COMMUNITY ★ RESULTS ★ DISCIPLINE ★ LONGEVITY ★",

  // Core photography paths
  images: {
    heroDesktop: "/images/hero-desktop.jpg",
    heroMobile: "/images/hero-mobile.jpg",
    aboutCommunity: "/images/about-community.jpg",
    ctaGroup: "/images/cta-group.jpg",
  },

  programs: [
    {
      id: "strength",
      title: "Strength & Power",
      tag: "STRENGTH",
      description: "Elite power racks, calibrated steel plates, and Olympic bars for progressive overload.",
      image: "/images/program-strength.jpg",
    },
    {
      id: "cardio",
      title: "Endurance & Conditioning",
      tag: "CARDIO",
      description: "Woodway curve treadmills, assault bikes, and Concept2 rowers for peak metabolic output.",
      image: "/images/program-cardio.jpg",
    },
    {
      id: "classes",
      title: "Group Classes",
      tag: "CLASSES",
      description: "High-cadence team training sessions blending athletic power, agility, and stamina.",
      image: "/images/program-classes.jpg",
    },
    {
      id: "pt",
      title: "Personal Training",
      tag: "1-ON-1",
      description: "Periodized programming, movement screenings, and bespoke 1-on-1 performance coaching.",
      image: "/images/program-pt.jpg",
    },
  ],

  coaches: [
    {
      id: "coach-1",
      name: "Alex Vance",
      initials: "AV",
      speciality: "Head Strength & Olympic Lifting",
      certification: "CSCS • USAW Level 2 • 10+ Yrs Exp",
      image: "/images/coach-1.jpg",
    },
    {
      id: "coach-2",
      name: "Elena Stone",
      initials: "ES",
      speciality: "HIIT & Athletic Conditioning",
      certification: "Ex-Olympic Athlete • EXOS Coach",
      image: "/images/coach-2.jpg",
    },
    {
      id: "coach-3",
      name: "David Reed",
      initials: "DR",
      speciality: "Mobility & Functional Longevity",
      certification: "Doctor of Physical Therapy • FMS II",
      image: "/images/coach-3.jpg",
    },
    {
      id: "coach-4",
      name: "Jordan Taylor",
      initials: "JT",
      speciality: "Hypertrophy & Sports Nutrition",
      certification: "CISSN Sports Nutritionist • NASM-CPT",
      image: "/images/coach-4.jpg",
    },
  ],

  plans: [
    {
      id: "basic",
      name: "BASIC",
      monthlyPrice: 49,
      yearlyPrice: 39,
      period: "/month",
      description: "Essential training floor access for the self-driven athlete.",
      popular: false,
      ctaText: "GET STARTED",
      features: [
        "Full gym access (5AM – 11PM)",
        "Standard equipment & free weights",
        "Locker room & private rain showers",
        "Community challenges & leaderboards",
      ],
    },
    {
      id: "pro",
      name: "PRO",
      monthlyPrice: 79,
      yearlyPrice: 63,
      period: "/month",
      description: "Our flagship all-inclusive membership designed for consistent results.",
      popular: true,
      badge: "MOST POPULAR",
      ctaText: "CHOOSE PRO",
      features: [
        "Everything in Basic tier",
        "Unlimited group training classes",
        "Personalized monthly workout plan",
        "Nutrition & macronutrient guidance",
        "Monthly complimentary guest pass",
      ],
    },
    {
      id: "elite",
      name: "ELITE",
      monthlyPrice: 129,
      yearlyPrice: 103,
      period: "/month",
      description: "Full-spectrum athlete development with direct 1-on-1 coaching.",
      popular: false,
      ctaText: "GO ELITE",
      features: [
        "Everything in Pro tier",
        "2x monthly 1-on-1 personal coaching",
        "Priority recovery lounge & infrared sauna",
        "Quarterly InBody composition scan",
        "Exclusive VIP member workshops",
      ],
    },
  ],

  comparisonFeatures: [
    { name: "Gym floor access (5AM – 11PM)", basic: true, pro: true, elite: true },
    { name: "World-class machines & free weights", basic: true, pro: true, elite: true },
    { name: "Locker rooms & luxury showers", basic: true, pro: true, elite: true },
    { name: "Unlimited group HIIT & strength classes", basic: false, pro: true, elite: true },
    { name: "Monthly tailored workout plan", basic: false, pro: true, elite: true },
    { name: "Custom nutrition & macro protocol", basic: false, pro: true, elite: true },
    { name: "Monthly guest passes", basic: false, pro: "1 Pass", elite: "3 Passes" },
    { name: "1-on-1 dedicated personal training", basic: false, pro: false, elite: "2x / month" },
    { name: "Infrared sauna & recovery suite", basic: false, pro: false, elite: true },
    { name: "Quarterly biometric body scan", basic: false, pro: false, elite: true },
  ],

  reviewsSummary: "4.9 / 5 average rating, 300+ reviews",

  reviews: [
    {
      id: "review-1",
      name: "Rohit Patil",
      since: "Member since 2024",
      quote: "Completely transformed my physique and daily discipline. The coaching staff and energy are second to none.",
      result: "+14 KG / 6 MONTHS",
      rating: 5,
      photo: "/images/member-1.jpg",
      initials: "RP",
    },
    {
      id: "review-2",
      name: "Aarav Mehta",
      since: "Member since 2024",
      quote: "Best training facility in the city. The Olympic lifting platforms and curated coaching keep me breaking personal records.",
      result: "+12 KG / 5 MONTHS",
      rating: 5,
      photo: "/images/member-2.jpg",
      initials: "AM",
    },
    {
      id: "review-3",
      name: "Sarah Jenkins",
      since: "Member since 2023",
      quote: "Clean, high-performance atmosphere. The coaches genuinely care about technique and safety on every single set.",
      result: "-9 KG & 18% BF",
      rating: 5,
      photo: "/images/member-3.jpg",
      initials: "SJ",
    },
    {
      id: "review-4",
      name: "Marcus Brody",
      since: "Member since 2024",
      quote: "The culture here is unmatched. You show up, put in relentless work with serious people, and the results follow fast.",
      result: "+25 KG DEADLIFT",
      rating: 5,
      photo: "/images/member-4.jpg",
      initials: "MB",
    },
    {
      id: "review-5",
      name: "Maya Lin",
      since: "Member since 2023",
      quote: "The conditioning classes took my cardio and stamina to athletic levels I didn't think were possible in my 30s.",
      result: "MARATHON READY",
      rating: 5,
      photo: "/images/member-5.jpg",
      initials: "ML",
    },
    {
      id: "review-6",
      name: "David Chen",
      since: "Member since 2024",
      quote: "Recovered from a bad shoulder impingement thanks to Coach David's mobility sessions. Training pain-free again.",
      result: "MOBILITY RESTORED",
      rating: 5,
      photo: "/images/member-6.jpg",
      initials: "DC",
    },
  ],

  faqs: [
    {
      question: "What is included with the Free Day Pass?",
      answer: "Your Free Pass gives you full all-day access to our complete gym floor, free weights, cardio deck, locker rooms, and an optional 15-minute consultation with a head coach to review your goals.",
    },
    {
      question: "Are there any lock-in contracts or hidden cancellation fees?",
      answer: "None. All our memberships are month-to-month. You can pause or cancel at any time with a simple 7-day notice before your next billing cycle.",
    },
    {
      question: "I am a complete beginner. Is this facility right for me?",
      answer: "Over 40% of our members started with zero lifting experience. Every new member receives an initial equipment orientation and our coaches are always on the floor ready to help you with form and technique.",
    },
    {
      question: "What are your operating hours on holidays?",
      answer: "We are open 365 days a year. On major public holidays we operate on weekend hours so your training routine never misses a beat.",
    },
    {
      question: "Can I bring a training partner or guest?",
      answer: "Yes! PRO members receive 1 guest pass per month, and ELITE members receive 3 guest passes per month. First-time guests can also claim a Free Pass directly through our website.",
    },
  ],

  gallery: [
    { id: "g1", title: "Heavy Dumbbells & Free Weights", image: "/images/program-strength.jpg" },
    { id: "g2", title: "Assault Bikes & Rowers", image: "/images/program-cardio.jpg" },
    { id: "g3", title: "Turf Agility Area", image: "/images/program-classes.jpg" },
    { id: "g4", title: "1-on-1 Coaching Session", image: "/images/program-pt.jpg" },
  ],

  whyUs: [
    { title: "Precision Equipment", description: "Eleiko calibrated plates and custom power racks." },
    { title: "Expert Coaching", description: "Certified coaches on the floor during all operational hours." },
    { title: "Uncompromising Culture", description: "An elite, welcoming environment built on consistency." },
  ],

  howItWorks: [
    { step: "01", title: "Claim Free Pass", description: "Register online in 10 seconds via WhatsApp." },
    { step: "02", title: "Tour & Train", description: "Meet our coaching staff and hit your first workout." },
    { step: "03", title: "Choose Your Tier", description: "Select the membership plan that aligns with your targets." },
  ],
};

export default specialtyConfig;
