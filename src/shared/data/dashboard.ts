import type { BadgeTone } from "shared/ui/Badge/Badge";

// 대시보드 활동 항목 타입
export interface RecentActivityItem {
  type: string;
  count: number;
  points: number;
  time: string;
}

// 대시보드 업적 항목 타입
export interface AchievementItem {
  title: string;
  description: string;
  earned: boolean;
}

// 재활용 재료 항목 타입
export interface MaterialItemData {
  name: string;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

// 친환경 팁 항목 타입
export interface TipData {
  id: string;
  title: string;
  description: string;
  category: "reduce" | "reuse" | "recycle" | "energy";
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "moderate" | "hard";
  image: string;
}

// 지속가능성 목표 타입
export interface GoalData {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

// 재활용 기록 타입
export interface RecyclingEntry {
  id: string;
  type: string;
  amount: number;
  date: Date;
  points: number;
}

// 대시보드 데이터 묶음 타입
export interface DashboardData {
  todayStats: {
    itemsRecycled: number;
    pointsEarned: number;
    streakDays: number;
  };
  recentActivity: RecentActivityItem[];
  achievements: AchievementItem[];
  materials: MaterialItemData[];
  tips: TipData[];
  goals: GoalData[];
  entries: RecyclingEntry[];
}

// 팁 카테고리 매핑
export const tipCategories = [
  { value: "reduce", label: "줄이기" },
  { value: "reuse", label: "재사용" },
  { value: "recycle", label: "재활용" },
  { value: "energy", label: "에너지" },
];

// 대시보드 초기 데이터
export const dashboardInitialData: DashboardData = {
  todayStats: {
    itemsRecycled: 12,
    pointsEarned: 24,
    streakDays: 7,
  },
  recentActivity: [
    { type: "Plastic Bottles", count: 5, points: 10, time: "2시간 전" },
    { type: "Aluminum Cans", count: 3, points: 6, time: "어제" },
    { type: "Glass Jars", count: 2, points: 6, time: "2일 전" },
  ],
  achievements: [
    { title: "Eco Warrior", description: "7일 연속 재활용 달성", earned: true },
    { title: "Bottle Buster", description: "500개의 병 처리", earned: true },
    { title: "Green Guardian", description: "누적 1,000 포인트 획득", earned: false },
  ],
  materials: [
    {
      name: "Plastic Bottles",
      recyclable: true,
      category: "Plastic",
      instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹궈요.",
      tips: "바닥의 재활용 기호 #1, #2를 확인해요.",
    },
    {
      name: "Glass Jars",
      recyclable: true,
      category: "Glass",
      instructions: "깨끗이 헹군 뒤 금속 뚜껑을 분리해요.",
      tips: "유리는 품질 저하 없이 여러 번 재활용돼요.",
    },
    {
      name: "Pizza Boxes",
      recyclable: false,
      category: "Paper",
      instructions: "기름과 음식물이 묻어 재활용이 어려워요.",
      tips: "깨끗한 부분만 분리 배출하고 나머지는 일반 쓰레기로 버려요.",
    },
    {
      name: "Aluminum Cans",
      recyclable: true,
      category: "Metal",
      instructions: "깨끗이 헹구고 눌러 부피를 줄여요.",
      tips: "가장 가치 있는 재활용 소재 중 하나예요.",
    },
  ],
  tips: [
    {
      id: "1",
      title: "재사용 물병 활용",
      description: "일회용 플라스틱 병 대신 재사용 가능한 물병을 사용해요.",
      category: "reduce",
      impact: "high",
      difficulty: "easy",
      image:
        "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: "2",
      title: "유리병 재활용 아이디어",
      description: "빈 유리병을 수납 용기나 화분으로 재활용해요.",
      category: "reuse",
      impact: "medium",
      difficulty: "easy",
      image:
        "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: "3",
      title: "배터리 올바른 처리",
      description: "배터리는 지정된 수거함에 배출해야 해요.",
      category: "recycle",
      impact: "high",
      difficulty: "moderate",
      image:
        "https://images.unsplash.com/photo-1579756423478-02bc82a97679?auto=format&fit=crop&w=1080&q=80",
    },
  ],
  goals: [
    {
      id: "1",
      title: "플라스틱 소비 감축",
      description: "일회용 플라스틱 제품 사용 줄이기",
      target: 50,
      current: 32,
      unit: "개",
      deadline: "1월 말",
    },
    {
      id: "2",
      title: "재활용 연속 기록",
      description: "연속 재활용 활동 일수",
      target: 30,
      current: 12,
      unit: "일",
      deadline: "2월 말",
    },
  ],
  entries: [
    {
      id: "1",
      type: "Plastic Bottles",
      amount: 5,
      date: new Date(2025, 0, 3),
      points: 10,
    },
    {
      id: "2",
      type: "Aluminum Cans",
      amount: 8,
      date: new Date(2025, 0, 2),
      points: 16,
    },
    {
      id: "3",
      type: "Glass Jars",
      amount: 3,
      date: new Date(2025, 0, 1),
      points: 9,
    },
  ],
};

// 팁 배지 색상 매핑
export function resolveTipTone(category: string): BadgeTone {
  switch (category) {
    case "reduce":
      return "danger";
    case "reuse":
      return "info";
    case "recycle":
      return "success";
    case "energy":
      return "warning";
    default:
      return "neutral";
  }
}
