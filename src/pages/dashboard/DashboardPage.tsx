import { useEffect, useMemo } from "react";
import { useDashboardData } from "shared/api/dashboard";
import { dashboardInitialData } from "shared/data/dashboard";
import { useDashboardStore } from "shared/state/dashboardStore";
import { useUserStore } from "shared/state/userStore";
import * as S from "./DashboardPage.styles";
import {
  MaterialSearchCard,
  RecentActivityCard,
  TrackerCard,
  WelcomeOverviewCard,
} from "./components";

export function DashboardPage() {
  const { data } = useDashboardData();
  // 전역 상태와 스토어 제어자 로드
  const { searchTerm, setSearchTerm, materialCategory, setMaterialCategory, entries, setEntries } =
    useDashboardStore();
  // 사용자 정보 스토어에서 이름 로드
  const { name: userName } = useUserStore();

  // 쿼리 결과로 스토어 동기화
  useEffect(() => {
    if (data?.entries && entries !== data.entries) {
      setEntries(data.entries);
    }
  }, [data?.entries, entries, setEntries]);

  const todayStats = data?.todayStats ?? dashboardInitialData.todayStats;
  const recentActivity = data?.recentActivity ?? dashboardInitialData.recentActivity;
  const materials = data?.materials ?? dashboardInitialData.materials;

  // 재질 검색 결과 필터링 수행
  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchTerm, materialCategory]);

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
    </S.PageContainer>
  );
}
