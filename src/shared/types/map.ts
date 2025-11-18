// 쓰레기통 정보 타입 정의
export interface TrashBin {
  id: string;
  type: "general" | "recycling" | "compost" | "electronic";
  name: string;
  location: string;
  distance: string;
  availability: "available" | "full" | "maintenance";
  lastUpdated: string;
  acceptedItems: string[];
}

// 쓰레기통 유형 타입 별칭
export type TrashBinType = TrashBin["type"];

// 쓰레기통 상태 타입 별칭
export type TrashBinAvailability = TrashBin["availability"];

// 재활용 센터 타입 정의
export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  hours: string;
  phone?: string;
  acceptedMaterials: string[];
  image: string;
}

// 필터 옵션 타입 정의
export interface FilterOption {
  value: string;
  label: string;
}

// 지도 데이터 전체 묶음 타입 정의
export interface MapData {
  bins: TrashBin[];
  centers: RecyclingCenter[];
  options?: FilterOption[];
}
