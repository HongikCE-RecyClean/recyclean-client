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

The runtime is composed of layered providers initialized in `AppProviders`. Emotion's `ThemeProvider` and `AppGlobalStyles` supply design context, while `@tanstack/react-query` handles asynchronous data with a shared `QueryClient`. Client state that must persist across routes (filters, toggles, cached entries) is centralized in zustand stores (`useDashboardStore`, `useMapStore`, `useSettingsStore`). Session-only UI state (notifications, modals) uses non-persistent stores (`useNotificationStore`). When adding a new domain:

1. Create query keys in `src/shared/api/queryKeys.ts`.
2. Draft fetcher hooks inside `src/shared/api/`.
3. Add optional seed data in `src/shared/data/` until real endpoints exist.
4. Expose mutations or derived state through a store in `src/shared/state/`.

## Local-First Data Management

The app follows a **local-first** approach powered by localStorage, enabling full offline functionality without authentication. This hybrid architecture combines persistent local data with optional server-side features via React Query.

### Data Storage Strategy

**Persistent Stores** (zustand + persist middleware):

- **`useUserStore`** (`recyclean-user`): User profile data
  - `name`: User's nickname (required for onboarding)
  - `region`: Preferred region (default: "kr")
  - `joinedAt`: ISO timestamp of first setup
  - `clearUserData()`: Wipes profile and triggers re-onboarding

- **`useActivityStore`** (`recyclean-activities`): Recycling activity records
  - `entries`: Array of `RecyclingEntry[]` with id, type, amount, date, points
  - `addEntry(entry)`: Appends new activity with auto-generated ID
  - `updateEntry(id, updates)`: Modifies existing entry
  - `deleteEntry(id)`: Removes single entry
  - `clearAllEntries()`: Wipes all activity data

- **`useSettingsStore`** (`recyclean-settings`): App preferences (existing)
  - Notifications, location, dark mode, language, region settings

**Session-Only Stores** (no persist):

- **`useDashboardStore`**: UI state only (search terms, filters, selected categories)
- **`useMapStore`**: Map filters and viewport state
- **`useNotificationStore`**: Global notification state (banners, snackbars)
  - `banner`: Current banner (single, replaces previous)
  - `snackbars`: Queue of snackbars (FIFO, auto-dismiss)
  - `showBanner(banner)`: Display persistent top banner
  - `showSnackbar(message, options?)`: Show temporary bottom toast

### Onboarding Flow

First-time users must complete onboarding before accessing the app:

1. **Guard Check**: `OnboardingGuard` in `App.tsx` checks `useUserStore().name`
2. **Redirect**: If name is empty, navigate to `/onboarding`
3. **Nickname Entry**: User enters nickname via `OnboardingPage`
4. **Persist**: `setName(nickname)` triggers localStorage write and sets `joinedAt`
5. **Navigation**: Redirect to dashboard (`/`) on completion

**Key Files**:

- `src/App.tsx`: Contains `OnboardingGuard` wrapper
- `src/pages/onboarding/OnboardingPage.tsx`: Nickname input form
- `src/shared/state/userStore.ts`: Persist configuration

### Data Reset & Profile Management

Users can manage their local data through Settings:

- **Profile Editing**: Settings → Edit Profile → Update nickname via BottomSheet
- **Data Reset**: Settings → Reset Data → Confirms, clears all stores, navigates to onboarding
  - Implementation: `SettingsSupportActionsCard.tsx`
  - Clears: `userStore`, `activityStore` (settings remain intact)

### Hybrid Server Integration

While the app operates fully offline, React Query remains available for server-dependent features:

- **Image Analysis**: `/analyze` endpoint for AI-powered recycling classification
- **Map Data**: Dynamic recycling center locations
- **Initial Seed Data**: API responses populate `activityStore` on first load if empty

**Data Sync Pattern**:

```typescript
// Load initial data from API if local store is empty
useEffect(() => {
  if (entries.length === 0 && data?.entries?.length > 0) {
    setEntries(data.entries); // Seed local store once
  }
}, [data?.entries, entries.length, setEntries]);
```

**Best Practices**:

- Never rely on React Query for core CRUD operations on local data
- Use `activityStore` actions directly for all user-generated activities
- Reserve API calls for server-computed features (analytics, ML inference)

### localStorage Schema

