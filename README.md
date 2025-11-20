# RecyClean Web App

Progressive Web App for tracking recycling activities with a **local-first** architecture. Built with React + TypeScript + Vite and designed to run fully offline while remaining ready for optional server features.

## Highlights

- Local-first data: persistent stores for user profile, settings, and recycling activities; session-only UI stores for dashboard, map, and notifications.
- Onboarding guard: redirects to `/onboarding` until profile is completed and stored locally.
- Activity workflows: AI analysis save path, manual add bottom sheet, calendar view with delete/undo.
- Points system: standardized material matching and scoring via `src/shared/utils/recyclingPoints.ts`.
- Notifications: global banner + snackbar (overlay-kit) with safe-area awareness.
- Theming & layout: light/dark themes, semantic tokens, Emotion styled components.
- PWA ready: manifest, install prompts, and custom service worker app shell cache.
- I18n: English, Korean, Spanish, French resource bundles; settings store persists language and dark mode.

## Tech Stack

- React 18, Vite, TypeScript
- State: zustand (persist for user/activity/settings; non-persist for UI stores)
- Data fetching: @tanstack/react-query
- Styling: Emotion + Vanilla Extract tokens
- Icons: lucide-react
- Notifications & overlays: overlay-kit
- i18n: react-i18next

## Project Structure (key paths)

- `src/pages/` — page shells and feature-specific components/hooks
- `src/shared/ui/` — reusable low-level UI primitives (Button, Card, BottomSheet, Snackbar, etc.)
- `src/shared/components/` — shared higher-level composites
- `src/shared/state/` — zustand stores (persistent and session-only)
- `src/shared/api/` — React Query hooks and keys
- `src/shared/data/` — seed data & DTOs
- `src/shared/styles/` — theme objects and helpers
- `public/sw.js` — hand-rolled service worker (update `CACHE_VERSION` on shell changes)
- `public/manifest.webmanifest` — install card source of truth

## Local Storage Schema

- `recyclean-user`: `{ name, region, joinedAt }`
- `recyclean-activities`: `{ entries: RecyclingEntry[] }`
- `recyclean-settings`: `{ notifications, location, darkMode, language, region }`

## Development

1. Install: `pnpm install`
2. Dev server: `pnpm dev` (Vite on port 5174)
3. Type check only: `pnpm typecheck`
4. Lint & format: `pnpm lint` / `pnpm format:write`
5. Production build: `pnpm build`
6. PWA preview (service worker enabled): `pnpm build && pnpm preview`

## Contribution Guidelines

- Add new copy to all locale files under `src/shared/i18n/locales/` and register in `resources.ts`.
- When extending theme tokens, update both `lightTheme` and `darkTheme` plus `AppTheme` types.
- For persisted store schema changes, bump `version` and add migrations in the store definition.
- Use React Query for server-dependent features only; use zustand stores for core CRUD on local data.
- Keep `queryKeys.ts` up to date when adding fetchers/mutations.

## PWA Notes

- Align `manifest.webmanifest` `theme_color` and `background_color` with theme tokens.
- Validate service worker changes on a preview build; bump `CACHE_VERSION` in `public/sw.js` after shell updates.
- Permission prompts (notifications/location) funnel through `usePermissionRequests`; mirror the UX pattern for any new hardware capabilities.

## Repo Safety

This repository’s history was rewritten to remove `api-spec-notes`. If you re-clone or rebase, push with `git push --force-with-lease` after aligning remotes to avoid accidental overwrite.
