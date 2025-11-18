import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";

// 도움말 센터 바텀시트 내용
export function HelpContent() {
  return (
    <>
      <S.Section>
        <S.SectionTitle>자주 묻는 질문 (FAQ)</S.SectionTitle>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Q. 포인트는 어떻게 적립되나요?</S.SectionTitle>
        <S.SectionText>
          재활용 활동을 기록하면 자동으로 포인트가 적립돼요. 재활용 품목의 종류와 양에 따라 차등
          적용되며, 연속 기록 달성 시 보너스 포인트를 받을 수 있어요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Q. 이미지 분석은 어떻게 사용하나요?</S.SectionTitle>
        <S.SectionText>
          '분석' 탭에서 카메라 아이콘을 터치하거나 갤러리에서 사진을 선택하세요. AI가 자동으로
          재활용 가능 여부와 분리배출 방법을 알려드려요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Q. 재활용 센터는 어떻게 찾나요?</S.SectionTitle>
        <S.SectionText>
          '지도' 탭에서 현재 위치를 기반으로 가까운 재활용 센터를 찾을 수 있어요. 위치 권한을
          허용해주시면 더 정확한 결과를 제공해드려요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Q. 데이터가 사라졌어요</S.SectionTitle>
        <S.SectionText>
          로그인 상태를 확인해주세요. 로그아웃 시 로컬 데이터가 초기화될 수 있어요. 계정에
          로그인하면 클라우드에 저장된 데이터가 복원돼요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Q. 앱이 제대로 작동하지 않아요</S.SectionTitle>
        <S.SectionText>다음 단계를 시도해보세요:</S.SectionText>
        <S.List>
          <S.ListItem>앱을 완전히 종료 후 재실행</S.ListItem>
          <S.ListItem>최신 버전으로 업데이트</S.ListItem>
          <S.ListItem>기기 재부팅</S.ListItem>
          <S.ListItem>앱 캐시 삭제 (설정 {">"} 저장공간)</S.ListItem>
        </S.List>
        <S.SectionText>문제가 지속되면 고객 지원팀에 문의해주세요.</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>사용 가이드</S.SectionTitle>
        <S.List>
          <S.ListItem>
            <S.HighlightText>대시보드:</S.HighlightText> 오늘의 활동 요약과 최근 기록을 확인할 수
            있어요
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>분석:</S.HighlightText> 사진으로 재활용 가능 여부를 즉시 확인하세요
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>캘린더:</S.HighlightText> 월별 재활용 활동을 한눈에 볼 수 있어요
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>지도:</S.HighlightText> 주변 재활용 센터 위치와 운영 시간을 확인하세요
          </S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>문의하기</S.SectionTitle>
        <S.SectionText>
          추가 문의사항이 있으시면{" "}
          <a href="mailto:support@recyclean.com" css={S.linkStyle}>
            support@recyclean.com
          </a>
          으로 연락해주세요. 평일 09:00-18:00에 빠르게 답변드려요.
        </S.SectionText>
      </S.Section>
    </>
  );
}