```
recyclean-user          → { name, region, joinedAt }
recyclean-activities    → { entries: RecyclingEntry[] }
recyclean-settings      → { notifications, location, darkMode, language, region }
```

**Storage Limits**: Browser localStorage typically caps at 5-10MB. For image-heavy features, consider IndexedDB or server upload.

### Migration & Versioning

When updating store schemas:

1. Add a `version` field to the persist config
2. Implement migration logic in the store definition:
   ```typescript
   persist(
     (set) => ({
       /* state */
     }),
     {
       name: "recyclean-user",
       version: 2,
       migrate: (persistedState: any, version: number) => {
         if (version < 2) {
           // Transform old schema
         }
         return persistedState;
       },
     },
   );
   ```

### Activity Recording Workflows

Users can add recycling activities through three entry points:

**1. AI Analysis** (`AnalyzePage.tsx`):

- Capture photo or upload image → AI classification → "재활용 처리 기록" button
- Only recyclable items can be saved (result.recyclable === true)
- Automatically matches material type and calculates points
- Shows success notification on save

**2. Manual Entry** (`AddEntryBottomSheet`):

- Triggered from DashboardPage → TrackerCard → "활동 기록하기" button
- Form fields: Category → Material → Amount → Date
- Real-time points preview before saving
- Immediate localStorage sync via activityStore.addEntry()

**3. Calendar Management** (`CalendarPage.tsx`):

- View: Daily activity list with date grouping
- Delete: Trash icon → confirmation dialog → activityStore.deleteEntry()
- Stats auto-update across all pages

**Implementation Files**:

- `src/pages/dashboard/components/AddEntryBottomSheet.tsx`: Manual entry form
- `src/pages/analyze/AnalyzePage.tsx`: AI result save handler (handleSaveEntry)
- `src/pages/calendar/components/CalendarEntriesCard.tsx`: Delete button integration

## Recycling Points & Material Classification

### Points Calculation System

**Location**: `src/shared/utils/recyclingPoints.ts`

**Core utilities**:

- `RECYCLING_POINTS_TABLE`: 23개 재활용 품목의 포인트 테이블 (1-10pt)
- `MATERIALS_BY_CATEGORY`: 카테고리별 품목 분류 (플라스틱, 종이, 금속, 유리 등)
- `calculatePoints(type, amount)`: 품목과 수량 기반 포인트 계산
- `matchMaterialType(item, category)`: AI 분석 결과를 표준 품목명으로 매칭
- `translateCategory(category)`: 영문 카테고리를 한국어로 변환

**Usage Pattern**:

```typescript
import { calculatePoints, matchMaterialType } from "shared/utils/recyclingPoints";

// AI 분석 결과 처리
const materialType = matchMaterialType("Plastic Bottle", "Plastic");
const points = calculatePoints(materialType, 1); // "PET병", 3pt
```

**Points Table**:

- 플라스틱류: 1-3pt (비닐 1pt, PET병 3pt)
- 종이류: 1-3pt (종이 1pt, 우유팩 3pt)
- 금속류: 3-4pt (캔 3pt, 알루미늄 캔 4pt)
- 유리류: 3-4pt (유리병 3pt, 소주병 4pt)
- 전자제품: 5-10pt (배터리 5pt, 전자제품 10pt)

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

## PWA Architecture & Capabilities

Our RecyClean web app is deployed as a Progressive Web App to unlock installability, offline fallback, and push-friendly capabilities. Follow these guardrails whenever you touch the PWA surface:

### Manifest & Install Surface

- **Source of truth**: `public/manifest.webmanifest` defines the install card. Keep `name`, `short_name`, and `description` localized using Korean copy first, then mirror into other locales when marketing asks.
- **Icons**: Update all sizes (`/public/icons`) together. Any new PNG must include `purpose: "maskable"` to avoid clipping on Android launchers.
- **Theme/Background colors**: Match `theme_color` to `theme.colors.primary` and `background_color` to `theme.colors.background` to prevent flash-of-unstyled backgrounds when the splash screen shows.
- **Start scope**: Leave `start_url` and `scope` at `/` unless we move to multi-origin hosting. Changing them without routing changes will break deep links on installed builds.

### Service Worker & Caching

