아래는 **API 없이(UI·View만)** 진행하는 기준으로, 업로드하신 기획서(리싸이클린)의 화면·컴포넌트·상태·네비게이션을 정리하고 **React Native 프런트엔드 개발 계획**을 단계별/실행가능한 형태로 구성한 문서입니다.
(기획서의 **주요 기능·화면 구조**(p.3, p.6~8), **초기 구현 캡처**(p.12), **프런트엔드 스택**(p.5)을 근거로 했습니다.)

---

## 1) 범위(Scope) & 원칙

- **범위**: RN 앱의 **UI/화면/네비게이션/상태(클라이언트 로컬)** 설계 및 구현.
  데이터는 **mock JSON/로컬 상태**로 구성(네트워크/API 호출 없음).
- **전역 내비게이션**: **하단 탭(3~5개)**로 최상위 화면 이동을 제공 — iOS HIG/Material 가이드의 권장 패턴. React Navigation Bottom Tabs는 **지연 마운트(lazy)**로 최초 포커스 시에만 화면을 마운트하므로 초기 성능에 유리. ([Apple Developer][1])
- **터치/접근성 기본값**: 탭·버튼 **최소 44×44pt(iOS)** / **48×48dp(Android)**, 텍스트 대비 **WCAG 2.1 AA 4.5:1(일반 텍스트), 3:1(대형 텍스트·UI 컴포넌트)**. ([Apple Developer][2])
- **권한 요청 UI 원칙**(사전 안내 문구·맥락 제공): **Privacy/HIG** 권장사항을 따르는 **pre-permission** 패턴(교육성 시트 → 시스템 다이얼로그). *UI만 구성*하며 실제 권한 로직은 후속 연동 시 활성화. ([Apple Developer][3])

---

## 2) 정보구조(IA) & 네비게이션

**하단 5 탭** (기획서 p.6~8의 화면 정의를 반영)

1. **홈**
2. **가이드**(검색/FAQ)
3. **카메라**(AI 분류 UI)
4. **지도**(시설/수거함)
5. **알림/설정**

> Material 가이드는 하단 내비게이션을 **3~5개 최상위 목적지**에 권장합니다. 화면 수가 많아지면 드로어/다른 패턴과 병용을 고려하되, 혼합 사용은 신중히. ([Material Design][4])

---

## 3) 화면별 설계(목적·핵심 컴포넌트·상태·수행 기준)

> **페이지 참조**
>
> - 홈/알림(예시 UI): p.6
> - 달력/가이드/카메라/지도 설명: p.7~8, p.12
> - 초기 구현 스크린샷: p.12
> - RN, RN Maps, Redux 등 스택: p.5

### A. 홈

**목적**: 분리배출 가이드로의 **빠른 진입**, **지역 배출 장소**(지도 미니뷰), **최근 활동** 요약. (p.6)
**주요 컴포넌트**

- 상단 **검색바**(텍스트/음성 아이콘—아이콘만, 실제 음성은 후속)
- **퀵 액션**(“카메라로 분류”, “오늘 배출” 등)
- **최근 활동 리스트/카드**(최신 5건) → FlatList(스켈레톤/빈 상태 포함)
- **미니 지도 카드**(현재 위치 기반 가까운 장소 1~3개 마커)

**UI 상태**: 로딩(스켈레톤), 빈 상태(첫 방문), 오류(오프라인 안내)
**수행 기준(AC)**

- 검색 포커스 시 **자동완성 드롭다운** 표시(로컬 사전)
- 미니 지도 **MapView + Marker**(mock 좌표) 터치 시 지도 탭으로 딥링크. ([GitHub][5])

### B. 가이드(검색/FAQ)

**목적**: 텍스트 기반 **분리배출 Q&A**·카테고리 브라우징(지역 규정은 후속 연동 가정, 지금은 예시 데이터). (p.3)
**주요 컴포넌트**

