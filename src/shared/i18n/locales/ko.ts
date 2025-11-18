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
    nameRequired: "닉네임을 입력해주세요.",
    namePlaceholder: "닉네임 입력",
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
      logAction: "활동 추가하기",
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
      showMore: "더보기",
      showLess: "접기",
    },
    recentActivity: {
      title: "최근 활동",
      meta: "{{count}}개 · {{time}}",
      points: "+{{points}} pts",
      empty: "아직 기록된 활동이 없어요.\n첫 재활용 활동을 기록해보세요!",
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
      modeLabel: "추가 구분",
      modeOptions: {
        record: "활동 기록",
        plan: "계획 추가",
      },
      category: "카테고리",
      material: "품목",
      amount: "수량",
      date: "날짜",
      time: "시간",
      pointsPreview: "예상 포인트: +{{points}}pt",
    },
    materials: {
      plasticPetBottle: {
        name: "투명 PET병 (생수, 음료)",
        instructions:
          "내용물을 비우고 물로 헹군 뒤 라벨과 뚜껑을 분리해 병을 눌러 압축한 후 투명 페트 전용 수거함에 넣어요.",
        tips: "유색 병은 일반 플라스틱류로 분류되고, 무라벨, 압축 상태가 고품질 재생원료 확보에 도움이 돼요.",
      },
      plasticTakeoutContainer: {
        name: "기름 묻은 배달용 플라스틱 용기",
        instructions:
          "마요네즈나 기름 소스처럼 세척이 어려운 오염이 남아 있으면 재활용이 거부되니 깨끗이 닦을 수 없을 때는 종량제 봉투로 배출해요.",
        tips: "완전히 씻고 말린 용기만 플라스틱류로 전환할 수 있어요.",
      },
      paperCarton: {
        name: "우유, 주스 종이팩",
        instructions:
          "내용물을 비우고 물로 헹군 뒤 펼쳐서 말리고, 스티커, 빨대 등 이물질을 제거한 후 묶어 배출해요.",
        tips: "코팅이 남아 있어도 깨끗하면 종이팩 전용 수거함이나 보증금 회수 캠페인에 참여할 수 있어요.",
      },
      greasyPizzaBox: {
        name: "기름 스며든 피자박스",
        instructions:
          "기름이나 음식물이 종이에 스며들면 다른 종이를 오염시키므로 소량은 종량제 봉투, 다량은 특수규격 마대로 처리해요.",
        tips: "깨끗한 부분과 오염된 부분을 분리해 깨끗한 면만 종이류로 보내면 재활용 효율이 올라요.",
      },
      aluminumCan: {
        name: "알루미늄 음료 캔",
        instructions:
          "내용물을 비우고 물로 헹궈 이물질을 제거한 뒤 담배꽁초 등 이물 없이 배출하고, 플라스틱 뚜껑은 분리해요.",
        tips: "캔 입구를 눌러 찌그러뜨리면 수거 효율과 적재 안정성이 좋아져요.",
      },
      butaneCan: {
        name: "잔여 가스가 남은 부탄캔",
        instructions:
          "내용물이 남아 있으면 폭발 위험으로 재활용 수거가 불가하니 바람 통하는 곳에서 노즐을 눌러 완전히 비운 뒤 특수규격 마대에 넣어요.",
        tips: "구멍을 뚫고 잔여 가스를 완전히 뺀 뒤 스티커를 제거하면 금속류로 전환할 수 있어요.",
      },
      glassBottle: {
        name: "소주, 맥주 유리병",
        instructions:
          "뚜껑과 라벨을 떼고 내용물을 헹군 뒤 깨지지 않도록 분리배출하거나 빈용기 보증금 회수처에 반납해요.",
        tips: "보증금 대상 병은 소매점에 반납하면 환급받을 수 있어요.",
      },
      heatResistantGlass: {
        name: "내열 유리 조리용기",
        instructions:
          "강화, 내열, 크리스탈 유리는 일반 유리와 융점이 달라 재활용 설비가 받지 않으므로 신문지에 싸서 종량제 봉투나 특수규격 마대로 버려요.",
        tips: "깨진 파편은 별도 표시 후 배출해 수거 작업자의 안전을 지켜요.",
      },
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
      analysisFailed: "AI 분석 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
      noPrediction: "결과를 찾지 못했어요. 다른 각도로 다시 촬영해보세요.",
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
      defaultInstructions: "이물질을 제거한 뒤 지자체 분리배출 기준에 맞춰 배출해요.",
    },
    tips: {
      title: "촬영 팁",
      items: [
        "빛이 충분한 곳에서 촬영해요.",
        "깨끗한 배경에서 촬영하면 인식률이 올라가요.",
        "재활용 기호가 보이도록 찍어주세요.",
        "가능하면 물체 정면에서 촬영해요.",
      ],
      bannerMessage: "촬영 팁 ✨ 밝은 곳 + 깨끗한 배경 + 정면 촬영이면 인식률이 훨씬 높아져요.",
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
    guides: {
      plastic: {
        item: "플라스틱류",
        instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹군 뒤 압축해서 배출해요.",
        tips: "완전히 말린 뒤 배출하면 이물질 오염을 줄일 수 있어요.",
      },
      paper: {
        item: "종이·골판지",
        instructions: "테이프나 스테이플을 제거하고 상자를 접어 배출해요.",
        tips: "기름이나 물에 젖은 부분은 일반쓰레기로 분리해요.",
      },
      metal: {
        item: "금속 캔",
        instructions: "내용물을 비우고 헹군 뒤 가볍게 눌러 부피를 줄여요.",
        tips: "뚜껑과 라벨은 따로 분리해요.",
      },
      glass: {
        item: "유리 용기",
        instructions: "뚜껑을 제거하고 헹군 뒤 깨지지 않게 배출해요.",
        tips: "깨진 유리는 신문지에 싸서 별도로 처리해요.",
      },
      textile: {
        item: "의류·섬유",
        instructions: "세탁 후 완전히 건조해 헌옷수거함에 넣어요.",
        tips: "작은 조각은 묶어서 배출하면 정리돼요.",
      },
      electronic: {
        item: "배터리·전자제품",
        instructions: "배터리를 분리하고 지정 수거함이나 센터에 맡겨요.",
        tips: "헐거운 배터리는 단자를 테이프로 감싸서 안전하게 보관해요.",
      },
      other: {
        item: "기타 생활 폐기물",
        instructions: "정확한 재질을 확인한 뒤 지자체 지침에 따라 처리해요.",
        tips: "재질 표기나 안내 스티커를 확인해요.",
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
      bannerMessage: "달력 꿀팁 🗓️ 날짜를 누르면 해당 기록을 바로 확인하고 수정할 수 있어요.",
    },
  },
  map: {
    mapView: {
      title: "지도에서 위치 확인",
      subtitle: "근처 {{count}}개의 배출함을 지도에 표시해요.",
      loading: "지도를 불러오는 중이에요...",
      missingKey: {
        title: "지도 API 키가 필요해요",
        description: "NAVER Web Dynamic Map 키를 콘솔에 등록한 뒤 새로고침해주세요.",
      },
      loadFailed: {
        title: "지도를 불러오지 못했어요",
        description: "도메인 등록과 네트워크 연결을 확인한 뒤 다시 시도해주세요.",
      },
      initFailed: {
        title: "지도 엔진 초기화에 실패했어요",
        description: "허용 도메인과 API 권한에 현재 주소가 포함되어 있는지 점검해주세요.",
      },
    },
    guide: {
      bannerMessage: '지도 팁 🧭 "내 위치 사용하기"를 켜면 주변 배출함을 우선으로 보여줘요.',
    },
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
      title: "재활용 센터 & 배출함",
      sectionTitle: "재활용 센터",
      directions: "길 찾기",
      call: "전화하기",
    },
    errors: {
      title: "지도 데이터를 불러오지 못했어요",
      description: "서버 연결이나 SSL 설정을 확인한 뒤 다시 시도해주세요.",
      detail: "오류 메시지: {{message}}",
      action: "다시 시도",
      retrying: "재시도 중...",
    },
  },
  settings: {
    profile: {
      avatarAlt: "기본 사용자 프로필 이미지",
      joined: "가입일 {{date}}",
      points: "{{points}} pts",
      streak: "{{days}}일 연속",
      nickname: "닉네임",
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
        description: "진행률 계산 기준",
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
      languages: {
        ko: "한국어",
        en: "English",
        es: "Español",
        fr: "Français",
      },
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
      resetConfirm: "모든 데이터가 삭제됩니다. 계속하시겠어요?",
      resetData: "데이터 초기화",
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
    monthlyGoal: {
      title: "월간 포인트 기준",
      description: "이번 달 목표 포인트를 직접 설정해요.",
      placeholder: "예: 250",
      helper: "10pt 이상 숫자를 입력하면 자동으로 저장돼요.",
      cta: "기준 설정",
      usage: "대시보드 진행률 카드와 트래커에 바로 반영돼요.",
    },
    categories: {
      title: "카테고리별 통계",
      topCategory: "가장 많이 재활용",
      noData: "아직 카테고리별 데이터가 없어요.",
      items: "{{count}}개",
      points: "{{points}}pt",
    },
  },
  materials: {
    categories: {
      plastic: "플라스틱",
      paper: "종이",
      metal: "금속",
      glass: "유리",
      textile: "의류/섬유",
      electronic: "전자제품",
      other: "기타",
    },
    items: {
      plasticBottle: "플라스틱 병",
      petBottle: "PET병",
      plasticContainer: "플라스틱 용기",
      vinyl: "비닐",
      styrofoam: "스티로폼",
      paper: "종이",
      cardboard: "골판지",
      newspaper: "신문지",
      milkCarton: "우유팩",
      can: "캔",
      aluminumCan: "알루미늄 캔",
      steelCan: "철캔",
      glassBottle: "유리병",
      sojuBottle: "소주병",
      clothes: "옷",
      oldClothes: "헌옷",
      textile: "섬유",
      battery: "배터리",
      electronics: "전자제품",
      fluorescentLamp: "형광등",
      other: "기타",
    },
  },
  notifications: {
    actions: {
      close: "닫기",
      undo: "실행취소",
    },
    banner: {
      welcome: {
        message: "환영해요 {{name}}님! 오늘도 재활용 기록 하나만 더 남겨볼까요?",
        cta: "기록 추가하기",
      },
    },
    snackbar: {
      entrySaved: "활동이 기록되었어요! +{{points}}pt 획득",
      entryDeleted: "활동 기록이 삭제되었어요",
      entryRestored: "기록이 복구되었어요",
      profileUpdated: "프로필 이름이 업데이트되었어요",
      languageChanged: "언어가 {{language}}로 변경되었어요",
      regionChanged: "지역이 {{region}}로 업데이트되었어요",
      darkModeEnabled: "다크 모드를 켰어요",
      darkModeDisabled: "라이트 모드를 켰어요",
      locationPermissionRequired: "설정에서 위치 사용을 허용해야 현재 위치를 보여줄 수 있어요",
      locationUnsupported: "이 기기에서는 위치 서비스를 사용할 수 없어요",
      locationPinned: "현재 위치를 지도에 표시했어요",
      locationPermissionDenied: "브라우저에서 위치 권한이 거부되어 위치 정보를 가져올 수 없어요",
      locationError: "위치 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요",
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