- **File location**: `public/sw.js` is a hand-rolled App Shell cache. Update `CACHE_VERSION` whenever you change the pre-cache array so old assets are purged on activate.
- **App shell list**: Keep `/index.html`, top-level icons, and any offline-critical fonts/assets in `APP_SHELL`. Do not list API endpoints—service workers should never cache mutating calls.
- **Fetch strategy**: Navigation requests use network-first fallback-to-shell; static assets are cache-first with background refresh. When adjusting logic, preserve this split to keep SPA routing resilient while avoiding stale API data.
- **Registration**: `src/main.tsx` registers `/sw.js` only in production. During local QA you must run `pnpm build && pnpm preview` to validate SW changes because `pnpm dev` skips registration.

### Permissions & Device Capabilities

- **Notification & location toggles**: `usePermissionRequests` (under `src/pages/settings/hooks`) centralizes capability prompts. Any new hardware permission (camera, Bluetooth, etc.) must follow the same pattern: capability detection, status sync, user-initiated request, and UI feedback in `SettingsAppPreferencesCard`.
- **PWA install hooks**: When implementing custom install prompts, listen to `beforeinstallprompt` at a shared provider (e.g., `AppProviders`) and store the event in zustand so Settings or onboarding screens can trigger it in response to explicit user actions.
- **Capability persistence**: Only set zustand flags (`useSettingsStore`) to true when the browser reports `granted`. On `unsupported` or `denied`, automatically revert the toggle and surface a status helper text (see current Korean copy for phrasing).

### Build & Deployment Checklist

- Run `pnpm build` to emit production assets and make sure the generated `/dist/manifest.webmanifest` contains your updates.
- Inspect the Lighthouse PWA audit (Chrome DevTools → Lighthouse → PWA) on a preview build to confirm installability, offline readiness, and HTTPS.
- After shipping, bump `CACHE_VERSION` again if emergency patches require clients to drop outdated caches immediately.
- Document any new push endpoints, background sync, or periodic sync registrations inside this section so future agents understand server dependencies.

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
- **Banner**: 상단 알림 배너 (중요 정보, 경고, 환영 메시지)
- **BottomSheet**: 모바일 하단 시트 (설정 메뉴에서 사용)
- **Button**: 주요 액션 버튼 (primary, secondary, ghost 변형)
- **Card**: 콘텐츠 컨테이너 (기본 레이아웃 단위)
- **Progress**: 진행률 표시 (선형 바)
- **SelectField**: 드롭다운 선택 입력
- **Separator**: 수평/수직 구분선
- **Snackbar**: 하단 토스트 알림 (액션 결과 피드백)
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

## Notification System (Banner & Snackbar)

The app provides a dual notification system for different types of user feedback: **Banner** for persistent important messages and **Snackbar** for temporary action feedback.

### Architecture Overview

**State Management**: `useNotificationStore` (zustand, non-persistent)

- **Location**: `src/shared/state/notificationStore.ts`
- **Scope**: Global, session-only (notifications are ephemeral)
- **Store Structure**:
  ```typescript
  {
    banner: BannerState | null,           // Single banner (replaces previous)
    snackbars: SnackbarState[],          // Queue of snackbars (FIFO)
    showBanner: (banner) => void,
    closeBanner: () => void,
    showSnackbar: (message, options?) => void,
    closeSnackbar: (id) => void,
  }
  ```

**Global Rendering**:

- **BannerContainer**: Rendered in `AppShell` (below Header)
- **SnackbarContainer**: Rendered in `AppProviders` (above BottomNav)

### Banner (상단 알림)

**Purpose**: Persistent, important information that requires user acknowledgment

**Location**: Top of page, below Header, with horizontal margins

**Design**:

- Card-style appearance (surface background, border, shadow)
- Emoji-based type indicators (✅ success, ❌ error, ⚠️ warning, 💡 info)
- Optional action button
- Manual dismiss via close button (X icon with rotation animation)

**Usage Pattern**:

```typescript
import { useNotificationStore } from "shared/state/notificationStore";

const { showBanner, closeBanner } = useNotificationStore();

// Simple info banner
showBanner({
  type: "info",
  message: "환영해요! 첫 재활용 활동을 기록해보세요",
});

// Banner with action
showBanner({
  type: "warning",
  message: "오늘 놓친 일정이 3개 있어요",
  action: {
    label: "확인하기",
    onClick: () => navigate("/calendar"),
  },
});

// Programmatic close
closeBanner();
```

**When to Use Banner**:

