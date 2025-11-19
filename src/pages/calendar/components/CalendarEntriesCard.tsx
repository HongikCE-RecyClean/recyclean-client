import { Trash2 } from "lucide-react";
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
  onDelete?: (id: string) => void; // 삭제 핸들러
};

export function CalendarEntriesCard({
  selectedDateLabel,
  entries,
  timeLocale,
  onDelete,
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
            {entries.map((entry) => (
              <S.RecordItem key={entry.id}>
                {/* 항목 정보를 묶어서 정렬 */}
                <S.RecordInfo>
                  <S.RecordTitleRow>
                    {/* 기록 타입 텍스트 클래스 적용 */}
                    <S.RecordTypeText>
                      {t(`materials.items.${entry.type}`, { defaultValue: entry.type })}
                    </S.RecordTypeText>
                    <Badge tone={entry.mode === "plan" ? "warning" : "success"} variant="soft">
                      {t(`calendar.entries.modes.${entry.mode ?? "record"}`)}
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
                  <S.RecordPoints $variant={entry.mode === "plan" ? "plan" : "record"}>
                    {entry.mode === "plan"
                      ? t("calendar.entries.pointsPlanned", { points: entry.points })
                      : t("calendar.entries.points", { points: entry.points })}
                  </S.RecordPoints>
                  {onDelete && (
                    <S.DeleteButton
                      onClick={async () => {
                        const confirmed = await openConfirmDialog({
                          title: t("calendar.entries.confirmDelete"),
                          // 기록 삭제 안내 문구 전달
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
                </div>
              </S.RecordItem>
            ))}
          </S.RecordList>
        ) : (
          <S.EmptyState>{t("calendar.entries.empty")}</S.EmptyState>
        )}
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
