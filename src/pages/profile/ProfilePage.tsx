import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "shared/state/userStore";
import { useActivityStore } from "shared/state/activityStore";
import { useNotificationStore } from "shared/state/notificationStore";
import { calculateUserStats, calculateCategoryStats } from "shared/utils/userStats";
import { ProfileCard, ImpactCard, LevelProgressCard, CategoryStatsCard } from "./components";
import { BottomSheet } from "shared/ui/BottomSheet";
import { Button } from "shared/ui/Button/Button";
import { TextField } from "shared/ui/TextField/TextField";
import recycleanLogo from "../../assets/recycleanLogo.svg";
import * as S from "./ProfilePage.styles";

export function ProfilePage() {
  // 사용자 정보 및 활동 기록 로드
  const { name, setName, joinedAt } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      setName: state.setName,
      joinedAt: state.joinedAt,
    })),
  ); // zustand selector 안정화로 무한 렌더링 방지 목적
  const entries = useActivityStore((state) => state.entries); // 필요한 조각만 구독
  const { showSnackbar } = useNotificationStore();
  const { t } = useTranslation();

  // 프로필 편집 BottomSheet 상태 관리
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [newName, setNewName] = useState("");

  // 실시간 통계 계산 (메모이제이션)
  const userStats = useMemo(() => {
    return calculateUserStats(entries, joinedAt);
  }, [entries, joinedAt]);

  // 카테고리별 통계 계산 (메모이제이션)
  const categoryStats = useMemo(() => {
    return calculateCategoryStats(entries);
  }, [entries]);

  // 프로필 편집 클릭 핸들러
  const handleEditProfileClick = () => {
    setNewName(name);
    setIsEditProfileOpen(true);
  };

  // 프로필 저장 핸들러
  const handleSaveProfile = () => {
    const trimmedName = newName.trim();
    if (trimmedName && trimmedName !== name) {
      setName(trimmedName);
      showSnackbar(t("notifications.snackbar.profileUpdated"), {
        type: "success",
        duration: 2500,
      });
    }
    setIsEditProfileOpen(false);
    setNewName("");
  };

  // BottomSheet 닫기 핸들러
  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
    setNewName("");
  };

  return (
    <>
      <S.PageContainer>
        {/* 프로필 카드: 닉네임, 아바타, 가입 날짜, 포인트, 연속 일수 */}
        <ProfileCard
          userStats={userStats}
          avatarSrc={recycleanLogo}
          userName={name}
          onEditClick={handleEditProfileClick}
        />

        {/* 영향력 카드: 재활용 아이템 수, 총 포인트 */}
        <ImpactCard userStats={userStats} />

        {/* 레벨 진행도 카드: 현재 레벨, 다음 레벨까지 진행률 */}
        <LevelProgressCard userStats={userStats} />

        {/* 카테고리별 통계 카드: 가장 많이 재활용한 품목 순위 */}
        <CategoryStatsCard categoryStats={categoryStats} />
      </S.PageContainer>

      {/* 프로필 편집 BottomSheet */}
      <BottomSheet
        isOpen={isEditProfileOpen}
        onClose={handleCloseEditProfile}
        title={t("settings.support.editProfile")}
      >
        <S.EditProfileContent>
          <S.EditProfileLabel>{t("settings.profile.nickname")}</S.EditProfileLabel>
          <TextField
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("onboarding.namePlaceholder")}
            maxLength={20}
          />
          <Button
            variant="primary"
            onClick={handleSaveProfile}
            disabled={!newName.trim() || newName.trim() === name}
          >
            {t("common.save")}
          </Button>
        </S.EditProfileContent>
      </BottomSheet>
    </>
  );
}
