// 재활용 품목 및 카테고리 정의와 포인트 계산 유틸리티

export type MaterialCategoryId =
  | "plastic"
  | "paper"
  | "metal"
  | "glass"
  | "textile"
  | "electronic"
  | "other";

export type MaterialId =
  | "plasticBottle"
  | "petBottle"
  | "plasticContainer"
  | "vinyl"
  | "styrofoam"
  | "paper"
  | "cardboard"
  | "newspaper"
  | "milkCarton"
  | "can"
  | "aluminumCan"
  | "steelCan"
  | "glassBottle"
  | "sojuBottle"
  | "clothes"
  | "oldClothes"
  | "textile"
  | "battery"
  | "electronics"
  | "fluorescentLamp"
  | "other";

export const MATERIAL_CATEGORY_ORDER: MaterialCategoryId[] = [
  "plastic",
  "paper",
  "metal",
  "glass",
  "textile",
  "electronic",
  "other",
];

export const MATERIALS_BY_CATEGORY: Record<MaterialCategoryId, MaterialId[]> = {
  plastic: ["plasticBottle", "petBottle", "plasticContainer", "vinyl", "styrofoam"],
  paper: ["paper", "cardboard", "newspaper", "milkCarton"],
  metal: ["can", "aluminumCan", "steelCan"],
  glass: ["glassBottle", "sojuBottle"],
  textile: ["clothes", "oldClothes", "textile"],
  electronic: ["battery", "electronics", "fluorescentLamp"],
  other: ["other"],
};

const RECYCLING_POINTS_TABLE: Record<MaterialId, number> = {
  plasticBottle: 2,
  petBottle: 3,
  plasticContainer: 2,
  vinyl: 1,
  styrofoam: 2,
  paper: 1,
  cardboard: 2,
  newspaper: 1,
  milkCarton: 3,
  can: 3,
  aluminumCan: 4,
  steelCan: 3,
  glassBottle: 3,
  sojuBottle: 4,
  clothes: 2,
  oldClothes: 2,
  textile: 2,
  battery: 5,
  electronics: 10,
  fluorescentLamp: 5,
  other: 1,
};

type MaterialMatcher = {
  id: MaterialId;
  keywords: string[];
};

const MATERIAL_MATCHERS: MaterialMatcher[] = [
  { id: "petBottle", keywords: ["pet", "#1", "transparent bottle"] },
  { id: "plasticBottle", keywords: ["plastic bottle", "water bottle", "soda bottle"] },
  { id: "plasticContainer", keywords: ["plastic container", "takeout box", "tray"] },
  { id: "vinyl", keywords: ["vinyl", "plastic bag", "film"] },
  { id: "styrofoam", keywords: ["styrofoam", "foam"] },
  { id: "milkCarton", keywords: ["milk carton", "juice carton"] },
  { id: "cardboard", keywords: ["cardboard", "pizza box", "box"] },
  { id: "newspaper", keywords: ["newspaper", "news paper"] },
  { id: "paper", keywords: ["paper", "paper sheet"] },
  { id: "aluminumCan", keywords: ["aluminum can", "aluminium can"] },
  { id: "can", keywords: ["can", "tin can"] },
  { id: "steelCan", keywords: ["steel can"] },
  { id: "glassBottle", keywords: ["glass bottle", "beer bottle"] },
  { id: "sojuBottle", keywords: ["soju", "soju bottle"] },
  { id: "battery", keywords: ["battery"] },
  { id: "electronics", keywords: ["electronics", "device", "appliance"] },
  { id: "fluorescentLamp", keywords: ["fluorescent", "light tube"] },
  { id: "clothes", keywords: ["clothes", "garment"] },
  { id: "oldClothes", keywords: ["old clothes", "used clothes"] },
  { id: "textile", keywords: ["textile", "fabric"] },
];

const LEGACY_MATERIAL_LABEL_MAP: Record<string, MaterialId> = {
  "\ud50c\ub77c\uc2a4\ud2f1 \ubcd1": "plasticBottle",
  "pet\ubcd1": "petBottle",
  "\ud50c\ub77c\uc2a4\ud2f1 \uc6a9\uae30": "plasticContainer",
  "\ube44\ub2d0": "vinyl",
  "\uc2a4\ud2f0\ub85c\ud3fc": "styrofoam",
  "\uc885\uc774": "paper",
  "\uace8\ud310\uc9c0": "cardboard",
  "\uc2e0\ubb38\uc9c0": "newspaper",
  "\uc6b0\uc720\ud329": "milkCarton",
  "\uce94": "can",
  "\uc54c\ub8e8\ubbf8\ub284 \uce94": "aluminumCan",
  "\ucca0\uce94": "steelCan",
  "\uc720\ub9ac\ubcd1": "glassBottle",
  "\uc18c\uc8fc\ubcd1": "sojuBottle",
  "\uc637": "clothes",
  "\ud5cc\uc637": "oldClothes",
  "\uc12c\uc720": "textile",
  "\ubc30\ud130\ub9ac": "battery",
  "\uc804\uc790\uc81c\ud488": "electronics",
  "\ud615\uad11\ub4f1": "fluorescentLamp",
  "\uae30\ud0c0": "other",
};

