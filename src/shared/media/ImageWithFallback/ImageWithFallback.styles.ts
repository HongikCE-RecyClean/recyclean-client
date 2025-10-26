import styled from "@emotion/styled";

// 이미지 로딩 실패 시 에러 컨테이너 스타일 정의
export const ErrorContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

// 대체 아이콘 표시 스타일 정의
export const FallbackIcon = styled.span`
  font-size: 1.5rem;
`;

// 기본 이미지 스타일 정의
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
