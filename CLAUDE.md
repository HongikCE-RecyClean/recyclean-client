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

## Design System Reference

This section provides concrete values for all design tokens used throughout the application.

### Color Palette

**Light Mode** (`lightTheme`):

```
Layout & Surface
  background      #f5f7fa   (페이지 배경)
  surface         #ffffff   (카드/컴포넌트 배경)
  surfaceMuted    #f0f4f8   (보조 배경)
  border          #d1d9e0   (경계선)

Text
  text            #1f2933   (본문 텍스트)
  textMuted       #4a5568   (보조 텍스트)

Brand Colors
  primary         #2f855a   (주 브랜드 색상 - 초록)
  primaryContrast #ffffff   (primary 위 텍스트)
  secondary       #0c4a6e   (보조 브랜드 색상 - 파랑)
  accent          #14b8a6   (강조 색상 - 청록)

Status Colors
  success         #15803d   (성공 메시지)
  successSurface  #dcfce7   (성공 배경)
  warning         #b45309   (경고 메시지)
  warningSurface  #fef3c7   (경고 배경)
  danger          #dc2626   (오류/위험)
  dangerSurface   #fee2e2   (오류 배경)
  info            #2563eb   (정보 메시지)
  infoSurface     #dbeafe   (정보 배경)

Interaction
  highlight       #22c55e   (하이라이트/호버)
```

**Dark Mode** (`darkTheme`):

```
Layout & Surface
  background      #0f172a   (페이지 배경 - 진한 네이비)
  surface         #1e293b   (카드/컴포넌트 배경)
  surfaceMuted    #334155   (보조 배경)
  border          #334155   (경계선)

Text
  text            #f1f5f9   (본문 텍스트 - 밝은 회색)
  textMuted       #94a3b8   (보조 텍스트)

Brand Colors
  primary         #34d399   (주 브랜드 색상 - 밝은 초록)
  primaryContrast #0f172a   (primary 위 텍스트 - 어두운 배경)
  secondary       #38bdf8   (보조 브랜드 색상 - 하늘색)
  accent          #2dd4bf   (강조 색상 - 밝은 청록)

Status Colors
  success         #22c55e   (성공 메시지)
  successSurface  #065f46   (성공 배경 - 어두운 초록)
  warning         #f59e0b   (경고 메시지)
  warningSurface  #78350f   (경고 배경 - 어두운 노랑)
  danger          #ef4444   (오류/위험)
  dangerSurface   #7f1d1d   (오류 배경 - 어두운 빨강)
  info            #60a5fa   (정보 메시지)
  infoSurface     #1e3a8a   (정보 배경 - 어두운 파랑)

Interaction
  highlight       #4ade80   (하이라이트/호버)
```

### Typography Scale

**Vanilla Extract 타이포그래피 토큰** (`src/styles/tokens/font.css.ts`):

The application uses Pretendard font family with a systematic scale based on weight (sb=semibold, m=medium, r=regular) and size:

```
Heading (제목)
  heading_sb_20   20px / 600 / 150% / -0.01em
  heading_sb_18   18px / 600 / 150% / -0.01em

Title (타이틀)
  title_sb_16     16px / 600 / 100% / -0.01em
  title_m_16      16px / 500 / 100% / -0.01em
  title_r_16      16px / 400 / 100% / -0.01em
  title_sb_15     15px / 600 / 100% / -0.01em

Body (본문)
  body_m_14       14px / 500 / 150% / -0.01em
  body_r_14       14px / 400 / 150% / -0.01em
  body_r_13       13px / 400 / 140% / -0.01em

Caption (캡션)
  caption_sb_12   12px / 600 / 150% / -0.01em
  caption_m_12    12px / 500 / 150% / -0.01em
  caption_r_12    12px / 400 / 150% / -0.01em
  caption_r_11    11px / 400 / 100% / -0.01em
```

**Font Weights** (theme.typography.weights):

- `regular`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

**Usage**: Access via `fontVars` in Vanilla Extract stylesheets or `theme.typography` in Emotion components.

### Spacing System

**Base Unit**: 4px

The `theme.spacing()` function multiplies by 4:

```typescript
spacing(1)  → "4px"
spacing(2)  → "8px"
spacing(3)  → "12px"
spacing(4)  → "16px"
spacing(6)  → "24px"
spacing(8)  → "32px"
spacing(12) → "48px"
```

**Common Patterns**:

- Card padding: `spacing(4)` or `spacing(6)` (16px or 24px)
- Section gaps: `spacing(3)` to `spacing(6)` (12px to 24px)
- Icon margins: `spacing(2)` (8px)
- Button padding: `spacing(3)` horizontal, `spacing(2)` vertical

### Border Radii

```
sm    8px    (작은 요소: Badge, 작은 버튼)
md    12px   (기본 카드, 입력 필드)
lg    16px   (큰 카드, 모달)
full  999px  (완전한 원형: Avatar)
pill  999px  (알약 모양: Badge, Tag)
```

### Shadows

**Light Mode**:

```
soft    0 4px 16px rgba(15, 23, 42, 0.08)   (기본 카드 그림자)
medium  0 12px 32px rgba(15, 23, 42, 0.12)  (부상 효과, 모달)
inner   inset 0 1px 2px rgba(15, 23, 42, 0.08)  (눌린 효과)
```

**Dark Mode**:

```
soft    0 4px 16px rgba(0, 0, 0, 0.3)
medium  0 12px 32px rgba(0, 0, 0, 0.5)
inner   inset 0 1px 2px rgba(0, 0, 0, 0.3)
```

### UI Component Library

**Location**: `src/shared/ui/`

**Available Components**:

- **Avatar**: 사용자 프로필 이미지 (원형)
- **Badge**: 상태 표시, 카테고리 태그 (알약 모양)
- **BottomSheet**: 모바일 하단 시트 (설정 메뉴에서 사용)
- **Button**: 주요 액션 버튼 (primary, secondary, ghost 변형)
- **Card**: 콘텐츠 컨테이너 (기본 레이아웃 단위)
- **Progress**: 진행률 표시 (선형 바)
- **SelectField**: 드롭다운 선택 입력
- **Separator**: 수평/수직 구분선
- **Switch**: 토글 스위치 (설정 ON/OFF)
- **TextField**: 텍스트 입력 필드

**Component Pattern**:
Each component follows the structure:

```
ComponentName/
  ├── ComponentName.tsx        (main component)
  ├── ComponentName.styles.ts  (Emotion styled components)
  └── index.ts                 (export)
```

**Import Pattern**:

```typescript
import { Button } from "shared/ui/Button";
import * as S from "./ComponentName.styles"; // for styled components
```

### Icon System

**Library**: lucide-react

**Usage**:

```typescript
import { Home, Camera, Calendar, MapPin, Settings } from "lucide-react";

<Home size={20} color={theme.colors.primary} />
```

**Common Icons**:

- Navigation: `Home`, `Camera`, `Calendar`, `MapPin`, `Settings`
- Actions: `Search`, `Plus`, `Trash2`, `Edit`, `Check`, `X`
- Status: `AlertCircle`, `CheckCircle`, `Info`, `AlertTriangle`
- UI: `ChevronRight`, `ChevronDown`, `Menu`, `MoreVertical`

**Icon Sizing**:

- Small: 16px (캡션 옆 아이콘)
- Default: 20px (버튼, 네비게이션)
- Large: 24px (헤더, 주요 액션)

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
