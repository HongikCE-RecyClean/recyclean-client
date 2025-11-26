import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { BottomSheet } from "../../../shared/ui/BottomSheet";
import { openConfirmDialog } from "../../../shared/ui/AlertDialog";
import { useNotificationStore } from "../../../shared/state/notificationStore";
import { useLogout } from "../../../shared/api/auth";
import { resetLocalData } from "../../../shared/utils/resetLocalData";
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
  const showSnackbar = useNotificationStore((state) => state.showSnackbar);
  const { mutateAsync: logoutMutate, isPending: isLoggingOut } = useLogout();
  const [isResetting, setIsResetting] = useState(false);

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

  // 로그아웃 클릭
  const handleLogout = async () => {
    const confirmed = await openConfirmDialog({
      title: t("settings.support.logoutConfirm"),
      // 로그아웃 안내 문구 전달
      description: t("settings.support.logoutGuide"),
      tone: "warning",
      confirmLabel: t("settings.support.logout"),
      cancelLabel: t("common.cancel"),
      showToneIcon: false,
      confirmVariant: "destructive",
    });

    if (!confirmed) {
      return;
    }

    try {
      await logoutMutate();
      showSnackbar(t("settings.support.logoutSuccess"));
      navigate("/onboarding", { replace: true });
    } catch {
      showSnackbar(t("settings.support.logoutFailed"), { type: "error" });
    }
  };

  const handleResetLocalData = async () => {
    const confirmed = await openConfirmDialog({
      title: t("settings.support.resetDataConfirm"),
      description: t("settings.support.resetDataDesc"),
      tone: "warning",
      confirmLabel: t("settings.support.resetData"),
      cancelLabel: t("common.cancel"),
      showToneIcon: true,
      confirmVariant: "destructive",
    });

    if (!confirmed) {
      return;
    }

    setIsResetting(true);
    try {
      resetLocalData();
      showSnackbar(t("settings.support.resetDataSuccess"));
      navigate("/onboarding", { replace: true });
    } catch (error) {
      console.error(error);
      showSnackbar(t("settings.support.resetDataFailed"), { type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // 지원 관련 액션 버튼 리스트 구성
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.support.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <S.ActionList>
            {/* 지원 액션 버튼 정렬 클래스 적용 */}
            <Button
              variant="outline"
              css={[S.actionButtonAlignStart, S.supportActionButtonNoShadow]}
              onClick={handlePrivacyClick}
            >
              {t("settings.support.privacy")}
            </Button>
            <Button
              variant="outline"
              css={[S.actionButtonAlignStart, S.supportActionButtonNoShadow]}
              onClick={handleHelpClick}
            >
              {t("settings.support.helpCenter")}
            </Button>
            <Button
              variant="outline"
              css={[S.actionButtonAlignStart, S.supportActionButtonNoShadow]}
              onClick={handleAppInfoClick}
            >
              {t("settings.support.about")}
            </Button>
            <Button
              variant="destructive"
              css={[S.actionButtonAlignStart, S.supportActionButtonNoShadow]}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {t("settings.support.logout")}
            </Button>
            <Button
              variant="destructive"
              css={[S.actionButtonAlignStart, S.supportActionButtonNoShadow]}
              onClick={handleResetLocalData}
              disabled={isResetting}
            >
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
