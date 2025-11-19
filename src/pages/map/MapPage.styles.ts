import styled from "@emotion/styled";
import { Card, CardContent, CardHeader } from "shared/ui/Card/Card";

// 지도 페이지 컨테이너 레이아웃 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

// 지도 페이지 섹션 카드 (맵 컨테이너 제외) 정의
export const SectionCard = styled(Card)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  transition: none;

  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

export const SectionCardHeader = styled(CardHeader)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

export const SectionCardContent = styled(CardContent)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

export const ErrorInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.dangerSurface};
  border: 1px solid ${({ theme }) => theme.colors.danger};
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;
