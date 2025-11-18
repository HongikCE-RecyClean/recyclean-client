import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";

// 앱 정보 바텀시트 내용
export function AppInfoContent() {
  return (
    <>
      <S.Section>
        <S.SectionTitle>RecyClean</S.SectionTitle>
        <S.SectionText>
          지구를 위한 작은 실천, 재활용을 더 쉽고 재미있게 만드는 스마트 재활용 도우미예요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>버전 정보</S.SectionTitle>
        <S.SectionText>
          <S.HighlightText>현재 버전:</S.HighlightText> 1.0.0
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>최신 업데이트:</S.HighlightText> 2025년 1월
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>주요 기능</S.SectionTitle>
        <S.List>
          <S.ListItem>AI 기반 재활용 품목 이미지 분석</S.ListItem>
          <S.ListItem>재활용 활동 추적 및 포인트 적립</S.ListItem>
          <S.ListItem>캘린더 기반 활동 기록 관리</S.ListItem>
          <S.ListItem>주변 재활용 센터 지도 검색</S.ListItem>
          <S.ListItem>개인화된 통계 및 성과 리포트</S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>개발팀</S.SectionTitle>
        <S.SectionText>
          <S.HighlightText>개발사:</S.HighlightText> RecyClean Team
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>이메일:</S.HighlightText>{" "}
          <a href="mailto:contact@recyclean.com" css={S.linkStyle}>
            contact@recyclean.com
          </a>
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>웹사이트:</S.HighlightText>{" "}
          <a
            href="https://recyclean.com"
            css={S.linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            recyclean.com
          </a>
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>오픈소스 라이선스</S.SectionTitle>
        <S.SectionText>이 앱은 다음 오픈소스 라이브러리를 사용해요:</S.SectionText>
        <S.List>
          <S.ListItem>React 19 (MIT License)</S.ListItem>
          <S.ListItem>TypeScript 5.8 (Apache-2.0 License)</S.ListItem>
          <S.ListItem>React Router 7 (MIT License)</S.ListItem>
          <S.ListItem>Zustand 5.0 (MIT License)</S.ListItem>
          <S.ListItem>TanStack Query 5.90 (MIT License)</S.ListItem>
          <S.ListItem>Emotion (MIT License)</S.ListItem>
          <S.ListItem>Lucide React (ISC License)</S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>이용 약관</S.SectionTitle>
        <S.SectionText>
          서비스 이용약관은{" "}
          <a
            href="https://recyclean.com/terms"
            css={S.linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            여기
          </a>
          에서 확인할 수 있어요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>저작권</S.SectionTitle>
        <S.SectionText>© 2025 RecyClean Team. All rights reserved.</S.SectionText>
        <S.SectionText>
          본 앱의 모든 콘텐츠는 저작권법의 보호를 받으며, 무단 복제 및 배포를 금지해요.
        </S.SectionText>
      </S.Section>
    </>
  );
}
