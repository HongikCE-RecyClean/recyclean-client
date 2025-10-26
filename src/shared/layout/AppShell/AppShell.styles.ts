import styled from "@emotion/styled";

// 앱 전체 쉘 레이아웃 컨테이너 정의
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

// 메인 영역 레이아웃 정의
export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)}
    ${({ theme }) => theme.spacing(10)};
`;

// 메인 컨텐츠 정렬 정의
export const Content = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;
