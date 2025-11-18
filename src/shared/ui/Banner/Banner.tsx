import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { BannerState } from "../../state/notificationStore";
import * as S from "./Banner.styles";

export interface BannerProps extends BannerState {
  onClose: () => void;
}

// 타입별 이모지 매핑
const emojiMap = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "💡",
};

export function Banner({ type, message, action, onClose }: BannerProps) {
  const { t } = useTranslation();
  const emoji = emojiMap[type];

  return (
    <S.BannerContainer>
      <S.Content>
        <S.Message>
          <S.Emoji>{emoji}</S.Emoji>
          {message}
        </S.Message>

        {action && <S.ActionButton onClick={action.onClick}>{action.label}</S.ActionButton>}
      </S.Content>

      <S.CloseButton onClick={onClose} aria-label={t("notifications.actions.close")}>
        <X size={20} />
      </S.CloseButton>
    </S.BannerContainer>
  );
}
