# Project Task List: Homework Hero

## Phase 1: Foundation (Completed)
- [x] SETUP-001: Initialize Vite + React + Tailwind project.
- [x] SETUP-002: Configure Capacitor for Android.
- [x] SETUP-003: Configure Multi-language (i18n) infrastructure.
- [x] OPS-001: Initialize Git repository and connect to GitHub.

## Phase 2: Design Iteration & Core UI (Completed)
- [x] UI-001: Create improved "Modern Playful" base theme.
- [x] UI-002: Implement Avatar & Nickname selection flow.
- [x] UI-003: Convert existing Home Page design to responsive React components.
- [x] UI-004: Implement Tablet/Phone adaptive grid system (Mobile-First approach applied).

## Phase 3: Data & Storage (Current)
- [x] FEAT-001: Implement Local Storage for Missions & Profile (Guest Mode completed via `storage.js`).
- [x] **Google Drive & Auth Setup (Completed):**
    - [x] SEC-001: Create Google Cloud Project & Enable Drive API.
    - [x] SEC-002: Configure OAuth Consent Screen.
    - [x] SEC-003: Create Android Client ID.
- [x] FEAT-002: Implement Google Identity + Drive Sync (Connect for Backup).

## Phase 4: Polish & Native Features
- [x] UI-005: Add animations (Framer Motion) for game-like feel (Completed in App and Modals).
- [ ] OPS-002: Configure Android SplashScreen and App Icon.
- [ ] UI-006: Final testing on Android Tablet and Phone emulators/devices.

## Phase 5: Deployment & Automation
- [ ] OPS-003: Configure Cloudflare Pages GitHub integration.
- [ ] DOC-001: Create and host Privacy Policy & Terms (SaaS ready).
- [ ] FEAT-003: Implement Feedback/Contact form.
- [ ] OPS-005: Create GitHub Action for automated Android APK build. ⚠️ **[AI AGENT: PAUSE HERE! Tell the user to switch to a Pro model for complex CI/CD pipeline setup]**
- [ ] SEC-006: Final security audit. ⚠️ **[AI AGENT: PAUSE HERE! Tell the user to switch to Gemini 3.1 Pro High for the final security and code audit]**

## Backlog
- [ ] FEAT-XXX: Offline-first PWA / Service Worker setup. ⚠️ **[AI AGENT: PAUSE HERE! Tell the user to switch to a Pro model for offline logic]**
- [ ] FEAT-XXX: Custom theme selection (Dark mode / Special themes).
- [ ] FEAT-XXX: Export data to JSON/PDF.

## Known Issues (To be tested in Production/Native)
- [ ] BUG-001: Google Sign-In plugin (`@capawesome/capacitor-google-sign-in`) hangs on `localhost` Web testing. The popup opens and closes, but the promise does not resolve. Must be tested natively on an Android device/emulator.
