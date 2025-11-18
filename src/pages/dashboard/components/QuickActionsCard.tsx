import { Camera, MapPin, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import * as S from "../DashboardPage.styles";

interface QuickActionsCardProps {
  onAnalyze(): void;
  onOpenMap(): void;
  onManualRecord?(): void;
}

export function QuickActionsCard({ onAnalyze, onOpenMap, onManualRecord }: QuickActionsCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Camera size={18} />
          {t("dashboard.quickActions.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 빠른 액션 버튼 묶음 */}
        <S.QuickActionGrid>
          <Button onClick={onAnalyze} variant="outline">
            <Camera size={18} />
            {t("dashboard.quickActions.analyze")}
          </Button>
          <Button onClick={onOpenMap} variant="outline">
            <MapPin size={18} />
            {t("dashboard.quickActions.map")}
          </Button>
          <Button onClick={onManualRecord} variant="outline">
            <TrendingUp size={18} />
            {t("dashboard.quickActions.record")}
          </Button>
        </S.QuickActionGrid>
      </CardContent>
    </Card>
  );
}
