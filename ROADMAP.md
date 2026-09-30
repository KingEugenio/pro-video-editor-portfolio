# CineFolio Architectural Roadmap

This document outlines upcoming feature iterations and planned architectural enhancements for CineFolio.

---

## 🎯 Phase 1: Native Headless CMS Integrations (Current / Complete)
- [x] Data Abstraction Layer (`IDataAdapter`, `LocalDataAdapter`, `WordPressAdapter`, `CustomAPIAdapter`)
- [x] Media Provider Abstraction (`DirectUploadProvider`, `GoogleDriveProvider`, `YouTubeProvider`, `VimeoProvider`)
- [x] Universal Video Player supporting 16:9, 9:16, 1:1, 4:5, and 2.35:1 aspect ratios
- [x] Real-time Brand Studio with live dynamic preview
- [x] Page-aware skeleton loader system across public & admin views
- [x] Comprehensive documentation suite

---

## 🚀 Phase 2: Enhanced Cloud & Streaming Video Providers (Q3 2026)
- [ ] Direct Cloudflare Stream & Mux HLS live transcode bindings
- [ ] Automated video compression before upload
- [ ] Timecoded client review commenting overlay on project detail modals
- [ ] Interactive timeline chapter markers on case study videos

---

## 📦 Phase 3: Headless CMS Ecosystem & Plugin Packaging (Q4 2026)
- [ ] Official CineFolio WordPress Bridge Plugin (.zip package for one-click WP setup)
- [ ] Strapi & Sanity.io Data Adapters
- [ ] One-click export to standalone static HTML/JS package
- [ ] Multi-language localization (i18n) for international post-production houses

---

## 🛡️ Phase 4: Enterprise Post-Production Features (2027)
- [ ] Password-protected private client screener links with burn-in watermarking
- [ ] Frame.io integration for importing rough cuts and timeline notes
- [ ] Stripe & Square milestone deposit payments inside the booking funnel
