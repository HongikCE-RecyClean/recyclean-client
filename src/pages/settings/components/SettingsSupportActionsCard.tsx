import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Info, Shield, Trash2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { BottomSheet } from "../../../shared/ui/BottomSheet";
import { useUserStore } from "../../../shared/state/userStore";
import { useActivityStore } from "../../../shared/state/activityStore";
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
  const handleResetData = () => {
    if (
      window.confirm(
        t("settings.support.resetConfirm", "모든 데이터가 삭제됩니다. 계속하시겠습니까?"),
      )
    ) {
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
            <Button
              variant="outline"
              css={S.actionButtonAlignStart}
              onClick={handleEditProfileClick}
            >
              <User size={16} />
              {t("settings.support.editProfile")}
            </Button>
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
              {t("settings.support.resetData", "데이터 초기화")}
            </Button>
          </S.ActionList>
        </CardContent>
      </Card>

      {/* 프로필 편집 바텀시트 */}
      <BottomSheet
        isOpen={openSheet === "editProfile"}
        onClose={handleCloseSheet}
        title={t("settings.support.editProfile")}
      >
        <S.EditProfileContent>
          <S.EditProfileLabel>{t("settings.profile.nickname", "닉네임")}</S.EditProfileLabel>
          <S.EditProfileInput
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("onboarding.namePlaceholder", "닉네임 입력")}
            maxLength={20}
          />
          <Button
            variant="primary"
            onClick={handleSaveProfile}
            disabled={!newName.trim() || newName.trim() === name}
          >
            {t("common.save", "저장")}
          </Button>
        </S.EditProfileContent>
      </BottomSheet>

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
