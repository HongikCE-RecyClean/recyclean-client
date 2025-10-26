import { ListTodo } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import type { RecyclingEntry } from "../../../shared/data/dashboard";
import * as S from "../CalendarPage.styles";

type CalendarEntriesCardProps = {
  selectedDateLabel: string;
  entries: RecyclingEntry[];
};

export function CalendarEntriesCard({ selectedDateLabel, entries }: CalendarEntriesCardProps) {
  // 날짜별 기록 리스트 출력을 카드로 분리
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <ListTodo size={18} />
          {selectedDateLabel} 기록
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <S.RecordList>
            {entries.map((entry) => (
              <S.RecordItem key={entry.id}>
                {/* 항목 정보를 묶어서 정렬 */}
                <S.RecordInfo>
                  <span style={{ fontWeight: 600 }}>{entry.type}</span>
                  <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                    {entry.amount}개 · {format(entry.date, "a h시 mm분", { locale: ko })}
                  </span>
                </S.RecordInfo>
                <S.RecordPoints>+{entry.points} pts</S.RecordPoints>
              </S.RecordItem>
            ))}
          </S.RecordList>
        ) : (
          <S.EmptyState>선택한 날짜에는 기록이 없어요.</S.EmptyState>
        )}
      </CardContent>
    </Card>
  );
}
