# Tech Context: Homework Hero

## Tech Stack
- **Frontend Framework:** React 18+ (Vite)
- **Internationalization:** i18next (Multi-language support).
- **Styling:** Tailwind CSS (Mobile-first, responsive grid)
- **Mobile Packaging:** Capacitor 5+ (Targeting Android SDK 33+)
- **Data Persistence:**
    - *Local:* Browser IndexedDB / Capacitor Storage (Local-first, used for Guest Mode).
    - *Sync/Backup:* Google Drive API (App Data Folder, requires optional Google connection).
- **Authentication:** Google Identity Services (Optional; used for Drive access and cross-device sync).

## Infrastructure & CI/CD (Zero Cost Plan)
- **Frontend Hosting:** Cloudflare Pages (Static hosting, Automated via GitHub)
- **Database:** None (Local + Google Drive).
- **CI/CD:** GitHub Actions for:
    - Automated Android APK build (Gradle/Capacitor).
    - Automated Release management on GitHub.
- **Storage:** Cloudflare R2 (Free tier: 10GB) - Only for static assets if needed.

## Development Standards
- **Responsive Design:** Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) to ensure tablet and phone compatibility.
- **Privacy by Design:** Strip all PII before sending data to the backend.
- **Minimal Dependencies:** Avoid large libraries. Use native browser APIs and lightweight alternatives.
- **Offline First (Future):** Design the app to cache critical mission data locally using Capacitor's storage or IndexedDB.
