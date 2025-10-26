import styled from "@emotion/styled";
import { Button } from "../../../shared/ui/Button/Button";

// 필터 행 정렬 정의
export const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

// 전체 폭 버튼 스타일 정의
export const FullWidthButton = styled(Button)`
  width: 100%;
`;
