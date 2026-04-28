# Changelog - Homework Hero

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-04-28
### Added
- **Google Drive Sync (FEAT-002)**: Implemented `googleDriveService.js` using REST API to backup/restore mission data to a hidden AppData folder on Google Drive.
- **Smart Merge Logic**: Added conflict resolution that prefers "completed" status for mission synchronization.
- **Google Authentication UI**: Added profile name, avatar, and logout options in the Settings Modal.
- **Manual Sync Button**: Added a "Sync Now" button with loading animation and success sound feedback.
- **New Translation Keys**: Added `cloud_connect`, `cloud_connected`, `sync_now`, and `login_error` to both Turkish and English resources in `i18n.js`.

### Fixed
- **Google Auth Web Support**: Added explicit `initialize` call with `redirectUrl` to support development in browser environments.
- **Failsafe Data Extraction**: Updated `googleAuthService` to handle variations in Google API response structures across different versions of the Capacitor plugin.
- **Bug Fix**: Resolved `redirect_uri_mismatch` by removing `forceCodeForRefreshToken` which was causing unnecessary redirects in SPA mode.

### Known Issues
- **BUG-001**: Google Sign-In plugin hangs on `localhost` Web testing after popup closure. Requires native testing on Android device for final validation.
