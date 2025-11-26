import { useEffect, useState, type FormEvent } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../../shared/ui/BottomSheet/BottomSheet";
import { Button } from "../../../shared/ui/Button/Button";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import { useNotificationStore } from "../../../shared/state/notificationStore";
import {
  MATERIAL_CATEGORY_ORDER,
  MATERIALS_BY_CATEGORY,
  type MaterialCategoryId,
  type MaterialId,
  calculatePoints,
} from "../../../shared/utils/recyclingPoints";
import type { RecyclingEntry } from "../../../shared/types/dashboard";
import * as S from "../../dashboard/components/AddEntryBottomSheet.styles";

// MaterialId를 카테고리로 역매핑
const MATERIAL_TO_CATEGORY: Record<MaterialId, MaterialCategoryId> = {
  plasticBottle: "plastic",
  petBottle: "plastic",
  plasticContainer: "plastic",
  vinyl: "plastic",
  styrofoam: "plastic",
  paper: "paper",
  cardboard: "paper",
  newspaper: "paper",
  milkCarton: "paper",
  can: "metal",
  aluminumCan: "metal",
  steelCan: "metal",
  glassBottle: "glass",
  sojuBottle: "glass",
  clothes: "textile",
  oldClothes: "textile",
  textile: "textile",
  battery: "electronic",
  electronics: "electronic",
  fluorescentLamp: "electronic",
  other: "other",
};

interface EditPlanBottomSheetProps {
  isOpen: boolean;
  entry: RecyclingEntry | null;
  onClose: () => void;
  onSave: (entry: RecyclingEntry, updates: { amount: number; date: Date; memo?: string }) => void;
}

const formatDateInput = (value: Date) => format(value, "yyyy-MM-dd");

const formatTimeInput = (value: Date) => format(value, "HH:mm");

export function EditPlanBottomSheet({ isOpen, entry, onClose, onSave }: EditPlanBottomSheetProps) {
  const { t } = useTranslation();
  const { showSnackbar } = useNotificationStore();

  // 폼 상태
  const [category, setCategory] = useState<MaterialCategoryId>("plastic");
  const [materialType, setMaterialType] = useState<MaterialId | "">(entry?.type ?? "");
  const [amount, setAmount] = useState<number>(entry?.amount ?? 1);
  const [date, setDate] = useState<string>(() =>
    entry ? formatDateInput(entry.date) : formatDateInput(new Date()),
  );
  const [time, setTime] = useState<string>(() =>
    entry ? formatTimeInput(entry.date) : formatTimeInput(new Date()),
  );
  const [memo, setMemo] = useState<string>(entry?.memo ?? "");

  // 카테고리별 품목 목록
  const categoryOptions = MATERIAL_CATEGORY_ORDER;
  const materialOptions = MATERIALS_BY_CATEGORY[category] ?? [];

  // entry 변경 시 폼 초기화
  useEffect(() => {
    if (entry) {
      const entryCategory = MATERIAL_TO_CATEGORY[entry.type] ?? "other";
      setCategory(entryCategory);
      setMaterialType(entry.type);
      setAmount(entry.amount);
      setDate(formatDateInput(entry.date));
      setTime(formatTimeInput(entry.date));
      setMemo(entry.memo ?? "");
    }
  }, [entry]);

  // 카테고리 변경 시 첫 번째 품목 자동 선택
  const handleCategoryChange = (value: string) => {
    const nextCategory = value as MaterialCategoryId;
    setCategory(nextCategory);
    const firstMaterial = MATERIALS_BY_CATEGORY[nextCategory]?.[0];
    if (firstMaterial) {
      setMaterialType(firstMaterial);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    if (entry) {
      const entryCategory = MATERIAL_TO_CATEGORY[entry.type] ?? "other";
      setCategory(entryCategory);
      setMaterialType(entry.type);
      setAmount(entry.amount);
      setDate(formatDateInput(entry.date));
      setTime(formatTimeInput(entry.date));
      setMemo(entry.memo ?? "");
    }
  };

  // 바텀시트 닫기
  const closeSheet = () => {
    resetForm();
    onClose();
  };

  // 폼 제출 처리
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!entry) return;

    const amountNum = Number.isFinite(amount) ? Math.max(1, Math.floor(amount)) : 1;

    // 유효성 검사
    if (amountNum <= 0 || !date || !time) {
      return;
    }

    const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return;
    }
    const [year, month, day] = date.split("-").map((part) => parseInt(part, 10));
    // 로컬 자정 기준으로 Date 생성(YYYY-MM-DD의 UTC 파싱 문제 방지)
    const entryDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

    // 부모 컴포넌트에 저장 요청
    onSave(entry, {
      amount: amountNum,
      date: entryDate,
      memo: memo.trim() || undefined,
    });

    // 성공 스낵바 표시
    showSnackbar(t("calendar.entries.editSuccess"), {
      type: "success",
      duration: 3000,
    });

    closeSheet();
  };

  if (!entry) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={closeSheet} title={t("calendar.entries.edit")}>
      <S.Form onSubmit={handleSubmit}>
        {/* 카테고리 선택 (읽기 전용 표시) */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.category")}</S.Label>
          <SelectField
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={categoryOptions.map((cat) => ({
              value: cat,
              label: t(`materials.categories.${cat}`),
            }))}
            disabled
          />
        </S.FormGroup>

        {/* 품목 선택 (읽기 전용 표시) */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.material")}</S.Label>
          <SelectField
            value={materialType || materialOptions[0]}
            onChange={(e) => setMaterialType(e.target.value as MaterialId)}
            options={materialOptions.map((mat) => ({
              value: mat,
              label: t(`materials.items.${mat}`),
            }))}
            disabled
          />
        </S.FormGroup>

        {/* 수량 입력 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.amount")}</S.Label>
          <NumberInput value={amount} min={1} step={1} onChange={(value) => setAmount(value)} />
        </S.FormGroup>

        {/* 날짜/시간 선택 */}
        <S.FormRow>
          <S.FormRowItem>
            <S.Label>{t("dashboard.addEntry.date")}</S.Label>
            <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </S.FormRowItem>
          <S.FormRowItem>
            <S.Label>{t("dashboard.addEntry.time")}</S.Label>
            <TextField type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </S.FormRowItem>
        </S.FormRow>

        {/* 메모 입력 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.memo")}</S.Label>
          <TextField
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder={t("dashboard.addEntry.memoPlaceholder")}
          />
        </S.FormGroup>

        {/* 예상 포인트 표시 */}
        <S.PointsPreview>
          {t("dashboard.addEntry.pointsPreview", {
            points: calculatePoints(entry.type, amount || 1),
          })}
        </S.PointsPreview>

        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          <Button type="button" variant="outline" onClick={closeSheet} css={S.buttonStyle}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" css={S.buttonStyle}>
            {t("common.save")}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </BottomSheet>
  );
}
