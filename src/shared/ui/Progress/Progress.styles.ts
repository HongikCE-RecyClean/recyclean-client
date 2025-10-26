import styled from "@emotion/styled";

// 진행 바 트랙 스타일 정의
export const Track = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  overflow: hidden;
`;

// 진행 바 내부 인디케이터 정의
export const Indicator = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  background: linear-gradient(90deg, #10b981 0%, #2f855a 60%, #2b6cb0 100%);
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: width 0.3s ease;
`;

// 진행 바 라벨 텍스트 정의
export const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;
