import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AppTheme } from "shared/styles/theme";

// 프로필 페이지 전체 컨테이너 정의
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
export const profileMetaText = (theme: AppTheme) => css`
  margin: 4px 0 0;
  color: ${theme.colors.textMuted};
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
  color: ${({ theme }) => theme.colors.success};
`;

// 영향력 통계 주요 수치(정보) 스타일
export const ImpactStatValueInfo = styled.div`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.info};
`;

// 영향력 통계 라벨 텍스트 스타일
export const impactStatLabel = (theme: AppTheme) => css`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
`;
