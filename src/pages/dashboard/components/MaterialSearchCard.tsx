import type { ChangeEvent } from "react";
import { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { AlertCircle, Leaf, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { MaterialItemData } from "../../../shared/types/dashboard";

interface MaterialSearchCardProps {
  searchTerm: string;
  onSearchTermChange(event: ChangeEvent<HTMLInputElement>): void;
  materialCategory: string;
  onMaterialCategoryChange(value: string): void;
  filteredMaterials: MaterialItemData[];
}

const materialFilterKeys = ["all", "Plastic", "Glass", "Metal", "Paper"] as const;

export function MaterialSearchCard({
  searchTerm,
  onSearchTermChange,
  materialCategory,
  onMaterialCategoryChange,
  filteredMaterials,
}: MaterialSearchCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();
  const materialFilters = useMemo(
    () =>
      materialFilterKeys.map((value) => ({
        value,
        label: t(`dashboard.materialSearch.filters.${value}`),
      })),
    [t],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Lightbulb size={18} />
          {t("dashboard.materialSearch.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 검색 입력 영역 */}
        <TextField
          placeholder={t("dashboard.materialSearch.placeholder")}
          value={searchTerm}
          onChange={onSearchTermChange}
          startIcon={<Leaf size={16} />}
        />
        <SelectField
          options={materialFilters}
          value={materialCategory}
          onChange={(event) => onMaterialCategoryChange(event.target.value)}
        />
        {/* 재질 정보 리스트 */}
        <S.MaterialList>
          {filteredMaterials.map((material) => (
            <S.MaterialItem key={material.name}>
              {/* 재질 카드 헤더 행 클래스 적용 */}
              <div css={S.materialHeaderRow}>
                <div css={S.materialHeaderLeft}>
                  <Badge tone={material.recyclable ? "success" : "danger"}>
                    {material.recyclable
                      ? t("dashboard.materialSearch.recyclable")
                      : t("dashboard.materialSearch.notRecyclable")}
                  </Badge>
                  <S.MaterialNameText>{material.name}</S.MaterialNameText>
                </div>
                <Badge variant="outline">{material.category}</Badge>
              </div>
              <p css={S.materialDescriptionText(theme)}>{material.instructions}</p>
              {/* 재질 팁 박스 클래스 적용 */}
              {material.tips && (
                <div css={S.materialTipBox(theme)}>
                  <AlertCircle size={16} />
                  <span>{material.tips}</span>
                </div>
              )}
            </S.MaterialItem>
          ))}
          {filteredMaterials.length === 0 && (
            <S.MaterialEmptyMessage>{t("dashboard.materialSearch.empty")}</S.MaterialEmptyMessage>
          )}
        </S.MaterialList>
      </CardContent>
    </Card>
  );
}
