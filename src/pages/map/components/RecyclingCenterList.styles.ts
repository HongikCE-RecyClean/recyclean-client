import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent } from "../../../shared/ui/Card/Card";

// 센터 리스트 전체 래퍼 스타일 정의
export const CenterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 센터 카드 컴포넌트 스타일 정의
export const CenterCard = styled(Card)`
  overflow: hidden;
`;

// 이미지 영역 스타일 정의
export const CenterMedia = styled.div`
  position: relative;
  height: 140px;
`;

// 센터 거리 배지 위치 클래스
export const centerBadgeContainer = css`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// 카드 본문 레이아웃 정의
export const CenterContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 센터 명칭 텍스트 스타일
export const centerNameText = css`
  margin: 0;
`;

// 센터 주소 텍스트 스타일
export const centerAddressText = css`
  font-size: 0.8rem;
  color: #475569;
`;

// 재활용 품목 칩 묶음 스타일 정의
export const MaterialChips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

// 정보 스택 텍스트 정렬 정의
export const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
`;

// 정보 행 정렬 정의
export const InfoRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
`;

// 액션 버튼 행 정렬 정의
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// 센터 액션 버튼 폭 스타일
export const centerActionButton = css`
  flex: 1;
`;
