import styled from "@emotion/styled";

// 아바타 루트 컨테이너 스타일 정의
export const AvatarRoot = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

// 아바타 이미지 스타일 정의
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 아바타 폴백 텍스트 스타일 정의
export const Fallback = styled.span`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;