const LEGACY_CATEGORY_LABEL_MAP: Record<string, MaterialCategoryId> = {
  "\ud50c\ub77c\uc2a4\ud2f1": "plastic",
  "\uc885\uc774": "paper",
  "\uae08\uc18d": "metal",
  "\uc720\ub9ac": "glass",
  "\uc758\ub958/\uc12c\uc720": "textile",
  "\uc804\uc790\uc81c\ud488": "electronic",
};

// 서버 API CategoryType Enum → 로컬 MaterialCategoryId 매핑
// API_SPEC3 기준: CAN, PAPER, PLASTIC, GLASS, GENERAL, ELECTRONICS, METAL, CLOTHING
export const API_CATEGORY_TO_LOCAL: Record<string, MaterialCategoryId> = {
  PLASTIC: "plastic",
  PAPER: "paper",
  GLASS: "glass",
  METAL: "metal",
  CAN: "metal", // CAN은 금속으로 분류
  ELECTRONICS: "electronic",
  CLOTHING: "textile",
  GENERAL: "other",
};

function normalizeLegacyKey(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeMaterialId(value: string): MaterialId {
  if (!value) {
    return "other";
  }
  if ((RECYCLING_POINTS_TABLE as Record<string, number>)[value]) {
    return value as MaterialId;
  }
  const normalized = normalizeLegacyKey(value);
  return LEGACY_MATERIAL_LABEL_MAP[normalized] ?? "other";
}

export function calculatePoints(type: string, amount: number): number {
  const normalizedType = normalizeMaterialId(type);
  const basePoints = RECYCLING_POINTS_TABLE[normalizedType] ?? RECYCLING_POINTS_TABLE.other;
  return basePoints * Math.max(1, amount);
}

export function getCategoryByMaterial(materialType: string): MaterialCategoryId {
  const normalizedMaterial = normalizeMaterialId(materialType);
  for (const [category, materials] of Object.entries(MATERIALS_BY_CATEGORY) as Array<
    [MaterialCategoryId, MaterialId[]]
  >) {
    if (materials.includes(normalizedMaterial)) {
      return category;
    }
  }
  return "other";
}

export function translateCategory(category: string): MaterialCategoryId {
  if (!category) {
    return "other";
  }

  // 서버 API Enum 직접 매핑 우선 확인 (대문자 Enum)
  const apiMatch = API_CATEGORY_TO_LOCAL[category.toUpperCase()];
  if (apiMatch) {
    return apiMatch;
  }

  // 문자열 포함 매핑 (하위 호환성)
  const normalized = category.toLowerCase();

  if (normalized.includes("plastic") || normalized.includes("pet")) {
    return "plastic";
  }
  if (normalized.includes("paper") || normalized.includes("carton")) {
    return "paper";
  }
  if (normalized.includes("metal") || normalized.includes("can")) {
    return "metal";
  }
  if (normalized.includes("glass") || normalized.includes("bottle")) {
    return "glass";
  }
  if (
    normalized.includes("textile") ||
    normalized.includes("fabric") ||
    normalized.includes("clothes")
  ) {
    return "textile";
  }
  if (normalized.includes("electronic") || normalized.includes("battery")) {
    return "electronic";
  }

  const legacy = LEGACY_CATEGORY_LABEL_MAP[normalizeLegacyKey(category)];
  return legacy ?? "other";
}

export function matchMaterialType(item: string, category?: string): MaterialId {
  if (item) {
    const normalized = item.toLowerCase();
    for (const matcher of MATERIAL_MATCHERS) {
      if (matcher.keywords.some((keyword) => normalized.includes(keyword))) {
        return matcher.id;
      }
    }
  }

  if (category) {
    const derivedCategory = translateCategory(category);
    const fallback = MATERIALS_BY_CATEGORY[derivedCategory]?.[0];
    if (fallback) {
      return fallback;
    }
  }

  return "other";
}
