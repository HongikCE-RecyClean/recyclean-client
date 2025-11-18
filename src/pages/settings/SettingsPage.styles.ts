import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CardContent } from "../../shared/ui/Card/Card";

// 설정 페이지 전체 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

// 프로필 행 정렬 정의
export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 통계 카드 그리드 정의
export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

// 설정 항목 행 정렬 정의
export const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};

  /* 첫 번째 항목은 위에 패딩 추가 (SectionStack gap과 동일하게) */
  &:first-child {
    padding-top: ${({ theme }) => theme.spacing(4)};
  }

  /* 마지막 항목은 아래에 패딩 추가 (SectionStack gap과 동일하게) */
  &:last-child {
    padding-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

// 설정 라벨 정렬 정의
export const SettingsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 설정 텍스트 스택 정의
export const SettingsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

// 설정 항목 제목 텍스트 스타일
export const SettingsItemTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 설정 항목 설명 텍스트 스타일
export const settingsItemDescription = css`
  font-size: 0.75rem;
  color: #64748b;
`;

// 설정 필드 레이블 텍스트 스타일
export const SettingsFieldLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: 8px;
  font-size: 0.85rem;
`;

// 섹션 컨텐츠 스택 정의
export const SectionStack = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 행동 버튼 목록 정의
export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 지원 액션 버튼 정렬 스타일
export const actionButtonAlignStart = css`
  justify-content: flex-start;
`;

// 프로필 아바타 이미지 패딩 스타일
export const profileAvatarImage = css`
  object-fit: contain;
  padding: 12px;
`;

// 프로필 정보 컨테이너 레이아웃 스타일
export const profileInfoContainer = css`
  flex: 1;
`;

// 프로필 메타 텍스트 스타일
export const profileMetaText = css`
  margin: 4px 0 0;
  color: #475569;
  font-size: 0.85rem;
`;

// 프로필 배지 행 스타일
export const profileBadgeRow = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

// 영향력 통계 주요 수치(성공) 스타일
export const ImpactStatValueSuccess = styled.div`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: #16a34a;
`;

// 영향력 통계 주요 수치(정보) 스타일
export const ImpactStatValueInfo = styled.div`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: #2563eb;
`;

// 영향력 통계 라벨 텍스트 스타일
export const impactStatLabel = css`
  font-size: 0.8rem;
  color: #64748b;
`;
