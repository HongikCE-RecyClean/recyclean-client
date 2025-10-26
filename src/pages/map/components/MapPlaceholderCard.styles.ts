import styled from "@emotion/styled";

// 지도 플레이스홀더 컨테이너 스타일 정의
export const PlaceholderContainer = styled.div`
  height: 200px;
  border-radius: 16px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5f5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #475569;
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
