import { ListTodo, Trash2 } from "lucide-react";
import { format, type Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import type { RecyclingEntry } from "../../../shared/types/dashboard";
import { openConfirmDialog } from "../../../shared/ui/AlertDialog";
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
    <Card>
      <CardHeader>
        <CardTitle>
          <ListTodo size={18} />
          {t("calendar.entries.title", { date: selectedDateLabel })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <S.RecordList>
            {entries.map((entry) => (
              <S.RecordItem key={entry.id}>
                {/* 항목 정보를 묶어서 정렬 */}
                <S.RecordInfo>
                  {/* 기록 타입 텍스트 클래스 적용 */}
                  <S.RecordTypeText>
                    {t(`materials.items.${entry.type}`, { defaultValue: entry.type })}
                  </S.RecordTypeText>
                  <span css={S.recordMetaText}>
                    {t("calendar.entries.meta", {
                      count: entry.amount,
                      time: format(entry.date, "p", { locale: timeLocale }),
                    })}
                  </span>
                </S.RecordInfo>
                <div css={S.recordActionsRow}>
                  <S.RecordPoints>
                    {t("calendar.entries.points", { points: entry.points })}
                  </S.RecordPoints>
                  {onDelete && (
                    <S.DeleteButton
                      onClick={async () => {
                        const confirmed = await openConfirmDialog({
                          title: t("calendar.entries.confirmDelete"),
                          tone: "warning",
                          confirmLabel: t("common.delete"),
                          cancelLabel: t("common.cancel"),
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
      </CardContent>
    </Card>
  );
}
