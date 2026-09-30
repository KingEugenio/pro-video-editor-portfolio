# Media & Video Engine Guide

Video is the core deliverable in CineFolio. The platform features a **Universal Video Player** (`src/components/ui/UniversalVideoPlayer.tsx`) and **Media Resolver** (`src/services/mediaResolver.ts`) designed to handle diverse video formats without quality loss or layout clipping.

---

## 📐 Multi-Aspect Ratio Support

CineFolio supports multiple aspect ratios across desktop and mobile screens:

| Aspect Ratio | Ratio Token | Typical Use Case | Player Behavior |
| :--- | :--- | :--- | :--- |
| **16:9** | `aspect-video` | YouTube, Commercials, 4K Master Cuts | Full cinematic landscape player |
| **9:16** | `aspect-[9/16]` | TikTok, Instagram Reels, YouTube Shorts | Vertical phone reel frame with mobile swipe |
| **1:1** | `aspect-square` | Instagram Grid, Square Ads | Centered square format with custom controls |
| **4:5** | `aspect-[4/5]` | Social Media Portrait Previews | Scaled vertical preview player |
| **2.35:1** | `aspect-[21/9]` | Anamorphic Cinematic Widescreen | Letterbox-free anamorphic viewing |

---

## 🔌 Supported Video Providers

### 1. Direct File Upload / CDN
- Supports `.mp4`, `.webm`, `.mov`, `.m3u8` (HLS), and Blob URLs.
- Native HTML5 video element with custom scrubbing, volume control, playback rate (0.5x to 2x), and fullscreen triggers.

### 2. Google Drive
- Accepts Google Drive sharing links (`drive.google.com/file/d/...`, `/folders/...`, or raw Drive file IDs).
- Automatically parses file IDs, generates high-res thumbnail previews (`drive.google.com/thumbnail?id=...&sz=w1280`), and embeds seamless preview streams.

### 3. YouTube & YouTube Shorts
- Automatically distinguishes between standard 16:9 videos and 9:16 Shorts URLs (`youtube.com/shorts/...`).
- Embeds via privacy-enhanced zero-cookie player parameters with autoplay, mute, and loop control.

### 4. Vimeo
- Resolves Vimeo Showcase and standard video URLs with customized color accents matching your active brand theme.

---

## 🗃️ Media Library Management

Within the **Admin Studio > Media Library**:
- **Storage Diagnostics**: View total assets, storage breakdown, and resolution distribution.
- **Provider Filtering**: Filter assets by Google Drive, YouTube, Vimeo, or Direct Upload.
- **Aspect Ratio Filtering**: Filter specifically for Vertical 9:16 reels or Landscape 16:9 cuts.
- **One-Click Clipboard**: Copy embed codes, thumbnail URLs, and media IDs for quick insertion into projects.
