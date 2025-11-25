import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS, es, fr, ko as koLocale } from "date-fns/locale";
import type { Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { useDashboardStore } from "shared/state/dashboardStore";
import { useActivityStore } from "shared/state/activityStore";
import { useUserStore } from "shared/state/userStore";
import { useNotificationStore } from "shared/state/notificationStore";
import type { MaterialItemData } from "shared/types/dashboard";
import { normalizeLanguage, type SupportedLanguage } from "shared/i18n/supportedLanguages";
import { Button } from "shared/ui/Button/Button";
import * as S from "./DashboardPage.styles";
import {
  AddEntryBottomSheet,
  DashboardHeroCard,
  MaterialSearchCard,
  RecentActivityCard,
} from "./components";
import { useDashboardData } from "./hooks";

type MaterialGuideKey =
  | "plasticPetBottle"
  | "plasticTakeoutContainer"
  | "paperCarton"
  | "greasyPizzaBox"
  | "aluminumCan"
  | "butaneCan"
  | "glassBottle"
  | "heatResistantGlass";

const MATERIAL_GUIDE_DEFINITIONS: Array<{
  key: MaterialGuideKey;
  category: MaterialItemData["category"];
  recyclable: boolean;
}> = [
  { key: "plasticPetBottle", category: "Plastic", recyclable: true },
  { key: "plasticTakeoutContainer", category: "Plastic", recyclable: false },
  { key: "paperCarton", category: "Paper", recyclable: true },
  { key: "greasyPizzaBox", category: "Paper", recyclable: false },
  { key: "aluminumCan", category: "Metal", recyclable: true },
  { key: "butaneCan", category: "Metal", recyclable: false },
  { key: "glassBottle", category: "Glass", recyclable: true },
  { key: "heatResistantGlass", category: "Glass", recyclable: false },
];

const RECENT_ACTIVITY_LIMIT = 3;

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  // 전역 상태와 스토어 제어자 로드
  const { searchTerm, setSearchTerm, materialCategory, setMaterialCategory } = useDashboardStore();
  // 활동 기록 스토어에서 entries 로드 (최근 활동 표시용)
  const { entries } = useActivityStore();
  // 사용자 정보 스토어에서 이름 로드
  const { name: userName } = useUserStore();
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

  // 대시보드 데이터 (API/로컬 하이브리드)
  const dashboardData = useDashboardData();
  const localizedMaterials = useMemo<MaterialItemData[]>(() => {
    return MATERIAL_GUIDE_DEFINITIONS.map((definition) => {
      const tips = t(`dashboard.materials.${definition.key}.tips`, {
        defaultValue: "",
      });
      return {
        category: definition.category,
        recyclable: definition.recyclable,
        name: t(`dashboard.materials.${definition.key}.name`),
        instructions: t(`dashboard.materials.${definition.key}.instructions`),
        tips: tips || undefined,
      };
    });
  }, [t]);

  // 홈 진입 시마다 환영 배너 표시
  useEffect(() => {
    if (!userName) {
      return undefined;
    }

    const bannerId = showBanner({
      type: "info",
      message: t("notifications.banner.welcome.message", { name: userName }),
      sessionKey: "dashboard-welcome",
    });

    if (!bannerId) {
      return undefined;
    }

    return () => {
      closeBanner(bannerId);
    };
  }, [userName, showBanner, closeBanner, t]);

  // dashboardData에서 통계 추출 (API 또는 로컬 데이터)
  const {
    todayStats,
    totalPoints,
    monthlyGoal,
    progressValue,
    entriesCount,
    plannedCount,
    totalItems,
    categoryCount,
  } = dashboardData;

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
          // 리스트 키(key)로 사용할 항목 id
          id: entry.id,
          type: entry.type,
          count: entry.amount,
          points: entry.points,
          time: formatDistanceToNow(entryDate, {
            addSuffix: true,
            locale: dateLocale,
          }),
          mode: entry.mode ?? "record",
        };
      });
  }, [entries, dateLocale]);

  // 재질 검색 결과 필터링 수행 (더미 데이터 사용)
  const filteredMaterials = useMemo(() => {
    return localizedMaterials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, materialCategory, localizedMaterials]);

  return (
    <S.PageContainer>
      {/* 통합 히어로 카드 (API 또는 로컬 데이터) */}
      <DashboardHeroCard
        userName={userName}
        todayStats={todayStats}
        totalPoints={totalPoints}
        monthlyGoal={monthlyGoal}
        progressValue={progressValue}
        entriesCount={entriesCount}
        plannedCount={plannedCount}
        totalItems={totalItems}
        categoryCount={categoryCount}
      />
      <Button variant="primary" onClick={() => setIsAddEntryOpen(true)} css={{ width: "100%" }}>
        <Sparkles size={18} />
        {t("dashboard.tracker.logAction")}
      </Button>
      {/* 최근 활동 */}
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
