import type { WidgetSize } from "../../types/widgets";

interface WidgetSpan {
  width: number;
  height: number;
}

export const widgetSizeOptions: WidgetSize[] = ["S", "M", "L"];

const widgetSizeMap: Record<WidgetSize, WidgetSpan> = {
  S: { width: 3, height: 3 },
  M: { width: 5, height: 3 },
  L: { width: 7, height: 5 }
};

export function getWidgetSpan(size: WidgetSize): WidgetSpan {
  return widgetSizeMap[size];
}

export function normalizeWidgetSize(size: string | undefined, fallback: WidgetSize): WidgetSize {
  return size === "S" || size === "M" || size === "L" ? size : fallback;
}
