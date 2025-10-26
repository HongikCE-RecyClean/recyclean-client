import { HelpCircle, Info, LogOut, Shield, User } from "lucide-react";
import { Button } from "../../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../SettingsPage.styles";

// 계정과 지원 버튼 카드 정의
export function SettingsSupportActionsCard() {
  // 지원 관련 액션 버튼 리스트 구성
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Shield size={18} />
          계정 및 지원
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.ActionList>
          <Button variant="outline" style={{ justifyContent: "flex-start" }}>
            <User size={16} />
            프로필 편집
          </Button>
          <Button variant="outline" style={{ justifyContent: "flex-start" }}>
            <Shield size={16} />
            개인정보 보호 설정
          </Button>
          <Button variant="outline" style={{ justifyContent: "flex-start" }}>
            <HelpCircle size={16} />
            도움말 센터
          </Button>
          <Button variant="outline" style={{ justifyContent: "flex-start" }}>
            <Info size={16} />앱 정보
          </Button>
          <Button variant="destructive" style={{ justifyContent: "flex-start" }}>
            <LogOut size={16} />
            로그아웃
          </Button>
        </S.ActionList>
      </CardContent>
    </Card>
  );
}