- **SearchBar**(debounce, 최근 검색 pill)
- **카테고리 Chips**(플라스틱/종이/유리/캔/배터리/의류/대형 등)
- **결과 카드**(아이콘·제목·요약·“자세히” bottom sheet)

**AC**

- 입력 2자 이상 시 **로컬 인덱스** 자동완성 노출
- 결과 없을 때 **빈 상태** + 제안 키워드 제공
- 각 카드 열람/닫힘, 북마크 토글 유지(로컬 저장소) — AsyncStorage 기반 UI 퍼시스턴스. ([react-native-async-storage.github.io][6])

### C. 카메라(AI 분류 **UI**)

> 실제 분류 API 없이 **촬영/미리보기/오버레이/시나리오 시뮬레이션**까지만. (p.12)

**주요 컴포넌트**

- **Camera viewfinder**(촬영 버튼, 플래시 토글, 가이드라인)
- **탐지 오버레이 모형**(라벨/박스: mock 데이터)
- **결과 시트**(“PET로 추정, 세척→라벨 제거→압축 배출” 등 단계형 UI)

**라이브러리 제안(표준 UI/권한 연계 용이)**: `react-native-vision-camera`(후속 API 연동 대비). ([VisionCamera][7])
**AC**

- 촬영/갤러리 가져오기 버튼 노출(갤러리는 placeholder)
- “**샘플 분류 보기**” 토글 시 **mock 라벨/신뢰도** 오버레이 표시
- 권한 필요성을 **pre-permission 안내 시트**로 설명(이유/혜택/변경 경로), 이후 시스템 다이얼로그는 _후속 연동 시 활성화_. ([Apple Developer][3])

### D. 달력(기록/통계)

**목적**: 월간 **분리배출 기록 체크** 및 간단 통계. (p.7, p.12)
**주요 컴포넌트**

- **달력 뷰**(마킹/체크) – `react-native-calendars`
- **통계 카드**(주차/품목 빈도, 연속 N일)
  **AC**
- 날짜 탭 → **체크 토글** 및 메모(옵션)
- 품목별 마킹 색상 범례 제공
- 데이터는 **로컬 상태 + AsyncStorage**에 저장/복원. ([wix.github.io][8])

### E. 지도(시설/수거함/배출소)

**목적**: 주변 분리수거 장소 탐색(마커/상세 바텀시트). (p.6~8)
**주요 컴포넌트**

- **MapView** + **Marker** 목록(로컬 JSON 좌표)
- **필터 Chips**(종류/운영시간 등—UI만)
- **시설 상세 시트**(주소/시간/취급품목—mock)
  **확장**: 마커가 많아질 경우 **클러스터링** 라이브러리 채택 검토. ([GitHub][5])
  **AC**
- 현재 위치 버튼 탭 → 카메라 이동(UI만)
- 마커 탭 → 상세 시트 슬라이드업

### F. 알림/설정

**목적**: 분리수거 요일/푸시 알림 **설정 UI**, 지역 선택, 공지 목록(목업). (p.6~7)
**주요 컴포넌트**

- **알림 토글·시간 선택**(UI만, 실제 스케줄링 미포함)
- **지역 선택**(시/구/동 드롭다운 – mock 데이터)
- **공지 리스트**(읽음 상태)
  **AC**
- 토글·시간·지역 변경 사항 **로컬 퍼시스트**
- 안내 텍스트는 **권한·프라이버시 가이드**에 맞게 맥락 제공. ([Apple Developer][3])

---

## 4) 공통 컴포넌트 세트(Design System·재사용)

- **타이포/색 토큰**: 테마 라이트/다크, 텍스트 대비 **AA 4.5:1/3:1** 준수. ([w3.org][9])
- **Buttons/Chips/FAB/Badge**: 최소 **44pt/48dp** 히트 영역 확보. ([Apple Developer][2])
- **SearchBar / EmptyState / Toast / BottomSheet**
- **List Card**(아이콘·제목·캡션·CTA) — FlatList 최적화 가이드 준수. ([React Native][10])
- **Map Marker**(상태별 아이콘) / **Calendar Marked Day**(legend) ([GitHub][5])

