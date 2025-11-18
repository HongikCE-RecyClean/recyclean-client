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
const MATERIAL_COLOR_MAP: Record<string, BadgeTone> = {
  plastic: "info",
  glass: "success",
  metal: "danger",
  paper: "warning",
  electronics: "danger",
  cardboard: "warning",
  foodwaste: "success",
  gardenwaste: "success",
  papertowels: "warning",
  generalwaste: "neutral",
  cans: "info",
  batteries: "danger",
  phone: "danger",
  cables: "info",
};

function normalizeMaterialLabel(label: string): string {
  const asciiTokens = label.toLowerCase().match(/[a-z]+/g);
  if (asciiTokens && asciiTokens.length > 0) {
    return asciiTokens.join("");
  }
  return label.toLowerCase().trim();
}

export function resolveMaterialBadgeTone(label: string): BadgeTone {
  const normalized = normalizeMaterialLabel(label);
  return MATERIAL_COLOR_MAP[normalized] ?? "neutral";
}
