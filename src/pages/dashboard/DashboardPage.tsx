import { useEffect, useMemo, useState } from "react";
import { useDashboardData } from "shared/api/dashboard";
import { useDashboardStore } from "shared/state/dashboardStore";
import { useActivityStore } from "shared/state/activityStore";
import { useUserStore } from "shared/state/userStore";
import { useNotificationStore } from "shared/state/notificationStore";
import type { DashboardData } from "shared/types/dashboard";
import * as S from "./DashboardPage.styles";
import {
  AddEntryBottomSheet,
  MaterialSearchCard,
  RecentActivityCard,
  TrackerCard,
  WelcomeOverviewCard,
} from "./components";

export function DashboardPage() {
  const { data } = useDashboardData();
  // 전역 상태와 스토어 제어자 로드
  const { searchTerm, setSearchTerm, materialCategory, setMaterialCategory } = useDashboardStore();
  // 활동 기록 스토어에서 entries 로드
  const { entries, setEntries } = useActivityStore();
  // 사용자 정보 스토어에서 이름 로드
  const { name: userName } = useUserStore();
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
        message: `${userName}님, 환영해요! 첫 재활용 활동을 기록해보세요`,
        action: {
          label: "시작하기",
          onClick: () => setIsAddEntryOpen(true),
        },
      });
    }
  }, [entries.length, userName, showBanner]);

  const todayStats =
    data?.todayStats ??
    ({
      itemsRecycled: 0,
      pointsEarned: 0,
      streakDays: 0,
    } satisfies DashboardData["todayStats"]);
  const recentActivity = data?.recentActivity ?? [];

  // 재질 검색 결과 필터링 수행
  const filteredMaterials = useMemo(() => {
    const materials = data?.materials ?? [];
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data?.materials, searchTerm, materialCategory]);

  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
  const totalItems = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const categoryCount = new Set(entries.map((entry) => entry.type)).size;
  const monthlyGoal = 100;
  const progressValue = (totalPoints / monthlyGoal) * 100;

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
