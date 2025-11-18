import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS, es, fr, ko as koLocale } from "date-fns/locale";
import type { Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { useDashboardStore } from "shared/state/dashboardStore";
import { useActivityStore } from "shared/state/activityStore";
import { useUserStore } from "shared/state/userStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { useNotificationStore } from "shared/state/notificationStore";
import { calculateTodayStats, calculateTotalStats } from "shared/utils/userStats";
import type { MaterialItemData } from "shared/types/dashboard";
import { normalizeLanguage, type SupportedLanguage } from "shared/i18n/supportedLanguages";
import * as S from "./DashboardPage.styles";
import {
  AddEntryBottomSheet,
  MaterialSearchCard,
  RecentActivityCard,
  TrackerCard,
  WelcomeOverviewCard,
} from "./components";

// 서울시, 지자체 분리배출 가이드를 반영한 재활용 정보 더미 데이터
const DUMMY_MATERIALS: MaterialItemData[] = [
  // 플라스틱류
  {
    name: "투명 PET병 (생수, 음료)",
    recyclable: true,
    category: "Plastic",
    instructions:
      "내용물을 비우고 물로 헹군 뒤 라벨(label)과 뚜껑(cap)을 분리해 병을 눌러 압축한 후 투명 페트 전용 수거함에 넣어요.",
    tips: "유색 병은 일반 플라스틱류로, 무라벨, 압축 상태가 고품질 재생원료 확보에 도움이 돼요.",
  },
  {
    name: "기름 묻은 배달용 플라스틱 용기",
    recyclable: false,
    category: "Plastic",
    instructions:
      "마요네즈, 기름 소스처럼 세척이 어려운 오염이 남아 있으면 재활용이 거부되니 닦아낼 수 없을 때는 종량제 봉투로 배출해요.",
    tips: "완전히 씻고 말린 경우에만 플라스틱류로 전환할 수 있어요.",
  },
  // 종이류
  {
    name: "우유, 주스 종이팩",
    recyclable: true,
    category: "Paper",
    instructions:
      "내용물을 비우고 물로 헹군 뒤 펼쳐서 말리고, 스티커, 빨대 등의 다른 재질을 제거한 후 묶어 배출해요.",
    tips: "코팅이 남아 있어도 깨끗하면 종이팩 전용 수거함이나 보증금 회수 캠페인에 참여할 수 있어요.",
  },
  {
    name: "기름 스며든 피자박스",
    recyclable: false,
    category: "Paper",
    instructions:
      "기름이나 음식물이 종이에 스며들면 다른 종이를 오염시키므로 소량은 종량제 봉투, 다량은 특수규격 마대(special-purpose bag)로 처리해요.",
    tips: "깨끗한 부분과 오염된 부분을 분리해 깨끗한 면만 종이류로 보내면 재활용 효율이 올라요.",
  },
  // 금속류
  {
    name: "알루미늄 음료 캔",
    recyclable: true,
    category: "Metal",
    instructions:
      "내용물을 비우고 물로 헹궈 이물질을 제거한 뒤 담배꽁초 등 이물 없이 배출하고, 플라스틱 뚜껑은 분리해요.",
    tips: "캔 입구를 눌러 찌그러뜨리면 수거 효율과 적재 안정성이 좋아져요.",
  },
  {
    name: "잔여 가스가 남은 부탄캔",
    recyclable: false,
    category: "Metal",
    instructions:
      "내용물이 남아 있으면 폭발 위험으로 재활용 수거가 불가하니 바람 통하는 곳에서 노즐을 눌러 완전히 비운 뒤 특수규격 마대에 넣어요.",
    tips: "구멍을 뚫고 잔여 가스를 완전히 뺀 뒤 스티커를 제거하면 금속류로 전환할 수 있어요.",
  },
  // 유리류
  {
    name: "소주, 맥주 유리병",
    recyclable: true,
    category: "Glass",
    instructions:
      "뚜껑(cap)과 라벨을 떼고 내용물을 헹군 뒤 깨지지 않도록 분리배출하거나 빈용기 보증금(Deposit) 회수처에 반납해요.",
    tips: "보증금 대상 병은 소매점에 반납하면 환급받을 수 있어요.",
  },
  {
    name: "내열 유리 조리용기",
    recyclable: false,
    category: "Glass",
    instructions:
      "강화, 내열, 크리스탈 유리는 일반 유리 재질과 융점이 달라 재활용 설비가 받지 않으므로 신문지에 싸서 종량제 봉투나 특수규격 마대로 버려요.",
    tips: "깨진 파편은 별도 표시 후 배출해 수거 작업자의 안전을 지켜요.",
  },
];

const RECENT_ACTIVITY_LIMIT = 3;

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  // 전역 상태와 스토어 제어자 로드
  const { searchTerm, setSearchTerm, materialCategory, setMaterialCategory } = useDashboardStore();
  // 활동 기록 스토어에서 entries 로드
  const { entries } = useActivityStore();
  // 사용자 정보 스토어에서 이름 로드
  const { name: userName } = useUserStore();
  const monthlyGoal = useSettingsStore((state) => state.monthlyGoal);
  // 알림 스토어에서 배너 제어 로드
  const { showBanner, closeBanner } = useNotificationStore();
  // 활동 추가 BottomSheet 상태
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const language = normalizeLanguage(i18n.language);
  const dateLocaleMap: Record<SupportedLanguage, Locale> = {
    en: enUS,
    ko: koLocale,
    es,
    fr,
  };
  const dateLocale = dateLocaleMap[language];

  // 홈 진입 시마다 환영 배너 표시
  useEffect(() => {
    if (!userName) {
      return undefined;
    }

    const bannerId = showBanner({
      type: "info",
      message: t("notifications.banner.welcome.message", { name: userName }),
    });

    return () => {
      closeBanner(bannerId);
    };
  }, [userName, showBanner, closeBanner, t]);

  // activityStore의 entries를 기반으로 오늘의 통계 실시간 계산
  const todayStats = useMemo(() => {
    return calculateTodayStats(entries);
  }, [entries]);

  const {
    totalPoints,
    itemsRecycled: totalItems,
    categoryCount,
  } = useMemo(() => {
    return calculateTotalStats(entries);
  }, [entries]);

  const recentActivity = useMemo(() => {
    return [...entries]
      .sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, RECENT_ACTIVITY_LIMIT)
      .map((entry) => {
        const entryDate = entry.date instanceof Date ? entry.date : new Date(entry.date);
        return {
          type: entry.type,
          count: entry.amount,
          points: entry.points,
          time: formatDistanceToNow(entryDate, {
            addSuffix: true,
            locale: dateLocale,
          }),
        };
      });
  }, [entries, dateLocale]);

  // 재질 검색 결과 필터링 수행 (더미 데이터 사용)
  const filteredMaterials = useMemo(() => {
    return DUMMY_MATERIALS.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, materialCategory]);

  const progressValue = monthlyGoal > 0 ? (totalPoints / monthlyGoal) * 100 : 0;

  return (
    <S.PageContainer>
      <WelcomeOverviewCard todayStats={todayStats} userName={userName} />
      {/* <MonthlyProgressCard
        totalPoints={totalPoints}
        monthlyGoal={monthlyGoal}
        progressValue={progressValue}
      /> */}
      <TrackerCard
        totalPoints={totalPoints}
        monthlyGoal={monthlyGoal}
        progressValue={progressValue}
        entriesCount={entries.length}
        totalItems={totalItems}
        categoryCount={categoryCount}
        onLogAction={() => setIsAddEntryOpen(true)}
      />
      {/* <QuickActionsCard onAnalyze={() => navigate("/analyze")} onOpenMap={() => navigate("/map")} /> */}
      <RecentActivityCard recentActivity={recentActivity} />
      {/* <AchievementsCard achievements={achievements} /> */}
      <MaterialSearchCard
        searchTerm={searchTerm}
        onSearchTermChange={(event) => setSearchTerm(event.target.value)}
        materialCategory={materialCategory}
        onMaterialCategoryChange={setMaterialCategory}
        filteredMaterials={filteredMaterials}
      />
      {/* <GoalsCard goals={goals} /> */}
      {/* <TipsCard
        tips={filteredTips}
        selectedTipCategory={selectedTipCategory}
        onSelectedTipCategoryChange={setSelectedTipCategory}
        tipCategoryOptions={tipCategories}
      /> */}

      {/* 활동 추가 BottomSheet */}
      <AddEntryBottomSheet isOpen={isAddEntryOpen} onClose={() => setIsAddEntryOpen(false)} />
    </S.PageContainer>
  );
}
