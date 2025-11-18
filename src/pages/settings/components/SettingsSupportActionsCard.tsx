import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Info, Shield, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { BottomSheet } from "../../../shared/ui/BottomSheet";
import { useUserStore } from "../../../shared/state/userStore";
import { useActivityStore } from "../../../shared/state/activityStore";
import { openConfirmDialog } from "../../../shared/ui/AlertDialog";
import { AppInfoContent, HelpContent, PrivacyContent } from ".";
import * as S from "../SettingsPage.styles";

// 바텀시트 타입 정의
type BottomSheetType = "privacy" | "help" | "appInfo" | null;

// 계정과 지원 버튼 카드 정의
export function SettingsSupportActionsCard() {
  // 바텀시트 열림 상태 관리
  const [openSheet, setOpenSheet] = useState<BottomSheetType>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearUserData } = useUserStore();
  const { clearAllEntries } = useActivityStore();

  // 바텀시트 닫기 핸들러
  const handleCloseSheet = () => {
    setOpenSheet(null);
  };

  // 개인정보 보호 설정 클릭
  const handlePrivacyClick = () => {
    setOpenSheet("privacy");
  };

  // 도움말 센터 클릭
  const handleHelpClick = () => {
    setOpenSheet("help");
  };

  // 앱 정보 클릭
  const handleAppInfoClick = () => {
    setOpenSheet("appInfo");
  };

  // 데이터 초기화 클릭
  const handleResetData = async () => {
    const confirmed = await openConfirmDialog({
      title: t("settings.support.resetConfirm"),
      tone: "warning",
      confirmLabel: t("settings.support.resetData"),
      cancelLabel: t("common.cancel"),
    });

    if (confirmed) {
      clearUserData();
      clearAllEntries();
      navigate("/onboarding", { replace: true });
    }
  };

  // 지원 관련 액션 버튼 리스트 구성
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Shield size={18} />
            {t("settings.support.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.ActionList>
            {/* 지원 액션 버튼 정렬 클래스 적용 */}
            <Button variant="outline" css={S.actionButtonAlignStart} onClick={handlePrivacyClick}>
              <Shield size={16} />
              {t("settings.support.privacy")}
            </Button>
            <Button variant="outline" css={S.actionButtonAlignStart} onClick={handleHelpClick}>
              <HelpCircle size={16} />
              {t("settings.support.helpCenter")}
            </Button>
            <Button variant="outline" css={S.actionButtonAlignStart} onClick={handleAppInfoClick}>
              <Info size={16} />
              {t("settings.support.about")}
            </Button>
            <Button variant="destructive" css={S.actionButtonAlignStart} onClick={handleResetData}>
              <Trash2 size={16} />
              {t("settings.support.resetData")}
            </Button>
          </S.ActionList>
        </CardContent>
      </Card>

      {/* 개인정보 보호 바텀시트 */}
      <BottomSheet
        isOpen={openSheet === "privacy"}
        onClose={handleCloseSheet}
        title={t("settings.support.privacy")}
      >
        <PrivacyContent />
      </BottomSheet>

      {/* 도움말 센터 바텀시트 */}
      <BottomSheet
        isOpen={openSheet === "help"}
        onClose={handleCloseSheet}
        title={t("settings.support.helpCenter")}
      >
        <HelpContent />
      </BottomSheet>

      {/* 앱 정보 바텀시트 */}
      <BottomSheet
        isOpen={openSheet === "appInfo"}
        onClose={handleCloseSheet}
        title={t("settings.support.about")}
      >
        <AppInfoContent />
      </BottomSheet>
    </>
  );
}
