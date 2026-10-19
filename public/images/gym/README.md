# Gym Assets Directory (`/public/images/gym/`)

This directory is designated for gym-specific brand assets and photo uploads. When customizing this template for a new gym, replace or place files here and reference their paths in `/config/gym.config.ts` or `/config/specialty.gym.config.ts`.

---

## 1. Gym-Specific Images (Replace per Client)

These images are specific to each individual gym facility:

| Asset Name | Default Path | Aspect Ratio | Dimensions | Description / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Logo** | `/images/gym/logo.png` | Variable (approx 4:1) | Transparent PNG (e.g. 400x100) | Optional. If omitted, the website automatically renders a crisp typography vector logo using `gym.name` and `gym.logoSubtitle`. |
| **Desktop Hero** | `/images/hero-desktop.jpg` (or `/images/gym/hero-desktop.jpg`) | 16:9 | 1920x1080 (min 1600w) | Main desktop background photo showing the gym training floor or an athlete in motion. |
| **Mobile Hero** | `/images/hero-mobile.jpg` (or `/images/gym/hero-mobile.jpg`) | 9:16 | 1080x1920 (min 750w) | Portrait background photo optimized for phone screens (70% of visitors). |
| **Community Photo** | `/images/about-community.jpg` (or `/images/gym/about.jpg`) | 1:1 Square | 800x800 | Circular photo in the About/Community section showing members or group training. |
| **Final CTA Photo** | `/images/cta-group.jpg` (or `/images/gym/cta.jpg`) | 2:1 Landscape | 1600x800 | Full-bleed background photo behind the closing free pass signup form. |
| **Coach Portraits** | `/images/coach-1..4.jpg` | 4:5 Portrait | 800x1000 | Individual portraits of coaching staff. If missing, automatically falls back to coach initials badge. |
| **Member Photos** | `/images/member-1..6.jpg` | 4:5 Portrait / 1:1 | 600x750 | Member transformation before/after photos and testimonial spotlights. |

---

## 2. Generic Placeholder Images (Reusable Across Gyms)

These assets are clean, high-performance training floor photos that can safely remain as default placeholders if the client hasn't provided their own photography yet:

| Category | File Paths | Usage |
| :--- | :--- | :--- |
| **Discipline Cards** | `/images/program-strength.jpg`<br>`/images/program-cardio.jpg`<br>`/images/program-classes.jpg`<br>`/images/program-pt.jpg` | Programs & disciplines cards (Strength, Cardio, Classes, 1-on-1). |
| **Generic Athleisure** | `/images/hero-athlete-hd.jpg`<br>`/images/hero-athlete-mobile.jpg` | High-definition action shots. |
| **Transformation Samples**| `/images/transformation-*.jpg` | Demonstration proof cards. |

---

## Global Photo Treatment

Every photo rendered via the `<Photo>` component automatically applies the dark gym grade filter:
`filter: contrast(1.1) brightness(0.92) saturate(0.85);`
If any image fails to load or the path is missing, it automatically renders a sleek gradient placeholder (`#15171B` to `#0B0C0E` with a subtle dumbbell icon), ensuring zero broken image icons or layout shift on phones.
