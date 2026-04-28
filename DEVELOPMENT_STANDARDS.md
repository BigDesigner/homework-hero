# Homework Hero - Lessons Learned & Development Standards (Phase 2.5)

This document serves as a mandatory reference for any AI agent or developer working on the Homework Hero project. It captures critical pitfalls discovered during the UI/UX and Theme Audit.

## 1. Internationalization (i18n) Pitfalls
> [!IMPORTANT]
> **Source of Truth:** Do NOT assume that editing `public/locales/*.json` is enough. 
> The project uses a hardcoded `resources` object in `src/i18n.js`. Any new keys or structure changes MUST be mirrored in `src/i18n.js` to take effect.

- **Nesting:** Always double-check JSON nesting. Avoid wrapping the content in a redundant `"translation": { ... }` block inside the JSON file. The root of the JSON should contain the actual keys (e.g., `"nav": { ... }`).
- **Key Resolution:** If a key shows up as `path.to.key` on the screen, check if the key exists in `src/i18n.js` first.

## 2. Turkish Character Handling
> [!WARNING]
> Standard JavaScript string methods are locale-insensitive and will break Turkish characters (specifically `i` and `I`).

- **Casing:** Never use `.toUpperCase()`. Always use `.toLocaleUpperCase(i18n.language === 'tr' ? 'tr-TR' : 'en-US')`.
- **Comparison:** Be wary of comparing strings like `Matematik` vs `mat`. Use standardized short keys (`mat`, `tur`, `sci`) for logic and translated labels for display.

## 3. Date and Timezone Stability
> [!CAUTION]
> Parsing `YYYY-MM-DD` directly with `new Date()` results in UTC midnight, which causes a 1-day shift in negative timezones (e.g., Americas).

- **Local Parsing:** Always append `T00:00:00` to a date string before parsing: `new Date(dateString + "T00:00:00")`. This forces the browser to treat the date as local midnight.
- **Localization:** Dates must be formatted based on language:
    - Turkish (`tr`): `DD.MM.YYYY` (using `toLocaleDateString('tr-TR')`).
    - English (`en`): `YYYY-MM-DD` (using `toLocaleDateString('en-CA')`).
- **Formatting:** Use `toLocaleDateString` with explicit locale options.

## 4. UI/UX and State Consistency
- **Avatar Sync:** The avatar list is 12 items long. Ensure any component displaying emojis (`App.jsx`, `SettingsModal.jsx`) supports all 12 IDs.
- **Prop Shadowing:** Avoid naming iteration variables `t` (e.g., in `.map()` or `.filter()`) if the `t` function from `useTranslation` is in the same scope.
- **Prop Passing:** When creating modals or sub-components that rely on `t()`, ensure the parent passes the `t` function as a prop or the child initializes its own `useTranslation` hook.

## 5. Encoding Standards
- Always save files as **UTF-8**. 
- If Turkish characters like `ş, ğ, ç, ı, İ` appear corrupted (e.g., `HoÅŸ Geldin`), re-write the file entirely with UTF-8 encoding.

## 6. Mobile-First & Cross-Platform Reliability
- **Responsive-First:** Designs must prioritize mobile devices (Android/iOS). Use Tailwind's `sm:`, `md:`, and `lg:` breakpoints correctly.
- **Touch Interaction:** Interactive elements must have a minimum touch target size (approx. 44px) to be accessible on smartphones.
- **Native Dialogs:** Avoid browser-specific `window.confirm()` or `window.alert()`. Use state-based, in-app confirmation UI (e.g., the "Double Click Reset" pattern) to prevent browser blocking.
- **Storage:** Use standard `localStorage` via the `storage.js` utility to ensure consistent data persistence across mobile browsers (Safari, Chrome, etc.).

## 7. React Performance & Optimization (Pro Rule)
- **useMemo for Heavy Computations:** Any array operation (like `filter`, `sort`, `map`) that calculates streaks, progress percentages, or filtered lists MUST be wrapped in `useMemo`. This prevents unnecessary re-renders when unrelated state changes (e.g., opening a modal).
- **useEffect Dependencies:** Always ensure `useEffect` dependencies are accurate. Avoid infinite loops by not updating state variables inside an effect that depends on them, unless carefully managed.

---
*Last Updated: 2026-04-28 by Antigravity AI (Gemini 3.1 Pro High)*
