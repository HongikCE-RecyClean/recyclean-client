import { describe, expect, it } from "vitest";
import type { Plan } from "shared/api/types";
import { formatPlanDateTime, planToEntry } from "../planUtils";

describe("formatPlanDateTime", () => {
  it("로컬 시간대 그대로 날짜/시간 문자열을 반환해요", () => {
    const localDate = new Date(2025, 2, 2, 8, 15, 0); // 2025-03-02 08:15 로컬
    const result = formatPlanDateTime(localDate);

    expect(result.date).toBe("2025-03-02");
    expect(result.time).toBe("08:15:00");
  });

  it("planToEntry → formatPlanDateTime 왕복 시 날짜가 밀리지 않아요", () => {
    const plan: Plan = {
      id: 1,
      date: "2025-03-02",
      time: "08:00:00",
      memo: "",
      completed: false,
      createdAt: "2025-03-01T23:15:00Z",
      items: [
        {
          category: "PLASTIC",
          quantity: 1,
          detectedByAi: false,
        },
      ],
      planPoint: 10,
    };

    const entry = planToEntry(plan)[0];
    const formatted = formatPlanDateTime(entry.date);

    expect(formatted.date).toBe(plan.date);
    expect(formatted.time).toBe(plan.time);
  });
});
