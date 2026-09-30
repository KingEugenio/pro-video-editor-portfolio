# Setup & Installation Guide

## 📋 System Requirements
- **Node.js**: >= 18.0.0 (Node 20+ LTS recommended)
- **npm** or **bun** / **yarn** / **pnpm**
- Modern evergreen browser with ES Module and WebGL/Canvas support.

## 🛠️ Step-by-Step Installation

### 1. Clone & Install Dependencies
```bash
# Install required npm packages
npm install
```

### 2. Environment Variables Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Available configuration keys:
```env
# Optional WordPress REST API Bridge
VITE_WP_API_URL=https://your-wordpress-site.com
VITE_WP_APP_PASSWORD=

# Optional Google Drive API Key
VITE_GOOGLE_DRIVE_API_KEY=

# Optional Formspree / Contact Webhook
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

### 3. Start Development Server
```bash
npm run dev
```
The application runs on `http://localhost:3000`.

### 4. Production Build
```bash
npm run build
```
Generates static assets in `dist/`.

### 5. Running Linter & Type Checks
```bash
npm run lint
```
