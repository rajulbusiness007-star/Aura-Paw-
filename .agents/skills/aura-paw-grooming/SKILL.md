---
name: aura-paw-grooming
description: Recipe card and reference architecture for Aura & Paw luxury pet grooming salon web platform. Trigger when developing, testing, deploying, or customizing Aura & Paw pet care features.
---

# 🐾 Aura & Paw Grooming Studio — Master Recipe Card

> **Canonical Repository**: [https://github.com/rajulbusiness007-star/Aura-Paw-](https://github.com/rajulbusiness007-star/Aura-Paw-)  
> **Shelf**: Workspace Shelf (`.agents/skills/aura-paw-grooming/`)  
> **Target Standard**: WCAG 2.5.5 touch target ergonomics (≥ 44×44px), 0px horizontal overflow, React 19 + Tailwind CSS v4

---

## 🎯 When to Use This Skill
- Building, refining, or testing the **Aura & Paw Grooming Studio** luxury pet salon web application.
- Managing interactive booking flows, pet breed-specific add-ons, or live concierge quote calculations.
- Verifying responsive layouts across 5 canonical viewports (375px, 390px, 768px, 1024px, 1280px) and narrow viewports (320px).
- Zero-downtime cloud publishing to Vercel or Node.js SSR environments.

---

## 🏗️ Architecture & Recommended Tech Stack

| Layer | Technology | Key Configuration & Files |
|---|---|---|
| **Frontend Framework** | React 19 (`react`, `react-dom`) | Modern hooks (`useState`, `useEffect`, `useRef`), zero shallow mocks |
| **Styling & System** | Tailwind CSS v4 (`@tailwindcss/vite`) | Emerald & warm linen palette (`#183D32`, `#FAF8F3`, `#C5A46D`), `overflow-x-clip` |
| **Build & Dev Server** | Vite 8 + Express 4.21 | `vite.config.ts`, `server.ts` (JSON storage `/api/bookings`, `/api/newsletter`) |
| **E2E Test Engine** | Real Headless Chromium + SSR | `tests/run-all-tests.ts`, `tests/helpers.ts` (100% SUITE PASS across 5 tiers) |
| **Cloud Hosting** | Vercel SPA Blueprint | `vercel.json` (`framework: vite`, `outputDirectory: dist`), `.npmrc` |

---

## 📐 Verification Harness & Quality Gate Commands

Run all verification suites locally before committing changes:
```bash
# Execute full 5-tier E2E verification suite
npx tsx tests/run-all-tests.ts

# Execute individual verification tiers
npx tsx tests/run-all-tests.ts --tier=1  # 5-viewport rendering & structural landmarks
npx tsx tests/run-all-tests.ts --tier=2  # scrollWidth <= innerWidth (0px overflow check)
npx tsx tests/run-all-tests.ts --tier=3  # WCAG >= 44x44px mobile touch target bounding boxes
npx tsx tests/run-all-tests.ts --tier=4  # Bento UI Grid architecture & collision prevention
npx tsx tests/run-all-tests.ts --tier=5  # tsc --noEmit & vite build compilation

# Execute adversarial stress tests (320px to 1920px, 150% text zoom)
npx tsx tests/adversarial-stress.test.ts
```

---

## 🧩 Component & Data Directory Map

```
src/
├── components/
│   ├── Header.tsx              # Responsive navigation, mobile drawer with aria-controls
│   ├── Hero.tsx                # High-impact luxury hero with dual CTA lockup
│   ├── TrustPillars.tsx        # 8-card responsive Bento UI standard showcase
│   ├── ServicesSection.tsx     # Full service catalog with tiered pricing
│   ├── BeforeAfterSlider.tsx   # Interactive before/after transformation viewer
│   ├── PricingCalculator.tsx   # Live species & weight price estimation engine
│   ├── MeetGroomers.tsx        # Master stylist certification credentials
│   ├── ComfortSafetySection.tsx# Fear-free protocols & 5-step salon process
│   ├── ReviewsSection.tsx      # Verified reviews with modal dialog & filter tabs
│   ├── BookingModal.tsx        # 4-step concierge reservation desk with .ics pass
│   ├── StickyMobileBar.tsx     # WCAG compliant persistent mobile booking CTA
│   └── Image.tsx               # Lazy-loading with blur-up shimmer skeleton
├── data/
│   ├── groomingData.ts         # Canonical services, reviews, stylists, FAQs
│   └── breedData.ts            # Canine & feline breed database with stylist tips
└── types/
    └── index.ts                # TypeScript domain models (Booking, Review, Breed)
```

---

## 🧹 The Two-Shelf Hygiene Rule
- **Workspace Shelf Mounting**: Keep this recipe card strictly in `.agents/skills/aura-paw-grooming/`. Never install project-specific cards globally in `~/.gemini/config/skills/`.
- **Project Completion**: Once development, verification, and deployment to GitHub are complete, the workspace skill can remain as reference or be removed to keep context pristine.
