
// 颜色名称映射 - 简单的字符串映射，用于 CSS 类名
export const ColorNameMap = {
  red: "red",
  blue: "blue",
  green: "green",
  yellow: "yellow",
  purple: "purple",
  pink: "pink",
  indigo: "indigo",
  cyan: "cyan",
  orange: "orange",
  lime: "lime",
  violet: "violet",
  sky: "sky",
  gray: "gray",
  slate: "slate",
  emerald: "emerald",
  teal: "teal",
  amber: "amber",
  rose: "rose",
} as const;
// 颜色名称类型

export type ColorName = keyof typeof ColorNameMap;
