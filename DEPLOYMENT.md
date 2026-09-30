# Deployment & Infrastructure Guide

CineFolio is built to deploy seamlessly on modern web hosting infrastructure, container environments, and static CDNs.

---

## 🌐 Deployment Targets

### 1. Cloud Run / Docker Container (Default Platform Runtime)
- Port: `3000` (Bound to host `0.0.0.0`)
- Single command build: `npm run build`
- Production start: Handled by Vite static file server or custom Node server.

### 2. Vercel / Netlify (Static SPA)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Fallback**: Included in `vite.config.ts` (`index.html` fallback).

### 3. Self-Hosted Nginx / Apache
Sample Nginx Virtual Host configuration:

```nginx
server {
    listen 80;
    server_name yourportfolio.com;
    root /var/www/cinefolio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|mp4|webm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## ⚡ Performance Optimization Checklist
- [x] Poster-first video loading to prevent simultaneous video streams on initial page render.
- [x] Responsive image loading with skeleton shimmer placeholders before asset reveal.
- [x] Zero-CLS skeleton loaders matching computed aspect ratios.
- [x] Code-splitting for Admin Studio modules.
- [x] Gzip / Brotli compression readiness.
