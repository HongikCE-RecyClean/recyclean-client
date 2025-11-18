// 16진 문자열을 rgba 표현으로 변환하는 헬퍼
export const hexToRgba = (hex: string, alpha = 1): string => {
  const normalized = hex.replace("#", "").trim();

  if (normalized.length !== 3 && normalized.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const expand = normalized.length === 3;
  const value = expand
    ? normalized
        .split("")
        .map((char) => char + char)
        .join("")
    : normalized;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
