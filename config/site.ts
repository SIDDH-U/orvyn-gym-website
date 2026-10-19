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

export interface Stat {
  value: string;
  label: string;
  caption: string;
  numeric?: number;
  suffix?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  targetId?: string;
  isExternalPage?: boolean;
}

export const siteConfig = {
  name: "ORVYN",
  tagline: "TRAIN HARDER. LIVE STRONGER.",
  subline: "A premium gym for people who want more from themselves.",
  phone: "+1 (555) 389-2044",
  phoneRaw: "+15553892044",
  whatsAppNumber: "15553892044",
  email: "hello@orvynfitness.com",
  address: {
    street: "742 Evergreen Blvd, Suite 100",
    city: "Los Angeles",
    state: "CA 90028",
    full: "742 Evergreen Blvd, Suite 100, Los Angeles, CA 90028",
    mapsUrl: "https://maps.google.com/?q=ORVYN+Fitness+Los+Angeles",
  },
  hours: {
    monFri: "5:00 AM – 11:00 PM",
    saturday: "5:00 AM – 11:00 PM",
    sunday: "5:00 AM – 9:00 PM",
  },
  navLinks: [
    { label: "ABOUT", href: "#about", targetId: "about" },
    { label: "PROGRAMS", href: "#programs", targetId: "programs" },
    { label: "COACHES", href: "#coaches", targetId: "coaches" },
    { label: "MEMBERSHIPS", href: "#plans", targetId: "plans" },
    { label: "REVIEWS", href: "#reviews", targetId: "reviews" },
    { label: "CONTACT", href: "/contact", isExternalPage: true },
  ] as NavLinkItem[],
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
  stats: [
    {
      value: "12+",
      numeric: 12,
      suffix: "+",
      label: "Coaches",
      caption: "Certified elite specialists",
    },
    {
      value: "5AM–11PM",
      label: "Open Daily",
      caption: "Train on your schedule, 7 days",
    },
    {
      value: "60+",
      numeric: 60,
      suffix: "+",
      label: "Machines",
      caption: "Precision selectorized & free weights",
    },
  ] as Stat[],
  socials: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "Facebook", url: "https://facebook.com" },
  ],
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
  ] as Program[],
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
  ] as Coach[],
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
  ] as Plan[],
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
      quote: "ORVYN completely transformed my physique and daily discipline. The coaching staff and energy are second to none.",
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
  ] as Review[],
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
      question: "I am a complete beginner. Is ORVYN right for me?",
      answer: "Over 40% of our members started with zero lifting experience. Every new member receives an initial equipment orientation and our coaches are always on the floor ready to help you with form and technique.",
    },
    {
      question: "What are your operating hours on holidays?",
      answer: "We are open 365 days a year. On major public holidays we operate on our weekend hours (5:00 AM to 9:00 PM) so your training routine never misses a beat.",
    },
    {
      question: "Can I bring a training partner or guest?",
      answer: "Yes! PRO members receive 1 guest pass per month, and ELITE members receive 3 guest passes per month. First-time guests can also claim a Free Pass directly through our website.",
    },
  ] as FAQ[],
  images: {
    heroDesktop: "/images/hero-desktop.jpg",
    heroMobile: "/images/hero-mobile.jpg",
    aboutCommunity: "/images/about-community.jpg",
    ctaGroup: "/images/cta-group.jpg",
    programs: {
      strength: "/images/program-strength.jpg",
      cardio: "/images/program-cardio.jpg",
      classes: "/images/program-classes.jpg",
      pt: "/images/program-pt.jpg",
    },
    coaches: [
      "/images/coach-1.jpg",
      "/images/coach-2.jpg",
      "/images/coach-3.jpg",
      "/images/coach-4.jpg",
    ],
    members: [
      "/images/member-1.jpg",
      "/images/member-2.jpg",
      "/images/member-3.jpg",
      "/images/member-4.jpg",
      "/images/member-5.jpg",
      "/images/member-6.jpg",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