> UI 라이브러리: **React Native Elements**·**React Native Paper** 중 택1 또는 혼합(프로토타이핑 가속). Paper는 테마/컴포넌트 스펙이 잘 정리되어 있고, Elements는 경량·일관 API가 장점. ([reactnativepaper.com][11])

---

## 5) 프로젝트 구조(제안)

```
src/
  app.tsx
  navigation/
    RootTabs.tsx          // Bottom Tabs (Home/Guide/Camera/Map/Alerts)
    HomeStack.tsx         // 필요 시 화면별 스택
  screens/
    Home/ ...
    Guide/ ...
    Camera/ ...
    Map/ ...
    Alerts/ ...
    Settings/ ...
  components/
    atoms/ (Button, Chip, Icon, Typography ...)
    molecules/ (SearchBar, ResultCard, EmptyState, BottomSheet ...)
    organisms/ (CalendarView, FacilitySheet, CameraOverlay ...)
  theme/
    tokens.ts              // spacing, radius, color, typography
    index.ts               // Paper/Elements theme bridge
  store/                   // Redux Toolkit (UI state only)
  mocks/                   // fixtures (items.json, facilities.json, rules.json)
  utils/
```

- **React Navigation Bottom Tabs**(lazy 옵션), 필요 시 **탭 커스터마이즈** 가이드 적용. ([React Navigation][12])
- **로컬 저장**: `@react-native-async-storage/async-storage` 사용. ([react-native-async-storage.github.io][6])

---

## 6) 상태 모델(클라이언트 전용 · 예시)

```ts
// UI slices (Redux Toolkit 기준)
home: { recent: GuideItem[], tipsSeen: boolean }
guide: { query: string, results: GuideItem[], history: string[], filters: string[] }
cameraUI: { flash: 'on'|'off'|'auto', mockDetected?: {label:string, confidence:number} }
calendar: { marks: Record<'YYYY-MM-DD', {items: string[], memo?: string}> }
map: { region: {lat:number,lng:number,delta:number}, filters: string[], facilities: Facility[] }
settings: { regionCode?: string, notify: {enabled:boolean, time:'07:00'|'20:00'} }
```

- 리스트 성능은 RN **FlatList 최적화 가이드**(간단한 아이템, 키 추출, 필요 시 `getItemLayout`)를 준수. ([React Native][10])

---

## 7) 구현 우선순위(스프린트 계획 · UI만)

**Sprint 1 – 베이스 & 내비**

- RN 프로젝트/폰트/아이콘/테마 셋업, **Bottom Tabs** + 스켈레톤 화면 5개
- 공통 **Button/Chip/Sheet/SearchBar/Empty** 1차 완성
- 접근성 기본(라벨, 포커스 순서, 히트영역) 반영 시작. ([Apple Developer][2])

**Sprint 2 – 홈/가이드**

- 홈 카드/리스트/미니 지도(로컬 마커)
- 가이드 검색/자동완성/카테고리/결과 카드, 즐겨찾기(AsyncStorage)
- **대비/가독성** 점검(AA). ([w3.org][9])

**Sprint 3 – 달력/알림**

- `react-native-calendars` 달력 마킹/체크/통계 카드
- 알림/설정 화면(토글·시간·지역 선택 UI + 로컬 퍼시스트). ([wix.github.io][8])

**Sprint 4 – 카메라/지도**

- **VisionCamera** 뷰파인더·촬영 버튼·오버레이 mock
- 지도 상세 시트/필터·마커 인터랙션, 클러스터링 옵션 검토. ([VisionCamera][7])

**Sprint 5 – 폴리시/품질**

- 다크모드/애니메이션(마이크로 인터랙션)
- **접근성 점검(VoiceOver/TalkBack 레이블·순서)** / 테스트 커버리지. ([Apple Developer][13])

---

## 8) 수용 기준(DoD) — 예시(요약)

