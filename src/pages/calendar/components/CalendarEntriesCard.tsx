import { Check, Pencil, Trash2 } from "lucide-react";
import { format, type Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import type { RecyclingEntry } from "../../../shared/types/dashboard";
import { openConfirmDialog } from "../../../shared/ui/AlertDialog";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../CalendarPage.styles";

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
  // 날짜별 기록 리스트 출력을 카드로 분리
  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <CardTitle>{t("calendar.entries.title", { date: selectedDateLabel })}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {entries.length > 0 ? (
          <S.RecordList>
            {entries.map((entry) => {
              // 계획이면서 아직 완료되지 않은 경우
              const isPendingPlan = entry.mode === "plan" && !entry.completed;
              // 완료된 계획
              const isCompletedPlan = entry.mode === "plan" && entry.completed;

              return (
                <S.RecordItem key={entry.id} $completed={isCompletedPlan}>
                  {/* 항목 정보를 묶어서 정렬 */}
                  <S.RecordInfo>
                    <S.RecordTitleRow>
                      {/* 기록 타입 텍스트 클래스 적용 */}
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
                    </S.RecordTitleRow>
                    {/* 기록 타입 텍스트 클래스 적용 */}
                    <span css={S.recordMetaText}>
                      {t("calendar.entries.meta", {
                        count: entry.amount,
                        time: format(entry.date, "p", { locale: timeLocale }),
                      })}
                    </span>
                  </S.RecordInfo>
                  <div css={S.recordActionsRow}>
                    <S.RecordPoints
                      $variant={isPendingPlan ? "plan" : "record"}
                      $completed={isCompletedPlan}
                    >
                      {isPendingPlan
                        ? t("calendar.entries.pointsPlanned", { points: entry.points })
                        : t("calendar.entries.points", { points: entry.points })}
                    </S.RecordPoints>
                    <S.ActionButtonGroup>
                      {/* 계획 완료 버튼 (미완료 계획만 표시) */}
                      {isPendingPlan && onComplete && (
                        <S.ActionButton
                          $variant="complete"
                          onClick={async () => {
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
                            }
                          }}
                          aria-label={t("calendar.entries.complete")}
                          title={t("calendar.entries.complete")}
                        >
                          <Check size={16} />
                        </S.ActionButton>
                      )}
                      {/* 편집 버튼 (계획만 편집 가능) */}
                      {entry.mode === "plan" && !isCompletedPlan && onEdit && (
                        <S.ActionButton
                          $variant="edit"
                          onClick={() => onEdit(entry)}
                          aria-label={t("calendar.entries.edit")}
                          title={t("calendar.entries.edit")}
                        >
                          <Pencil size={16} />
                        </S.ActionButton>
                      )}
                      {/* 삭제 버튼 */}
                      {onDelete && (
                        <S.DeleteButton
                          onClick={async () => {
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
                            }
                          }}
                          aria-label={t("common.delete")}
                          title={t("common.delete")}
                        >
                          <Trash2 size={16} />
                        </S.DeleteButton>
                      )}
                    </S.ActionButtonGroup>
                  </div>
                </S.RecordItem>
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
