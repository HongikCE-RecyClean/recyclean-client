import styled from "@emotion/styled";

// 카드 기본 컨테이너 스타일 정의
export const Card = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
`;

// 카드 본문 스타일 정의
export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`;

// 카드 헤더 스타일 정의
export const CardHeader = styled.header`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 카드 제목 스타일 정의
export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 카드 부제목 스타일 정의
export const CardSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

// 카드 컨텐츠 래퍼 스타일 정의
export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 카드 푸터 스타일 정의
export const CardFooter = styled.footer`
  padding: ${({ theme }) => theme.spacing(4)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: flex-end;
`;
