# Theme Engine & Design Tokens Guide

CineFolio features an advanced, token-driven **Theme Engine** that separates visual styling from project content and application logic.

---

## 🎨 Theme Architecture

```
Portfolio Content (JSON/REST) 
       ↓
Theme Engine (BrandTheme state)
       ↓
Dynamic CSS Variables (--color-*, --font-*, --radius-*)
       ↓
Tailwind Utilities & Shaders
```

---

## 🎛️ Built-in Theme Directions

### 1. Cyber Noir / Midnight Studio (Default)
- Deep dark slate canvas (`#07070a`), elevated card surfaces (`#0d0d12`), electric violet & indigo accents (`#6366f1`).
- Clean, ultra-sharp typography pairing display Grotesk with high-legibility body fonts.
- Ideal for high-end commercial directors and cinematic colorists.

### 2. Aurora Spectrum
- Dynamic WebGL/Canvas aurora plasma curtains with brand-aware glow colors.
- Interactive mouse tracking and scroll reactivity.
- Ambient glassmorphism layers with mathematical corner radii (`Outer Radius - Padding = Inner Radius`).

### 3. Retro Digital Surrealism / CRT Archive
- Film grain overlay with subtle scanlines and VHS digital archive aesthetics.
- Monospace metadata badges and timecode markers.
- Non-destructive post-processing effects that preserve raw video quality.

### 4. Minimalist editorial
- High-contrast monochromatic palettes, generous negative space, refined serif headings, and museum-grade typography scale.

---

## 📐 Design Tokens Reference

All design tokens are defined in `src/themes/designTokens.ts` and injected as CSS variables:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #3b82f6;
  --color-background: #07070a;
  --color-surface: #0d0d12;
  --color-surface-elevated: #14141d;
  --color-text-primary: #f4f4f6;
  --color-text-secondary: #a1a1aa;
  --color-border: rgba(255, 255, 255, 0.08);

  --font-display: "Cabinet Grotesk", sans-serif;
  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;

  --radius-card-outer: 16px;
  --radius-card-inner: 12px;
}
```

---

## 🖌️ Customizing Themes via Brand Studio
In **Admin Studio > Brand Studio**, administrators can customize:
- Primary, secondary, surface, background, and button colors with live hexadecimal pickers.
- Typography styles and headline weight tokens.
- Aurora shader speed, blur radius, and color stops.
- Glassmorphism blur depth and opacity.
- Changes update in real-time across the live portfolio preview.
