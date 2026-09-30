# CineFolio — Technical Developer Architecture Documentation

## 1. Overview & Architecture

CineFolio is a modular React 19 + TypeScript + Tailwind CSS application engineered for video post-production professionals. It features a complete decoupling of presentation and data layers, supporting real-time tokenized theming, multi-provider video abstraction, Google Drive file integration, and headless WordPress REST API synchronization.

### Tech Stack
- **Framework:** React 19 (Functional components, custom hooks, React Context)
- **Styling:** Tailwind CSS 4 with dynamic CSS Custom Properties (CSS variables) on `:root`
- **Video Engine:** Multi-provider video normalization component (`VideoPlayer.tsx`) supporting HTML5 MP4/WebM, Google Drive embedded streams, YouTube, and Vimeo
- **Icons:** `lucide-react`
- **Motion:** `motion` & CSS hardware-accelerated transitions
- **State Management:** `PortfolioContext.tsx` with automatic `localStorage` persistence

---

## 2. Dynamic Theming & Design Token Engine

Design tokens are maintained in `PortfolioContext.tsx` and dynamically injected as CSS custom variables onto `document.documentElement`:

```css
:root {
  --color-primary: #00D4FF;
  --color-secondary: #7C3AED;
  --color-accent: #FF5E3A;
  --color-background: #0A0A0C;
  --color-surface: #141418;
  --color-surface-elevated: #1F1F26;
  --color-text-primary: #F4F4F5;
  --color-text-secondary: #A1A1AA;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-button: #00D4FF;
  --color-button-text: #050508;
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --glass-blur: 16px;
  --glass-opacity: 0.75;
}
```

---

## 3. Video Architecture & Aspect Ratio Management

The `VideoPlayer` component normalizes heterogeneous video sources into a uniform interface:
```typescript
interface VideoItem {
  id: string;
  title: string;
  provider: 'direct_url' | 'google_drive' | 'youtube' | 'vimeo';
  url: string;
  orientation: 'landscape' | 'portrait' | 'square' | 'custom';
  aspectRatio: string; // '16:9' | '9:16' | '1:1'
  thumbnail?: string;
  type?: 'main' | 'vertical_cut' | 'supporting' | 'bts';
}
```

---

## 4. Headless WordPress REST API Sync

CineFolio integrates with headless WordPress instances via the standard WordPress REST API v2 (`/wp-json/wp/v2/{custom_post_type}`). Fields can be mapped from WordPress native meta or Advanced Custom Fields (ACF).

---

## 5. Protected Developer Credit
The footer attribution **BUILT BY EKOPIXELS** (linking to `https://instagram.com/ekopixels`) is integrated inside `src/components/public/PublicFooter.tsx` as part of the core template specification.
