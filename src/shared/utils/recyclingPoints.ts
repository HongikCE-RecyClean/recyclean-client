// 재활용 품목별 포인트 테이블
export const RECYCLING_POINTS_TABLE: Record<string, number> = {
  // 플라스틱류
  "플라스틱 병": 2,
  PET병: 3,
  "플라스틱 용기": 2,
  비닐: 1,
  스티로폼: 2,

  // 종이류
  종이: 1,
  골판지: 2,
  신문지: 1,
  우유팩: 3,

  // 금속류
  캔: 3,
  "알루미늄 캔": 4,
  철캔: 3,

  // 유리류
  유리병: 3,
  소주병: 4,

  // 의류/섬유
  옷: 2,
  헌옷: 2,
  섬유: 2,

  // 전자제품
  배터리: 5,
  전자제품: 10,
  형광등: 5,

  // 기타
  기타: 1,
};

// 재질/품목 카테고리 정의
export const MATERIAL_CATEGORIES = {
  plastic: "플라스틱",
  paper: "종이",
  metal: "금속",
  glass: "유리",
  textile: "의류/섬유",
  electronic: "전자제품",
  other: "기타",
} as const;

// 카테고리별 품목 목록
export const MATERIALS_BY_CATEGORY: Record<string, string[]> = {
  플라스틱: ["플라스틱 병", "PET병", "플라스틱 용기", "비닐", "스티로폼"],
  종이: ["종이", "골판지", "신문지", "우유팩"],
  금속: ["캔", "알루미늄 캔", "철캔"],
  유리: ["유리병", "소주병"],
  "의류/섬유": ["옷", "헌옷", "섬유"],
  전자제품: ["배터리", "전자제품", "형광등"],
  기타: ["기타"],
};

// 모든 재활용 품목 목록 추출
export const ALL_MATERIALS = Object.keys(RECYCLING_POINTS_TABLE);

/**
 * 재질과 수량을 기반으로 포인트 계산
 * @param type 재질/품목 이름
 * @param amount 수량
 * @returns 계산된 포인트
 */
export function calculatePoints(type: string, amount: number): number {
  const basePoints = RECYCLING_POINTS_TABLE[type] ?? RECYCLING_POINTS_TABLE["기타"];
  return basePoints * amount;
}

/**
 * 품목 이름으로 카테고리 찾기
 * @param materialType 품목 이름
 * @returns 카테고리 이름
 */
export function getCategoryByMaterial(materialType: string): string {
  for (const [category, materials] of Object.entries(MATERIALS_BY_CATEGORY)) {
    if (materials.includes(materialType)) {
      return category;
    }
  }
  return "기타";
}

/**
 * 분석 결과의 카테고리를 한국어 재질 이름으로 변환
 * @param category 영문 카테고리 (예: "plastic", "paper")
 * @returns 한국어 카테고리 이름
 */
export function translateCategory(category: string): string {
  const normalized = category.toLowerCase();

  if (normalized.includes("plastic") || normalized.includes("플라스틱")) {
    return "플라스틱";
  }
  if (normalized.includes("paper") || normalized.includes("종이")) {
    return "종이";
  }
  if (normalized.includes("metal") || normalized.includes("금속") || normalized.includes("can")) {
    return "금속";
  }
  if (normalized.includes("glass") || normalized.includes("유리")) {
    return "유리";
  }
  if (
    normalized.includes("textile") ||
    normalized.includes("의류") ||
    normalized.includes("섬유")
  ) {
    return "의류/섬유";
  }
  if (normalized.includes("electronic") || normalized.includes("전자")) {
    return "전자제품";
  }

  return "기타";
}

/**
 * 분석 결과의 아이템 이름을 표준 재질 이름으로 매칭
 * @param item 분석된 아이템 이름 (예: "Plastic Bottle", "Pizza Box")
 * @param category 카테고리 (선택적)
 * @returns 표준 재질 이름
 */
export function matchMaterialType(item: string, category?: string): string {
  const normalized = item.toLowerCase();

  // 플라스틱류
  if (normalized.includes("pet") || normalized.includes("bottle")) {
    return "PET병";
  }
  if (normalized.includes("plastic container") || normalized.includes("용기")) {
    return "플라스틱 용기";
  }
  if (normalized.includes("plastic") || normalized.includes("플라스틱")) {
    return "플라스틱 병";
  }
  if (normalized.includes("vinyl") || normalized.includes("비닐")) {
    return "비닐";
  }
  if (normalized.includes("styrofoam") || normalized.includes("스티로폼")) {
    return "스티로폼";
  }

  // 종이류
  if (
    normalized.includes("cardboard") ||
    normalized.includes("골판지") ||
    normalized.includes("box")
  ) {
    return "골판지";
  }
  if (normalized.includes("newspaper") || normalized.includes("신문")) {
    return "신문지";
  }
  if (normalized.includes("milk") || normalized.includes("우유팩")) {
    return "우유팩";
  }
  if (normalized.includes("paper") || normalized.includes("종이")) {
    return "종이";
  }

  // 금속류
  if (normalized.includes("aluminum") || normalized.includes("알루미늄")) {
    return "알루미늄 캔";
  }
  if (normalized.includes("can") || normalized.includes("캔")) {
    return "캔";
  }

  // 유리류
  if (normalized.includes("soju") || normalized.includes("소주")) {
    return "소주병";
  }
  if (
    normalized.includes("glass") ||
    normalized.includes("bottle") ||
    normalized.includes("유리")
  ) {
    return "유리병";
  }

  // 카테고리 기반 기본값
  if (category) {
    const translatedCategory = translateCategory(category);
    const materialsInCategory = MATERIALS_BY_CATEGORY[translatedCategory];
    if (materialsInCategory && materialsInCategory.length > 0) {
      return materialsInCategory[0]; // 카테고리의 첫 번째 품목 반환
    }
  }

  return "기타";
}
