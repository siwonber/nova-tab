import type { WidgetSize } from "../../types/widgets";

interface WidgetSpan {
  width: number;
  height: number;
}

export const widgetSizeOptions: WidgetSize[] = ["S", "M", "L"];

const widgetSizeMap: Record<WidgetSize, WidgetSpan> = {
  S: { width: 2, height: 2 },
  M: { width: 3, height: 3 },
  L: { width: 4, height: 4 }
};

export function getWidgetSpan(size: WidgetSize): WidgetSpan {
  return widgetSizeMap[size];
}

export function normalizeWidgetSize(size: string | undefined, fallback: WidgetSize): WidgetSize {
  return size === "S" || size === "M" || size === "L" ? size : fallback;
}
