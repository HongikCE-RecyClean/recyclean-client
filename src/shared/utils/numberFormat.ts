// 숫자 포맷 유틸: 값이 커지면 compact로 축약하고, 소수 자릿수를 일관되게 제한
export function formatNumber(value: number, locale?: string): string {
  if (Number.isNaN(value) || value === undefined || value === null) {
    return "";
  }

  const targetLocale = locale || "en-US";
  const abs = Math.abs(value);

  // 10,000 이상은 compact 표기로 폭을 줄여요
  if (abs >= 10_000) {
    const maximumFractionDigits = 1; // 100만 이상도 동일 규칙(0~1자리)
    return new Intl.NumberFormat(targetLocale, {
      notation: "compact",
      maximumFractionDigits,
    }).format(value);
  }

  // 소수점이 거의 없는 카운트 값이므로 0~1자리로 제한
  const hasDecimal = !Number.isInteger(value);
  return new Intl.NumberFormat(targetLocale, {
    maximumFractionDigits: hasDecimal ? 1 : 0,
  }).format(value);
}
