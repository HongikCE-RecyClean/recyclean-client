import styled from "@emotion/styled";
import { Button } from "shared/ui/Button/Button";

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

// 지도 카드 상단 안내 행
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 안내 텍스트 묶음
export const HeaderTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// 지도 카드 타이틀
export const HeaderTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

// 지도 카드 서브 텍스트
export const HeaderSubtitle = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LocationButton = styled(Button)`
  width: 100%;
`;

// 지도 캔버스 컨테이너
export const MapWrapper = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 실제 네이버 지도가 마운트될 캔버스
export const MapCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

// 키 미설정 시 노출하는 안내 영역
export const MapFallback = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  text-align: center;
`;

export const RoutePanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const RoutePanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const RouteSummaryPill = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 600;
`;

export const RouteDestinationName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const RouteDestinationAddress = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RouteStatus = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RouteError = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const RouteActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RouteClearButton = styled(Button)`
  align-self: flex-end;
`;
