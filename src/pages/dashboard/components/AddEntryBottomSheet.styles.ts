import { css } from "@emotion/react";
import styled from "@emotion/styled";

// 폼 컨테이너
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;

// 폼 그룹
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 날짜|시간 등 2열 입력을 구성하는 래퍼
export const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`;

// FormRow 내부에서 동일 비율을 유지하는 그룹
export const FormRowItem = styled(FormGroup)`
  flex: 1;
  min-width: 0;
`;

// 레이블
export const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

// 예상 포인트 표시
export const PointsPreview = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

// 버튼 스타일 (flex: 1)
export const buttonStyle = css`
  flex: 1;
`;
