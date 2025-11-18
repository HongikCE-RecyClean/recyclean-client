import type { ComponentType } from "react";
import { Camera, CalendarDays, Home, MapPin, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as S from "./BottomNav.styles";

interface NavItem {
  to: string;
  labelKey: string;
  icon: ComponentType<{ size?: number }>;
}

const navItems: NavItem[] = [
  { to: "/", labelKey: "navigation.home", icon: (props) => <Home {...props} /> },
  { to: "/analyze", labelKey: "navigation.analyze", icon: (props) => <Camera {...props} /> },
  {
    to: "/calendar",
    labelKey: "navigation.calendar",
    icon: (props) => <CalendarDays {...props} />,
  },
  { to: "/map", labelKey: "navigation.map", icon: (props) => <MapPin {...props} /> },
  { to: "/settings", labelKey: "navigation.settings", icon: (props) => <Settings {...props} /> },
];

export function BottomNav() {
  const { t } = useTranslation();
  // 하단 내비게이션 항목 렌더링
  return (
    <S.NavBar>
      <S.NavInner>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <S.NavButton key={item.to} to={item.to} end={item.to === "/"}>
              <Icon size={20} />
              {t(item.labelKey)}
            </S.NavButton>
          );
        })}
      </S.NavInner>
    </S.NavBar>
  );
}
