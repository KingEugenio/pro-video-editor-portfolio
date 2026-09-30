# Project Specification: CineFolio Architecture

## 1. Executive Summary
CineFolio is a specialized, headless-ready video portfolio and CMS engine built for video creators, directors, post-production houses, and colorists. It offers deep support for multi-ratio cinematic media (including 9:16 vertical TikTok/Reels/Shorts cuts alongside 16:9 4K landscape masters), real-time CSS variable brand customizer, Google Drive media synchronization, multi-step booking pipelines, and native WordPress REST API integration.

## 2. Core Functional Requirements
- **Decoupled Architecture**: Separation of Content (projects, metadata, creator profile), Presentation (aurora effects, kinetic fonts, glass tokens, design tokens), Functionality (media playback, form validation, filter state), and Data Source (Local storage, WordPress REST API, Custom API).
- **Universal Media Engine**: Playback resolution for Direct MP4/WebM/HLS files, Google Drive previews, YouTube 4K, and Vimeo showcases. Automatic detection of vertical aspect ratios with mobile reel swiping.
- **Brand & Theme Customizer**: Real-time palette adjustment (Primary, Secondary, Accent, Background, Surface, Borders), typography pickers, Aurora lighting controls, and grain/scanline toggles.
- **Skeleton Loading System**: Zero-CLS layout-conforming skeleton states across public pages and admin management modules.
- **WordPress Bridge**: Configurable REST API endpoint synchronization mapping WordPress Custom Post Types (`projects`, `testimonials`, `services`) directly into CineFolio components.
- **Data Portability**: Full JSON export and import (`portfolio-export.json`) ensuring creators own and retain their portfolio data independently of any hosting provider.
