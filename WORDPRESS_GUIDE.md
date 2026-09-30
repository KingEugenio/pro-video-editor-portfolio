# WordPress Integration Guide

CineFolio includes a first-class **WordPress REST API Data Adapter** (`src/services/dataAdapter.ts`), enabling WordPress to act as a headless Content Management System while CineFolio handles the high-performance visual presentation.

---

## 🛠️ Supported WordPress Architectures

### Option 1: Headless WordPress (Recommended)
- WordPress is hosted on a subdomain (e.g., `cms.yourdomain.com`).
- CineFolio runs on the primary domain (e.g., `yourdomain.com`) as a static SPA or Node app.
- CineFolio fetches projects, media, and testimonials via `/wp-json/wp/v2/projects`.

### Option 2: WordPress REST API + Custom Plugin
- Install a lightweight WordPress plugin that exposes custom endpoints:
  - `/wp-json/cinefolio/v1/projects`
  - `/wp-json/cinefolio/v1/theme`

### Option 3: Decoupled WordPress Theme
- CineFolio's compiled `dist/` bundle can be mounted inside a single-page WordPress theme template (`index.php`), consuming WordPress REST endpoints directly.

---

## 📦 Recommended WordPress Content Model

### 1. Custom Post Type: `projects`
Register the `projects` CPT in your child theme's `functions.php` or a custom mu-plugin:

```php
function cinefolio_register_cpts() {
    register_post_type('projects', [
        'labels' => [
            'name' => __('Projects', 'cinefolio'),
            'singular_name' => __('Project', 'cinefolio'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true, // CRITICAL: Enables REST API endpoint
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon' => 'dashicons-video-alt3',
    ]);
}
add_action('init', 'cinefolio_register_cpts');
```

### 2. Advanced Custom Fields (ACF) Schema

Attach the following custom fields to the `projects` post type and check **"Show in REST API"**:

| Field Label | Field Name | Type | Notes |
| :--- | :--- | :--- | :--- |
| **Client** | `client` | Text | Client or Brand name |
| **Year** | `year` | Text | Production year (e.g., "2024") |
| **Category** | `category` | Select / Taxonomy | Commercial, Narrative, Music Video, Reel, Doc |
| **Role** | `role` | Text | e.g. "Director & Lead Colorist" |
| **Software** | `software` | Checkbox / Repeater | Premiere, DaVinci Resolve, After Effects, Blender |
| **Featured** | `is_featured` | True / False | Highlight on homepage |
| **Videos** | `videos` | Repeater | Array of video cuts (16:9 main, 9:16 vertical, etc.) |
| **Video URL** | `video_url` | URL | YouTube, Vimeo, Google Drive, or MP4 URL |
| **Orientation** | `video_orientation` | Select | `landscape`, `portrait`, `square` |
| **Aspect Ratio** | `aspect_ratio` | Select | `16:9`, `9:16`, `1:1`, `2.35:1` |
| **Brief** | `brief` | Textarea | Project brief & context |
| **Approach** | `approach` | Textarea | Creative approach & timeline |
| **Result Story**| `result_story` | Textarea | Metrics, reach, and festival awards |

---

## 🔌 Connecting CineFolio to WordPress

1. Navigate to **Admin Studio > WordPress Bridge** in CineFolio.
2. Enter your WordPress Endpoint (e.g., `https://my-wordpress-site.com`).
3. (Optional for Write Access): Generate an **Application Password** in WordPress (`Users > Your Profile > Application Passwords`) and paste it into the credentials field.
4. Click **Test & Sync Connection**.
5. CineFolio will immediately populate projects and sync changes seamlessly!
