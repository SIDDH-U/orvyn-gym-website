export type ThemeName = "volt" | "ember" | "crimson" | "ice";

export interface ThemeTokens {
  name: ThemeName;
  label: string;
  background: string;
  surface: string;
  surfaceCard: string;
  primary: string;
  accent: string;
  accentHover: string;
  accentRgb: [number, number, number];
  cta: string;
  ctaText: string;
  text: string;
  muted: string;
  borderSubtle: string;
  glow: string;
  glowSm: string;
  lightSweepCore: string;
  lightSweepAccent: string;
  heroHeadlineAccent: string;
}

export const themes: Record<ThemeName, ThemeTokens> = {
  // 1. Volt: Current sleek black + electric yellow / neon lime
  volt: {
    name: "volt",
    label: "Electric Volt (Black + Neon Lime/Yellow)",
    background: "#0B0C0E",
    surface: "#15171B",
    surfaceCard: "#191B20",
    primary: "#FFFFFF",
    accent: "#E4FF1A",
    accentHover: "#D4EF0E",
    accentRgb: [228, 255, 26],
    cta: "#E4FF1A",
    ctaText: "#0B0C0E",
    text: "#FFFFFF",
    muted: "#A1A5AD",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(228, 255, 26, 0.35)",
    glowSm: "rgba(228, 255, 26, 0.22)",
    lightSweepCore: "rgba(255, 255, 230, 0.14)",
    lightSweepAccent: "rgba(228, 255, 26, 0.10)",
    heroHeadlineAccent: "#DFFF00",
  },

  // 2. Ember: Dark industrial + high-visibility electric orange
  ember: {
    name: "ember",
    label: "Fiery Ember (Black + Electric Orange)",
    background: "#0B0C0E",
    surface: "#15171B",
    surfaceCard: "#191B20",
    primary: "#FFFFFF",
    accent: "#FF6600",
    accentHover: "#E55B00",
    accentRgb: [255, 102, 0],
    cta: "#FF6600",
    ctaText: "#0B0C0E",
    text: "#FFFFFF",
    muted: "#A1A5AD",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(255, 102, 0, 0.38)",
    glowSm: "rgba(255, 102, 0, 0.22)",
    lightSweepCore: "rgba(255, 240, 230, 0.14)",
    lightSweepAccent: "rgba(255, 102, 0, 0.10)",
    heroHeadlineAccent: "#FF7700",
  },

  // 3. Crimson: Aggressive performance + electric red
  crimson: {
    name: "crimson",
    label: "Aggressive Crimson (Black + Electric Red)",
    background: "#0B0C0E",
    surface: "#15171B",
    surfaceCard: "#191B20",
    primary: "#FFFFFF",
    accent: "#FF2A4D",
    accentHover: "#E61A3D",
    accentRgb: [255, 42, 77],
    cta: "#FF2A4D",
    ctaText: "#FFFFFF",
    text: "#FFFFFF",
    muted: "#A1A5AD",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(255, 42, 77, 0.38)",
    glowSm: "rgba(255, 42, 77, 0.22)",
    lightSweepCore: "rgba(255, 235, 240, 0.14)",
    lightSweepAccent: "rgba(255, 42, 77, 0.10)",
    heroHeadlineAccent: "#FF3355",
  },

  // 4. Ice: Premium cryogenic + electric cyan / ice blue
  ice: {
    name: "ice",
    label: "Cryo Ice (Black + Electric Cyan)",
    background: "#0B0C0E",
    surface: "#15171B",
    surfaceCard: "#191B20",
    primary: "#FFFFFF",
    accent: "#00E5FF",
    accentHover: "#00C9E0",
    accentRgb: [0, 229, 255],
    cta: "#00E5FF",
    ctaText: "#0B0C0E",
    text: "#FFFFFF",
    muted: "#A1A5AD",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(0, 229, 255, 0.38)",
    glowSm: "rgba(0, 229, 255, 0.22)",
    lightSweepCore: "rgba(230, 252, 255, 0.14)",
    lightSweepAccent: "rgba(0, 229, 255, 0.10)",
    heroHeadlineAccent: "#00F0FF",
  },
};
