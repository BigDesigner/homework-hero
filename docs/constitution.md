# Project Constitution & AI Guardrails

This document defines the core principles, unbreakable rules, and safety guardrails for Homework Hero.

## 1. Core Principles
1. **Child Safety First:** No PII, no real names, no photos.
2. **Always Free:** Infrastructure must fit within free tiers.
3. **Mobile Excellence:** Must work perfectly on both phones and tablets.
4. **Transparent Code:** High readability and documentation.

## 2. Children's Privacy (NON-NEGOTIABLE)
- **GUARDRAIL-01:** Never implement features that ask for real names, age, school name, or photos.
- **GUARDRAIL-02:** No central user database. Data must stay local or in user's Google Drive.
- **GUARDRAIL-03:** All avatars must be predefined. No user-uploaded images.
- **GUARDRAIL-04:** No membership required. Zero barriers to entry.

## 3. Infrastructure & Cost
- **GUARDRAIL-05:** All infrastructure must remain within Cloudflare's free tier limits.
- **GUARDRAIL-06:** Avoid any third-party services that require monthly subscriptions or "pay-as-you-go" without a strict cap.

## 4. UI/UX & Responsiveness (CRITICAL)
- **GUARDRAIL-07: Breakpoint Feature Parity.** Every feature, button, and navigation item accessible on Desktop/Web must be accessible on Tablet and Mobile. No functionality shall be hidden based on screen size; it must be reorganized (e.g., into bottom nav, menus, or drawers) to ensure 100% usability across all devices.
- **GUARDRAIL-08:** Premium aesthetics must be maintained on all breakpoints. No "broken" or "standard browser" looks on mobile.
- **GUARDRAIL-09:** UI must remain "Modern Playful". Avoid "corporate" or "boring" designs.
- **GUARDRAIL-10:** Accessibility (A11y) check: Large font sizes, high contrast, and clear icons for younger readers.

## 5. Technology & Web Standards
- **GUARDRAIL-11:** Minimum external dependencies. Do not install libraries for features that can be implemented with native JS/CSS.
- **GUARDRAIL-12:** Ensure all code is compatible with Android WebViews (Chrome 80+).
- **GUARDRAIL-13:** Always follow a **Frontend-First** approach. Prove the UX with mock data before committing to backend logic.

## 6. Workflow & Automation
- **GUARDRAIL-14:** CI/CD must be the primary method of deployment.
- **GUARDRAIL-15:** Every push to `main` must result in a valid build.
- **GUARDRAIL-16: Locale-Aware Typography.** Always handle character transformations (upper/lower case) with respect to the current language. Ensure `document.documentElement.lang` is synced with the app's language to prevent browser-level character corruption (e.g., Turkish İ/i vs I/ı).
- **GUARDRAIL-17: Hybrid Device Awareness.** Never hide interactive elements (like delete buttons) behind hover states on touch devices (Tablets/Phones). Use `@media(hover: hover)` to selectively apply hover effects only for mouse-driven devices.
