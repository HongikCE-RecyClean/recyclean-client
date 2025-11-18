import type { FilterOption, TrashBinAvailability, TrashBinType } from "shared/types/map";
import type { BadgeTone } from "shared/ui/Badge/Badge";

// 지도 필터 옵션 기본값
export const defaultMapFilterOptions: FilterOption[] = [
  { value: "all", label: "전체 유형" },
  { value: "recycling", label: "재활용" },
  { value: "general", label: "일반" },
  { value: "electronic", label: "전자제품" },
  { value: "compost", label: "퇴비" },
];

// 쓰레기통 유형 강조색 매핑
export const mapTypeAccent: Record<TrashBinType, string> = {
  recycling: "#2563eb",
  general: "#64748b",
  compost: "#16a34a",
  electronic: "#7c3aed",
};

// 쓰레기통 상태 톤 매핑
export const mapAvailabilityTone: Record<TrashBinAvailability, "success" | "danger" | "warning"> = {
  available: "success",
  full: "danger",
  maintenance: "warning",
};

// 재료 배지 색상 매핑
export const mapMaterialColors: Record<string, BadgeTone> = {
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
