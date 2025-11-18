import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/Card/Card";
import { Badge } from "shared/ui/Badge/Badge";
import type { CategoryStats } from "shared/utils/userStats";
import * as S from "../ProfilePage.styles";

// 카테고리 통계 카드 컴포넌트 정의
interface CategoryStatsCardProps {
  categoryStats: CategoryStats[];
}

export function CategoryStatsCard({ categoryStats }: CategoryStatsCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <BarChart3 size={18} />
          {t("profile.categories.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 빈 상태 처리: 카테고리 데이터가 없을 때 */}
        {categoryStats.length === 0 ? (
          <S.CategoryEmptyMessage>{t("profile.categories.noData")}</S.CategoryEmptyMessage>
        ) : (
          // 카테고리 통계 리스트
          <S.CategoryStatsList>
            {categoryStats.map((category, index) => (
              <S.CategoryStatItem key={category.type}>
                <div>
                  {/* 카테고리 이름 */}
                  <S.CategoryStatName>
                    {/* 1등 카테고리에 배지 표시 */}
                    {index === 0 && (
                      <Badge tone="success" variant="outline" style={{ marginRight: "8px" }}>
                        {t("profile.categories.topCategory")}
                      </Badge>
                    )}
                    {t(`materials.items.${category.type}`, { defaultValue: category.type })}
                  </S.CategoryStatName>
                </div>
                {/* 카테고리 메타 정보 (개수, 포인트) */}
                <S.CategoryStatMeta>
                  <span>{t("profile.categories.items", { count: category.count })}</span>
                  <Badge tone="info">
                    {t("profile.categories.points", { points: category.points })}
                  </Badge>
                </S.CategoryStatMeta>
              </S.CategoryStatItem>
            ))}
          </S.CategoryStatsList>
        )}
      </CardContent>
    </Card>
  );
}
