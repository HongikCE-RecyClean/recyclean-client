import styled from "@emotion/styled";

// 보호 라우트 대기 상태 영역 스타일 정의
export const PendingState = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
