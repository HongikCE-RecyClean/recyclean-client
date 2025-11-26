import type { Plan, CategoryType } from "shared/api/types";
import type { RecyclingEntry } from "shared/types/dashboard";
import type { MaterialId } from "shared/utils/recyclingPoints";

// ============================================================
// Plan ↔ RecyclingEntry 변환 유틸리티
// Dashboard와 Calendar에서 공통 사용
// ============================================================

// API 카테고리를 로컬 MaterialId로 매핑
export const CATEGORY_TO_MATERIAL: Record<CategoryType, MaterialId> = {
  CAN: "can",
  PAPER: "paper",
  PLASTIC: "petBottle",
  GLASS: "glassBottle",
  GENERAL: "other",
  ELECTRONICS: "electronics",
  METAL: "steelCan",
  CLOTHING: "clothes",
};

// 로컬 MaterialId를 API 카테고리로 역매핑
export const MATERIAL_TO_CATEGORY: Record<MaterialId, CategoryType> = {
  can: "CAN",
  steelCan: "METAL",
  aluminumCan: "CAN",
  paper: "PAPER",
  newspaper: "PAPER",
  cardboard: "PAPER",
  milkCarton: "PAPER",
  petBottle: "PLASTIC",
  plasticContainer: "PLASTIC",
  vinyl: "PLASTIC",
  styrofoam: "PLASTIC",
  glassBottle: "GLASS",
  sojuBottle: "GLASS",
  beerBottle: "GLASS",
  battery: "ELECTRONICS",
  electronics: "ELECTRONICS",
  clothes: "CLOTHING",
  other: "GENERAL",
};

// API Plan을 로컬 RecyclingEntry 형식으로 변환
export function planToEntry(plan: Plan): RecyclingEntry[] {
  // Plan 하나에 여러 items가 있을 수 있으므로 각 item을 별도 entry로 변환
  return plan.items.map((item, index) => ({
    id: `plan-${plan.id}-${index}`,
    type: CATEGORY_TO_MATERIAL[item.category] || "other",
    amount: item.quantity,
    date: new Date(`${plan.date}T${plan.time}`),
    points: Math.floor((plan.planPoint ?? 0) / plan.items.length), // 포인트를 아이템 수로 분배
    mode: plan.completed ? "record" : "plan",
    // 서버 Plan ID 저장 (API 연동용)
    planId: plan.id,
    // 완료 여부
    completed: plan.completed,
    // AI 감지 여부
    detectedByAi: item.detectedByAi,
    // 메모 (Plan 레벨, 첫 번째 item에만 표시)
    memo: index === 0 ? plan.memo : undefined,
  }));
}
