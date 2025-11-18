import { ListTodo } from "lucide-react";
import { format, type Locale } from "date-fns";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import type { RecyclingEntry } from "../../../shared/types/dashboard";
import * as S from "../CalendarPage.styles";

type CalendarEntriesCardProps = {
  selectedDateLabel: string;
  entries: RecyclingEntry[];
  timeLocale: Locale;
};

export function CalendarEntriesCard({
  selectedDateLabel,
  entries,
  timeLocale,
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
                  <S.RecordTypeText>{entry.type}</S.RecordTypeText>
                  <span css={S.recordMetaText}>
                    {t("calendar.entries.meta", {
                      count: entry.amount,
                      time: format(entry.date, "p", { locale: timeLocale }),
                    })}
                  </span>
                </S.RecordInfo>
                <S.RecordPoints>
                  {t("calendar.entries.points", { points: entry.points })}
                </S.RecordPoints>
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
