import { Camera, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import * as S from "../DashboardPage.styles";

interface QuickActionsCardProps {
  onAnalyze(): void;
  onOpenMap(): void;
  onManualRecord?(): void;
}

export function QuickActionsCard({ onAnalyze, onOpenMap, onManualRecord }: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Camera size={18} />
          빠른 작업
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 빠른 액션 버튼 묶음 */}
        <S.QuickActionGrid>
          <Button onClick={onAnalyze} variant="outline">
            <Camera size={18} />
            AI로 즉시 분류
          </Button>
          <Button onClick={onOpenMap} variant="outline">
            <MapPin size={18} />
            주변 배출함 찾기
          </Button>
          <Button onClick={onManualRecord} variant="outline">
            <TrendingUp size={18} />
            수동 기록 추가
          </Button>
        </S.QuickActionGrid>
      </CardContent>
    </Card>
  );
}
