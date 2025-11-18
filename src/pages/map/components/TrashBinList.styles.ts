import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent } from "../../../shared/ui/Card/Card";

// 쓰레기통 리스트 래퍼 스타일 정의
export const BinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 쓰레기통 카드 프레임 스타일 정의
export const BinCard = styled(Card)``;

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

// 배출함 이름 텍스트 스타일
export const BinNameText = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 배출함 위치 텍스트 스타일
export const binLocationText = css`
  font-size: 0.8rem;
  color: #475569;
`;

// 업데이트 시각 행 정렬 정의
export const BinUpdatedRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #64748b;
`;

// 배출함 거리 정보 박스 스타일
export const binDistanceColumn = css`
  text-align: right;
  min-width: 70px;
`;

// 배출함 이용 가능 배지 간격 스타일
export const binAvailabilitySpacer = css`
  margin-top: 6px;
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

// 배출함 수거 품목 섹션 여백 스타일
export const binItemsSection = css`
  margin-top: 12px;
`;

// 배출함 액션 버튼 폭 스타일
export const binActionButton = css`
  flex: 1;
`;

// 섹션 레이블 텍스트 스타일 정의
export const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 4px;
`;