- ✅ First-time user welcome messages
- ✅ System status changes (offline/online mode)
- ✅ Important warnings or alerts
- ✅ Feature announcements
- ✅ Milestone celebrations (e.g., "100 points achieved!")
- ❌ **NOT for**: Quick action feedback (use Snackbar instead)

**Current Implementation**:

- `DashboardPage.tsx:38-49` - Welcome banner for first-time users (0 entries)

### Snackbar (하단 토스트)

**Purpose**: Temporary feedback for user actions

**Location**: Bottom center, above BottomNav, stacked vertically (newest on top)

**Design**:

- Compact, minimal card with type-specific background colors
- Auto-dismiss after configurable duration (default 4 seconds)
- Optional action button (e.g., "Undo")
- Slide-up animation on appear

**Usage Pattern**:

```typescript
import { useNotificationStore } from "shared/state/notificationStore";

const { showSnackbar } = useNotificationStore();

// Simple success message
showSnackbar("활동이 기록되었어요!");

// With custom duration
showSnackbar("저장되었어요", {
  type: "success",
  duration: 3000,
});

// With undo action
showSnackbar("삭제되었어요", {
  type: "success",
  duration: 5000,
  action: {
    label: "실행취소",
    onClick: () => {
      restoreEntry(backup);
      showSnackbar("복구되었어요", { type: "info" });
    },
  },
});
```

**When to Use Snackbar**:

- ✅ Action confirmations ("Saved", "Deleted", "Updated")
- ✅ Quick status updates
- ✅ Error messages that don't require immediate action
- ✅ Undo/redo feedback
- ❌ **NOT for**: Critical errors or important warnings (use Banner instead)

**Current Implementation**:

- `AddEntryBottomSheet.tsx:67-70` - Success message after saving activity
- `CalendarPage.tsx:155-181` - Delete with undo action

### Design Tokens

**Banner**:

- Height: `min-height: theme.spacing(16)` (64px)
- Padding: `theme.spacing(4)` (16px)
- Margin: `0 theme.spacing(4)`, `marginTop: theme.spacing(3)`
- Border radius: `theme.radii.lg` (16px)
- Shadow: Card-style dual shadow

**Snackbar**:

- Min-height: `theme.spacing(14)` (56px)
- Padding: `theme.spacing(3) theme.spacing(4)`
- Max-width: `500px`
- Border radius: `theme.radii.md` (12px)
- Gap between multiple: `theme.spacing(2)` (8px)

**Emoji Indicators**:

- Success: ✅
- Error: ❌
- Warning: ⚠️
- Info: 💡
- Size: `1.5rem`, margin-right: `0.75rem`

### Best Practices

1. **Banner vs Snackbar Decision Tree**:
   - Does it require user action? → Banner with action button
   - Is it system-critical? → Banner
   - Is it temporary feedback? → Snackbar
   - Can it auto-dismiss? → Snackbar
   - Should it persist until acknowledged? → Banner

2. **Avoid Notification Fatigue**:
   - Don't show banners on every page load
   - Use localStorage flags to track "seen" states
   - Batch multiple related updates into single notification

3. **Accessibility**:
   - Both components use semantic HTML and ARIA labels
   - Close buttons have `aria-label="닫기"`
   - Keyboard navigation supported

4. **Mobile Considerations**:
   - Snackbar positioning accounts for `safe-area-inset-bottom`
   - Banner has responsive padding (`@media (max-width: 768px)`)
   - Touch targets meet 44px minimum

### File Structure

```
src/shared/
├── state/
│   └── notificationStore.ts          # Zustand store (session-only)
├── ui/
│   ├── Banner/
│   │   ├── Banner.tsx                # Banner component (emoji-based)
│   │   ├── Banner.styles.ts          # Card-style design
│   │   ├── BannerContainer.tsx       # Global renderer
│   │   └── index.ts
│   └── Snackbar/
│       ├── Snackbar.tsx              # Snackbar component
│       ├── Snackbar.styles.ts        # Type-specific backgrounds
│       ├── SnackbarContainer.tsx     # Queue renderer
│       └── index.ts
├── layout/AppShell/
│   └── AppShell.tsx                  # Integrates BannerContainer
└── providers/
    └── AppProviders.tsx              # Integrates SnackbarContainer
```

### Future Enhancements

