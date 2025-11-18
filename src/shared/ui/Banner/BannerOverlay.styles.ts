import styled from "@emotion/styled";

// 배너 최대 폭 고정 상수
const MAX_BANNER_WIDTH = 440;

// 배너를 화면 상단에 띄우는 오버레이 래퍼
export const OverlayWrapper = styled.div`
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 16px);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing(3)};
  pointer-events: none;
  z-index: 1200;

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

// 배너 컨텐츠에만 상호작용 허용
export const OverlayInner = styled.div`
  width: 100%;
  max-width: ${MAX_BANNER_WIDTH}px;
  display: flex;
  justify-content: center;
  pointer-events: auto;
`;
