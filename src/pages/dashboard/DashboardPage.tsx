import { useEffect, useMemo } from "react";
import {
  AlertCircle,
  Award,
  Calendar,
  Camera,
  Leaf,
  Lightbulb,
  MapPin,
  Recycle,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { Badge } from "../../shared/ui/Badge/Badge";
import { Progress } from "../../shared/ui/Progress/Progress";
import { TextField } from "../../shared/ui/TextField/TextField";
import { ImageWithFallback } from "../../shared/media/ImageWithFallback/ImageWithFallback";
import { SelectField } from "../../shared/ui/SelectField/SelectField";
import { useDashboardData } from "shared/api/dashboard";
import { dashboardInitialData, resolveTipTone, tipCategories } from "shared/data/dashboard";
import { useDashboardStore } from "shared/state/dashboardStore";
import * as S from "./DashboardPage.styles";

const materialFilters = [
  { value: "all", label: "전체" },
  { value: "Plastic", label: "Plastic" },
  { value: "Glass", label: "Glass" },
  { value: "Metal", label: "Metal" },
  { value: "Paper", label: "Paper" },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { data } = useDashboardData();
  // 전역 상태와 스토어 제어자 로드
  const {
    searchTerm,
    setSearchTerm,
    materialCategory,
    setMaterialCategory,
    selectedTipCategory,
    setSelectedTipCategory,
    entries,
    setEntries,
  } = useDashboardStore();

  // 쿼리 결과로 스토어 동기화
  useEffect(() => {
    if (data?.entries && entries !== data.entries) {
      setEntries(data.entries);
    }
  }, [data?.entries, entries, setEntries]);

  const todayStats = data?.todayStats ?? dashboardInitialData.todayStats;
  const recentActivity = data?.recentActivity ?? dashboardInitialData.recentActivity;
  const achievements = data?.achievements ?? dashboardInitialData.achievements;
  const materials = data?.materials ?? dashboardInitialData.materials;
  const tips = data?.tips ?? dashboardInitialData.tips;
  const goals = data?.goals ?? dashboardInitialData.goals;

  // 재질 검색 결과 필터링
  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchTerm, materialCategory]);

  // 팁 카테고리 필터링
  const filteredTips = useMemo(() => {
    if (selectedTipCategory === "all") return tips;
    return tips.filter((tip) => tip.category === selectedTipCategory);
  }, [tips, selectedTipCategory]);

  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
  const totalItems = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const categoryCount = new Set(entries.map((entry) => entry.type)).size;
  const monthlyGoal = 100;
  const progressValue = (totalPoints / monthlyGoal) * 100;

  // 대시보드 UI 렌더링 수행
  return (
    <S.PageContainer>
      <S.WelcomeCard>
        <S.WelcomeContent>
          <S.WelcomeIcon>
            <Recycle size={28} color="#15803d" />
          </S.WelcomeIcon>
          <div>
            <h2>오늘도 환경을 지켜요!</h2>
            <p>꾸준한 실천으로 녹색 행성을 만드는 중이에요.</p>
          </div>
          <S.StatsGrid>
            <S.StatCell>
              <S.StatValue $tone="success">{todayStats.itemsRecycled}</S.StatValue>
              <S.StatLabel>오늘 처리한 아이템</S.StatLabel>
            </S.StatCell>
            <S.StatCell>
              <S.StatValue $tone="info">{todayStats.pointsEarned}</S.StatValue>
              <S.StatLabel>획득 포인트</S.StatLabel>
            </S.StatCell>
            <S.StatCell>
              <S.StatValue $tone="warning">{todayStats.streakDays}</S.StatValue>
              <S.StatLabel>연속 참여 일수</S.StatLabel>
            </S.StatCell>
          </S.StatsGrid>
        </S.WelcomeContent>
      </S.WelcomeCard>

      <Card>
        <CardHeader>
          <CardTitle>
            <Target size={18} />
            월간 목표 진행도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1rem" }}>
              {totalPoints} / {monthlyGoal} 포인트
            </div>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>2025년 1월 기준</p>
          </div>
          <Progress value={progressValue} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b" }}>{Math.round(progressValue)}% 달성</span>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>좋은 속도예요!</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Camera size={18} />
            빠른 작업
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.QuickActionGrid>
            <Button onClick={() => navigate("/analyze")} variant="outline">
              <Camera size={18} />
              AI로 즉시 분류
            </Button>
            <Button onClick={() => navigate("/map")} variant="outline">
              <MapPin size={18} />
              주변 배출함 찾기
            </Button>
            <Button variant="outline">
              <TrendingUp size={18} />
              수동 기록 추가
            </Button>
          </S.QuickActionGrid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar size={18} />
            최근 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.RecentActivityList>
            {recentActivity.map((activity) => (
              <S.ActivityRow key={activity.type}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{activity.type}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                    {activity.count}개 · {activity.time}
                  </div>
                </div>
                <Badge tone="primary">+{activity.points} pts</Badge>
              </S.ActivityRow>
            ))}
          </S.RecentActivityList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Award size={18} />
            업적 모음
          </CardTitle>
        </CardHeader>
        <CardContent style={{ gap: "16px" }}>
          {achievements.map((achievement) => (
            <S.AchievementRow key={achievement.title} $earned={achievement.earned}>
              <Award size={20} color={achievement.earned ? "#15803d" : "#94a3b8"} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{achievement.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {achievement.description}
                </div>
              </div>
              {achievement.earned && <Badge tone="success">달성</Badge>}
            </S.AchievementRow>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Lightbulb size={18} />
            재활용 정보 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TextField
            placeholder="재질 또는 물품명을 검색해요"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            startIcon={<Leaf size={16} />}
          />
          <SelectField
            options={materialFilters}
            value={materialCategory}
            onChange={(event) => setMaterialCategory(event.target.value)}
          />
          <S.MaterialList>
            {filteredMaterials.map((material) => (
              <S.MaterialItem key={material.name}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Badge tone={material.recyclable ? "success" : "danger"}>
                      {material.recyclable ? "재활용 가능" : "불가"}
                    </Badge>
                    <span style={{ fontWeight: 600 }}>{material.name}</span>
                  </div>
                  <Badge variant="outline">{material.category}</Badge>
                </div>
                <p style={{ margin: 0, color: "#475569", fontSize: "0.85rem" }}>
                  {material.instructions}
                </p>
                {material.tips && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                      background: "#eff6ff",
                      borderRadius: "12px",
                      padding: "8px 10px",
                      color: "#1d4ed8",
                      fontSize: "0.8rem",
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{material.tips}</span>
                  </div>
                )}
              </S.MaterialItem>
            ))}
            {filteredMaterials.length === 0 && (
              <p style={{ textAlign: "center", color: "#64748b", margin: 0 }}>
                조건에 맞는 결과가 없어요.
              </p>
            )}
          </S.MaterialList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Target size={18} />
            지속가능성 목표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.GoalsList>
            {goals.map((goal) => {
              const percentage = Math.round((goal.current / goal.target) * 100);
              return (
                <S.GoalCard key={goal.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{goal.title}</div>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "0.8rem" }}>
                        {goal.description}
                      </p>
                    </div>
                    <Badge variant="outline">{goal.deadline}</Badge>
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span>{percentage}%</span>
                  </div>
                  <S.GoalProgress>
                    <S.GoalProgressBar $value={percentage} />
                  </S.GoalProgress>
                </S.GoalCard>
              );
            })}
          </S.GoalsList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Lightbulb size={18} />
            친환경 실천 아이디어
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SelectField
            options={[{ value: "all", label: "전체" }, ...tipCategories]}
            value={selectedTipCategory}
            onChange={(event) => setSelectedTipCategory(event.target.value)}
          />
          <S.TipsList>
            {filteredTips.map((tip) => (
              <S.TipCard key={tip.id}>
                <S.TipMedia>
                  <ImageWithFallback src={tip.image} alt={tip.title} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <Badge tone={resolveTipTone(tip.category)}>{tip.category}</Badge>
                  </div>
                </S.TipMedia>
                <S.TipContent>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{tip.title}</h3>
                    <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#475569" }}>
                      {tip.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Badge tone="success">영향: {tip.impact}</Badge>
                    <Badge tone="info">난이도: {tip.difficulty}</Badge>
                  </div>
                </S.TipContent>
              </S.TipCard>
            ))}
          </S.TipsList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <TrendingUp size={18} />
            재활용 활동 추적
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <span style={{ fontSize: "2rem", fontWeight: 700 }}>{totalPoints}</span>
            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>이번 달 획득 포인트</span>
            <Progress value={progressValue} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
              <span style={{ color: "#64748b" }}>목표 {monthlyGoal}pt</span>
              <span style={{ fontWeight: 600 }}>{Math.round(progressValue)}%</span>
            </div>
          </div>
          {progressValue >= 100 && (
            <S.HighlightBox>
              <Award size={18} />
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>목표를 달성했어요!</span>
            </S.HighlightBox>
          )}
          <Button variant="outline">
            <RotateCcw size={16} />
            활동 기록하기
          </Button>
          <S.TrackerGrid>
            <S.TrackerStat>
              <S.TrackerValue>{entries.length}</S.TrackerValue>
              <S.TrackerLabel>활동 건수</S.TrackerLabel>
            </S.TrackerStat>
            <S.TrackerStat>
              <S.TrackerValue>{totalItems}</S.TrackerValue>
              <S.TrackerLabel>처리 아이템</S.TrackerLabel>
            </S.TrackerStat>
            <S.TrackerStat>
              <S.TrackerValue>{categoryCount}</S.TrackerValue>
              <S.TrackerLabel>카테고리</S.TrackerLabel>
            </S.TrackerStat>
          </S.TrackerGrid>
        </CardContent>
      </Card>
    </S.PageContainer>
  );
}
