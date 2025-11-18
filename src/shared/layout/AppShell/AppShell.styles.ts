import styled from "@emotion/styled";

// 앱 전체 쉘 레이아웃 컨테이너 정의
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 15% 15%, rgba(47, 133, 90, 0.04), transparent 40%),
    radial-gradient(circle at 85% 85%, rgba(20, 184, 166, 0.03), transparent 40%),
    ${({ theme }) => theme.colors.background};
`;

// 메인 영역 레이아웃 정의
export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(4)}
    ${({ theme }) => theme.spacing(12)};
`;

// 메인 컨텐츠 정렬 정의
export const Content = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;
