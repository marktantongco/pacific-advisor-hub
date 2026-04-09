# 🛡️ Pacific Cross Advisor Hub

> **Your Complete Interactive Guide to Blue Royale & FlexiShield Insurance Products**

A feature-rich Progressive Web App (PWA) designed for Pacific Cross insurance advisors in the Philippines. Access product information, interactive charts, sales training materials, objection handling guides, and a complete advisor roadmap — all offline-ready and mobile-first.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Product Information](#-product-information)
- [PWA Features](#-pwa-features)
- [Deployment](#-deployment)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 📊 Interactive Dashboard
- **Real-time insurance market statistics** — Philippine insurance penetration data, market insights, and demographic breakdowns
- **Interactive charts** powered by Recharts — bar charts comparing regional insurance penetration, pie charts showing coverage demographics
- **Life stage product matching** — personalized recommendations based on customer age, income, and life situation

### 🏥 Product Explorer
- **Blue Royale** — Global health shield with worldwide coverage up to USD 2 Million
  - Three plan tiers (Plan A, B, C) with detailed coverage breakdowns
  - Age-based premium tables in USD
  - Comprehensive benefits grid with 8 core features
- **FlexiShield** — HMO power-up plan with coverage up to PHP 2 Million
  - Two deductible options with tiered pricing
  - Age-based premium tables in PHP
  - Visual "How It Works" guide explaining the HMO top-up mechanism
- **Side-by-side comparison table** — Quick-reference feature comparison between both products

### 📚 Sales Training Materials
- **4-week content calendar** — Pre-planned social media posts with themes, platforms, and content types (Educational, Product, Engagement, Testimonial, CTA)
- **Advisor roadmap** — 4-phase growth plan from Foundation to Scale Up, with tasks and deliverables for each phase
- **Objection handling scripts** — Pre-built responses for common customer objections
- **Market misconceptions** — Myth vs. Reality cards debunking common insurance misunderstandings

### 💬 FAQ System
- **Categorized accordion FAQ** — Organized into Product Basics, Coverage Questions, For OFWs, and For Advisors
- **Conversational tone** — Written in a relatable, jargon-free style for Filipino advisors

### 📱 PWA Capabilities
- **Offline-first architecture** — Service worker caching with stale-while-revalidate strategy
- **Install to home screen** — Full manifest with app icons and standalone display mode
- **Responsive design** — Mobile-first brutalist design system optimized for all screen sizes
- **Touch-friendly interactions** — 44px minimum touch targets for all interactive elements

### 🎨 Design
- **Brutalist GenZ aesthetic** — Bold typography (Space Grotesk + JetBrains Mono), thick borders, high-contrast colors
- **Dark/light sections** — Strategic use of black backgrounds with yellow accents for visual hierarchy
- **Accessible** — Focus states, reduced-motion support, semantic HTML

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI component library |
| **TypeScript** | 5.6 | Type-safe JavaScript |
| **Vite** | 6 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first CSS framework |
| **Recharts** | 2.12 | Data visualization charts |
| **Lucide React** | 0.364 | Icon library |
| **Radix UI** | Various | Accessible UI primitives |
| **pnpm** | 10.x | Fast, disk-efficient package manager |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8 (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/pacific-advisor-hub.git
cd pacific-advisor-hub

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The dev server will start at `http://localhost:5173`.

### Build for Production

```bash
# Type-check and build
pnpm build

# Preview production build locally
pnpm preview
```

The production build outputs to the `dist/` directory.

---

## 📁 Project Structure

```
pacific-advisor-hub/
├── public/
│   ├── favicon.svg          # App icon (SVG)
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   └── use.txt             # Usage notes
├── presentations/
│   └── content.json         # Training presentation data
├── src/
│   ├── components/
│   │   └── ErrorBoundary.tsx # React error boundary
│   ├── hooks/
│   │   └── use-mobile.tsx   # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main application component
│   ├── App.css              # Global styles & design system
│   ├── index.css            # Tailwind base styles
│   ├── main.tsx             # Entry point with SW registration
│   ├── vite-env.d.ts        # Vite type declarations
│   └── recharts.d.ts        # Recharts type declarations
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── components.json          # shadcn/ui component config
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

---

## 🏥 Product Information

### Blue Royale — Your Global Health Shield

| Plan | Maximum Coverage | Room & Board (PH) | Room & Board (Overseas) |
|------|-----------------|-------------------|------------------------|
| Plan A | USD 500,000 | $300/day | Private up to $1,000/day |
| Plan B | USD 1,000,000 | $600/day | Private up to $1,500/day |
| Plan C | USD 2,000,000 | $850/day | Private up to $1,500/day |

**Core Benefits:** Worldwide coverage, freedom of hospital choice, COVID-19 + travel coverage, maternity benefits, no medical exam required, 24/7 telemedicine, mental health support, coverage up to age 100.

### FlexiShield — Your HMO's Power-Up

| Plan | Deductible | Premium (Age 18-35) | Premium (Age 65-70) |
|------|-----------|---------------------|---------------------|
| FlexiShield 150 | PHP 150K-199K | PHP 8,019-10,517/yr | PHP 35,549-44,442/yr |
| FlexiShield 200 | PHP 200K+ | PHP 7,291-8,400/yr | PHP 27,093-33,891/yr |

**Core Benefits:** Second-layer HMO protection, ICU coverage, daily hospital income (PHP 3,000/day), cashless availment, surgical benefits, COVID-19 coverage, telemedicine, affordable premiums.

---

## 📱 PWA Features

### Service Worker Strategy
- **Install phase:** Pre-caches essential shell resources (HTML, manifest, favicon)
- **Fetch phase:** Stale-while-revalidate for app shell, network-first with cache fallback for API data
- **Activate phase:** Automatically cleans old caches on version update

### Manifest Configuration
```json
{
  "name": "Pacific Cross Advisor Hub",
  "short_name": "PC Advisor",
  "display": "standalone",
  "theme_color": "#000000",
  "orientation": "portrait-primary"
}
```

### Offline Support
The app caches all static assets and the main application shell on first load. Subsequent visits load instantly from cache while checking for updates in the background. Charts and interactive components remain fully functional offline.

---

## 🌐 Deployment

### GitHub Pages

The app is deployed to GitHub Pages at:
**https://marktantongco.github.io/pacific-advisor-hub/**

To redeploy:
```bash
pnpm build
# The dist/ folder is served via GitHub Pages
```

### Vercel

The app is also deployed to Vercel:
**https://pacific-advisor-hub.vercel.app/** (or your custom domain)

Set up via Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

**Vercel Configuration:**
- Framework Preset: Vite
- Build Command: `pnpm build`
- Output Directory: `dist`

---

## 📖 Usage Guide

### For Advisors
1. **Home** — Get an overview of the Philippine insurance landscape with key statistics and charts
2. **Products** — Compare Blue Royale and FlexiShield side-by-side, view plan details and pricing
3. **Life Stages** — Match customers to the right product based on their life stage
4. **FAQ** — Quick answers to common client questions
5. **Training** — Follow the 4-week content calendar for social media posting
6. **Roadmap** — Track your growth from new advisor to team leader
7. **Resources** — Download presentation materials and reference documents

### For Presentations
- Use the collapsible product cards to reveal pricing only when needed
- Share the "Big Picture" modal insights to motivate potential advisors
- Reference the misconception cards to address client objections proactively

### Target Markets
- Frequent Travelers & Digital Nomads → Blue Royale
- OFWs & Expats → Blue Royale (worldwide coverage)
- Young Professionals → FlexiShield (affordable entry)
- Growing Families → Blue Royale Family Plan
- Senior Citizens → Blue Royale Senior
- HMO Holders → FlexiShield (top-up coverage)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software developed for Pacific Cross advisors. All product data, pricing, and content are confidential and proprietary to Pacific Cross Philippines.

---

## 📞 Support

For technical issues with this app, please contact the development team.

For product inquiries about Blue Royale and FlexiShield:
- Visit [Pacific Cross Philippines](https://www.pacificcross.com.ph/)
- Contact your Keystone training coordinator

---

<div align="center">

**Built for Pacific Cross Advisors in the Philippines** 🇵🇭

*Protecting families, one policy at a time.*

</div>
