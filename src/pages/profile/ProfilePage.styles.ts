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
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0;
`;

// 프로필 정보 컨테이너 레이아웃 스타일
export const profileInfoContainer = css`
  flex: 1;
`;

// 프로필 닉네임과 편집 버튼 행 스타일
export const profileNameRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 프로필 닉네임 스타일
export const ProfileName = styled.h2`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
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

// 레벨 카드 헤더 행 스타일
export const levelHeaderRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`;

// 레벨 진행률 영역 레이아웃
export const levelProgressSection = (theme: AppTheme) => css`
  margin-top: ${theme.spacing(1.5)};
`;

// 다음 레벨 안내 텍스트 스타일
export const levelProgressMeta = (theme: AppTheme) => css`
  font-size: 0.85rem;
  color: ${theme.colors.textMuted};
  text-align: right;
  white-space: nowrap;
`;

// 카테고리 통계 리스트 스타일
export const CategoryStatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 카테고리 통계 아이템 스타일
export const CategoryStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 카테고리 통계 이름 스타일
export const CategoryStatName = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
`;

// 카테고리 통계 메타 정보 스타일
export const CategoryStatMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 카테고리 통계 빈 상태 메시지 스타일
export const CategoryEmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  padding: ${({ theme }) => theme.spacing(4)} 0;
  font-size: 0.9rem;
`;
