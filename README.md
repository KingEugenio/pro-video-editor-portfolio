# CineFolio — Next-Generation Video Editor Portfolio & CMS

CineFolio is an architectural-grade, high-performance web portfolio and content management studio built specifically for professional video editors, directors, colorists, and motion designers.

It provides a decoupled presentation layer with multi-aspect ratio video handling (16:9 cinematic, 9:16 vertical social reels, 1:1 square, 4:5 vertical, 2.35:1 anamorphic), real-time Brand Studio with live theme customizer, integrated Google Drive hub, unified media resolver, and WordPress REST API readiness.

---

## 🏛️ Architecture Overview

```
                 ┌───────────────────────────────────────┐
                 │             DATA SOURCES              │
                 ├──────────────────┬────────────────────┤
                 │  Local Storage   │ WordPress REST API │
                 │  Custom REST API │ Headless CMS       │
                 └─────────┬────────┴──────────┬─────────┘
                           │                   │
                           ▼                   ▼
                 ┌───────────────────────────────────────┐
                 │        DATA ADAPTER INTERFACE         │
                 │   (LocalDataAdapter / WordPressAdapter)│
                 └──────────────────┬────────────────────┘
                                    │
                                    ▼
                 ┌───────────────────────────────────────┐
                 │          PORTFOLIO SERVICE            │
                 │  (Centralized Business Logic Engine)  │
                 └──────────────────┬────────────────────┘
                                    │
                                    ▼
                 ┌───────────────────────────────────────┐
                 │       REACT COMPONENT HIERARCHY       │
                 ├──────────────────┬────────────────────┤
                 │  Public Showcase │ Admin Studio CMS   │
                 └─────────┬────────┴──────────┬─────────┘
                           │                   │
                           ▼                   ▼
                 ┌───────────────────────────────────────┐
                 │             THEME ENGINE              │
                 │   (Design Tokens, Shaders & Tokens)   │
                 └───────────────────────────────────────┘
```

---

## ⚡ Technology Choice: React + Vite + TypeScript

### Why React was Chosen:
1. **Interactive Admin Studio**: Real-time reactive Brand Studio that computes CSS variables and applies theme tokens instantly to live preview viewports.
2. **Multi-Aspect Ratio Video Player**: Universal player state machine handling landscape, portrait reel swipe, timecoded cuts, Google Drive token resolution, and picture-in-picture.
3. **Skeleton Loading Architecture**: Page-aware, zero-layout-shift (CLS) skeleton components that mirror exact container geometries before network responses.
4. **Decoupled Data Layer**: Clean separation of Content, Presentation, Functionality, and Data Sources, allowing instantaneous switching between Local Storage, Custom API, and WordPress REST endpoints.
5. **Type Safety & Maintainability**: Strict TypeScript contracts prevent runtime bugs across complex video metadata and theme configurations.

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── admin/           # Private CMS Studio (Projects, Media, Themes, Drive, WordPress)
│   │   ├── public/          # Public Portfolio Sections (Hero, Portfolio, Services, About, Booking)
│   │   ├── skeletons/       # Page-aware skeleton loaders for zero layout shift
│   │   │   ├── core/        # Base skeleton primitives (video, text, buttons, cards)
│   │   │   ├── public/      # Skeletons for public pages
│   │   │   └── admin/       # Skeletons for CMS pages
│   │   └── ui/              # Universal Video Player, Aurora Canvas, Kinetic Typography, Sliders
│   ├── context/             # Global PortfolioContext & state persistence
│   ├── data/                # Initial seed data and schema templates
│   ├── services/            # Data Abstraction Layer & Media Provider Adapters
│   │   ├── dataAdapter.ts   # IDataAdapter, LocalDataAdapter, WordPressAdapter, CustomAPIAdapter
│   │   ├── portfolioService.ts # Unified PortfolioService singleton
│   │   ├── mediaProviders.ts# Unified Media Provider abstractions
│   │   └── mediaResolver.ts # Google Drive, YouTube, Vimeo URL parser & resolution
│   ├── themes/              # Centralized Design Tokens (colors, typography, spacing, elevation)
│   ├── types/               # TypeScript models (portfolio.ts, media.ts)
│   ├── App.tsx              # Main application shell with mode router & modals
│   ├── index.css            # Tailwind CSS imports & theme CSS variables
│   └── main.tsx             # Application bootstrap entry point
├── WORDPRESS_GUIDE.md       # Complete WordPress CPT & REST API integration guide
├── THEME_GUIDE.md           # Theme engine & design tokens documentation
├── MEDIA_GUIDE.md           # Multi-aspect ratio video player & Google Drive guide
├── SECURITY.md              # Security policies, token protection & permissions
├── DEPLOYMENT.md            # Production deployment & container configuration
├── CHANGELOG.md             # Version history & architectural milestones
└── ROADMAP.md               # Future development phases
```

---

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Launch development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Admin Access

- **Public Route**: Displays the public portfolio showcase, case studies, reels, and booking workflow.
- **Admin Studio**: Accessed via the top-right lock control or `/admin` route. Authenticates with encrypted session tokens and never exposes privileged credentials to the public client.
