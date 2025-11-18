import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";

// 개인정보 보호 설정 바텀시트 내용
export function PrivacyContent() {
  return (
    <>
      <S.Section>
        <S.SectionTitle>개인정보 처리방침</S.SectionTitle>
        <S.SectionText>
          RecyClean은 사용자의 개인정보를 소중히 여기며, 개인정보 보호법 등 관련 법령을 준수하고
          있어요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>수집하는 개인정보</S.SectionTitle>
        <S.SectionText>서비스 제공을 위해 다음의 정보를 수집해요:</S.SectionText>
        <S.List>
          <S.ListItem>
            <S.HighlightText>필수 항목:</S.HighlightText> 이메일 주소, 닉네임, 프로필 사진
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>선택 항목:</S.HighlightText> 위치 정보 (재활용 센터 검색 시), 알림 수신
            동의
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>자동 수집:</S.HighlightText> 재활용 활동 기록, 포인트 내역, 앱 사용
            통계
          </S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>개인정보의 이용 목적</S.SectionTitle>
        <S.List>
          <S.ListItem>서비스 제공 및 사용자 식별</S.ListItem>
          <S.ListItem>재활용 활동 추적 및 통계 제공</S.ListItem>
          <S.ListItem>포인트 적립 및 리워드 제공</S.ListItem>
          <S.ListItem>맞춤형 추천 및 알림 발송</S.ListItem>
          <S.ListItem>서비스 개선 및 신규 서비스 개발</S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>개인정보의 보유 및 이용 기간</S.SectionTitle>
        <S.SectionText>
          회원 탈퇴 시 또는 개인정보 삭제 요청 시 즉시 파기해요. 단, 관련 법령에 따라 일정 기간
          보관이 필요한 경우 해당 기간 동안 보관 후 파기해요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>개인정보 삭제 요청</S.SectionTitle>
        <S.SectionText>
          언제든지 설정 메뉴에서 회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있어요. 삭제된 정보는
          복구할 수 없으니 신중하게 결정해주세요.
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>문의하기</S.SectionTitle>
        <S.SectionText>
          개인정보 보호와 관련된 문의사항은{" "}
          <a href="mailto:privacy@recyclean.com" css={S.linkStyle}>
            privacy@recyclean.com
          </a>
          으로 연락해주세요.
        </S.SectionText>
      </S.Section>
    </>
  );
}
