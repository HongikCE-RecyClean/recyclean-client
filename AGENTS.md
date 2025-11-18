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

### Shared UI Library Convention

`src/shared/ui`에는 버튼, 카드 같은 저수준 디자인 토큰 기반 위젯만 두고, 여러 도메인이 공유하는 고수준 조립 컴포넌트는 `src/shared/components`로 분리해요. 특정 도메인에서만 쓰이는 구성요소는 해당 도메인(예: `src/pages/...`)에 유지해요.

## Architecture & State Flow

The runtime is composed of layered providers initialized in `AppProviders`. Emotion’s `ThemeProvider` and `AppGlobalStyles` supply design context, while `@tanstack/react-query` handles asynchronous data with a shared `QueryClient`. Client state that must persist across routes (filters, toggles, cached entries) is centralized in zustand stores (`useDashboardStore`, `useMapStore`, `useSettingsStore`). When adding a new domain:

1. Create query keys in `src/shared/api/queryKeys.ts`.
2. Draft fetcher hooks inside `src/shared/api/`.
3. Add optional seed data in `src/shared/data/` until real endpoints exist.
4. Expose mutations or derived state through a store in `src/shared/state/`.

## Styling & Theming

Global typography, spacing, and color tokens originate from Vanilla Extract modules (`src/styles/tokens`). Emotion is responsible for component-level styling; prefer styled components for page-specific layouts and keep theme-aware utilities (spacing, radii) consistent. New global styles should extend `AppGlobalStyles` rather than authoring additional CSS entry points.

### Dark Mode & Theme System

The app supports light and dark themes through a centralized theme system defined in `src/shared/styles/theme.ts`:

- **Theme Objects**: `lightTheme` and `darkTheme` implement the `AppTheme` interface, providing type-safe design tokens
- **Theme Selection**: `AppProviders` subscribes to `useSettingsStore().darkMode` and dynamically injects the appropriate theme via Emotion's `ThemeProvider`
- **Persistence**: Dark mode preference is stored in localStorage through zustand's persist middleware
- **Global Styles**: `AppGlobalStyles` component uses the current theme to set CSS variables (`--app-background`, `--app-surface`, etc.) and applies them to `body`

### Theme Tokens

The `AppTheme` interface defines the following token categories:

**Colors** (semantic naming for light/dark compatibility):

- Layout: `background`, `surface`, `surfaceMuted`, `text`, `textMuted`, `border`
- Brand: `primary`, `primaryContrast`, `secondary`, `accent`
- Status: `success`, `successSurface`, `warning`, `warningSurface`, `danger`, `dangerSurface`, `info`, `infoSurface`
- Interaction: `highlight`

**Spacing**: Function-based (`spacing(4)` → `"16px"`) with 4px base unit

**Radii**: `sm` (8px), `md` (12px), `lg` (16px), `full`/`pill` (999px)

**Shadows**: `soft`, `medium`, `inner` (adjusted per theme for light/dark depth)

**Typography**: Pretendard font family with `regular` (400), `medium` (500), `semibold` (600), `bold` (700) weights

### Component Development with Theme

When creating or migrating components:

1. **Import theme hook**: `import { useTheme } from "@emotion/react"`
2. **Access tokens**: `const theme = useTheme()` inside components
3. **Use semantic colors**: Prefer `theme.colors.primary` over hard-coded hex values
4. **Styled components**: Theme is automatically available via props:
   ```typescript
   const Container = styled.div`
     background: ${({ theme }) => theme.colors.surface};
     padding: ${({ theme }) => theme.spacing(4)};
     border-radius: ${({ theme }) => theme.radii.md};
   `;
   ```
5. **Emotion css prop**: Pass theme manually:
   ```typescript
   const theme = useTheme();
   <div css={{ color: theme.colors.textMuted, fontSize: '0.875rem' }} />
   ```
6. **Dynamic styles**: Use `css` helper from `@emotion/react` for conditional theming:

   ```typescript
   import { css } from "@emotion/react";
   import type { AppTheme } from "shared/styles/theme";

   export const cardStyle = (theme: AppTheme) => css`
     background: ${theme.colors.surface};
     box-shadow: ${theme.shadows.soft};
   `;
   ```

### Adding New Colors or Tokens

When extending the theme system:

- Add the new token to **both** `lightTheme` and `darkTheme` in `theme.ts`
- Update the `AppTheme` interface to maintain type safety
- Use semantic names (e.g., `accentHover` not `green400`)
- Test in both light and dark modes to ensure sufficient contrast
- Document usage in component comments or this guide

## Internationalization & Localization

- **Translation Files**: Each locale is defined in `src/shared/i18n/locales/{en,ko,es,fr}.ts`. These modules export immutable translation objects (e.g., `enTranslation`) that are aggregated by `src/shared/i18n/resources.ts`.
- **Language Registry**: `src/shared/i18n/supportedLanguages.ts` is the single source of truth for supported language codes. When adding a new locale, update this file, supply a translation module, and wire the resource into `resources.ts`.
- **Runtime Wiring**: `AppProviders` wraps the tree with `I18nextProvider` and renders `LanguageSync`, which keeps `react-i18next` and `useSettingsStore` in sync. A language change updates both the i18n instance and the persisted zustand store.
- **Persistence**: `useSettingsStore` is persisted via zustand's `persist` middleware using `localStorage`, so language/dark-mode/region choices are stored per device (PWA-friendly). Any new setting added to this store must remain serializable.
- **Adding Copy**: Whenever UI text is introduced, add keys to **all** locale files in the same structure. English serves as the schema reference; use descriptive key paths (`section.feature.label`) and mirror them across languages to avoid drift.
- **Region/Locale Controls**: `SettingsLocaleCard` shows contextual hints (e.g., limited-region notice) via `settings.locale.regionHint`. When expanding support to new regions, update both the locale select options and each translation file.

## Development Workflow & Tooling

- `pnpm install` — hydrate dependencies via the pinned lockfile.
- `pnpm dev` — launch the Vite dev server on port 5174.
- `pnpm build` — run `tsc -b` and `vite build` to emit production assets.
- `pnpm preview` — serve the compiled bundle for manual QA.
- `pnpm typecheck` — validate TypeScript contracts without emitting files.
- `pnpm lint` / `pnpm format:write` — enforce ESLint and Prettier rules; resolve lint warnings before review.

## Contribution Roadmap

Short term, formalize integration tests around the zustand stores and React Query hooks (Vitest + React Testing Library are recommended). Mid term, modularize API adapters to allow real backend wiring without touching page components. Record architectural impacts in PR descriptions and keep this guide updated as the single source of truth for agents on the project.
