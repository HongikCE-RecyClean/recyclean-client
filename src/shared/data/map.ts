import type {
  FilterOption,
  RecyclingCenter,
  TrashBin,
  TrashBinAvailability,
  TrashBinType,
} from "shared/types/map";
import type { BadgeTone } from "shared/ui/Badge/Badge";

// 지도 페이지 초기 쓰레기통 데이터
export const trashBins: TrashBin[] = [
  {
    id: "1",
    type: "recycling",
    name: "서울광장 재활용 스테이션",
    location: "서울특별시 중구 세종대로 110 서울시청 본관 앞",
    distance: "0.3 km",
    availability: "available",
    lastUpdated: "2분 전",
    acceptedItems: ["플라스틱(Plastic)", "유리(Glass)", "금속(Metal)", "종이(Paper)"],
  },
  {
    id: "2",
    type: "general",
    name: "남대문로 거리 일반 쓰레기통",
    location: "서울특별시 중구 남대문로 79 신세계백화점 앞",
    distance: "0.5 km",
    availability: "available",
    lastUpdated: "5분 전",
    acceptedItems: ["일반폐기물(General Waste)"],
  },
  {
    id: "3",
    type: "electronic",
    name: "용산 전자제품 수거함",
    location: "서울특별시 용산구 한강대로 23 전자상가 3층 출입구",
    distance: "1.2 km",
    availability: "available",
    lastUpdated: "1시간 전",
    acceptedItems: [
      "전자제품(Electronics)",
      "배터리(Batteries)",
      "휴대전화(Phone)",
      "케이블(Cables)",
    ],
  },
  {
    id: "4",
    type: "recycling",
    name: "홍대입구 재활용 거점",
    location: "서울특별시 마포구 양화로 160 홍대입구역 9번 출구",
    distance: "4.6 km",
    availability: "full",
    lastUpdated: "25분 전",
    acceptedItems: ["플라스틱(Plastic)", "유리(Glass)", "골판지(Cardboard)"],
  },
  {
    id: "5",
    type: "compost",
    name: "성수동 도시농업 퇴비함",
    location: "서울특별시 성동구 성수이로 66 도시농업 체험장",
    distance: "6.3 km",
    availability: "available",
    lastUpdated: "12분 전",
    acceptedItems: [
      "음식물 쓰레기(Food Waste)",
      "텃밭 부산물(Garden Waste)",
      "종이타월(Paper Towels)",
    ],
  },
];

// 지도 페이지 초기 재활용 센터 데이터
export const recyclingCenters: RecyclingCenter[] = [
  {
    id: "1",
    name: "서울 재활용 지원센터",
    address: "서울특별시 종로구 종로1길 36",
    distance: "2.1 km",
    rating: 4.6,
    hours: "월-토 08:00-18:00",
    phone: "02-120",
    acceptedMaterials: [
      "플라스틱(Plastic)",
      "유리(Glass)",
      "금속(Metal)",
      "종이(Paper)",
      "전자제품(Electronics)",
    ],
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
  },
  {
    id: "2",
    name: "강남 자원순환 센터",
    address: "서울특별시 강남구 테헤란로 212",
    distance: "7.5 km",
    rating: 4.3,
    hours: "월-금 09:00-19:00",
    phone: "02-3456-7890",
    acceptedMaterials: ["플라스틱(Plastic)", "유리(Glass)", "금속(Metal)", "골판지(Cardboard)"],
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
  },
  {
    id: "3",
    name: "송파 스마트 재활용존",
    address: "서울특별시 송파구 올림픽로 300",
    distance: "12.4 km",
    rating: 4.1,
    hours: "연중무휴 24시간 무인반납",
    acceptedMaterials: ["플라스틱(Plastic)", "유리(Glass)", "캔(Cans)", "전자제품(Electronics)"],
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
  },
];

// 지도 페이지 필터 옵션
export const filterOptions: FilterOption[] = [
  { value: "all", label: "전체 유형" },
  { value: "recycling", label: "재활용" },
  { value: "general", label: "일반" },
  { value: "electronic", label: "전자제품" },
  { value: "compost", label: "퇴비" },
];

// 쓰레기통 유형 강조색 매핑
export const typeAccent: Record<TrashBinType, string> = {
  recycling: "#2563eb",
  general: "#64748b",
  compost: "#16a34a",
  electronic: "#7c3aed",
};

// 쓰레기통 상태 톤 매핑
export const availabilityTone: Record<TrashBinAvailability, "success" | "danger" | "warning"> = {
  available: "success",
  full: "danger",
  maintenance: "warning",
};

// 재료 배지 색상 매핑
export const materialColors: Record<string, BadgeTone> = {
  "플라스틱(Plastic)": "info",
  "유리(Glass)": "success",
  "금속(Metal)": "danger",
  "종이(Paper)": "warning",
  "전자제품(Electronics)": "danger",
  "골판지(Cardboard)": "warning",
  "음식물 쓰레기(Food Waste)": "success",
  "텃밭 부산물(Garden Waste)": "success",
  "종이타월(Paper Towels)": "warning",
  "일반폐기물(General Waste)": "neutral",
  "캔(Cans)": "info",
  "배터리(Batteries)": "danger",
  "휴대전화(Phone)": "danger",
  "케이블(Cables)": "info",
};
