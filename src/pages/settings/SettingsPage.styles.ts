import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CardContent } from "../../shared/ui/Card/Card";
import type { AppTheme } from "../../shared/styles/theme";

// 권한 상태 뱃지 색상 계산 헬퍼
const permissionStatusColor = (theme: AppTheme, variant: "success" | "warning" | "info") => {
  if (variant === "success") return theme.colors.success;
  if (variant === "info") return theme.colors.info;
  return theme.colors.warning;
};

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
export const settingsItemDescription = (theme: AppTheme) => css`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;

// 권한 상태 텍스트 스타일 정의
export const PermissionStatusText = styled.span<{ $variant: "success" | "warning" | "info" }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.75rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ theme, $variant }) => permissionStatusColor(theme, $variant)};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: ${({ theme }) => theme.radii.full};
    background-color: ${({ theme, $variant }) => permissionStatusColor(theme, $variant)};
  }
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

// 프로필 편집 컨텐츠 컨테이너
export const EditProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

// 프로필 편집 라벨
export const EditProfileLabel = styled.label`
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

// 프로필 편집 입력 필드
export const EditProfileInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
