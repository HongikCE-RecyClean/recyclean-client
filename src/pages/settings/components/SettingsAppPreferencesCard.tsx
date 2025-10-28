import { Bell, MapPin, Moon, Settings as SettingsIcon, Sun, Volume2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Separator } from "../../../shared/ui/Separator/Separator";
import { Switch } from "../../../shared/ui/Switch/Switch";
import * as S from "../SettingsPage.styles";

// 앱 기본 설정 토글 카드 정의
interface SettingsAppPreferencesCardProps {
  notifications: boolean;
  onNotificationsChange: (checked: boolean) => void;
  location: boolean;
  onLocationChange: (checked: boolean) => void;
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
  sounds: boolean;
  onSoundsChange: (checked: boolean) => void;
}

export function SettingsAppPreferencesCard({
  notifications,
  onNotificationsChange,
  location,
  onLocationChange,
  darkMode,
  onDarkModeChange,
  sounds,
  onSoundsChange,
}: SettingsAppPreferencesCardProps) {
  // 개별 설정 항목을 Switch로 연결
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsIcon size={18} />앱 설정
        </CardTitle>
      </CardHeader>
      <S.SectionStack>
        <S.SettingsItem>
          <S.SettingsLabel>
            <Bell size={16} color="#64748b" />
            <S.SettingsText>
              {/* 설정 항목 텍스트 클래스 적용 */}
              <span className={S.settingsItemTitle}>알림</span>
              <span className={S.settingsItemDescription}>재활용 리마인더 알림</span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={notifications} onCheckedChange={onNotificationsChange} />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            <MapPin size={16} color="#64748b" />
            <S.SettingsText>
              <span className={S.settingsItemTitle}>위치 서비스</span>
              <span className={S.settingsItemDescription}>주변 배출함 찾기</span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={location} onCheckedChange={onLocationChange} />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            {darkMode ? <Moon size={16} color="#64748b" /> : <Sun size={16} color="#64748b" />}
            <S.SettingsText>
              <span className={S.settingsItemTitle}>다크 모드</span>
              <span className={S.settingsItemDescription}>어두운 테마로 변경</span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            <Volume2 size={16} color="#64748b" />
            <S.SettingsText>
              <span className={S.settingsItemTitle}>사운드</span>
              <span className={S.settingsItemDescription}>액션 사운드 효과</span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={sounds} onCheckedChange={onSoundsChange} />
        </S.SettingsItem>
      </S.SectionStack>
    </Card>
  );
}
