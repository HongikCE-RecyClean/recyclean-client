# RecyClean 서비스 분석 노트

## 핵심 요약

- 모바일 퍼스트 레이아웃에서 헤더(header)와 하단 내비게이션(bottom navigation)이 고정돼 각 페이지를 일관되게 이동해요.
- 메인 대시보드(dashboard)에서 다른 기능 페이지로 이동하는 빠른 액션(quick action)과 데이터 프리뷰를 제공해요.
- 페이지 전반에서 디자인 시스템(design system)을 공유해 일관된 버튼(button), 배지(badge), 카드(card) 스타일을 재사용해요.
- 아직 백엔드 연동은 없고, 목업 데이터(mock data)와 로컬 상태(state)만으로 기능 흐름을 시연해요.

## 기술 스택과 시스템 구조

- 번들러(bundle)·개발 서버(dev server): 비트(Vite) 7 + SWC 리액트 플러그인(React SWC plugin).
- 프런트엔드 프레임워크(front-end framework): 리액트(React) 19 + 타입스크립트(TypeScript).
- 스타일 계층: 이모션(Emotion) 테마(theme)로 UI 컴포넌트 스타일링, 바닐라 익스트랙트(vanilla-extract)로 전역 스타일(global style)과 토큰(token) 정의.
- 라우팅(routing): 리액트 라우터 돔(react-router-dom) 7, `App.tsx`에서 브라우저 라우터(BrowserRouter)와 중첩 라우트(nested route) 설정.
- 경로 별칭(path alias): `vite.config.ts`에서 `@styles` → `src/styles`.
- 배포 대상: `dist/` 빌드(build)와 `public/` 정적 자산(static asset).

## 레이아웃과 공통 컴포넌트

- `AppShell`은 헤더(Header)와 하단 내비게이션(BottomNav), `Outlet`으로 구성돼 모든 페이지에서 공통 레이아웃(layout)을 유지해요.
- 헤더는 로고와 사용자 버튼을 제공하며 스티키(sticky) 처리로 항상 상단에 있어요.
- 하단 내비게이션은 홈, 가이드, 카메라, 지도, 알림으로 이동하며 현재 경로에 따라 강조(active) 상태를 적용해요.
- `src/shared/ui` 폴더에 카드(Card), 버튼(Button), 텍스트필드(TextField), 셀렉트필드(SelectField), 스위치(Switch), 배지(Badge), 칩(Chip), 프로그레스바(Progress) 등 재사용 컴포넌트가 모여 있어요.
- `ImageWithFallback`은 이미지 로딩 실패 시 대체 아이콘을 보여주는 미디어 유틸리티(media utility)예요.

## 페이지별 주요 기능

### 대시보드 페이지(`src/pages/dashboard/DashboardPage.tsx`)

- 오늘의 실적 카드에서 재활용 아이템 수, 포인트, 연속 참여 일수를 요약해요.
- 가이드 검색 섹션은 즉시 검색 입력과 추천 태그로 가이드 페이지로 이동시켜요.
- 월간 목표 카드에서 진행도(progress)와 포인트(goal)를 시각화해요.
- 빠른 작업 버튼으로 카메라, 지도, 수동 기록 기능에 접근해요.
- 미니 지도 프리뷰는 지도 페이지의 배출함 데이터를 일부 보여주고 바로 이동할 수 있게 해요.
- 재활용 정보 검색 섹션은 소재(material) 필터와 텍스트 검색으로 재활용 팁을 찾아요.
- 지속가능성 목표, 친환경 아이디어, 활동 추적 카드로 장기 목표와 활동 내역을 관리해요.
- 목업 재활용 기록 데이터를 통해 진행률을 계산하고 통계(statistics)를 표시해요.

### 가이드 페이지(`src/pages/guide/GuidePage.tsx`)

- 로컬 스토리지(local storage)를 사용해 즐겨찾기(favorite)와 최근 검색(recent search) 이력을 저장해요.
- 검색어 디바운스(debounce)와 카테고리 필터(filter)로 재활용 가이드를 탐색해요.
- 자동완성(suggestion) 목록과 추천 키워드로 검색 편의성을 높여요.
- 항목 카드에서 즐겨찾기 토글(toggle) 및 상세 보기 버튼을 제공해요.
- 상세 시트(sheet) 오버레이(overlay)는 처리 단계(step), 팁(tip), 주의사항(caution)을 안내하며 ESC 키로 닫히도록 접근성(accessibility)을 고려했어요.

### 카메라 페이지(`src/pages/camera/CameraPage.tsx`)

- 사전 권한 안내(pre-permission) 오버레이를 통해 카메라 권한 요청 전 사용 목적을 설명하고 확인을 받아요.
- 확인 전에는 촬영·업로드 버튼이 비활성화(disabled)돼 있어요.
- 모의 촬영(mock capture)과 업로드(mock upload)는 외부 이미지로 캡처 상태를 만들고 분석 결과를 랜덤으로 보여줘 UI 플로우(flow)를 시연해요.
- 샘플 오버레이 토글로 감지 박스(detection box)를 표시·숨김 할 수 있어요.
- 분석 중에는 스피너(spinner)와 함께 대기 상태를 보여주고, 결과 카드에서는 재활용 가능 여부, 확신도(confidence), 처리 방법을 안내해요.
- 촬영 팁 리스트를 제공해 실제 사용 시 품질을 높이도록 안내해요.

