# Repository Guidelines

## Project Structure & Module Organization

The front-end lives in `src/`, split by responsibility. Page-level shells reside in `src/pages`, each grouping feature-specific hooks, components, and mock data. Shared building blocks live under `src/shared/`:

- `ui/` for reusable widgets (buttons, cards, form inputs)
- `providers/` for global wrappers such as `AppProviders`
- `api/` for React Query hooks and keys
- `data/` for seed data and DTO definitions
- `state/` for zustand stores
- `styles/` for theme objects and Emotion helpers  
  Design tokens and reset styles built with Vanilla Extract remain in `src/styles`, while deployable assets sit in `public/`. Prototype artifacts (`docs/`, `resources/`, `figma-make/`) stay outside shipping bundles.

## Architecture & State Flow

The runtime is composed of layered providers initialized in `AppProviders`. Emotion’s `ThemeProvider` and `AppGlobalStyles` supply design context, while `@tanstack/react-query` handles asynchronous data with a shared `QueryClient`. Client state that must persist across routes (filters, toggles, cached entries) is centralized in zustand stores (`useDashboardStore`, `useMapStore`, `useSettingsStore`). When adding a new domain:

1. Create query keys in `src/shared/api/queryKeys.ts`.
2. Draft fetcher hooks inside `src/shared/api/`.
3. Add optional seed data in `src/shared/data/` until real endpoints exist.
4. Expose mutations or derived state through a store in `src/shared/state/`.

## Styling & Theming

Global typography, spacing, and color tokens originate from Vanilla Extract modules (`src/styles/tokens`). Emotion is responsible for component-level styling; prefer styled components for page-specific layouts and keep theme-aware utilities (spacing, radii) consistent. New global styles should extend `AppGlobalStyles` rather than authoring additional CSS entry points.

## Development Workflow & Tooling

- `pnpm install` — hydrate dependencies via the pinned lockfile.
- `pnpm dev` — launch the Vite dev server on port 5174.
- `pnpm build` — run `tsc -b` and `vite build` to emit production assets.
- `pnpm preview` — serve the compiled bundle for manual QA.
- `pnpm typecheck` — validate TypeScript contracts without emitting files.
- `pnpm lint` / `pnpm format:write` — enforce ESLint and Prettier rules; resolve lint warnings before review.

## Contribution Roadmap

Short term, formalize integration tests around the zustand stores and React Query hooks (Vitest + React Testing Library are recommended). Mid term, modularize API adapters to allow real backend wiring without touching page components. Record architectural impacts in PR descriptions and keep this guide updated as the single source of truth for agents on the project.
