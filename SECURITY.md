# Security & Access Control Policy

CineFolio enforces strict boundaries between public visitors and administrator operations to protect sensitive client data, booking requests, and media assets.

---

## 🔐 Core Security Principles

### 1. Separation of Public vs. Admin Routes
- Public visitors have access strictly to read-only portfolio content, public reels, service packages, and enquiry submission forms.
- The Admin Studio requires authentication credentials. Privileged editing, project deletion, and theme modification endpoints are inaccessible to unauthorized visitors.

### 2. Client-Side API Key & Secret Safety
- Secret API keys (such as backend database credentials or privileged CMS master keys) are never exposed to the client bundle.
- Public variables use `VITE_` prefixes only for non-sensitive public configuration (such as public API base URLs or public form endpoints).
- When integrating WordPress Application Passwords, authentication headers are transmitted securely and stored in encrypted local session stores.

### 3. Input Sanitization & XSS Prevention
- All user-submitted enquiry fields, client briefs, and custom project inputs are sanitized before rendering.
- Markdown and HTML descriptions strip script execution payloads.

### 4. Zero Sensitive Data Exposure in Source Control
- Environment variables and keys are declared in `.env.example` without real secret values.
- Local storage handles fallback persistence securely in the user's isolated browser sandbox.
