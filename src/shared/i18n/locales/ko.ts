export const koTranslation = {
  app: {
    name: "RecyClean",
  },
  header: {
    logoAlt: "{{appName}} 로고",
    profileButton: "사용자 메뉴 열기",
  },
  navigation: {
    home: "홈",
    analyze: "분석",
    calendar: "달력",
    map: "지도",
    settings: "설정",
  },
  onboarding: {
    tagline: "재활용이 쉬워지는 순간",
    description: "일상의 작은 환경 실천을 기록하고,\\n주변 수거함을 쉽게 찾아보세요.",
    cta: "시작하기",
    hint: "지금 바로 {{appName}}과 함께 환경 실천을 시작해요.",
  },
  dashboard: {
    welcome: {
      greeting: "안녕하세요, {{name}}님!",
      defaultName: "친구",
      helper: "오늘의 분리수거를 도와줄게요.",
      stats: {
        items: "오늘 처리한 아이템",
        points: "획득 포인트",
        streak: "연속 참여 일수",
      },
    },
    tracker: {
      title: "재활용 활동 추적",
      monthlyPoints: "이번 달 획득 포인트",
      goal: "목표 {{goal}}pt",
      percent: "{{percent}}% 달성",
      highlight: "목표를 달성했어요!",
      logAction: "활동 기록하기",
      stats: {
        entries: "활동 건수",
        items: "처리 아이템",
        categories: "카테고리",
      },
    },
    materialSearch: {
      title: "재활용 정보 검색",
      placeholder: "재질 또는 물품명을 검색해요",
      filters: {
        all: "전체",
        Plastic: "Plastic",
        Glass: "Glass",
        Metal: "Metal",
        Paper: "Paper",
      },
      recyclable: "재활용 가능",
      notRecyclable: "불가",
      empty: "조건에 맞는 결과가 없어요.",
    },
    recentActivity: {
      title: "최근 활동",
      meta: "{{count}}개 · {{time}}",
      points: "+{{points}} pts",
      empty: "아직 기록된 활동이 없어요. 첫 재활용 활동을 기록해보세요!",
    },
    monthlyProgress: {
      title: "월간 목표 진행도",
      value: "{{current}} / {{goal}} 포인트",
      subtitle: "2025년 1월 기준",
      percent: "{{percent}}% 달성",
    },
    quickActions: {
      title: "빠른 작업",
      analyze: "AI로 즉시 분류",
      map: "주변 배출함 찾기",
      record: "수동 기록 추가",
    },
    achievements: {
      title: "업적 모음",
      earned: "달성",
    },
    goals: {
      title: "지속가능성 목표",
    },
    tips: {
      title: "친환경 실천 아이디어",
      all: "전체",
      categories: {
        reduce: "감량",
        reuse: "재사용",
        recycle: "재활용",
        energy: "에너지",
      },
      impactLabel: "영향: {{value}}",
      difficultyLabel: "난이도: {{value}}",
      impact: {
        high: "높음",
        medium: "보통",
        low: "낮음",
      },
      difficulty: {
        easy: "쉬움",
        moderate: "중간",
        hard: "어려움",
      },
    },
    addEntry: {
      title: "활동 기록 추가",
      category: "카테고리",
      material: "품목",
      amount: "수량",
      date: "날짜",
      pointsPreview: "예상 포인트: +{{points}}pt",
    },
  },
  analyze: {
    introTitle: "AI 재활용 분류",
    introDescription: "사진을 찍거나 이미지를 업로드하면 올바른 처리 방법을 안내해요.",
    actions: {
      capture: "사진 촬영하기",
      upload: "이미지 업로드",
      cancel: "취소하기",
    },
    errors: {
      onlyImages: "이미지 파일만 업로드할 수 있어요.",
      unsupported: "브라우저가 카메라 접근을 지원하지 않아요.",
      permission: "카메라 권한을 확인해주세요.",
      playback: "카메라 영상을 재생하지 못했어요.",
      notReady: "카메라 영상이 준비되지 않았어요.",
      stillInitializing: "카메라가 아직 초기화 중이에요. 잠시 후 다시 시도해주세요.",
      captureFailed: "이미지를 캡처하지 못했어요.",
    },
    camera: {
      overlay: "카메라를 준비하고 있어요...",
    },
    scanning: {
      headline: "이미지를 분석 중이에요...",
      subtext: "잠시만 기다려 주세요.",
    },
    status: {
      recyclable: "재활용 가능 ♻️",
      notRecyclable: "재활용 불가 ❌",
    },
    result: {
      title: "분류 결과",
      confidence: "{{value}}% 확신",
      material: "재질: {{category}}",
      instructionsTitle: "처리 방법",
      retry: "다시 촬영",
      logAction: "재활용 처리 기록",
      saveSuccess: "✅ 활동 기록에 추가되었어요!",
    },
    tips: {
      title: "촬영 팁",
      items: [
        "빛이 충분한 곳에서 촬영해요.",
        "깨끗한 배경에서 촬영하면 인식률이 올라가요.",
        "재활용 기호가 보이도록 찍어주세요.",
        "가능하면 물체 정면에서 촬영해요.",
      ],
    },
    captured: {
      alt: "촬영한 이미지 미리보기",
      resetAria: "사진 다시 촬영",
    },
    mockResults: {
      plasticBottle: {
        item: "Plastic Water Bottle",
        category: "Plastic #1 (PET)",
        instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹군 뒤 배출해요.",
        tips: "바닥의 재활용 기호 #1을 확인해요.",
      },
      pizzaBox: {
        item: "Pizza Box",
        category: "Contaminated Paper",
        instructions: "기름과 음식물이 묻어 재활용이 어려워요.",
        tips: "깨끗한 부분만 분리 배출하고 나머지는 일반쓰레기로 버려요.",
      },
      aluminumCan: {
        item: "Aluminum Can",
        category: "Aluminum",
        instructions: "물을 헹군 뒤 눌러서 부피를 줄여요.",
        tips: "금속류 중에서도 재활용 가치가 높아요.",
      },
    },
  },
  calendar: {
    overviewTitle: "{{month}} 기록 달력",
    stats: {
      records: "총 기록 수",
      items: "총 수거량",
      points: "획득 포인트",
    },
    legend: {
      title: "품목 범례",
      count: "{{count}}개",
      points: "+{{points}} pts",
      empty: "이 달에는 아직 기록이 없어요.",
    },
    entries: {
      title: "{{date}} 기록",
      meta: "{{count}}개 · {{time}}",
      points: "+{{points}} pts",
      empty: "선택한 날짜에는 기록이 없어요.",
      confirmDelete: "이 기록을 삭제하시겠어요?",
    },
    guide: {
      title: "기록 관리 가이드",
      items: [
        "기록은 월별 통계에 자동 반영돼요.",
        "분석 화면에서 새 기록을 추가하면 달력에 표시돼요.",
        "기록이 많은 날은 달력 점 표시로 확인할 수 있어요.",
      ],
    },
  },
  map: {
    filter: {
      title: "내 주변 배출함",
      useLocation: "내 위치 사용하기",
      options: {
        all: "전체 유형",
        recycling: "재활용",
        general: "일반",
        electronic: "전자제품",
        compost: "퇴비",
      },
    },
    placeholder: {
      title: "지도 준비 중",
      subtitle: "근처 {{count}}개의 배출함을 표시할 예정이에요.",
    },
    bins: {
      empty: "선택한 조건에 맞는 배출함이 없어요.",
      sectionLabel: "수거 품목",
      directions: "길 찾기",
      report: "상태 신고",
    },
    availability: {
      available: "이용 가능",
      full: "가득 참",
      maintenance: "점검 중",
    },
    centers: {
      title: "재활용 센터",
      directions: "길 찾기",
      call: "전화하기",
    },
  },
  settings: {
    profile: {
      avatarAlt: "기본 사용자 프로필 이미지",
      joined: "가입일 {{date}}",
      points: "{{points}} pts",
      streak: "{{days}}일 연속",
    },
    impact: {
      title: "나의 영향력",
      items: "처리한 아이템",
      points: "누적 포인트",
    },
    preferences: {
      title: "앱 설정",
      notifications: {
        title: "알림",
        description: "재활용 리마인더 알림",
        status: {
          requesting: "브라우저에 권한을 요청하는 중이에요.",
          granted: "알림 권한이 허용되었어요.",
          denied: "브라우저에서 알림 권한이 거부되었어요.",
          unsupported: "이 브라우저는 시스템 알림을 지원하지 않아요.",
          error: "권한을 요청하는 중 문제가 발생했어요.",
        },
      },
      location: {
        title: "위치 서비스",
        description: "주변 배출함 찾기",
        status: {
          requesting: "기기 위치 권한을 요청하는 중이에요.",
          granted: "위치 권한이 허용되었어요.",
          denied: "위치 권한이 거부되었어요.",
          unsupported: "이 기기에서 위치 서비스를 사용할 수 없어요.",
          error: "위치 권한 요청 중 문제가 발생했어요.",
        },
      },
      darkMode: {
        title: "다크 모드",
        description: "어두운 테마로 변경",
      },
      monthlyGoal: {
        title: "월간 포인트 목표",
        description: "대시보드 진행률 계산 기준",
        placeholder: "예: 200",
        helper: "10pt 이상 입력하면 저장돼요.",
      },
      sounds: {
        title: "사운드",
        description: "액션 사운드 효과",
      },
    },
    locale: {
      title: "언어 및 지역",
      languageLabel: "언어",
      regionLabel: "지역",
      regionHint: "현재는 한국 지역만 지원돼요.",
      regions: {
        kr: "대한민국",
        us: "미국",
        ca: "캐나다",
        uk: "영국",
      },
    },
    support: {
      title: "계정 및 지원",
      editProfile: "프로필 편집",
      privacy: "개인정보 보호 설정",
      helpCenter: "도움말 센터",
      about: "앱 정보",
      logout: "로그아웃",
    },
  },
  profile: {
    card: {
      avatarAlt: "사용자 프로필 이미지",
      joined: "시작일 {{date}}",
      points: "{{points}} pts",
      streak: "{{days}}일 연속",
    },
    impact: {
      title: "나의 영향력",
      items: "처리한 아이템",
      points: "누적 포인트",
    },
    level: {
      title: "레벨 진행도",
      currentLevel: "레벨 {{level}}",
      pointsNeeded: "다음 레벨까지 {{points}}pt 필요",
      maxLevel: "최고 레벨 달성!",
    },
    categories: {
      title: "카테고리별 통계",
      topCategory: "가장 많이 재활용",
      noData: "아직 카테고리별 데이터가 없어요.",
      items: "{{count}}개",
      points: "{{points}}pt",
    },
  },
  notifications: {
    actions: {
      close: "닫기",
      undo: "실행취소",
    },
    banner: {
      welcome: {
        message: "{{name}}님, 환영해요! 첫 재활용 활동을 기록해보세요",
        cta: "시작하기",
      },
    },
    snackbar: {
      entrySaved: "활동이 기록되었어요! +{{points}}pt 획득",
      entryDeleted: "활동 기록이 삭제되었어요",
      entryRestored: "기록이 복구되었어요",
    },
  },
  common: {
    cancel: "취소",
    save: "저장",
    delete: "삭제",
    edit: "수정",
    confirm: "확인",
  },
} as const;
