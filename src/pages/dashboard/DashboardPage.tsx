import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "shared/api/dashboard";
import { useDashboardStore } from "shared/state/dashboardStore";
import { useActivityStore } from "shared/state/activityStore";
import { useUserStore } from "shared/state/userStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { useNotificationStore } from "shared/state/notificationStore";
import { calculateTodayStats, calculateTotalStats } from "shared/utils/userStats";
import type { MaterialItemData } from "shared/types/dashboard";
import * as S from "./DashboardPage.styles";
import {
  AddEntryBottomSheet,
  MaterialSearchCard,
  RecentActivityCard,
  TrackerCard,
  WelcomeOverviewCard,
} from "./components";

// 더미 재활용 재질 데이터 (테스트용)
const DUMMY_MATERIALS: MaterialItemData[] = [
  // 플라스틱류
  {
    name: "플라스틱 재질 항목 1",
    recyclable: true,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 여기에는 재활용 처리 절차가 들어갑니다.",
    tips: "팁 텍스트입니다. 유용한 재활용 팁 내용입니다.",
  },
  {
    name: "플라스틱 재질 항목 2",
    recyclable: true,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 재활용 가능한 플라스틱 처리 방법입니다.",
  },
  {
    name: "플라스틱 재질 항목 3",
    recyclable: false,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 재활용 불가능한 경우의 처리 방법입니다.",
    tips: "팁 텍스트입니다. 주의사항 안내 텍스트입니다.",
  },
  {
    name: "플라스틱 재질 항목 4",
    recyclable: true,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 분리배출 방법 안내입니다.",
  },
  {
    name: "플라스틱 재질 항목 5",
    recyclable: true,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 세척 후 배출 방법입니다.",
    tips: "팁 텍스트입니다. 효율적인 재활용 팁입니다.",
  },
  {
    name: "플라스틱 재질 항목 6",
    recyclable: false,
    category: "Plastic",
    instructions: "처리 방법 설명 텍스트입니다. 일반 쓰레기로 배출하는 방법입니다.",
  },
  // 종이류
  {
    name: "종이 재질 항목 1",
    recyclable: true,
    category: "Paper",
    instructions: "처리 방법 설명 텍스트입니다. 종이류 재활용 처리 절차입니다.",
    tips: "팁 텍스트입니다. 종이 재활용 효율을 높이는 방법입니다.",
  },
  {
    name: "종이 재질 항목 2",
    recyclable: true,
    category: "Paper",
    instructions: "처리 방법 설명 텍스트입니다. 깨끗한 종이 분리배출 방법입니다.",
  },
  {
    name: "종이 재질 항목 3",
    recyclable: false,
    category: "Paper",
    instructions: "처리 방법 설명 텍스트입니다. 코팅된 종이의 처리 방법입니다.",
    tips: "팁 텍스트입니다. 재활용 불가 종이 구분 방법입니다.",
  },
  {
    name: "종이 재질 항목 4",
    recyclable: true,
    category: "Paper",
    instructions: "처리 방법 설명 텍스트입니다. 박스류 재활용 방법입니다.",
  },
  {
    name: "종이 재질 항목 5",
    recyclable: true,
    category: "Paper",
    instructions: "처리 방법 설명 텍스트입니다. 신문지 재활용 처리 방법입니다.",
    tips: "팁 텍스트입니다. 종이 재활용 주의사항입니다.",
  },
  // 금속류
  {
    name: "금속 재질 항목 1",
    recyclable: true,
    category: "Metal",
    instructions: "처리 방법 설명 텍스트입니다. 금속 캔류 재활용 방법입니다.",
    tips: "팁 텍스트입니다. 금속 재활용 효율적인 방법입니다.",
  },
  {
    name: "금속 재질 항목 2",
    recyclable: true,
    category: "Metal",
    instructions: "처리 방법 설명 텍스트입니다. 알루미늄 재활용 절차입니다.",
  },
  {
    name: "금속 재질 항목 3",
    recyclable: true,
    category: "Metal",
    instructions: "처리 방법 설명 텍스트입니다. 철 재질 분리배출 방법입니다.",
    tips: "팁 텍스트입니다. 금속류 재활용 팁입니다.",
  },
  {
    name: "금속 재질 항목 4",
    recyclable: false,
    category: "Metal",
    instructions: "처리 방법 설명 텍스트입니다. 특수 금속의 처리 방법입니다.",
  },
  // 유리류
  {
    name: "유리 재질 항목 1",
    recyclable: true,
    category: "Glass",
    instructions: "처리 방법 설명 텍스트입니다. 유리병 재활용 방법입니다.",
    tips: "팁 텍스트입니다. 유리 재활용 안전 수칙입니다.",
  },
  {
    name: "유리 재질 항목 2",
    recyclable: true,
    category: "Glass",
    instructions: "처리 방법 설명 텍스트입니다. 색상별 유리 분리 방법입니다.",
  },
  {
    name: "유리 재질 항목 3",
    recyclable: false,
    category: "Glass",
    instructions: "처리 방법 설명 텍스트입니다. 내열 유리의 처리 방법입니다.",
    tips: "팁 텍스트입니다. 유리 재활용 주의사항입니다.",
  },
  {
    name: "유리 재질 항목 4",
    recyclable: true,
    category: "Glass",
    instructions: "처리 방법 설명 텍스트입니다. 음료 병 재활용 절차입니다.",
  },
];

export function DashboardPage() {
  const { data } = useDashboardData();
  const { t } = useTranslation();
  // 전역 상태와 스토어 제어자 로드
  const { searchTerm, setSearchTerm, materialCategory, setMaterialCategory } = useDashboardStore();
  // 활동 기록 스토어에서 entries 로드
  const { entries, setEntries } = useActivityStore();
  // 사용자 정보 스토어에서 이름 로드
  const { name: userName } = useUserStore();
  const monthlyGoal = useSettingsStore((state) => state.monthlyGoal);
  // 알림 스토어에서 배너 제어 로드
  const { showBanner } = useNotificationStore();
  // 활동 추가 BottomSheet 상태
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);

  // 초기 데이터 로드: activityStore가 비어있고 API 데이터가 있으면 초기 데이터로 사용
  useEffect(() => {
    if (entries.length === 0 && data?.entries && data.entries.length > 0) {
      setEntries(data.entries);
    }
  }, [data?.entries, entries.length, setEntries]);

  // 첫 방문 환영 배너 표시 (데모용 - 엔트리가 0개일 때)
  useEffect(() => {
    if (entries.length === 0 && userName) {
      showBanner({
        type: "info",
        message: t("notifications.banner.welcome.message", { name: userName }),
        action: {
          label: t("notifications.banner.welcome.cta"),
          onClick: () => setIsAddEntryOpen(true),
        },
      });
    }
  }, [entries.length, userName, showBanner, t]);

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

  const recentActivity = data?.recentActivity ?? [];

  // 재질 검색 결과 필터링 수행 (더미 데이터 사용)
  const filteredMaterials = useMemo(() => {
    const materials = data?.materials ?? DUMMY_MATERIALS;
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data?.materials, searchTerm, materialCategory]);

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
