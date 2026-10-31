# 🐾 Aura & Paw Grooming Studio — Luxury Pet Spa & Styling Sanctuary

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Verification-5--Tier_Passing-success)](#-automated-testing--layout-verification)

A bespoke, high-conversion web application and digital presence for **Aura & Paw Grooming Studio**, an elite canine and feline grooming atelier. Designed with high-ticket aesthetics, fluid micro-interactions, responsive bento grid layouts, real-time breed pricing estimations, and a multi-step VIP booking engine.

---

## ✨ Features & Architecture

### 1. 🎨 Visual Experience & Luxury Brand Identity
- **Refined Editorial Aesthetics**: Neutral warm palettes, luxury typography, and smooth glassmorphic elevations.
- **Interactive Before / After Transformation Slider**: Custom touch- and drag-enabled split-view visual comparison module.
- **Micro-Interactions & Fluid Animations**: Powered by `motion` (Framer Motion) with spring dynamics and accessible reduced-motion support.

### 2. 🧮 Interactive Booking & Estimation Tools
- **Dynamic Pricing Calculator**: Live cost estimation by pet size, coat condition, and add-on luxury spa treatments (ozone hydrotherapy, ultrasonic dental, paw balm).
- **VIP Multi-Step Booking Modal**: Dedicated intake flow capturing pet details, breed requirements, groomer selection, and scheduling with validation.
- **Sticky Mobile Action Bar & Floating WhatsApp**: Seamless mobile conversion paths for appointment booking and immediate concierge consultation.

### 3. 🛡️ Trust & Proof Engineering
- **Certified Artisan Groomers**: Showcase of certified master stylists with credentials, specialties, and years of experience.
- **Comfort & Fear-Free Safety Pillars**: Highlighting positive reinforcement, sanitized suites, open-view grooming, and stress-free handling.
- **Verified Client Reviews & Gallery**: Filterable photo showcase and authentic testimonials from pet parents.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling Engine** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animation** | [Motion](https://motion.dev/) |
| **Bundler & Dev Server** | [Vite 8](https://vitejs.dev/) |
| **Backend & Mock API** | [Express](https://expressjs.com/) with [TSX](https://github.com/privatenumber/tsx) |
| **AI Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) |

---

## 📁 Repository Structure

```
aura-paw-grooming-studio/
├── .data/                          # Local mock database
│   ├── bookings.json               # Recorded customer appointments
│   └── subscribers.json            # Newsletter subscriptions
├── public/                         # Public static assets
│   ├── robots.txt                  # Search engine crawl directives
│   └── sitemap.xml                 # Search index sitemap
├── src/
│   ├── assets/images/              # High-resolution salon & pet photography
│   ├── components/                 # Component architecture
│   │   ├── BeforeAfterSlider.tsx   # Interactive split comparison slider
│   │   ├── BookingModal.tsx        # Multi-step appointment modal
│   │   ├── ComfortSafetySection.tsx# Safety & fear-free guarantee
│   │   ├── ContactLocation.tsx     # Atelier address, hours & map
│   │   ├── FaqSection.tsx          # Collapsible accordion FAQ
│   │   ├── FloatingWhatsApp.tsx    # Instant chat float trigger
│   │   ├── Footer.tsx              # Comprehensive footer & legal links
│   │   ├── GallerySection.tsx      # Curated transformation gallery
│   │   ├── GroomingTipsSection.tsx # Expert pet care articles
│   │   ├── Header.tsx              # Navigation bar with responsive drawer
│   │   ├── Hero.tsx                # High-impact hero section with primary CTA
│   │   ├── HowItWorks.tsx          # 4-step salon process overview
│   │   ├── Image.tsx               # Lazy-loaded image wrapper with fallbacks
│   │   ├── MeetGroomers.tsx        # Master stylist profiles
│   │   ├── NewsletterSection.tsx   # VIP club email signup
│   │   ├── PricingCalculator.tsx   # Real-time estimate calculator
│   │   ├── ReviewsSection.tsx      # Testimonials & star ratings
│   │   ├── ServicesSection.tsx     # Tiered grooming package cards
│   │   ├── StickyMobileBar.tsx     # Mobile-first sticky bottom bar
│   │   └── TrustPillars.tsx        # Core value proposition icons
│   ├── data/                       # Structured datasets
│   │   ├── breedData.ts            # Canine & feline breed classifications
│   │   └── groomingData.ts         # Service packages, prices & add-ons
│   ├── types/                      # TypeScript declarations & models
│   │   └── index.ts
│   ├── App.tsx                     # Main layout & section orchestration
│   ├── index.css                   # Tailwind v4 theme configuration
│   └── main.tsx                    # React root entry point
├── tests/                          # 5-Tier layout & responsive test suite
│   ├── helpers.ts                  # Headless Chromium harness & test runner
│   ├── tier1-viewport-rendering.test.ts
│   ├── tier2-horizontal-overflow.test.ts
│   ├── tier3-touch-targets.test.ts
│   ├── tier4-bento-grid.test.ts
│   ├── tier5-compilation.test.ts
│   └── run-all-tests.ts            # Unified test suite CLI runner
├── server.ts                       # Express & Vite development server
├── vite.config.ts                  # Vite build & plugin configuration
├── tsconfig.json                   # Strict TypeScript compiler options
└── package.json                    # Dependencies & execution scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20+ or 24+)
- npm or pnpm

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/rajulbusiness007-star/Aura-Paw-.git
   cd Aura-Paw-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated Testing & Layout Verification

A comprehensive 5-tier responsive and layout verification suite verifies computed geometry, zero horizontal overflow, 44px minimum touch targets, and build compilation:

```bash
# Run complete test suite across all 5 tiers
npx tsx tests/run-all-tests.ts

# Run individual tiers
npx tsx tests/tier1-viewport-rendering.test.ts
npx tsx tests/tier2-horizontal-overflow.test.ts
npx tsx tests/tier3-touch-targets.test.ts
npx tsx tests/tier4-bento-grid.test.ts
npx tsx tests/tier5-compilation.test.ts
```

---

## 📦 Production Build

Compile clean production assets:
```bash
npm run build
```
Compiled production assets will be generated in the `dist/` directory.

---

## 📄 License
Private & Proprietary — All rights reserved by **Aura & Paw Grooming Studio**.
