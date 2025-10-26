// 설정 페이지에서 공유하는 타입 정의
export interface UserStats {
  totalPoints: number;
  itemsRecycled: number;
  joinDate: string;
  streakDays: number;
}

// 언어와 지역 옵션 타입 정의
export interface LocaleOption {
  value: string;
  label: string;
}
