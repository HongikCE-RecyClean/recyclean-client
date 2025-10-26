import styled from "@emotion/styled";
import { Card, CardContent } from "../../../shared/ui/Card/Card";

// 쓰레기통 리스트 래퍼 스타일 정의
export const BinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 쓰레기통 카드 프레임 스타일 정의
export const BinCard = styled(Card)<{ $accent: string }>`
  border-left: 4px solid ${({ $accent }) => $accent};
`;

// 카드 헤더 정렬 정의
export const BinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 쓰레기통 기본 정보 영역 정의
export const BinInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 텍스트 메타 정보 정렬 정의
export const BinMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 업데이트 시각 행 정렬 정의
export const BinUpdatedRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #64748b;
`;

// 수거 품목 배치 정의
export const AcceptedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 목록 비어 있을 때 카드 스타일 정의
export const EmptyStateCard = styled(CardContent)`
  text-align: center;
  color: #64748b;
`;

// 액션 버튼 행 정렬 정의
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

// 섹션 레이블 텍스트 스타일 정의
export const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 4px;
`;
