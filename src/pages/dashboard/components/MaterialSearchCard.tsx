import type { ChangeEvent } from "react";
import { AlertCircle, Leaf, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { MaterialItemData } from "../../../shared/data/dashboard";

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
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge tone={material.recyclable ? "success" : "danger"}>
                    {material.recyclable ? "재활용 가능" : "불가"}
                  </Badge>
                  <span style={{ fontWeight: 600 }}>{material.name}</span>
                </div>
                <Badge variant="outline">{material.category}</Badge>
              </div>
              <p style={{ margin: 0, color: "#475569", fontSize: "0.85rem" }}>
                {material.instructions}
              </p>
              {material.tips && (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    background: "#eff6ff",
                    borderRadius: "12px",
                    padding: "8px 10px",
                    color: "#1d4ed8",
                    fontSize: "0.8rem",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{material.tips}</span>
                </div>
              )}
            </S.MaterialItem>
          ))}
          {filteredMaterials.length === 0 && (
            <p style={{ textAlign: "center", color: "#64748b", margin: 0 }}>
              조건에 맞는 결과가 없어요.
            </p>
          )}
        </S.MaterialList>
      </CardContent>
    </Card>
  );
}
