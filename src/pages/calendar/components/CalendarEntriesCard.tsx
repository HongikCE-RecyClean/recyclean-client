import { useState, useRef, useEffect } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { format, type Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import type { RecyclingEntry } from "../../../shared/types/dashboard";
import { openConfirmDialog } from "../../../shared/ui/AlertDialog";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../CalendarPage.styles";

// 액션 버튼 레이아웃 상수
const ACTION_BUTTON_SIZE = 36; // 액션 버튼 한 변(px)
const ACTION_GAP = 4; // 버튼 사이 간격(px) - spacing(1)
const ACTION_PADDING = 8; // 좌우 패딩(px) - spacing(2)

// 액션 버튼 개수에 따라 필요한 총 너비 계산
const calculateActionsWidth = (count: number) => {
  if (count <= 0) return 0;
  return count * ACTION_BUTTON_SIZE + Math.max(count - 1, 0) * ACTION_GAP + ACTION_PADDING * 2;
};

type CalendarEntriesCardProps = {
  selectedDateLabel: string;
  entries: RecyclingEntry[];
  timeLocale: Locale;
  // 삭제 핸들러
  onDelete?: (id: string) => void;
  // 계획 완료 핸들러
  onComplete?: (id: string) => void;
  // 편집 핸들러
  onEdit?: (entry: RecyclingEntry) => void;
};

export function CalendarEntriesCard({
  selectedDateLabel,
  entries,
  timeLocale,
  onDelete,
  onComplete,
  onEdit,
}: CalendarEntriesCardProps) {
  const { t } = useTranslation();
  // 열린 항목 ID 추적
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 항목 탭 핸들러 - 토글 방식
  const handleItemClick = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenItemId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <CardTitle>{t("calendar.entries.title", { date: selectedDateLabel })}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {entries.length > 0 ? (
          <S.RecordList ref={containerRef}>
            {entries.map((entry) => {
              // 계획이면서 아직 완료되지 않은 경우
              const isPendingPlan = entry.mode === "plan" && !entry.completed;
              // 완료된 계획
              const isCompletedPlan = entry.mode === "plan" && entry.completed;
              // 열림 상태 확인
              const isOpen = openItemId === entry.id;
              // 액션 버튼 개수 기반 너비 계산
              const actionsCount =
                (isPendingPlan && onComplete ? 1 : 0) +
                (entry.mode === "plan" && !isCompletedPlan && onEdit ? 1 : 0) +
                (onDelete ? 1 : 0);
              const actionsWidth = calculateActionsWidth(actionsCount);

              return (
                <S.SwipeableContainer key={entry.id}>
                  {/* 슬라이드 콘텐츠 영역 */}
                  <S.SwipeableContent
                    $isOpen={isOpen}
                    $actionsWidth={actionsWidth}
                    onClick={() => handleItemClick(entry.id)}
                    style={{ opacity: isCompletedPlan ? 0.7 : 1 }}
                  >
                    {/* 항목 정보 */}
                    <S.RecordInfo>
                      <S.RecordTitleRow>
                        <S.RecordTypeText $completed={isCompletedPlan}>
                          {t(`materials.items.${entry.type}`, { defaultValue: entry.type })}
                        </S.RecordTypeText>
                        <Badge
                          tone={
                            isCompletedPlan
                              ? "success"
                              : entry.mode === "plan"
                                ? "warning"
                                : "success"
                          }
                          variant="soft"
                        >
                          {isCompletedPlan
                            ? t("calendar.entries.modes.completed")
                            : t(`calendar.entries.modes.${entry.mode ?? "record"}`)}
                        </Badge>
                        {/* AI 감지 배지 */}
                        {entry.detectedByAi && (
                          <Badge tone="info" variant="soft">
                            {t("calendar.entries.aiDetected")}
                          </Badge>
                        )}
                      </S.RecordTitleRow>
                      {/* 수량, 시간 메타 텍스트 */}
                      <span css={S.recordMetaText}>
                        {t("calendar.entries.meta", {
                          count: entry.amount,
                          time: format(entry.date, "p", { locale: timeLocale }),
                        })}
                      </span>
                      {/* 메모 표시 */}
                      {entry.memo && <span css={S.recordMemoText}>💬 {entry.memo}</span>}
                    </S.RecordInfo>
                    {/* 포인트 표시 */}
                    <S.RecordPoints
                      $variant={isPendingPlan ? "plan" : "record"}
                      $completed={isCompletedPlan}
                    >
                      {isPendingPlan
                        ? t("calendar.entries.pointsPlanned", { points: entry.points })
                        : t("calendar.entries.points", { points: entry.points })}
                    </S.RecordPoints>
                  </S.SwipeableContent>

                  {/* 스와이프로 나타나는 액션 버튼 */}
                  <S.SwipeableActions $isOpen={isOpen}>
                    {/* 계획 완료 버튼 (미완료 계획만) */}
                    {isPendingPlan && onComplete && (
                      <S.SwipeActionButton
                        $variant="complete"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const confirmed = await openConfirmDialog({
                            title: t("calendar.entries.confirmComplete"),
                            description: t("calendar.entries.completeGuide"),
                            tone: "success",
                            confirmLabel: t("calendar.entries.complete"),
                            cancelLabel: t("common.cancel"),
                            showToneIcon: true,
                          });
                          if (confirmed) {
                            onComplete(entry.id);
                            setOpenItemId(null);
                          }
                        }}
                        aria-label={t("calendar.entries.complete")}
                        title={t("calendar.entries.complete")}
                      >
                        <Check size={18} />
                      </S.SwipeActionButton>
                    )}
                    {/* 편집 버튼 (계획만) */}
                    {entry.mode === "plan" && !isCompletedPlan && onEdit && (
                      <S.SwipeActionButton
                        $variant="edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(entry);
                          setOpenItemId(null);
                        }}
                        aria-label={t("calendar.entries.edit")}
                        title={t("calendar.entries.edit")}
                      >
                        <Pencil size={18} />
                      </S.SwipeActionButton>
                    )}
                    {/* 삭제 버튼 */}
                    {onDelete && (
                      <S.SwipeActionButton
                        $variant="delete"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const confirmed = await openConfirmDialog({
                            title: t("calendar.entries.confirmDelete"),
                            description: t("calendar.entries.deleteGuide"),
                            tone: "warning",
                            confirmLabel: t("common.delete"),
                            cancelLabel: t("common.cancel"),
                            showToneIcon: false,
                            confirmVariant: "destructive",
                          });
                          if (confirmed) {
                            onDelete(entry.id);
                            setOpenItemId(null);
                          }
                        }}
                        aria-label={t("common.delete")}
                        title={t("common.delete")}
                      >
                        <Trash2 size={18} />
                      </S.SwipeActionButton>
                    )}
                  </S.SwipeableActions>
                </S.SwipeableContainer>
              );
            })}
          </S.RecordList>
        ) : (
          <S.EmptyState>{t("calendar.entries.empty")}</S.EmptyState>
        )}
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
