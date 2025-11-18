import styled from "@emotion/styled";

// 지도 플레이스홀더 컨테이너 스타일 정의
export const PlaceholderContainer = styled.div`
  height: 200px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  gap: 8px;
`;

// 플레이스홀더 타이틀 스타일 정의
export const PlaceholderTitle = styled.div`
  font-weight: 600;
`;

// 플레이스홀더 서브텍스트 스타일 정의
export const PlaceholderSubtitle = styled.div`
  font-size: 0.85rem;
`;
