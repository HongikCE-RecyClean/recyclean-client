import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../../shared/ui/BottomSheet/BottomSheet";
import { Button } from "../../../shared/ui/Button/Button";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { useActivityStore } from "../../../shared/state/activityStore";
import { MATERIALS_BY_CATEGORY, calculatePoints } from "../../../shared/utils/recyclingPoints";
import * as S from "./AddEntryBottomSheet.styles";

interface AddEntryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEntryBottomSheet({ isOpen, onClose }: AddEntryBottomSheetProps) {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();

  // 폼 상태
  const [category, setCategory] = useState<string>("플라스틱");
  const [materialType, setMaterialType] = useState<string>("");
  const [amount, setAmount] = useState<string>("1");
  const [date, setDate] = useState<string>(() => {
    // 기본값: 오늘 날짜 (YYYY-MM-DD 형식)
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // 카테고리별 품목 목록
  const categoryOptions = Object.keys(MATERIALS_BY_CATEGORY);
  const materialOptions = MATERIALS_BY_CATEGORY[category] || [];

  // 카테고리 변경 시 첫 번째 품목 자동 선택
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const firstMaterial = MATERIALS_BY_CATEGORY[value]?.[0];
    if (firstMaterial) {
      setMaterialType(firstMaterial);
    }
  };

  // 폼 제출 처리
  const handleSubmit = () => {
    const amountNum = parseInt(amount, 10);
    const type = materialType || materialOptions[0] || "기타";

    // 유효성 검사
    if (!type || amountNum <= 0 || !date) {
      return;
    }

    // 포인트 계산
    const points = calculatePoints(type, amountNum);

    // activityStore에 추가
    addEntry({
      type,
      amount: amountNum,
      date: new Date(date),
      points,
    });

    // 폼 초기화 및 닫기
    resetForm();
    onClose();
  };

  // 폼 초기화
  const resetForm = () => {
    setCategory("플라스틱");
    setMaterialType("");
    setAmount("1");
    setDate(new Date().toISOString().split("T")[0]);
  };

  // 취소 시 폼 초기화
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose} title={t("dashboard.addEntry.title")}>
      <S.Form>
        {/* 카테고리 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.category")}</S.Label>
          <SelectField
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={categoryOptions.map((cat) => ({
              value: cat,
              label: cat,
            }))}
          />
        </S.FormGroup>

        {/* 품목 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.material")}</S.Label>
          <SelectField
            value={materialType || materialOptions[0]}
            onChange={(e) => setMaterialType(e.target.value)}
            options={materialOptions.map((mat) => ({
              value: mat,
              label: mat,
            }))}
          />
        </S.FormGroup>

        {/* 수량 입력 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.amount")}</S.Label>
          <TextField
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1"
          />
        </S.FormGroup>

        {/* 날짜 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.date")}</S.Label>
          <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </S.FormGroup>

        {/* 예상 포인트 표시 */}
        <S.PointsPreview>
          {t("dashboard.addEntry.pointsPreview", {
            points: calculatePoints(
              materialType || materialOptions[0] || "기타",
              parseInt(amount, 10) || 1,
            ),
          })}
        </S.PointsPreview>

        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <Button variant="outline" onClick={handleClose} css={S.buttonStyle}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} css={S.buttonStyle}>
            {t("common.save")}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </BottomSheet>
  );
}
