# CineFolio — User Setup & Customization Guide
### The Official Onboarding Manual & Customization Handbook for Video Editors, Filmmakers, and Visual Creators

---

## TABLE OF CONTENTS
1. [Start Here: Read This Before You Start](#1-start-here-read-this-before-you-start)
2. [What to Prepare Before Customization](#2-what-to-prepare-before-customization)
3. [Recommended File Organization](#3-recommended-file-organization)
4. [File Naming Rules](#4-file-naming-rules)
5. [Logo Setup](#5-logo-setup)
6. [Profile Photo & Headshot](#6-profile-photo--headshot)
7. [How to Add Your Videos](#7-how-to-add-your-videos)
8. [Direct Video Uploads & Self-Hosted Media](#8-direct-video-uploads--self-hosted-media)
9. [Video Aspect Ratios & Multi-Orientation Playback](#9-video-aspect-ratios--multi-orientation-playback)
10. [Video Poster Thumbnails](#10-video-poster-thumbnails)
11. [Google Drive Video Hub Integration](#11-google-drive-video-hub-integration)
12. [YouTube & Shorts Integration](#12-youtube--shorts-integration)
13. [Vimeo Pro & Showcase Integration](#13-vimeo-pro--showcase-integration)
14. [Adding Images & Still Galleries](#14-adding-images--still-galleries)
15. [Adding Documents (PDF Rate Cards, Media Kits, Resumes)](#15-adding-documents)
16. [Make the Website Match Your Brand](#16-make-the-website-match-your-brand)
17. [Color Customization Workflow](#17-color-customization-workflow)
18. [Color Accessibility & Readability](#18-color-accessibility--readability)
19. [Typography & Font Selection](#19-typography--font-selection)
20. [Brand Studio: Full Settings Reference](#20-brand-studio-full-settings-reference)
21. [Theme Customization: Presentation vs Identity](#21-theme-customization-presentation-vs-identity)
22. [Retro CRT & VHS Theme Settings](#22-retro-crt--vhs-theme-settings)
23. [Aurora Spectrum Dynamic Glow Settings](#23-aurora-spectrum-dynamic-glow-settings)
24. [Motion, Transitions & Reduced-Motion Accessibility](#24-motion-transitions--reduced-motion-accessibility)
25. [Adding a Project: Complete Field-by-Field Walkthrough](#25-adding-a-project-complete-field-by-field-walkthrough)
26. [Project Media: Multi-Edit & BTS Asset Bundles](#26-project-media-multi-edit--bts-asset-bundles)
27. [Project Lifecycle & Publishing Status](#27-project-lifecycle--publishing-status)
28. [Social Media Channels & Creative Profiles](#28-social-media-channels--creative-profiles)
29. [Contact & Project Booking Inquiries](#29-contact--project-booking-inquiries)
30. [WhatsApp Direct Booking Integration](#30-whatsapp-direct-booking-integration)
31. [Search Engine Optimization (SEO) & Metadata](#31-search-engine-optimization-seo--metadata)
32. [Favicon & Browser Tab Icons](#32-favicon--browser-tab-icons)
33. [Social Sharing Cards (Open Graph / Twitter Previews)](#33-social-sharing-cards-open-graph--twitter-previews)
34. [Using the Template with WordPress](#34-using-the-template-with-wordpress)
35. [WordPress Media Management](#35-wordpress-media-management)
36. [WordPress Plugins & REST API Configuration](#36-wordpress-plugins--rest-api-configuration)
37. [Where Can I Host My Website?](#37-where-can-i-host-my-website)
38. [Deploying the Template Step-by-Step](#38-deploying-the-template-step-by-step)
39. [Custom Domain Setup](#39-custom-domain-setup)
40. [Domain Troubleshooting](#40-domain-troubleshooting)
41. [Environment Variables Explained for Beginners](#41-environment-variables-explained-for-beginners)
42. [Website Security Best Practices](#42-website-security-best-practices)
43. [Backups, Portability & Data Export](#43-backups-portability--data-export)
44. [Performance & Video Optimization Guidelines](#44-performance--video-optimization-guidelines)
45. [Mobile Readiness Checklist](#45-mobile-readiness-checklist)
46. [Master Pre-Publish Checklist](#46-master-pre-publish-checklist)
47. [Common Mistakes & Troubleshooting](#47-common-mistakes--troubleshooting)
48. [Frequently Asked Questions (FAQ)](#48-frequently-asked-questions-faq)
49. [Beginner Glossary](#49-beginner-glossary)
50. [Advanced Users & Developers Section](#50-advanced-users--developers-section)
51. [The 20-Step Creator Journey](#51-the-20-step-creator-journey)
52. [Final Message to the Creator](#52-final-message-to-the-creator)

---

# 1. START HERE: READ THIS BEFORE YOU START

Welcome to **CineFolio**! This website template was built specifically for video editors, colorists, commercial directors, VFX artists, motion designers, documentary filmmakers, and post-production studios.

You do **not** need to be a software developer, web programmer, or designer to build an extraordinary portfolio with this template. Every aspect of your site—from project showcases to colors, fonts, showreel players, contact booking forms, and video streams—can be customized visually through the built-in **Admin Studio** or simple configuration settings.

---

### What You Receive
* **A High-Performance Video Portfolio**: Ultra-fast loading website featuring a custom universal video player supporting standard widescreen (16:9), vertical social cuts (9:16), square feeds (1:1), and cinematic anamorphic ratios (2.35:1).
* **The Admin Studio**: A visual management dashboard accessible at `/admin` where you can upload projects, organize media, review client inquiries, and customize your visual brand live without touching code.
* **4 Curated Visual Themes**:
  1. **Cyber Noir (Default)**: Sleek, high-contrast dark palette with luminous cyan/emerald accents and clean glass borders.
  2. **Aurora Spectrum**: Organic, fluid color auroras that react smoothly to cursor movement and scroll position.
  3. **Retro CRT Archive**: Nostalgic analog look with subtle film grain, CRT scanlines, timecode displays, and REC indicators.
  4. **Minimal Monolith**: Ultra-clean, distraction-free architectural layout with high-contrast typography.
* **Universal Media Support**: Stream directly from Google Drive, YouTube, Vimeo, or self-hosted CDN / Direct MP4 links.
* **Decoupled Data Architecture**: Store data locally in your browser, connect directly to a WordPress REST API backend, or export your complete portfolio as a single JSON file.

---

### What Can Be Customized (Without Code)
* Your name, company title, bio, and availability status badge.
* Logo, favicon, and hero profile photo.
* Primary, secondary, accent, surface, and text colors.
* Heading, body, and monospace font families.
* Complete project catalog, client names, roles, software tags, and release dates.
* Multi-version videos per project (e.g., Director’s Cut, 9:16 Reels Cut, Behind-the-Scenes).
* Services offered, starting rates, and interactive deliverables.
* Client testimonials with headshots and company credentials.
* Contact booking questionnaire with budget brackets and date pickers.
* Direct WhatsApp one-click booking button with custom pre-filled greetings.
* Social media profiles and custom portfolio links.

---

### What Should NOT Be Modified (Unless You Are a Developer)
* Core React components located in `/src/components/ui/` (buttons, dialogs, sliders).
* Internal state wiring in `/src/context/PortfolioContext.tsx`.
* Routing setup in `/src/App.tsx`.
* Build scripts and configurations in `vite.config.ts`, `tsconfig.json`, or `package.json`.

---

### How the Template Separates Content from Design
In CineFolio, your **content** (your video titles, client stories, videos, and images) is strictly separated from your **design** (colors, typography, and visual effects). 
* **Content** is stored in a clean structured format (or your WordPress backend).
* **Design** is governed by centralized design tokens (CSS variables).
* **Benefit**: You can switch your website theme from *Cyber Noir* to *Retro CRT* or change your brand color from Emerald Green to Electric Blue in one click, and **every single project and video will instantly adapt without losing data**.

---

### The Complete Setup Roadmap

```text
┌──────────────────────────────────────────────┐
│             DOWNLOAD TEMPLATE                │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│           PREPARE YOUR ASSETS                │
│ (Videos, Thumbnails, Bios, Brand Colors)     │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│           OPEN THE ADMIN STUDIO              │
│       (Navigate to /admin in browser)        │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│           CONFIGURE BRAND STUDIO             │
│ (Name, Tagline, Logo, Palette, Fonts)        │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│             ADD HERO SHOWREEL                │
│    (Google Drive, YouTube, or Direct URL)    │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│         UPLOAD PORTFOLIO PROJECTS            │
│  (16:9 Commercials, 9:16 Shorts, BTS Stills) │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        CUSTOMIZE SERVICES & REVIEWS          │
│ (Editing, Color Grading, VFX, Testimonials)  │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│      SET UP CONTACT & WHATSAPP BOOKING       │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│         TEST ON DESKTOP & MOBILE             │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│          CHOOSE HOSTING & DEPLOY             │
│       (Vercel, Netlify, or Web Server)       │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│         CONNECT YOUR CUSTOM DOMAIN           │
│        (e.g., www.yournamefilms.com)         │
└──────────────────────────────────────────────┘
```

---

# 2. WHAT YOU SHOULD PREPARE BEFORE CUSTOMIZATION

Before you open the editor or admin panel, having your creative assets organized will save you hours of time. Use this checklist:

```text
CREATOR IDENTITY
[ ] Full Name or Studio Name (e.g., "Elena Rostova" or "Apex Visuals")
[ ] Professional Tagline (e.g., "Commercial Video Editor & Colorist")
[ ] Short Bio (2–3 sentences highlighting experience, genres, and clients)
[ ] High-Resolution Profile Photo / Headshot (Square 1:1, JPG/WebP)
[ ] Vector Logo in SVG or Transparent PNG (Light and Dark versions)
[ ] Browser Favicon (512x512 PNG or ICO)

SHOWREEL & HERO VIDEO
[ ] Master Showreel URL or Video File (16:9, high energy, under 90 seconds)
[ ] Showreel Poster Frame / High-Res Thumbnail Image

PROJECT SHOWCASE ASSETS (Prepare at least 4 to 8 projects)
[ ] Project Titles (e.g., "Nike — Rise to Greatness")
[ ] Client Names (e.g., "Nike / Wieden+Kennedy")
[ ] Year of Production (e.g., "2026")
[ ] Category (e.g., Commercial, Narrative, Music Video, Documentary, Social Reel)
[ ] Your Specific Role (e.g., "Lead Video Editor & Online Finishing")
[ ] Software / Tools Used (e.g., Premiere Pro, DaVinci Resolve, After Effects)
[ ] Project Story (Client brief, creative approach, and delivery results)
[ ] Video Links / IDs (YouTube URL, Vimeo URL, Google Drive link, or direct MP4)
[ ] Aspect Ratio (16:9 Widescreen, 9:16 Reel, 1:1 Square, or 2.35:1 Scope)
[ ] High-Resolution Cover Thumbnail (1920x1080 for widescreen or 1080x1920 for vertical)
[ ] Behind-the-Scenes (BTS) or Before/After Color Grade Stills (Optional)

BUSINESS & BOOKING INFORMATION
[ ] List of Services with descriptions (e.g., Offline Editing, Color Grading, Sound Design)
[ ] Testimonials & Client Endorsements (Quote, Client Name, Role, Company, Avatar)
[ ] Contact Email Address (e.g., "contact@yournamefilms.com")
[ ] WhatsApp Business Number with Country Code (e.g., "+1 (555) 019-2834")
[ ] Social Profile Handles (Instagram, YouTube, Vimeo, LinkedIn, TikTok, X, Behance)
[ ] Privacy Policy and Terms of Service (PDF link or URL)
```

---

# 3. RECOMMENDED FILE ORGANIZATION

Keep a dedicated folder on your computer named `MY-PORTFOLIO-ASSETS` before uploading. Organizing your files cleanly makes updating your website effortless:

```text
MY-PORTFOLIO-ASSETS/
│
├── 01-BRAND-IDENTITY/
│   ├── logo-light.svg            ← White/Light logo for dark backgrounds
│   ├── logo-dark.svg             ← Dark logo for light sections
│   ├── logo-icon-only.png        ← Square icon for mobile headers
│   ├── favicon-512x512.png       ← Browser tab icon
│   └── profile-headshot.jpg      ← Square 1:1 creator portrait
│
├── 02-SHOWREEL/
│   ├── showreel-2026-master.mp4  ← Master showreel video
│   └── showreel-poster-1080p.jpg ← Showreel cover frame
│
├── 03-PROJECTS/
│   ├── 01-nike-commercial/
│   │   ├── hero-16x9-cut.mp4     ← Master landscape video
│   │   ├── cover-thumb-16x9.jpg  ← High-res thumbnail
│   │   ├── reel-9x16-cut.mp4     ← Vertical adaptation
│   │   └── bts-stills/           ← Color grading & timeline screenshots
│   │
│   ├── 02-lumina-music-video/
│   │   ├── master-video.mp4
│   │   └── cover-thumb.jpg
│   │
│   └── 03-vogue-fashion-reel/
│       ├── vertical-reel-9x16.mp4
│       └── cover-thumb-9x16.jpg
│
├── 04-DOCUMENTS/
│   ├── rate-card-2026.pdf        ← Public service pricing
│   ├── media-kit-editorial.pdf   ← Commercial credits & equipment list
│   └── privacy-policy.pdf
│
└── 05-FONTS/ (Optional custom web fonts)
```

---

# 4. FILE NAMING RULES

Web browsers and Content Delivery Networks (CDNs) are sensitive to filenames. Always adhere to these web-safe naming conventions:

### ✅ RECOMMENDED (Clean, Web-Safe, SEO-Friendly):
* `nike-rise-commercial-thumbnail.jpg`
* `showreel-video-editor-2026.mp4`
* `elena-rostova-headshot.webp`
* `apex-visuals-logo-white.svg`
* `davinci-resolve-color-grade-bts-01.jpg`

### ❌ DISCOURAGED (Prone to broken links and browser errors):
* `Final_Cut_v3_NEW (1).mp4` (Spaces, parentheses, and mixed casing break URLs)
* `IMG_938472.mp4` (Non-descriptive and hurts SEO)
* `Untitled Project 7 FINAL FINAL.mp4` (Hard to identify in media managers)
* `logo new new!.png` (Special characters like `!` and spaces cause 404 errors)

> **Golden Rule**: Use only lowercase letters (`a-z`), numbers (`0-9`), and hyphens (`-`). Never use spaces, underscores, exclamation marks, or symbols in web filenames.

---

# 5. LOGO SETUP

Your logo appears in the sticky navigation header, public footer, and the admin studio header.

```text
[SCREENSHOT: Brand Studio > Logo & Identity Section]
```

### Supported Formats & Guidelines
1. **SVG (Scalable Vector Graphics) — Strongly Recommended**:
   * Stays perfectly crisp on every screen resolution (Retina displays, 4K monitors, and mobile phones).
   * File size is microscopic (typically 5KB–20KB).
2. **PNG with Transparency**:
   * Ensure the background is transparent (no solid white or checkerboard square boxes).
   * Recommended dimensions: 600px wide by 160px high at 72 DPI.

### Handling Different Logo Variations
* **Horizontal vs Square**: Horizontal logos (aspect ratio 3:1 to 4:1) fit naturally into the navigation bar. If you only have a square crest/mark, you can upload it as your icon mark and display your studio name in text next to it.
* **Light vs Dark Backgrounds**:
  * Since CineFolio defaults to a deep luxury dark palette (*Cyber Noir*), your primary logo should use light or white typography with colored accents.
  * If using the *Minimal* theme with light surface mode, ensure your logo has strong contrast against light gray `#f4f4f5`.

```text
HEADER NAVIGATION LOGO BEHAVIOR:
┌─────────────────────────────────────────────────────────────┐
│ [LOGO ICON]  ELENA ROSTOVA      [Projects] [Services] [Book]│
└─────────────────────────────────────────────────────────────┘
  ↑ Recommended display height: 28px to 36px in navigation
```

---

# 6. PROFILE PHOTO & HEADSHOT

Your profile headshot appears in the **About Section**, the **Hero Greeting**, and alongside social contact cards.

```text
[SCREENSHOT: Brand Studio > Profile Headshot Upload & Preview]
```

### Specifications:
* **Recommended Aspect Ratio**: Square `1:1` (e.g., 1000px × 1000px).
* **Format**: WebP or JPG (compressed at 80%–85% quality).
* **File Size**: Under 250 KB for instant loading.
* **Framing**: Clean portrait cropped from the chest or shoulders up, with good lighting and contrast against dark backgrounds.

### Difference Between Profile Photo and Project Thumbnail:
* **Profile Photo**: Represents *you* as the creator/editor (shown in About & Bio).
* **Project Thumbnail**: Represents a *specific film/commercial project* (shown on the portfolio grid and video modal).

---

# 7. HOW TO ADD YOUR VIDEOS

CineFolio includes an intelligent **Universal Video Player** that supports four streaming methods. You can mix and match providers across different projects.

```text
[SCREENSHOT: Project Editor > Media Source Selector (Drive / YouTube / Vimeo / Direct)]
```

### Media Provider Comparison Matrix

| Method | Best For | Advantages | Limitations |
| :--- | :--- | :--- | :--- |
| **Google Drive Hub** | Large raw video libraries & existing client archives | Easy organization, no extra hosting cost, automatic thumbnail generation | Subject to Google Drive viewer rate limits on viral spikes |
| **YouTube & Shorts** | Public commercials, trailers, and viral 9:16 reels | Global ultra-fast CDN, zero bandwidth cost, excellent mobile playback | YouTube branding/watermark visible in player controls |
| **Vimeo Pro** | Premium cinematic showcases, commercial directors | Clean, distraction-free player, privacy domain restrictions, high bitrates | Requires a paid Vimeo subscription for large unbranded storage |
| **Direct Upload / CDN** | Self-hosted clips, short video loops, private mp4 files | Complete control over player interface, zero third-party branding | Consumes your own server bandwidth and hosting storage |

---

# 8. DIRECT VIDEO UPLOADS & SELF-HOSTED MEDIA

When using self-hosted MP4/WebM video files:

### Step-by-Step Procedure:
1. Log into your Admin Studio (`/admin`).
2. Navigate to **Portfolio Projects** → click **New Project**.
3. In the **Media Section**, select **Direct File / CDN URL**.
4. Paste the direct URL pointing to your `.mp4` or `.webm` file, or select a file from your media library.
5. Enter the video title (e.g., "Director's Cut — 4K Master").
6. Select the video orientation (`16:9 Landscape`, `9:16 Portrait`, `1:1 Square`, or `2.35:1 Anamorphic`).
7. Upload a high-resolution poster thumbnail.
8. Fill in the client name, role, software, and project brief.
9. Click **Save Project**.
10. Click **Preview on Live Site** to test playback across desktop and mobile.

### Compression Guidelines for Self-Hosted Video:
* **Codec**: H.264 (AVC) or H.265 (HEVC) for MP4, or VP9/AV1 for WebM.
* **Audio Codec**: AAC stereo, 48kHz, 192kbps.
* **Bitrate**:
  * 1080p 24/30fps: 4,000–6,000 kbps (4–6 Mbps).
  * 1080p 60fps / 4K preview: 8,000–12,000 kbps.
* **Maximum File Size**: We strongly recommend keeping direct video files under **50MB** for portfolio previews to prevent slow buffering for visitors on mobile data. For larger files, embed via Vimeo, YouTube, or Google Drive.

---

# 9. VIDEO ASPECT RATIOS & MULTI-ORIENTATION PLAYBACK

Unlike standard portfolio templates that force every video into a 16:9 widescreen box, CineFolio preserves and celebrates native aspect ratios:

```text
┌─────────────────────────────────────────────────────────────┐
│ 16:9 Widescreen (1920x1080)                                 │
│ Best for: Commercials, Narrative Films, Music Videos, Docs  │
└─────────────────────────────────────────────────────────────┘

┌───────────────┐  ┌───────────────────────┐  ┌─────────────┐
│ 9:16 Vertical │  │ 1:1 Square            │  │ 4:5 Portrait│
│ (1080x1920)   │  │ (1080x1080)           │  │ (1080x1350) │
│ Best for:     │  │ Best for:             │  │ Best for:   │
│ TikTok, Reels,│  │ Social Carousels,     │  │ Instagram   │
│ YouTube Shorts│  │ Album Teasers         │  │ Feed Posts  │
└───────────────┘  └───────────────────────┘  └─────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2.35:1 Anamorphic / CinemaScope (1920x817)                  │
│ Best for: Feature Films, Cinematic Trailers, Widescreen Ads │
└─────────────────────────────────────────────────────────────┘
```

When a visitor opens a project, the universal video player dynamically adjusts its framing without awkward black letterboxing or cropped faces.

---

# 10. VIDEO POSTER THUMBNAILS

A high-converting thumbnail makes the difference between a visitor passing by and an agency producer clicking to watch your reel.

### How to Add & Optimize Thumbnails:
1. In the **Project Editor**, upload a dedicated image in the **Thumbnail Cover** field.
2. If using YouTube or Google Drive, CineFolio will **automatically pull the high-definition poster image** as an initial default.
3. You can replace the default frame at any time with a custom color-graded high-resolution still.

### Pro Tips for Video Thumbnails:
* Choose a dynamic frame with high emotional expression, bold lighting, or striking color contrast.
* Avoid frames that are blurry or mid-motion blur.
* Do not bake play icons or text onto the thumbnail image itself—CineFolio renders an animated, interactive play button on hover.

---

# 11. GOOGLE DRIVE VIDEO HUB INTEGRATION

You can stream videos stored directly in your personal or Google Workspace Drive without paying for expensive video hosting.

```text
[SCREENSHOT: Admin > Google Drive Media Hub Manager]
```

### Step-by-Step Google Drive Setup:
1. **Organize Folders in Google Drive**:
   * Create a folder called `00-CINEFOLIO-PORTFOLIO`.
   * Inside, create subfolders for each project (e.g., `Project-Nike`, `Project-RedBull`).
2. **Set File Sharing Permissions**:
   * Right-click your video file in Google Drive → select **Share** → **Share**.
   * Under *General access*, change from *Restricted* to **Anyone with the link**.
   * Set role to **Viewer**.
   * Click **Copy link**.
3. **Add to CineFolio**:
   * Open the CineFolio Project Editor.
   * Select **Google Drive** as the provider.
   * Paste the copied share link (e.g., `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view?usp=sharing`).
   * CineFolio automatically extracts the unique **File ID** (`1A2B3C4D5E6F7G8H9`) and configures seamless streaming and thumbnail extraction.
4. **How It Works**:
   * CineFolio does **not** copy or duplicate massive video files to your web server. It stores the secure media pointer and streams the video on demand.
5. **What If You Move or Delete a File?**:
   * Moving a file to a different folder in Google Drive does **not** break the link (Google Drive IDs are permanent).
   * If you delete the file or change permissions back to *Restricted*, the video will display an access error on your website.

---

# 12. YOUTUBE & SHORTS INTEGRATION

```text
[SCREENSHOT: Adding a YouTube Video and Auto-Detecting 9:16 Shorts]
```

### Supported URL Formats:
* Standard Desktop: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
* Short Link: `https://youtu.be/dQw4w9WgXcQ`
* YouTube Shorts: `https://www.youtube.com/shorts/3xyz987abc`
* Embed Link: `https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ`

### Visibility & Privacy Settings:
* **Public**: Anyone on YouTube and your website can find and watch the video.
* **Unlisted (Recommended for Client Work)**: Only people with the direct link or viewing your portfolio can watch the video. It will not show up in YouTube public searches or channel pages.
* **Private (Not Supported for Websites)**: Private videos can only be watched by logged-in accounts invited by email. They will fail to play on public websites.

---

# 13. VIMEO PRO & SHOWCASE INTEGRATION

### Adding Vimeo Videos:
1. Copy your Vimeo video link (e.g., `https://vimeo.com/76979871` or `https://player.vimeo.com/video/76979871`).
2. Paste the link into the **Video URL** input in CineFolio.
3. CineFolio embeds the video using Vimeo's privacy-enhanced, responsive player.

### Vimeo Privacy Settings:
* If you have a **Vimeo Plus, Pro, or Enterprise** account, you can set video privacy to **Hide from Vimeo.com** and enable **Domain-Level Privacy** (e.g., allowing embeds only on `yourdomain.com`). This keeps your commercial client work completely private to your portfolio.

---

# 14. ADDING IMAGES & STILL GALLERIES

Images in CineFolio support lazy-loading and responsive resolution scaling.

### Recommended Formats:
* **WebP**: Best overall web format. Provides 30% smaller file sizes than JPG with identical visual quality.
* **JPG / JPEG**: Ideal for photo galleries, color grading before/after stills, and background artwork.
* **PNG**: Use only when transparency is strictly required.
* **SVG**: For vector icons, client logos, and brand emblems.

### Image Optimization Rules:
* Compress all still photos before uploading (tools like Squoosh.app or TinyPNG).
* Keep full-screen hero backgrounds under **300KB**.
* Keep project grid thumbnails under **150KB**.

---

# 15. ADDING DOCUMENTS

You can attach downloadable or viewable PDF documents directly to your public navigation or contact booking section:

```text
PUBLIC DOCUMENTS (Safe for All Visitors):
├── Editorial Rate Card & Packages (PDF)
├── Commercial Treatment & Equipment Kit (PDF)
├── Creative Resume / CV (PDF)
└── Studio Terms & Conditions (PDF)

⚠️ WARNING: PRIVATE DOCUMENTS (Never Upload Publicly):
├── Raw Client Contracts with NDAs
├── Invoices Containing Bank Account Numbers
└── Private Client Contact Details
```

---

# 16. MAKE THE WEBSITE MATCH YOUR BRAND

CineFolio uses **Centralized Design Tokens**. This means you do **not** need to edit dozens of individual page sections or CSS stylesheets to change colors.

```text
[SCREENSHOT: Brand Studio > Live Palette Editor]
```

### Key Brand Tokens You Can Customize:
* **Primary Brand**: The dominant signature color (e.g., Electric Violet `#8b5cf6`, Cyan `#06b6d4`, or Emerald `#10b981`). Used for active navigation pills, focus states, and primary CTA buttons.
* **Secondary Brand**: Complementary accent color used for badges, hover states, and gradient highlights.
* **Accent Tone**: High-energy highlight used for showreel badges, client tags, and live status dots.
* **Surface Background**: Deep luxury background color (e.g., `#09090b` or `#030712`).
* **Text Main**: High-contrast typography color (e.g., `#f4f4f5` or `#ffffff`).
* **Text Muted**: Secondary label color (e.g., `#a1a1aa` or `#71717a`).
* **Border Token**: Subtle glass border dividers (e.g., `rgba(255, 255, 255, 0.08)`).

---

# 17. COLOR CUSTOMIZATION WORKFLOW

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. CHOOSE YOUR BRAND PALETTE                                │
│    (Pick 1 Primary Color + 1 Accent Color)                  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. ENTER HEX CODES IN BRAND STUDIO                          │
│    (Navigate to /admin → Brand Studio → Colors)             │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. INSTANT LIVE PREVIEW                                     │
│    (Observe immediate theme refresh in preview panel)       │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. CHECK CONTRAST & LEGIBILITY                              │
│    (Verify text is crisp on buttons & dark surfaces)        │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. CLICK SAVE BRAND SETTINGS                                │
│    (Your changes are applied globally across all pages)     │
└─────────────────────────────────────────────────────────────┘
```

### Where to Find Your HEX Codes:
HEX codes are 6-character color codes preceded by a hash (e.g., `#00E599`). You can find them in:
* Adobe Illustrator / Photoshop Color Picker.
* DaVinci Resolve color swatches.
* Online palette tools like Coolors.co.

---

# 18. COLOR ACCESSIBILITY & READABILITY

> ⚠️ **IMPORTANT RULE**: A beautiful color is useless if your visitors cannot read your project descriptions.

### Golden Rules for High Contrast:
1. **Never put dark gray text on a dark background** (e.g., `#444444` on `#0d0d0d`). Always use bright off-white (`#f4f4f5`) for body text.
2. **Ensure button text contrasts sharply with button fill**: If your primary button is Neon Yellow (`#facc15`), the button text must be Black (`#000000`), not White (`#ffffff`).
3. **WCAG AA Standard**: Ensure at least a `4.5:1` contrast ratio between text and its background.

---

# 19. TYPOGRAPHY & FONT SELECTION

```text
[SCREENSHOT: Brand Studio > Typography Selection]
```

CineFolio categorizes typography into four functional roles:

1. **Display Font**: Used for high-impact hero headings and major section titles.
   * *Recommendations*: Space Grotesk, Syne, Cabinet Grotesk, Clash Display.
2. **Heading Font**: Used for project titles, modal headers, and service titles.
   * *Recommendations*: Plus Jakarta Sans, Manrope, Sora, Inter.
3. **Body Font**: Used for project descriptions, bio paragraphs, and client reviews.
   * *Recommendations*: Inter, Plus Jakarta Sans, DM Sans.
4. **Monospace / Metadata Font**: Used for timecodes, aspect ratio tags, software tags, and release dates.
   * *Recommendations*: JetBrains Mono, Space Mono, IBM Plex Mono.

---

# 20. BRAND STUDIO: FULL SETTINGS REFERENCE

```text
[SCREENSHOT: Brand Studio Overview Screen with all tabs]
```

| Setting Group | Available Fields | Description & Purpose |
| :--- | :--- | :--- |
| **Profile & Identity** | Full Name, Professional Title, Bio, Availability Status, Location | Sets your public identity in the Hero and About sections. |
| **Logo & Mark** | Main Logo URL, Mobile Icon URL, Favicon URL | Defines your visual header and browser tab marks. |
| **Color Tokens** | Primary, Secondary, Accent, Background, Surface, Text, Border | Controls the global color engine and live CSS variables. |
| **Typography** | Heading Font, Body Font, Monospace Font, Base Scale | Manages font pairings across all headings and body text. |
| **Social Links** | Instagram, Vimeo, YouTube, TikTok, LinkedIn, X, Behance, WhatsApp | Controls footer and header social icons and links. |
| **Contact & Booking** | Contact Email, WhatsApp Phone, Booking Notice, Rates | Configures direct inquiry flows and availability indicators. |

---

# 21. THEME CUSTOMIZATION: PRESENTATION VS IDENTITY

In CineFolio:
* **Your Brand** is *who you are* (Your logo, videos, bio, projects, and custom colors).
* **Your Theme** is *the aesthetic lens* through which your brand is presented.

You can switch themes at any time without losing a single project or video:

```text
               YOUR PERMANENT PORTFOLIO DATA
       (Projects, Videos, Bio, Reviews, Socials)
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   CYBER NOIR      AURORA SPECTRUM     RETRO CRT
  (Sleek Glass)     (Fluid Glows)    (Analog Scanlines)
```

---

# 22. RETRO CRT & VHS THEME SETTINGS

When you activate the **Retro CRT Archive** theme, CineFolio adds subtle vintage analog aesthetics:

```text
[SCREENSHOT: Retro CRT Theme in Action with Timecode and REC Badges]
```

### Configurable Retro Controls:
* **Scanline Intensity (0% to 100%)**: Controls the subtle horizontal CRT monitor lines.
* **Film Grain / Noise Opacity (0% to 30%)**: Adds organic 35mm film grain texture over dark surfaces.
* **RGB Chromatic Aberration**: Adds a slight red/blue fringe on high-contrast hover states.
* **Timecode & REC Badge**: Renders an authentic live running video timecode (`00:01:24:18 [REC]`) in the header.

> **Tip**: Keep film grain subtle (under 12%) so that your portfolio retains a modern, professional polish.

---

# 23. AURORA SPECTRUM DYNAMIC GLOW SETTINGS

The **Aurora Spectrum** theme projects rich, blurred ambient light auroras behind your projects.

### How Aurora Works:
* **Auto-Color Generation**: CineFolio automatically extracts the glowing ambient colors from your configured **Primary** and **Accent** brand tokens.
* **Cursor Follow & Fluid Motion**: Glows gently drift across the screen and react smoothly to mouse movement.
* **Performance Safe**: Built using GPU-accelerated CSS filters with zero battery drain.

---

# 24. MOTION, TRANSITIONS & REDUCED-MOTION ACCESSIBILITY

* **Smooth Reveal Animations**: As visitors scroll down the page, project cards and statistics smoothly fade in.
* **Hover Micro-Interactions**: Video cards scale up slightly with ambient glass highlights on mouse hover.
* **Reduced Motion Support**: If a visitor has *Reduce Motion* enabled in their operating system settings, CineFolio automatically disables heavy motion effects and switches to clean, instant transitions.

---

# 25. ADDING A PROJECT: COMPLETE WALKTHROUGH

```text
[SCREENSHOT: Project Form Modal with All Fields]
```

Follow this step-by-step field guide when adding a new film or video project:

1. **Project Title** (e.g., `Porsche — The Electric Horizon`): The bold headline of the project.
2. **Client Name** (e.g., `Porsche AG / Agency Monolith`): The brand or production company.
3. **Release Year** (e.g., `2026`): Production or broadcast year.
4. **Category** (e.g., `Commercial`, `Music Video`, `Narrative`, `Documentary`, `Social / Vertical`, `Color Grading`): Used by visitors to filter projects on the home page.
5. **Your Specific Role** (e.g., `Lead Video Editor`, `Colorist`, `Sound Designer`): Highlights your contribution.
6. **Services Rendered** (e.g., `Offline Cut`, `Online Conform`, `VFX Motion`, `Sound Mixing`): Tags detailing scope of work.
7. **Software & Gear** (e.g., `Premiere Pro`, `DaVinci Resolve`, `After Effects`): Displays recognizable software badges.
8. **Thumbnail URL** (e.g., `https://.../porsche-cover.jpg`): The high-definition card image.
9. **Primary Video URL** (e.g., YouTube, Vimeo, Google Drive, or MP4 link): The master video stream.
10. **Aspect Ratio** (e.g., `16:9`, `9:16`, `1:1`, `2.35:1`): The native framing ratio.
11. **Project Brief & Story**:
    * *The Brief*: What was the client trying to achieve?
    * *Creative Approach*: How did your editing rhythm, pacing, and color choices solve the challenge?
    * *Result & Impact*: Festival awards, YouTube view counts, or campaign ROI.
12. **Featured Toggle**: Switch ON to display this project in the top featured section.
13. **Publish Status**: Set to `Published` (visible to the public) or `Draft` (visible only in Admin Studio).

---

# 26. PROJECT MEDIA: MULTI-EDIT & BTS ASSET BUNDLES

Modern commercial campaigns rarely consist of just one 16:9 video. CineFolio allows you to attach multiple media versions to a single project:

```text
SINGLE PROJECT: "Apex Fitness Global Campaign"
├── Video 1: Master Director's Cut (16:9 Widescreen)
├── Video 2: Social Media Reel (9:16 Vertical)
├── Video 3: 15-Second Broadcast Teaser (16:9)
├── Video 4: Colorist Breakdown / Before & After (16:9)
└── Gallery: 4 Behind-the-Scenes Production Stills
```

Visitors can switch between versions inside the project modal using seamless video tabs.

---

# 27. PROJECT LIFECYCLE & PUBLISHING STATUS

* **Published**: The project is live and immediately viewable by anyone visiting your website.
* **Draft**: The project is saved in your Admin Studio for you to edit and review, but hidden from public visitors.
* **Archived (Coming Soon)**: Unlisted from the main grid but accessible via direct link for private client screener pitches.

---

# 28. SOCIAL MEDIA CHANNELS & CREATIVE PROFILES

Connect your creative profiles in **Brand Studio** → **Social Links**:

* **Instagram** (e.g., `https://instagram.com/yourhandle`)
* **YouTube** (e.g., `https://youtube.com/@yourchannel`)
* **Vimeo** (e.g., `https://vimeo.com/yourhandle`)
* **TikTok** (e.g., `https://tiktok.com/@yourhandle`)
* **LinkedIn** (e.g., `https://linkedin.com/in/yourname`)
* **X / Twitter** (e.g., `https://x.com/yourhandle`)
* **Behance** (e.g., `https://behance.net/yourprofile`)
* **Dribbble** (e.g., `https://dribbble.com/yourstudio`)

> **Note**: CineFolio only displays icons for channels where you have entered a valid URL. If you leave a field empty, that social icon automatically hides itself.

---

# 29. CONTACT & PROJECT BOOKING INQUIRIES

```text
[SCREENSHOT: Public Contact Booking Form with Date Picker and Budget Selector]
```

The public contact section is an interactive project questionnaire designed to filter serious client inquiries:

### Client Inquiry Fields:
* Client Name & Organization / Agency.
* Email Address & WhatsApp Phone Number.
* Project Type (Commercial, Music Video, Narrative, Social Series, Color Grading).
* Estimated Project Budget Bracket (e.g., `<$2,500`, `$2,500 - $5,000`, `$5,000 - $10,000`, `$10,000+`).
* Target Delivery Date.
* Project Brief & Reference Links.

### How Inquiries are Handled:
1. **Admin Inquiries Inbox**: When a client submits the form, the inquiry is saved immediately in your Admin Studio (`/admin` → **Inquiries**).
2. **Formspree / Custom API Integration**: You can add your custom Formspree endpoint URL in **Settings** to receive instant email notifications directly to your personal inbox whenever a client submits a booking request.

---

# 30. WHATSAPP DIRECT BOOKING INTEGRATION

For rapid client turnaround, CineFolio includes a dedicated WhatsApp Direct Chat action.

### Setup Instructions:
1. Navigate to **Brand Studio** → **Contact Settings**.
2. Enter your phone number with your **full international country code** without spaces or symbols (e.g., `15550192834` for USA, `447911123456` for UK).
3. Set your pre-filled client greeting (e.g., *"Hi Elena, I saw your video editing portfolio and would like to discuss a project."*).
4. When a prospective client clicks the WhatsApp button on your website, WhatsApp opens immediately with your chat and the pre-filled message ready to send.

---

# 31. SEARCH ENGINE OPTIMIZATION (SEO) & METADATA

Help Google and creative directors find you when searching for editors in your region:

* **Site Page Title**: Set in `index.html` or Brand Studio (e.g., `Elena Rostova | Commercial Video Editor & Colorist`).
* **Meta Description**: A concise 150-character summary (e.g., `Portfolio of Elena Rostova, commercial video editor and colorist specializing in automotive, fashion, and high-energy narrative films.`).
* **Project URL Slugs**: Each project has a clean, readable URL slug (e.g., `/project/porsche-electric-horizon`) for search engine indexation.

---

# 32. FAVICON & BROWSER TAB ICONS

The favicon is the small icon that appears in the browser tab next to your website title:

```text
┌─────────────────────────────────────────────────────────────┐
│ 🌐 [FAVICON] Elena Rostova — Video Editor Portfolio   ✖ ＋  │
└─────────────────────────────────────────────────────────────┘
```

### Replacing Your Favicon:
1. Create a square 512x512 PNG image of your logo icon.
2. In **Brand Studio** → **Logo & Identity**, upload or link your `favicon.png`.
3. Clear your browser cache and refresh your page to verify the new tab icon.

---

# 33. SOCIAL SHARING CARDS (OPEN GRAPH)

When you paste your website link into Slack, iMessage, Twitter, or LinkedIn, an **Open Graph Preview Card** is automatically generated:

```text
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │              [YOUR SHOWREEL COVER IMAGE]              │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ELENA ROSTOVA — COMMERCIAL VIDEO EDITOR & COLORIST         │
│  Explore featured commercial cuts, reels, and showreels.    │
│  yournamefilms.com                                          │
└─────────────────────────────────────────────────────────────┘
```

To update this preview image, replace the `og:image` URL in `index.html` or through the Admin Studio SEO panel.

---

# 34. USING THE TEMPLATE WITH WORDPRESS

CineFolio is built as a modern, decoupled architecture. This means you can run CineFolio as a standalone website **OR** connect it to an existing WordPress website as a headless content management system.

```text
┌─────────────────────────────────────────────────────────────┐
│                CINEFOLIO FRONTEND APP                       │
│    (Ultra-Fast Video Player, Themes, Animations)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                       REST API Requests
                     (wp-json/wp/v2/projects)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               YOUR WORDPRESS BACKEND                        │
│ (Custom Post Types, ACF Fields, WP Media Library)           │
└─────────────────────────────────────────────────────────────┘
```

### Supported WordPress Setup Workflow:
1. Log into your WordPress admin dashboard (`yourdomain.com/wp-admin`).
2. Register a Custom Post Type named `projects` (via ACF Pro or our helper plugin).
3. Ensure the WordPress REST API is accessible at `https://yourdomain.com/wp-json/wp/v2/projects`.
4. In CineFolio Admin Studio, navigate to **WordPress Integration**.
5. Enter your WordPress URL endpoint and optional Application Password.
6. CineFolio will immediately fetch and display your WordPress projects on your portfolio website.

---

# 35. WORDPRESS MEDIA MANAGEMENT

When using the WordPress integration:
* Upload all thumbnails and video cover stills to the standard **WordPress Media Library** (`wp-admin` → **Media**).
* Attach video links (YouTube, Vimeo, Google Drive, or MP4) inside the custom post fields.
* CineFolio automatically pulls the Featured Image as the primary project cover.

---

# 36. WORDPRESS PLUGINS & REST API CONFIGURATION

* **Advanced Custom Fields (ACF Pro)**: Used to manage custom project fields (Client, Year, Role, Software, Video URL).
* **JWT Authentication / Application Passwords**: Allows secure remote publishing from CineFolio Admin Studio back to WordPress.
* **WP REST Cache (Optional)**: Caches REST API responses for sub-second page loads.

---

# 37. WHERE CAN I HOST MY WEBSITE?

CineFolio compiles into clean, production-ready static assets that can be hosted anywhere:

```text
[SCREENSHOT: Recommended Hosting Platforms (Vercel, Netlify, Cloudflare Pages)]
```

### Recommended Hosting Options:

1. **Vercel (Recommended — Free & Pro Tiers)**:
   * Fastest deployment, global edge CDN, automatic SSL certificates, and zero configuration.
2. **Netlify (Free & Pro Tiers)**:
   * Drag-and-drop folder deployment, global CDN, and form notification webhooks.
3. **Cloudflare Pages (Free Tier)**:
   * Unlimited bandwidth, ultra-fast worldwide edge caching.
4. **Traditional Web Hosting (cPanel / Apache / Nginx)**:
   * Upload the compiled `dist/` folder directly to your `public_html` directory via FTP.
5. **Docker / Cloud Run Container**:
   * Deploy as a containerized web service with full server-side proxy capabilities.

---

# 38. DEPLOYING THE TEMPLATE STEP-BY-STEP

### Beginner-Friendly Deployment via Vercel:
1. Create a free account at [Vercel.com](https://vercel.com).
2. Connect your GitHub repository (or use the Vercel CLI to upload your project folder).
3. Select **Vite** as the framework preset.
4. Click **Deploy**.
5. Within 60 seconds, your portfolio is live with a secure HTTPS URL (e.g., `cinefolio-yourname.vercel.app`).

### Traditional FTP / cPanel Deployment:
1. In your project directory, run `npm run build`.
2. Locate the generated `dist/` folder on your computer.
3. Open your FTP client (FileZilla or Cyberduck) and connect to your web hosting.
4. Upload all files from inside `dist/` to your server's `public_html/` root.

---

# 39. CUSTOM DOMAIN SETUP

Transform your default hosting URL (`yourname.vercel.app`) into your own professional domain (`www.yournamefilms.com`):

```text
1. PURCHASE DOMAIN (Namecheap, GoDaddy, Google Domains, Cloudflare)
       ↓
2. OPEN YOUR HOSTING DASHBOARD (e.g., Vercel / Netlify)
       ↓
3. CLICK "ADD CUSTOM DOMAIN" → ENTER "yournamefilms.com"
       ↓
4. COPY DNS RECORDS PROVIDED BY YOUR HOST (A Record & CNAME)
       ↓
5. LOG INTO YOUR DOMAIN REGISTRAR → OPEN DNS MANAGEMENT
       ↓
6. ADD DNS RECORDS:
   • Type: A     | Name: @   | Value: 76.76.21.21 (Example)
   • Type: CNAME | Name: www | Value: cname.vercel-dns.com
       ↓
7. WAIT FOR PROPAGATION (5 minutes to 24 hours) & SSL ACTIVATION
```

---

# 40. DOMAIN TROUBLESHOOTING

| Problem | Likely Cause | Exact Solution |
| :--- | :--- | :--- |
| **Site works on hosting URL but not custom domain** | DNS records have not finished propagating across the globe. | Wait 1–4 hours. Verify your DNS records at `whatsmydns.net`. |
| **"Connection Not Private" / SSL Error** | The free SSL security certificate is still generating. | Wait 15 minutes after DNS verification for the certificate to issue automatically. |
| **`www.yourdomain.com` works but `yourdomain.com` fails** | Missing root `@` A-Record in your domain DNS manager. | Add the apex A-Record pointing to your host IP address. |
| **Domain displays an old placeholder or registrar parking page** | Your browser has cached the old DNS result. | Flush your DNS cache or test the website in a private/incognito window. |

---

# 41. ENVIRONMENT VARIABLES EXPLAINED FOR BEGINNERS

> **What is an Environment Variable?** Think of an environment variable as a private settings box stored safely on your hosting server rather than visible in your public code.

```text
┌─────────────────────────────────────────────────────────────┐
│ PUBLIC CONFIGURATION (Safe in Frontend Code)                │
│ • Your Public Portfolio Name                                │
│ • Public Social Profile URLs                                │
│ • Active Theme Selection (Cyber Noir / Retro / Aurora)      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🔒 PRIVATE SECRETS (Never Share or Put in Frontend Code)     │
│ • Private Server API Keys                                   │
│ • Admin Passwords & Secret Tokens                           │
│ • Database Credentials                                      │
└─────────────────────────────────────────────────────────────┘
```

All required environment variables are documented in `.env.example`.

---

# 42. WEBSITE SECURITY BEST PRACTICES

* **Never commit real secrets or API keys to public Git repositories.**
* **Use strong passwords for your Admin Studio and WordPress dashboards.**
* **Enable Two-Factor Authentication (2FA) on your hosting account and domain registrar.**
* **Review Google Drive permissions** before adding links to ensure you only share public/viewer links.
* **Keep backups of your portfolio configuration.**

---

# 43. BACKUPS, PORTABILITY & DATA EXPORT

CineFolio gives you **100% data ownership**. You can export your entire website configuration, projects, testimonials, and brand settings in one click:

```text
[SCREENSHOT: Admin Studio > Settings > Backup & Data Export]
```

### Exporting Your Data:
1. Log into `/admin`.
2. Navigate to **Settings** → **Data Portability**.
3. Click **Export Portfolio (.json)**.
4. A file named `cinefolio-export-YYYY-MM-DD.json` will download to your computer.

### Restoring Your Data:
* If you ever move to a new computer or server, click **Import Portfolio** and select your JSON backup file. All your projects, colors, and settings will be restored instantly.

---

# 44. PERFORMANCE & VIDEO OPTIMIZATION GUIDELINES

1. **Optimize Poster Images**: Always compress thumbnail images using WebP or 80% quality JPG.
2. **Avoid Multiple Auto-Playing Videos**: Only your hero showreel should auto-play. Let visitors manually trigger project videos to save their mobile data.
3. **Use Video Streaming CDNs**: For long-form films, rely on Vimeo, YouTube, or Google Drive rather than hosting 2GB video files directly on your web server.
4. **Keep Fonts Streamlined**: Avoid loading more than 3 custom font families simultaneously.

---

# 45. MOBILE READINESS CHECKLIST

Before launching, open your site on an iPhone or Android device and verify:

```text
[ ] Navigation hamburger menu opens and closes smoothly
[ ] Creator logo scales down neatly without overflowing the header
[ ] Hero Showreel plays with audio unmute toggle functional
[ ] 9:16 Vertical Reels render in proper portrait framing
[ ] 16:9 Landscape Commercials fit mobile screen width
[ ] Project filter category pills are horizontally scrollable
[ ] Text and headlines are legible without horizontal scrolling
[ ] Tap targets (buttons, links, video play icons) are easy to press with a thumb
[ ] WhatsApp direct booking button opens the WhatsApp mobile app
[ ] Contact form inputs and dropdowns respond crisply to mobile keyboards
```

---

# 46. MASTER PRE-PUBLISH CHECKLIST

```text
BRAND & IDENTITY
[ ] Studio / Creator Name is accurate across all sections
[ ] Profile headshot and bio are updated (demo placeholders removed)
[ ] High-resolution vector logo and favicon are uploaded
[ ] Brand palette colors match your creative identity

PROJECT SHOWCASE
[ ] Hero Showreel is configured and working
[ ] At least 4–8 completed projects are published
[ ] All video links (Drive, YouTube, Vimeo, MP4) stream smoothly
[ ] Native aspect ratios (16:9, 9:16, 1:1, 2.35:1) are verified
[ ] High-res cover thumbnails are assigned to every project
[ ] Project stories, software badges, and roles are filled in

SERVICES & TESTIMONIALS
[ ] Service packages and deliverables reflect your current pricing
[ ] Client testimonials and reviews are accurate

BOOKING & CONNECTIVITY
[ ] Contact form email notifications are verified and tested
[ ] WhatsApp direct link connects with international dialing code
[ ] All social media links point to your active accounts
[ ] SEO title and meta description are configured

TECHNICAL & LAUNCH
[ ] Website tested across Chrome, Safari, Firefox, and mobile devices
[ ] Custom domain connected and HTTPS / SSL verified
[ ] Portfolio JSON backup exported and saved locally
```

---

# 47. COMMON MISTAKES & TROUBLESHOOTING

### 1. Video Doesn't Play
* **Likely Cause**: The video URL format is incorrect, or a third-party video is set to *Private*.
* **Solution**: Ensure YouTube videos are set to *Unlisted* or *Public*. For Google Drive, verify file access is set to *Anyone with the link (Viewer)*.

### 2. Google Drive Video Shows Access Error
* **Likely Cause**: The file permission in Google Drive was switched back to *Restricted*.
* **Solution**: Open Google Drive → Right click video → Share → Change to *Anyone with the link*.

### 3. Logo Looks Blurry on Mobile or Retina Displays
* **Likely Cause**: A low-resolution raster JPG was uploaded instead of a vector SVG or 2x PNG.
* **Solution**: Upload an SVG format logo or a PNG at 600px width with 72 DPI.

### 4. Brand Colors Did Not Update on the Live Website
* **Likely Cause**: You edited colors in Brand Studio but forgot to click *Save Brand Settings*, or browser caching is active.
* **Solution**: Click *Save Brand Settings* in the Admin Studio, then hard-refresh your browser (`Cmd+Shift+R` or `Ctrl+Shift+R`).

### 5. Contact Form Submissions Are Not Arriving in Email
* **Likely Cause**: Formspree endpoint is missing, or the notification was sent to your email spam folder.
* **Solution**: Check your Admin Studio → Inquiries Inbox to confirm the submission was recorded locally. Add your Formspree endpoint URL in Settings and check your email spam filter.

---

# 48. FREQUENTLY ASKED QUESTIONS (FAQ)

#### Q: Can I change my website colors and fonts at any time?
**A:** Yes! Open `/admin` → **Brand Studio**. You can change your primary colors, surface tones, and typography anytime. Every page updates immediately.

#### Q: Will changing my theme delete my uploaded projects?
**A:** No. Your project data is completely independent from the visual presentation. You can switch between *Cyber Noir*, *Aurora Spectrum*, and *Retro CRT* freely.

#### Q: Can I showcase vertical TikTok / Instagram Reels alongside widescreen commercials?
**A:** Yes! CineFolio is specifically engineered for multi-orientation video. Select `9:16 Portrait` for vertical cuts and `16:9 Landscape` for widescreen cuts.

#### Q: Do I have to pay for expensive video hosting?
**A:** No. You can stream your videos for free using Google Drive, YouTube (unlisted), or Vimeo.

#### Q: Can I use this template for photography or a creative design agency?
**A:** Absolutely. While optimized for video editors and filmmakers, CineFolio’s rich media galleries, project stories, and booking systems work for photographers, 3D artists, and creative studios.

---

# 49. BEGINNER GLOSSARY

* **Aspect Ratio**: The proportional relationship between video width and height (e.g., `16:9` widescreen, `9:16` vertical).
* **CDN (Content Delivery Network)**: A global network of servers that delivers your website files and images to visitors from the closest geographical location.
* **CMS (Content Management System)**: A platform (like the CineFolio Admin Studio or WordPress) that lets you manage text, projects, and media without writing code.
* **CSS Variables / Design Tokens**: Centralized color and style codes that control the design of your entire website from a single place.
* **DNS (Domain Name System)**: The internet directory that connects your human-friendly domain name (`yournamefilms.com`) to your web hosting server IP.
* **Favicon**: The tiny logo icon that appears in the browser tab next to your website title.
* **HEX Color**: A 6-character code representing an exact digital color (e.g., `#00E599` for emerald green).
* **Open Graph (OG)**: Metadata tags that determine which image, title, and description appear when you share your link on social media.
* **Responsive Design**: Web design that automatically reformats its layout to look great on mobile phones, tablets, laptops, and ultra-wide desktop monitors.
* **SSL / HTTPS**: The security padlock protocol that encrypts website traffic and protects visitor privacy.

---

# 50. ADVANCED USERS & DEVELOPERS SECTION

*(This section is optional and intended for software developers extending the codebase).*

```text
┌─────────────────────────────────────────────────────────────┐
│                 ADVANCED DEVELOPER ARCHITECTURE             │
└─────────────────────────────────────────────────────────────┘
```

### 1. Project Directory Architecture:
```text
/src
├── components/
│   ├── admin/       ← Admin Studio, Brand Studio, Project Editors, Inquiries
│   ├── public/      ← Public Hero, Portfolio Grid, Modals, Showreel, Footer
│   ├── skeletons/   ← Zero-CLS loading skeleton components
│   └── ui/          ← Low-level primitives (Buttons, Dialogs, Sliders)
├── context/         ← PortfolioContext (State provider & live token injector)
├── data/            ← Default initial dataset & mock seed data
├── services/
│   ├── dataAdapter.ts     ← IDataAdapter interface (Local, WP, Custom API)
│   ├── mediaProviders.ts  ← Media provider abstraction (Drive, YT, Vimeo)
│   ├── mediaResolver.ts   ← Stream URL & Aspect ratio normalization logic
│   └── portfolioService.ts← Centralized business logic orchestrator singleton
├── themes/          ← Theme engine, CSS variables, & design tokens
└── types/           ← TypeScript interfaces (Portfolio, Media, BrandTheme)
```

### 2. Design Token Injection:
Theme variables are dynamically injected into the document root via CSS custom variables (`--color-brand-primary`, `--color-brand-accent`, `--color-bg-surface`). Custom themes can be added by implementing the `BrandTheme` interface in `src/types/portfolio.ts`.

### 3. Data Adapter Pattern:
Switching data sources is managed via the `IDataAdapter` interface in `src/services/dataAdapter.ts`:
```typescript
import { portfolioService } from './services/portfolioService';
import { WordPressAdapter } from './services/dataAdapter';

// Switch to remote WordPress backend at runtime:
portfolioService.setAdapter(new WordPressAdapter('https://my-wp-site.com', 'app_password'));
```

### 4. Build & Production Compilation:
* Build Command: `npm run build`
* Static Output Directory: `dist/`
* Dev Server: `npm run dev` (Port 3000)

---

# 51. THE 20-STEP CREATOR JOURNEY

```text
 1. Gather your showreel, video links, project stories, and logo.
 2. Open CineFolio in your browser and go to /admin.
 3. Complete the quick Onboarding Wizard.
 4. Configure your creator name, professional title, and bio.
 5. Upload your vector logo and browser favicon.
 6. Set your signature brand colors and typography.
 7. Choose your default visual theme (Cyber Noir, Aurora, or Retro).
 8. Add your master Hero Showreel.
 9. Create your first 4 to 8 featured projects.
10. Add native 16:9, 9:16, or 1:1 aspect ratio cuts to each project.
11. Upload color-graded high-resolution poster thumbnails.
12. Customize your list of services, rates, and deliverables.
13. Add authentic client testimonials and reviews.
14. Connect your Instagram, YouTube, Vimeo, and LinkedIn channels.
15. Set up WhatsApp one-click booking with your international phone number.
16. Configure your SEO title, meta description, and social preview card.
17. Test the entire site on your mobile phone and desktop browser.
18. Deploy to Vercel, Netlify, or your preferred web hosting server.
19. Connect your custom domain (e.g., www.yournamefilms.com) and verify HTTPS.
20. Download a JSON backup of your portfolio and start sharing your link with clients!
```

---

# 52. FINAL MESSAGE TO THE CREATOR

> **Your work is your legacy.** 
> 
> This template provides the high-performance architectural foundation, pristine video player, and design framework. But what makes this website extraordinary is **your storytelling, your color grading, your rhythm, and your creative vision**.
> 
> Take the time to replace the demo assets with your authentic story. Choose colors that represent your brand, curate your absolute best edits, and present your craft with pride.
> 
> Keep this guide bookmarked for future updates, project additions, and theme refreshments.
> 
> Now go share your work with the world!
