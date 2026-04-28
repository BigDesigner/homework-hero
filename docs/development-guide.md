# Development Guide

This guide covers the coding standards, design principles, and environment setup for Homework Hero.

## 1. Environment Setup (Bootstrap)
1. **Prerequisites:** Node.js 18+, Android Studio (for local testing).
2. **Setup:**
   ```bash
   npm install
   npx cap add android
   ```
3. **Running Locally:**
   ```bash
   npm run dev
   ```

## 2. Coding Standards
- **Frontend:** React 18 (Functional Components, Hooks).
- **Styling:** Tailwind CSS. Use `sm/md/lg` for responsiveness.
- **Backend:** TypeScript for Cloudflare Workers.
- **Naming:** 
    - Components: `PascalCase`
    - Functions/Variables: `camelCase`
    - Folders: `kebab-case`

## 3. Design Principles
- **Modern Playful:** Use rounded corners (`rounded-2xl`, `rounded-full`), vibrant colors, and soft shadows.
- **Accessibility:** Minimum font size 14px, high contrast for readability.