- [ ] Add notification sound effects (respect `useSettingsStore().sounds`)
- [ ] Implement notification history/center
- [ ] Support rich content (images, links)
- [ ] Add swipe-to-dismiss gesture for mobile
- [ ] Connect to PWA push notifications when backend is ready

## Internationalization & Localization

- **Translation Files**: Each locale is defined in `src/shared/i18n/locales/{en,ko,es,fr}.ts`. These modules export immutable translation objects (e.g., `enTranslation`) that are aggregated by `src/shared/i18n/resources.ts`.
- **Language Registry**: `src/shared/i18n/supportedLanguages.ts` is the single source of truth for supported language codes. When adding a new locale, update this file, supply a translation module, and wire the resource into `resources.ts`.
- **Runtime Wiring**: `AppProviders` wraps the tree with `I18nextProvider` and renders `LanguageSync`, which keeps `react-i18next` and `useSettingsStore` in sync. A language change updates both the i18n instance and the persisted zustand store.
- **Persistence**: `useSettingsStore` is persisted via zustand's `persist` middleware using `localStorage`, so language/dark-mode/region choices are stored per device (PWA-friendly). Any new setting added to this store must remain serializable.
- **Adding Copy**: Whenever UI text is introduced, add keys to **all** locale files in the same structure. English serves as the schema reference; use descriptive key paths (`section.feature.label`) and mirror them across languages to avoid drift.
- **Region/Locale Controls**: `SettingsLocaleCard` shows contextual hints (e.g., limited-region notice) via `settings.locale.regionHint`. When expanding support to new regions, update both the locale select options and each translation file.

## Activity Store CRUD Quick Reference

This section provides quick code examples for common activity store operations.

### Create

**Method 1: From AI analysis**

```typescript
import { useActivityStore } from "shared/state/activityStore";
import { matchMaterialType, calculatePoints } from "shared/utils/recyclingPoints";

const { addEntry } = useActivityStore();

// AI 분석 결과를 활동 기록으로 변환
const materialType = matchMaterialType(result.item, result.category);
const points = calculatePoints(materialType, 1);

addEntry({
  type: materialType,
  amount: 1,
  date: new Date(),
  points,
});
```

**Method 2: Manual entry**

```typescript
const { addEntry } = useActivityStore();

addEntry({
  type: "PET병",
  amount: 5,
  date: new Date("2025-01-15"),
  points: 15,
});
```

### Read

**Get all entries**

```typescript
const entries = useActivityStore((state) => state.entries);
```

**Filter by date**

```typescript
import { isSameDay } from "date-fns";

const entries = useActivityStore((state) => state.entries);
const todayEntries = entries.filter((e) => isSameDay(e.date, new Date()));
```

**Compute statistics**

```typescript
const entries = useActivityStore((state) => state.entries);

const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
const totalItems = entries.reduce((sum, entry) => sum + entry.amount, 0);
const categoryCount = new Set(entries.map((entry) => entry.type)).size;
```

### Update

```typescript
const { updateEntry } = useActivityStore();

// 수량과 포인트 업데이트
updateEntry(entryId, {
  amount: 10,
  points: 30,
});

// 날짜 수정
updateEntry(entryId, {
  date: new Date("2025-01-20"),
});
```

### Delete

```typescript
const { deleteEntry } = useActivityStore();

// 단일 항목 삭제 (즉시 localStorage 동기화)
deleteEntry(entryId);
```

### Clear All

```typescript
const { clearAllEntries } = useActivityStore();

// 모든 활동 기록 삭제 (주의: 복구 불가능)
clearAllEntries();
```

## Development Workflow & Tooling

- `pnpm install` — hydrate dependencies via the pinned lockfile.
- `pnpm dev` — launch the Vite dev server on port 5174.
- `pnpm build` — run `tsc -b` and `vite build` to emit production assets.
- `pnpm preview` — serve the compiled bundle for manual QA.
- `pnpm typecheck` — validate TypeScript contracts without emitting files.
- `pnpm lint` / `pnpm format:write` — enforce ESLint and Prettier rules; resolve lint warnings before review.

## Contribution Roadmap

Short term, formalize integration tests around the zustand stores and React Query hooks (Vitest + React Testing Library are recommended). Mid term, modularize API adapters to allow real backend wiring without touching page components. Record architectural impacts in PR descriptions and keep this guide updated as the single source of truth for agents on the project.