- **접근성**: 모든 터치 가능한 요소는 **44pt/48dp 이상** 히트영역, 이미지/아이콘은 **대체 레이블** 제공. ([Apple Developer][2])
- **대비**: 텍스트 **≥4.5:1**, 대형 텍스트/컴포넌트 **≥3:1**. ([w3.org][9])
- **내비게이션**: 하단 탭은 **3~5개 최상위 목적지**, 탭 터치 → 해당 화면으로 바로 이동(팝업/메뉴 동작 금지). ([Material Design][14])
- **리스트 성능**: 주요 피드/리스트는 FlatList + 키/단순 아이템/지연 마운트. ([React Native][10])
- **지도**: MapView 렌더·마커 탭 시 상세 시트가 안정적으로 등장(60fps 목표). ([GitHub][5])

---

## 9) 테스트 전략(UI 관점)

- **유닛/컴포넌트 테스트**: React Native Testing Library + Jest로 **사용자 관점** 테스트(레이블·접근성·탭 이동·토글/입력 상호작용). ([testing-library.com][15])
- **시각 회귀**: 주요 화면 스냅샷(테마/상태별)
- **접근성 검토**: 스크린리더 라벨/포커스 순서 수동 점검(VoiceOver 가이드 참고). ([Apple Developer][13])

---

## 10) 코드 스니펫(내비게이션 골격 · UI만)

```tsx
// navigation/RootTabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/screens/Home";
import Guide from "@/screens/Guide";
import Camera from "@/screens/Camera";
import Map from "@/screens/Map";
import Alerts from "@/screens/Alerts";

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, lazy: true }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Guide" component={Guide} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Alerts" component={Alerts} />
    </Tab.Navigator>
  );
}
```

> `lazy: true`로 각 탭 화면은 **처음 포커스될 때 마운트**됩니다(초기 렌더 비용 절감). ([React Navigation][12])

---

## 11) 화면별 Mock 데이터(샘플)

```json
// mocks/facilities.json
[
  {"id":"f1","name":"재활용센터 A","type":"센터","lat":37.57,"lng":127.02,"open":"09:00-18:00","items":["플라스틱","캔"]},
  {"id":"f2","name":"수거함 B","type":"수거함","lat":37.56,"lng":127.01,"open":"24H","items":["의류"]}
]

// mocks/guide-items.json
[
  {"id":"g1","name":"우유팩","material":"종이팩","steps":["세척","펼쳐 건조","별도 배출"]},
  {"id":"g2","name":"페트병","material":"플라스틱","steps":["내용물 비우기","라벨 제거","압축 후 배출"]}
]
```

---

## 12) 라이브러리 선택 & 근거(요약)

- **React Navigation**: 탭 내비(커스터마이즈/네이티브 룩 지원), **지연 마운트**. ([React Navigation][12])
- **react-native-maps**(지도), 필요 시 **클러스터링** 추가. ([GitHub][5])
- **react-native-vision-camera**(카메라 UI) – 고성능·후속 프레임 프로세서 연동 용이. ([VisionCamera][7])
- **react-native-calendars**(달력 마킹) – iOS/Android 호환. ([wix.github.io][8])
- **AsyncStorage**(로컬 퍼시스트). ([react-native-async-storage.github.io][6])

---

## 13) 접근성 & 품질 체크리스트(핵심)

- **히트 영역**: 최소 **44×44pt/48×48dp**. ([Apple Developer][2])
- **대비**: 텍스트 4.5:1, 대형/컴포넌트 3:1 이상. ([w3.org][9])
- **스크린리더**: 아이콘 버튼에 **접근성 라벨** 명시(예: “촬영”, “현재 위치로 이동”). ([Apple Developer][13])
- **리스트 성능**: FlatList 최적화 가이드 준수(아이템 단순화, 필요 시 `getItemLayout`). ([React Native][10])
- **하단탭 가이드**: 3~5 목적지, 탭 터치 → 즉시 화면 이동(팝업 X). ([Material Design][14])

---
