# ⚡ 20-MINUTE GYM SWAP GUIDE & DEPLOYMENT RUNBOOK

> **Single Config Architecture**: This codebase is engineered so that producing a brand new gym's client-ready website takes **under 20 minutes from ONE prompt of details**.

---

## 🤖 Agent Instructions (One-Prompt Mode)

When an AI agent or pair programmer is given a block of raw gym details from a client, follow these exact 5 steps autonomously:

1. **Map Gym Details into `/config/gym.config.ts`**:
   - Extract and populate:
     - `name`, `shortName`, `tagline`, `slug`
     - `heroHeadline` (`line1` white, `line2` accent neon)
     - `heroSubtext`, `heroBadge`
     - `phone`, `phoneRaw`, `whatsappNumber`
     - `address`, `city`, `area`, `pincode`, `state`, `mapsLink`, `embedMapUrl`
     - `hours` (`weekday`, `weekend`)
     - `email`, `domain`, `socials`
     - `theme` (`"volt"` | `"ember"` | `"crimson"` | `"ice"`)
     - `sections` flags (turn off any sections the client explicitly doesn't have)
   - Set `sampleMode: true` if placeholder content or stats are being used, or `sampleMode: false` if 100% real client data.

2. **Populate Specialty Content in `/config/specialty.gym.config.ts`**:
   - If the client did not provide custom programs, coaches, plans, reviews, or FAQs, leave the high-converting defaults in place or generate localized, realistic sample content matching the gym's discipline (e.g. Strength, CrossFit, Boxing, Yoga).
   - Ensure `sampleMode: true` is set so sample badges show up tastefully without breaking layouts.

3. **Retain Generic Placeholder Images**:
   - Keep the existing high-performance generic gym photos in `/public/images/` unless specific client photos or logo were attached.

4. **Run Verification Commands**:
   ```bash
   npm run build
   npm run check-swap
   ```

5. **Report Summary**:
   - Report: (1) Active theme & branding, (2) Active sections, (3) Any missing client items that still need real values (e.g. real WhatsApp number, physical address, custom logo).

---

## 📋 10-Step Human Swap Checklist

### Step 1: Copy the Project
```bash
cp -r gym-website-new iron-forge-gym
cd iron-forge-gym
```

### Step 2: Edit `/config/gym.config.ts`
Open `/config/gym.config.ts` — **this is the ONLY file you need to edit for 95% of gym sites**:
```ts
export const gymConfig: GymConfig = {
  name: "IRON FORGE",
  shortName: "IRON FORGE",
  tagline: "UNLEASH YOUR INNER STRENGTH.",
  slug: "iron-forge-gym",
  heroBadge: "RELENTLESS PROGRESSION",
  heroHeadline: {
    line1: "UNLEASH YOUR",
    line2: "INNER STRENGTH.",
  },
  heroSubtext: "Downtown Austin's premier strength & conditioning training facility.",
  phone: "+1 (512) 555-0199",
  phoneRaw: "+15125550199",
  whatsappNumber: "15125550199",
  email: "contact@ironforgeaustin.com",
  domain: "https://ironforgeaustin.com",
  address: "410 Congress Ave",
  city: "Austin",
  area: "Downtown",
  pincode: "78701",
  state: "TX",
  mapsLink: "https://maps.google.com/?q=Iron+Forge+Gym+Austin",
  theme: "ember", // volt | ember | crimson | ice
  sampleMode: true,
  // ...
};
```

### Step 3: (Optional) Edit `/config/specialty.gym.config.ts`
If the gym has specific membership prices (e.g. $59/$89/$149) or specific coaches, update `/config/specialty.gym.config.ts`. The plans array cleanly supports **1 to 4 plans** with zero layout gaps on desktop or mobile.

### Step 4: Pick a Theme Preset
Choose one of the 4 tailored high-contrast presets in `gym.config.ts`:
- `"volt"`: Sleek dark industrial with electric yellow / neon lime `#E4FF1A` (Default)
- `"ember"`: Fiery dark performance with high-visibility electric orange `#FF6600`
- `"crimson"`: Aggressive athletic red `#FF2A4D` with crisp white CTA text
- `"ice"`: Cryogenic aesthetic with radiant electric cyan `#00E5FF`

Every component, button glow, hero canvas particle sprite, and light sweep gradient automatically adapts.

### Step 5: Toggle Section Flags
If the gym doesn't offer coaches or doesn't want reviews visible yet, toggle flags in `gym.config.ts`:
```ts
sections: {
  showStats: true,
  showAbout: true,
  showMarquee: true,
  showPrograms: true,
  showCoaches: false, // cleanly hidden, removed from nav & footer
  showMemberships: true,
  showReviews: true,
  showFinalCta: true,
  showMap: true,
  showFaq: true,
  showJoinPopup: true,
  showStickyBar: true,
}
```
All nav links, scroll-spy IDs, footer links, and sitemap entries update automatically.

### Step 6: Replace Images in `/public/images/gym/`
- Add `logo.png` to `/public/images/gym/logo.png` (or leave commented out for instant typography vector logo).
- Drop in `hero-desktop.jpg` (16:9) and `hero-mobile.jpg` (9:16).
- If client photos are missing, the built-in dark fallback placeholders render seamlessly.

### Step 7: Build Locally
```bash
npm run build
```
Verify that all static routes (`/`, `/contact`, `/memberships`, `/robots.txt`, `/sitemap.xml`) build cleanly.

### Step 8: Run Safety Check
```bash
npm run check-swap
```
- In `sampleMode: true`, prints a checklist of remaining placeholder items.
- In `sampleMode: false`, fails if any demo values (old gym name, demo phone, demo address) remain.

### Step 9: Deploy to Vercel (Zero Environment Variables Needed)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: setup Iron Forge gym website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/iron-forge-gym.git
   git push -u origin main
   ```
2. In [Vercel Dashboard](https://vercel.com/new):
   - Click **Add New Project** &rarr; Select your new GitHub repo.
   - Framework preset: **Next.js** (detected automatically).
   - Environment Variables: **None required**.
   - Click **Deploy**.
   - Deployment finishes in ~60 seconds.

### Step 10: Test on Mobile at 390px & Deliver
- Open the production Vercel URL on a mobile device or Chrome DevTools (iPhone 14/15/16 at 390x844px).
- Verify:
  - Hero text centered with 0.16em line gap and zero overlap
  - CTA button responsive and opens WhatsApp
  - Plan auto-swipe works smoothly
  - Sticky bottom call button rings client phone number
- Send the live demo link to the client!

---

## 🛠️ Summary of Config Files

| File Path | Role | Who Edits |
| :--- | :--- | :--- |
| `/config/gym.config.ts` | **Primary Gym Profile**: Name, phone, WhatsApp, address, hours, theme, section flags, stats, sampleMode. | **Edit per gym** (under 10 mins). |
| `/config/specialty.gym.config.ts` | **Discipline & Specialty Profile**: Programs, coaches roster, membership tiers, comparison table, reviews, FAQs. | Edit only when changing gym disciplines. |
| `/config/themes.ts` | **Palette Engine**: Color tokens, contrast ratios, canvas particle colors for Volt, Ember, Crimson, Ice. | Core system (rarely edited). |
| `/config/site.ts` | **Composition Engine**: Merges gym and specialty configurations into a unified, typed `siteConfig` API with dynamic nav links and stats. | Core system (do not edit). |
