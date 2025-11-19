import { useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../../shared/ui/BottomSheet/BottomSheet";
import { Button } from "../../../shared/ui/Button/Button";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import { useActivityStore } from "../../../shared/state/activityStore";
import { useNotificationStore } from "../../../shared/state/notificationStore";
import type { SnackbarOptions } from "../../../shared/types/notifications";
import {
  MATERIAL_CATEGORY_ORDER,
  MATERIALS_BY_CATEGORY,
  type MaterialCategoryId,
  type MaterialId,
  calculatePoints,
} from "../../../shared/utils/recyclingPoints";
import type { EntryMode } from "../../../shared/types/dashboard";
import * as S from "./AddEntryBottomSheet.styles";

interface AddEntryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type PendingSnackbar = {
  message: string;
  options?: SnackbarOptions;
};

const formatDateInput = (value: Date) => value.toISOString().split("T")[0];

const formatTimeInput = (value: Date) => {
  const hours = value.getHours().toString().padStart(2, "0");
  const minutes = value.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function AddEntryBottomSheet({ isOpen, onClose }: AddEntryBottomSheetProps) {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();
  const { showSnackbar } = useNotificationStore();
  const pendingSnackbarRef = useRef<PendingSnackbar | null>(null);

  // 폼 상태
  const [category, setCategory] = useState<MaterialCategoryId>("plastic");
  const [materialType, setMaterialType] = useState<MaterialId | "">("");
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState<string>(() => formatDateInput(new Date()));
  const [time, setTime] = useState<string>(() => formatTimeInput(new Date()));
  const [entryMode, setEntryMode] = useState<EntryMode>("record");

  // 카테고리별 품목 목록
  const categoryOptions = MATERIAL_CATEGORY_ORDER;
  const materialOptions = MATERIALS_BY_CATEGORY[category] ?? [];

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
    const now = new Date();
    setCategory("plastic");
    setMaterialType("");
    setAmount(1);
    setDate(formatDateInput(now));
    setTime(formatTimeInput(now));
    setEntryMode("record");
  };

  // 바텀시트 기본 닫기
  const closeSheet = () => {
    resetForm();
    onClose();
  };

  // 취소/외부 닫기를 처리
  const handleDismiss = () => {
    pendingSnackbarRef.current = null;
    closeSheet();
  };

  const handleAfterClose = () => {
    if (!pendingSnackbarRef.current) {
      return;
    }

    const { message, options } = pendingSnackbarRef.current;
    pendingSnackbarRef.current = null;
    showSnackbar(message, options);
  };

  // 폼 제출 처리
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 제출에 의한 전체 페이지 리로드 방지
    event.stopPropagation(); // 다른 핸들러로 이벤트 버블링되는 상황 차단

    const amountNum = Number.isFinite(amount) ? Math.max(1, Math.floor(amount)) : 1;
    const type = (materialType || materialOptions[0] || "other") as MaterialId;

    // 유효성 검사
    if (!type || amountNum <= 0 || !date || !time) {
      return;
    }

    const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return;
    }
    const entryDate = new Date(date);
    entryDate.setHours(hours, minutes, 0, 0);

    // 포인트 계산
    const points = calculatePoints(type, amountNum);

    // activityStore에 추가
    addEntry({
      type,
      amount: amountNum,
      date: entryDate,
      points,
      mode: entryMode,
    });

    // 성공 스낵바는 바텀시트가 완전히 닫힌 뒤 표시
    pendingSnackbarRef.current = {
      message: t("notifications.snackbar.entrySaved", { points }),
      options: {
        type: "success",
        duration: 3000,
      },
    };

    // 폼 초기화 및 닫기
    closeSheet();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleDismiss}
      onAfterClose={handleAfterClose}
      title={t("dashboard.addEntry.title")}
    >
      {/* 폼 제출을 단일 핸들러로 묶어 기본 동작 제어 */}
      <S.Form onSubmit={handleSubmit}>
        {/* 카테고리 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.category")}</S.Label>
          <SelectField
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={categoryOptions.map((cat) => ({
              value: cat,
              label: t(`materials.categories.${cat}`),
            }))}
          />
        </S.FormGroup>

        {/* 활동 유형 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.modeLabel")}</S.Label>
          <SelectField
            value={entryMode}
            onChange={(e) => setEntryMode(e.target.value as EntryMode)}
            options={[
              {
                value: "record",
                label: t("dashboard.addEntry.modeOptions.record"),
              },
              {
                value: "plan",
                label: t("dashboard.addEntry.modeOptions.plan"),
              },
            ]}
          />
        </S.FormGroup>

        {/* 품목 선택 */}
        <S.FormGroup>
          <S.Label>{t("dashboard.addEntry.material")}</S.Label>
          <SelectField
            value={materialType || materialOptions[0]}
            onChange={(e) => setMaterialType(e.target.value as MaterialId)}
            options={materialOptions.map((mat) => ({
              value: mat,
              label: t(`materials.items.${mat}`),
            }))}
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
            {/* 날짜 선택 */}
            <S.Label>{t("dashboard.addEntry.date")}</S.Label>
            <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </S.FormRowItem>
          <S.FormRowItem>
            {/* 시간 선택 */}
            <S.Label>{t("dashboard.addEntry.time")}</S.Label>
            <TextField type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </S.FormRowItem>
        </S.FormRow>

        {/* 예상 포인트 표시 */}
        <S.PointsPreview>
          {t("dashboard.addEntry.pointsPreview", {
            points: calculatePoints(
              (materialType || materialOptions[0] || "other") as MaterialId,
              amount || 1,
            ),
          })}
        </S.PointsPreview>

        {/* 버튼 그룹 */}
        <S.ButtonGroup>
          {/* 취소 버튼은 폼 제출과 무관하게 닫기만 수행 */}
          <Button type="button" variant="outline" onClick={handleDismiss} css={S.buttonStyle}>
            {t("common.cancel")}
          </Button>
          {/* 저장 버튼은 폼 제출을 트리거하여 handleSubmit 실행 */}
          <Button type="submit" css={S.buttonStyle}>
            {t("common.save")}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </BottomSheet>
  );
}
