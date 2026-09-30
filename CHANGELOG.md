# Changelog

All notable architectural and feature milestones for CineFolio are documented in this file.

---

## [2.1.0] - Modernization & Skeleton System Architecture

### Added
- **Data Abstraction Layer (`IDataAdapter`)**: Introduced `LocalDataAdapter`, `WordPressAdapter`, and `CustomAPIAdapter` to decouple content from presentation.
- **Media Provider Abstraction (`IMediaProvider`)**: Standardized validation, thumbnail generation, and metadata resolution for Direct Upload, Google Drive, YouTube, Vimeo, and WordPress Media.
- **Page-Aware Skeleton Loading System**:
  - Core primitives (`Skeleton`, `SkeletonHeading`, `SkeletonText`, `SkeletonVideo`, `SkeletonCard`, `SkeletonButton`, etc.).
  - Public skeletons (`HeroSectionSkeleton`, `PortfolioSectionSkeleton`, `ProjectCardSkeleton`, `ServicesSectionSkeleton`, `AboutSectionSkeleton`, `TestimonialsSectionSkeleton`, `ContactBookingSectionSkeleton`, `ProjectDetailModalSkeleton`).
  - Admin skeletons (`AdminLayoutSkeleton`, `DashboardSkeleton`, `ProjectsManagerSkeleton`, `MediaLibrarySkeleton`, `BrandStudioSkeleton`, `GoogleDriveManagerSkeleton`, `EnquiriesManagerSkeleton`, `ProjectEditorSkeleton`).
- **Centralized Design Tokens**: Defined `src/themes/designTokens.ts` mapping color palettes, typography scales, mathematical padding ratios, and z-index layers.
- **Full Portfolio Portability**: Added `portfolio-export.json` schema exporter/importer.
- **Comprehensive Documentation Suite**: Added `WORDPRESS_GUIDE.md`, `THEME_GUIDE.md`, `MEDIA_GUIDE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `CHANGELOG.md`, and `ROADMAP.md`.

### Maintained
- 100% preservation of all public and admin UI layouts, typography, animations, kinetic text, Aurora canvas, and Universal Video Player.
- Multi-aspect ratio video player with 16:9 landscape, 9:16 vertical reel swipe, 1:1 square, and 2.35:1 anamorphic support.

---

## [2.0.0] - CineFolio Multi-Orientation Video Platform
- Initial release featuring Universal Video Player, Brand Studio with real-time CSS variable live preview, Google Drive file explorer, multi-step booking funnel, and WordPress REST synchronization manager.
