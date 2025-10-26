import styled from "@emotion/styled";

// 구분선 스타일 정의
export const Separator = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing(3)} 0;
`;
