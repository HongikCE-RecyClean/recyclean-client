import type { ChangeEvent } from "react";
import { useTheme } from "@emotion/react";
import { AlertCircle, Leaf, Lightbulb } from "lucide-react";
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

const materialFilters = [
  { value: "all", label: "전체" },
  { value: "Plastic", label: "Plastic" },
  { value: "Glass", label: "Glass" },
  { value: "Metal", label: "Metal" },
  { value: "Paper", label: "Paper" },
];

export function MaterialSearchCard({
  searchTerm,
  onSearchTermChange,
  materialCategory,
  onMaterialCategoryChange,
  filteredMaterials,
}: MaterialSearchCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Lightbulb size={18} />
          재활용 정보 검색
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 검색 입력 영역 */}
        <TextField
          placeholder="재질 또는 물품명을 검색해요"
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
                    {material.recyclable ? "재활용 가능" : "불가"}
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
            <S.MaterialEmptyMessage>조건에 맞는 결과가 없어요.</S.MaterialEmptyMessage>
          )}
        </S.MaterialList>
      </CardContent>
    </Card>
  );
}
