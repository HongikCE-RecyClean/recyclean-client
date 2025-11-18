import { css } from "@emotion/react";
import styled from "@emotion/styled";

// 바텀시트 오버레이 배경
export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

// 바텀시트 컨테이너
export const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg} 0 0;
  max-height: 85vh;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease-in-out;
  transform: translateX(-50%) translateY(${({ isOpen }) => (isOpen ? "0" : "100%")});
`;

// 드래그 핸들 영역
export const Header = styled.div`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 드래그 핸들 바
export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
`;

// 바텀시트 제목
export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  width: 100%;
  text-align: center;
`;

// 바텀시트 내용 영역
export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(4)};

  // 스크롤바 스타일링
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.full};
  }
`;

// 내용 섹션
export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 섹션 제목
export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
`;

// 섹션 내용 텍스트
export const SectionText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 리스트 스타일
export const List = styled.ul`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
  list-style-type: disc;
`;

// 리스트 아이템
export const ListItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 강조 텍스트
export const HighlightText = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

// 링크 스타일
export const linkStyle = css`
  color: var(--link-color);
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
