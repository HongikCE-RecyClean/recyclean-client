import type { ComponentType } from "react";
import { Camera, CalendarDays, Home, MapPin, Settings } from "lucide-react";
import * as S from "./BottomNav.styles";

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

const navItems: NavItem[] = [
  { to: "/", label: "홈", icon: (props) => <Home {...props} /> },
  { to: "/analyze", label: "분석", icon: (props) => <Camera {...props} /> },
  { to: "/calendar", label: "달력", icon: (props) => <CalendarDays {...props} /> },
  { to: "/map", label: "지도", icon: (props) => <MapPin {...props} /> },
  { to: "/settings", label: "설정", icon: (props) => <Settings {...props} /> },
];

export function BottomNav() {
  // 하단 내비게이션 항목 렌더링
  return (
    <S.NavBar>
      <S.NavInner>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <S.NavButton key={item.to} to={item.to} end={item.to === "/"}>
              <Icon size={20} />
              {item.label}
            </S.NavButton>
          );
        })}
      </S.NavInner>
    </S.NavBar>
  );
}
