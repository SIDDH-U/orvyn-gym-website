# Premium Gym Website Template

A mobile-first, high-conversion website for elite gyms, strength clubs, and fitness facilities. Built with **Next.js (App Router)**, **Tailwind CSS v4**, and **Framer Motion**.

Designed so that creating a client-ready website for a new gym takes **under 20 minutes from ONE prompt of details**.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test production build
npm run build

# 4. Run safety swap check
npm run check-swap
```

Visit [http://localhost:3000](http://localhost:3000) on mobile (~390px) and desktop.

---

## 📁 Two-Layer Configuration System

| Config File | Description | When to Edit |
| :--- | :--- | :--- |
| **[`config/gym.config.ts`](./config/gym.config.ts)** | **The ONLY file edited per gym**: Name, phone, WhatsApp number, address, city, hours, theme preset, section flags, and stats. | **Every new gym** (takes < 10 mins). |
| **[`config/specialty.gym.config.ts`](./config/specialty.gym.config.ts)** | **Specialty content**: Training programs, coaches roster, membership pricing tiers, reviews, FAQs, and marquee text. | Only when changing gym disciplines (e.g. CrossFit, Boxing, Yoga). |
| **[`config/themes.ts`](./config/themes.ts)** | **Theme Presets**: Color tokens, canvas particle palettes, and accessible CTA contrast. | Core engine (`volt`, `ember`, `crimson`, `ice`). |
| **[`config/site.ts`](./config/site.ts)** | **Composition Layer**: Merges gym and specialty configurations into a unified `siteConfig` API. | Core engine (do not edit). |

---

## 🎨 Theme Presets

Switch between 4 high-contrast, accessible themes in `/config/gym.config.ts` (`theme: "volt" | "ember" | "crimson" | "ice"`):

1. **Volt** (Default): Dark industrial with neon lime / electric yellow (`#E4FF1A`)
2. **Ember**: High-energy dark performance with fiery electric orange (`#FF6600`)
3. **Crimson**: Aggressive powerlifting red (`#FF2A4D`) with high-contrast white CTA text
4. **Ice**: Clean cryogenic athletic aesthetic with radiant electric cyan (`#00E5FF`)

---

## 📖 Complete Swap Runbook & Deployment

See **[`SWAP.md`](./SWAP.md)** for:
- **Agent Instructions (One-Prompt Mode)** for instant AI automated rebranding
- **10-Step Human Swap Checklist**
- **Vercel zero-config deployment instructions**