### 지도 페이지(`src/pages/map/MapPage.tsx`)

- 배출함 트래킹(tracking)과 재활용 센터 정보는 상수 데이터(constants)로 제공돼요.
- 필터 카드에서 유형 선택(select)과 위치 기반 추천(향후 구현 예정)을 안내해요.
- 지도 플레이스홀더(placeholder) 카드가 실제 지도 구현 전 사용자 기대치를 설정해요.
- 배출함 리스트는 가용성(availability)에 따라 배지를 색상으로 구분하고 길 찾기 및 상태 신고 버튼을 제공해요.
- 재활용 센터 리스트는 이미지, 운영 시간, 연락처, 수거 품목 배지를 보여줘요.

### 알림 페이지(`src/pages/alerts/AlertsPage.tsx`)

- 알림 요약 카드에서 활성 리마인더(reminder) 수와 주간 다이제스트(digest) 요일을 보여줘요.
- 오늘 예정 알림 리스트에서 각 항목을 스위치로 토글하며 스케줄(schedule)과 채널(channel)을 강조해요.
- 환경 소식 섹션은 캠페인 태그(tag)와 함께 세부 내용으로 이동하는 버튼을 제공해요.
- 알림 설정 카드에서 전체 알림, 조용한 시간(quiet hours), 시간 선택, 위치 기반 알림까지 상세 제어를 제공해요.
- 최근 처리 로그(log)로 사용자가 수행한 알림 이력을 확인해요.

### 설정 페이지(`src/pages/settings/SettingsPage.tsx`)

- 현재 라우팅에서 `/settings`는 `/alerts`로 리다이렉트(redirect)되지만 파일은 미리 구현돼 있어요.
- 사용자 프로필(profile) 정보, 누적 포인트, 연속 일수, 알림/위치/다크 모드(dark mode)/사운드(sound) 스위치, 언어(language)·지역(region) 셀렉트 등을 포함해요.

## 페이지 간 기능 플로우

1. 사용자가 앱에 진입하면 대시보드에서 실적, 목표, 추천 액션을 먼저 확인해요.
2. 대시보드의 가이드 검색 또는 추천 태그를 누르면 쿼리 파라미터(query parameter)와 함께 가이드 페이지로 이동해 즉시 결과를 보여줘요.
3. 대시보드와 하단 내비게이션은 카메라/지도/알림으로 이동하는 주요 관문으로 작동해요.
4. 지도 페이지에서 사용하는 배출함 데이터(TRASH_BINS)는 대시보드 미니 지도에서도 활용돼 동일한 정보를 공유해요.
5. 카메라 페이지에서 결과를 확인한 뒤 “재활용 처리 기록” 버튼으로 향후 기록 기능으로 확장될 여지를 남겨요.
6. 알림 페이지에서 설정을 변경하면 로컬 상태만 수정되지만, 권한 안내 문구를 통해 실제 구현 시 흐름을 예상할 수 있게 해요.
7. 설정 페이지는 현재 노출되지 않지만 향후 사용자 계정 관리 흐름을 담당하도록 준비돼 있어요.

## 디렉터리 트리(요약, 최대 3단계)

```text
src/
  App.tsx
  main.tsx
  shared/
    ui/
      Button/Button.tsx
      Card/Card.tsx
      TextField/TextField.tsx
      SelectField/SelectField.tsx
      Switch/Switch.tsx
      Badge/Badge.tsx
      Progress/Progress.tsx
      Chip/Chip.tsx
      Avatar/Avatar.tsx
      Separator/Separator.tsx
    layout/
      AppShell/AppShell.tsx
      Header/Header.tsx
    navigation/
      BottomNav/BottomNav.tsx
    media/
      ImageWithFallback/ImageWithFallback.tsx
    styles/
      theme.ts
  styles/
    global.css.ts
    reset.css.ts
    fontFace.css.ts
    tokens/
      color.css.ts
      font.css.ts
  pages/
    dashboard/DashboardPage.tsx
    guide/GuidePage.tsx
    guide/data/guideItems.ts
    camera/CameraPage.tsx
    map/MapPage.tsx
    map/constants.ts
    map/components/MapFilterCard.tsx
    map/components/MapPlaceholderCard.tsx
    map/components/TrashBinList.tsx
    map/components/RecyclingCenterList.tsx
    alerts/AlertsPage.tsx
    settings/SettingsPage.tsx
```

## 추가 메모

- 모든 데이터는 하드코딩(hard-coded) 상수(constants)나 컴포넌트 내부 상태를 사용하며 API 연동은 아직 없어요.
- UI 접근성(accessibility)을 고려해 스위치·오버레이 등에 ARIA 속성을 다수 지정했어요.
- `src/shared/components` 하위는 향후 컴포넌트 이동을 위한 빈 디렉터리로 보이며 현재는 사용 중이 아니에요.
