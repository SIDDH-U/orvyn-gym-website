import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { DemoProvider } from "@/context/DemoContext";
import { DemoStrip } from "@/components/DemoStrip";
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

const demoInitScript = `(function() {
  try {
    var params = new URLSearchParams(window.location.search);
    var stored = {};
    try {
      var s = sessionStorage.getItem('demo_params');
      if (s) stored = JSON.parse(s);
    } catch (e) {}

    var rawName = params.get('name') || stored.name || 'Your Gym';
    var rawCity = params.get('city') || stored.city || 'Your City';
    var rawPhone = params.get('phone') || stored.phone || 'Your Phone No.';
    var rawInsta = params.get('insta') || stored.insta || 'yourinsta';
    var rawColor = params.get('color') || stored.color || '';

    var name = String(rawName).trim().slice(0, 60);
    var city = String(rawCity).trim().slice(0, 60);
    var phone = String(rawPhone).trim().slice(0, 60);
    var insta = String(rawInsta).trim().replace(/^@/, '').slice(0, 60);

    var colorRegex = /^#?[0-9a-fA-F]{6}$/;
    var color = '';
    if (rawColor && colorRegex.test(String(rawColor).trim())) {
      var tc = String(rawColor).trim();
      color = tc.charAt(0) === '#' ? tc : '#' + tc;
    }

    var current = {
      name: name,
      city: city,
      phone: phone,
      insta: insta,
      color: color
    };

    try {
      sessionStorage.setItem('demo_params', JSON.stringify(current));
    } catch (e) {}

    window.__DEMO_PARAMS__ = current;

    if (color) {
      var r = parseInt(color.slice(1, 3), 16);
      var g = parseInt(color.slice(3, 5), 16);
      var b = parseInt(color.slice(5, 7), 16);
      var rs = r / 255, gs = g / 255, bs = b / 255;
      var rLin = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
      var gLin = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
      var bLin = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
      var lum = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
      var textColor = lum > 0.45 ? '#0B0C0E' : '#FFFFFF';

      var hr = Math.max(0, Math.floor(r * 0.9)).toString(16).padStart(2, '0');
      var hg = Math.max(0, Math.floor(g * 0.9)).toString(16).padStart(2, '0');
      var hb = Math.max(0, Math.floor(b * 0.9)).toString(16).padStart(2, '0');
      var hoverColor = '#' + hr + hg + hb;

      var root = document.documentElement;
      root.style.setProperty('--color-accent', color);
      root.style.setProperty('--color-cta', color);
      root.style.setProperty('--color-headline-accent', color);
      root.style.setProperty('--color-cta-text', textColor);
      root.style.setProperty('--color-accent-hover', hoverColor);
      root.style.setProperty('--color-glow', 'rgba(' + r + ',' + g + ',' + b + ',0.38)');
      root.style.setProperty('--color-glow-sm', 'rgba(' + r + ',' + g + ',' + b + ',0.22)');
      root.style.setProperty('--sweep-accent', 'rgba(' + r + ',' + g + ',' + b + ',0.10)');
    }

    document.title = name + ' | Elite Training Facility & Performance Gym in ' + city;

    var isDismissed = false;
    try {
      isDismissed = sessionStorage.getItem('demo_dismissed') === 'true';
    } catch (e) {}
    document.documentElement.style.setProperty('--demo-h', isDismissed ? '0px' : '42px');

    var observer = new MutationObserver(function() {
      var elements = document.querySelectorAll('[data-demo]');
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var f = el.getAttribute('data-demo');
        if (f === 'name' && el.textContent !== name) el.textContent = name;
        else if (f === 'city' && el.textContent !== city) el.textContent = city;
        else if (f === 'phone' && el.textContent !== phone) el.textContent = phone;
        else if (f === 'insta' && el.textContent !== ('@' + insta)) el.textContent = '@' + insta;
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } catch (err) {}
})();`;

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
      suppressHydrationWarning
    >
      <head>
        <script
          id="demo-init"
          dangerouslySetInnerHTML={{ __html: demoInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="relative min-h-screen bg-[var(--color-background,#0B0C0E)] text-white font-sans overflow-x-hidden selection:bg-[var(--color-accent,#E4FF1A)] selection:text-[var(--color-cta-text,#0B0C0E)]"
      >
        {/* Fixed Scroll Progress Bar at very top */}
        <ScrollProgressBar />

        {/* Subtle Film Grain Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        <DemoProvider>
          {/* Top Demo Banner Strip */}
          <DemoStrip />

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
        </DemoProvider>
      </body>
    </html>
  );
}
