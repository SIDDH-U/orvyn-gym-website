"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { siteConfig } from "@/config/site";

export interface DemoData {
  name: string;
  city: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  hasCustomPhone: boolean;
  insta: string;
  instaUrl: string;
  hasCustomInsta: boolean;
  color: string;
  email: string;
  mapsUrl: string;
  queryString: string;
  isDemoDismissed: boolean;
  getInternalHref: (href: string) => string;
  dismissDemo: () => void;
}

const DEFAULT_PHONE_LINK_DIGITS = "918080076322";

export function sanitizeText(val: string | null | undefined, fallback: string): string {
  if (!val) return fallback;
  const trimmed = String(val).trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, 60);
}

export function validateHexColor(color: string | null | undefined): string {
  if (!color) return "";
  const trimmed = String(color).trim();
  if (!/^#?[0-9a-fA-F]{6}$/.test(trimmed)) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

export function computePhoneDigits(phoneParam: string | null | undefined): {
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  hasCustomPhone: boolean;
} {
  if (!phoneParam || !phoneParam.trim() || phoneParam.trim() === "Your Phone No.") {
    return {
      phone: "Your Phone No.",
      phoneRaw: DEFAULT_PHONE_LINK_DIGITS,
      whatsappNumber: DEFAULT_PHONE_LINK_DIGITS,
      hasCustomPhone: false,
    };
  }

  const cleanPhone = phoneParam.trim().slice(0, 60);
  const digits = cleanPhone.replace(/\D/g, "");

  // When a phone param is given, wa.me links use digits only, adding country code 91 if it is 10 digits
  let linkDigits = digits;
  if (digits.length === 10) {
    linkDigits = `91${digits}`;
  } else if (!digits) {
    linkDigits = DEFAULT_PHONE_LINK_DIGITS;
  }

  return {
    phone: cleanPhone,
    phoneRaw: linkDigits,
    whatsappNumber: linkDigits,
    hasCustomPhone: true,
  };
}

export function computeInsta(instaParam: string | null | undefined): {
  insta: string;
  instaUrl: string;
  hasCustomInsta: boolean;
} {
  if (!instaParam || !instaParam.trim() || instaParam.trim() === "yourinsta") {
    return {
      insta: "yourinsta",
      instaUrl: "https://instagram.com",
      hasCustomInsta: false,
    };
  }

  const cleanHandle = instaParam.trim().replace(/^@/, "").slice(0, 60);
  return {
    insta: cleanHandle,
    instaUrl: `https://instagram.com/${encodeURIComponent(cleanHandle)}`,
    hasCustomInsta: true,
  };
}

export function applyAccentColor(hexColor: string) {
  if (!hexColor || !/^#?[0-9a-fA-F]{6}$/.test(hexColor)) return;
  const hex = hexColor.startsWith("#") ? hexColor : `#${hexColor}`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Relative luminance
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  const textColor = lum > 0.45 ? "#0B0C0E" : "#FFFFFF";

  // Hover shade
  const hr = Math.max(0, Math.floor(r * 0.9)).toString(16).padStart(2, "0");
  const hg = Math.max(0, Math.floor(g * 0.9)).toString(16).padStart(2, "0");
  const hb = Math.max(0, Math.floor(b * 0.9)).toString(16).padStart(2, "0");
  const hoverColor = `#${hr}${hg}${hb}`;

  const root = document.documentElement;
  root.style.setProperty("--color-accent", hex);
  root.style.setProperty("--color-cta", hex);
  root.style.setProperty("--color-headline-accent", hex);
  root.style.setProperty("--color-cta-text", textColor);
  root.style.setProperty("--color-accent-hover", hoverColor);
  root.style.setProperty("--color-glow", `rgba(${r}, ${g}, ${b}, 0.38)`);
  root.style.setProperty("--color-glow-sm", `rgba(${r}, ${g}, ${b}, 0.22)`);
  root.style.setProperty("--sweep-accent", `rgba(${r}, ${g}, ${b}, 0.10)`);
}

function parseAllDemoParams(): {
  name: string;
  city: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  hasCustomPhone: boolean;
  insta: string;
  instaUrl: string;
  hasCustomInsta: boolean;
  color: string;
  email: string;
  mapsUrl: string;
  queryString: string;
  isDemoDismissed: boolean;
} {
  let name = siteConfig.name; // "Your Gym"
  let city = siteConfig.address.city; // "Your City"
  let phoneParam = "";
  let instaParam = "";
  let colorParam = "";
  let isDismissed = false;
  let qString = "";

  if (typeof window !== "undefined") {
    // 1. Check window.__DEMO_PARAMS__ if set by pre-paint inline script
    const pre = (window as unknown as { __DEMO_PARAMS__?: Record<string, string> }).__DEMO_PARAMS__;

    // 2. Read URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const hasUrlParams =
      urlParams.has("name") ||
      urlParams.has("city") ||
      urlParams.has("phone") ||
      urlParams.has("insta") ||
      urlParams.has("color");

    // 3. Read sessionStorage
    let stored: Record<string, string> = {};
    try {
      const item = sessionStorage.getItem("demo_params");
      if (item) stored = JSON.parse(item);
    } catch {}

    try {
      isDismissed = sessionStorage.getItem("demo_dismissed") === "true";
    } catch {}

    const rawName = urlParams.get("name") || pre?.name || stored.name;
    const rawCity = urlParams.get("city") || pre?.city || stored.city;
    const rawPhone = urlParams.get("phone") || pre?.phone || stored.phone;
    const rawInsta = urlParams.get("insta") || pre?.insta || stored.insta;
    const rawColor = urlParams.get("color") || pre?.color || stored.color;

    name = sanitizeText(rawName, "Your Gym");
    city = sanitizeText(rawCity, "Your City");
    phoneParam = rawPhone || "";
    instaParam = rawInsta || "";
    colorParam = validateHexColor(rawColor);

    // Save back to sessionStorage to persist across pages
    try {
      sessionStorage.setItem(
        "demo_params",
        JSON.stringify({
          name,
          city,
          phone: phoneParam,
          insta: instaParam,
          color: colorParam,
        })
      );
    } catch {}

    // Construct persistent query string for internal links
    const q = new URLSearchParams();
    if (name && name !== "Your Gym") q.set("name", name);
    if (city && city !== "Your City") q.set("city", city);
    if (phoneParam && phoneParam !== "Your Phone No.") q.set("phone", phoneParam);
    if (instaParam && instaParam !== "yourinsta") q.set("insta", instaParam);
    if (colorParam) q.set("color", colorParam.replace(/^#/, ""));

    const qs = q.toString();
    qString = qs ? `?${qs}` : "";
    if (!qString && window.location.search) {
      qString = window.location.search;
    }
  }

  const { phone, phoneRaw, whatsappNumber, hasCustomPhone } = computePhoneDigits(phoneParam);
  const { insta, instaUrl, hasCustomInsta } = computeInsta(instaParam);
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${name} ${city}`)}`;
  const email = "hello@yourgym.com";

  return {
    name,
    city,
    phone,
    phoneRaw,
    whatsappNumber,
    hasCustomPhone,
    insta,
    instaUrl,
    hasCustomInsta,
    color: colorParam,
    email,
    mapsUrl,
    queryString: qString,
    isDemoDismissed: isDismissed,
  };
}

const defaultValues: DemoData = {
  name: "Your Gym",
  city: "Your City",
  phone: "Your Phone No.",
  phoneRaw: DEFAULT_PHONE_LINK_DIGITS,
  whatsappNumber: DEFAULT_PHONE_LINK_DIGITS,
  hasCustomPhone: false,
  insta: "yourinsta",
  instaUrl: "https://instagram.com",
  hasCustomInsta: false,
  color: "",
  email: "hello@yourgym.com",
  mapsUrl: "https://maps.google.com/?q=Your+Gym+Your+City",
  queryString: "",
  isDemoDismissed: false,
  getInternalHref: (href: string) => href,
  dismissDemo: () => {},
};

const DemoContext = createContext<DemoData>(defaultValues);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demoState, setDemoState] = useState<DemoData>(defaultValues);

  useEffect(() => {
    // Run after mount on client
    const parsed = parseAllDemoParams();

    if (parsed.color) {
      applyAccentColor(parsed.color);
    }

    // Update document title & meta tags on client
    document.title = `${parsed.name} | Elite Training Facility & Performance Gym in ${parsed.city}`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `${siteConfig.tagline} Join ${parsed.name} — the premier strength, conditioning, and functional fitness gym in ${parsed.city} with world-class coaching, precision equipment, and a dedicated community.`
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        `${parsed.name} | Elite Training Facility & Performance Gym in ${parsed.city}`
      );
    }

    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (ogSiteName) {
      ogSiteName.setAttribute("content", parsed.name);
    }

    // Set demo height CSS variable
    document.documentElement.style.setProperty(
      "--demo-h",
      parsed.isDemoDismissed ? "0px" : "42px"
    );

    setDemoState({
      ...parsed,
      getInternalHref: (href: string) => {
        if (!parsed.queryString) return href;
        if (!href.startsWith("/") && !href.startsWith("#")) return href;

        // Separate hash
        const [pathAndQuery, hash] = href.split("#");
        const hashPart = hash ? `#${hash}` : "";

        if (pathAndQuery.includes("?")) {
          return `${pathAndQuery}&${parsed.queryString.slice(1)}${hashPart}`;
        }
        return `${pathAndQuery}${parsed.queryString}${hashPart}`;
      },
      dismissDemo: () => {
        try {
          sessionStorage.setItem("demo_dismissed", "true");
        } catch {}
        document.documentElement.style.setProperty("--demo-h", "0px");
        setDemoState((prev) => ({ ...prev, isDemoDismissed: true }));
      },
    });
  }, []);

  const getInternalHref = useCallback(
    (href: string) => {
      if (!demoState.queryString) return href;
      if (!href.startsWith("/") && !href.startsWith("#")) return href;

      const [pathAndQuery, hash] = href.split("#");
      const hashPart = hash ? `#${hash}` : "";

      if (pathAndQuery.includes("?")) {
        return `${pathAndQuery}&${demoState.queryString.slice(1)}${hashPart}`;
      }
      return `${pathAndQuery}${demoState.queryString}${hashPart}`;
    },
    [demoState.queryString]
  );

  const dismissDemo = useCallback(() => {
    try {
      sessionStorage.setItem("demo_dismissed", "true");
    } catch {}
    document.documentElement.style.setProperty("--demo-h", "0px");
    setDemoState((prev) => ({ ...prev, isDemoDismissed: true }));
  }, []);

  const contextValue: DemoData = {
    ...demoState,
    getInternalHref,
    dismissDemo,
  };

  return <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  return useContext(DemoContext);
}
