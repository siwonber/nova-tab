import type { WidgetConfig } from "../../types/widgets";
import { getWidgetSpan } from "./sizes";

export const DASHBOARD_COLUMNS = 13;
export const DASHBOARD_ROWS = 11;

interface Position {
  x: number;
  y: number;
}

export function clampWidgetPosition(widget: WidgetConfig): Position {
  const span = getWidgetSpan(widget.size);

  return {
    x: Math.min(Math.max(widget.x, 1), DASHBOARD_COLUMNS - span.width + 1),
    y: Math.min(Math.max(widget.y, 1), DASHBOARD_ROWS - span.height + 1)
  };
}

export function getAnchoredDropPosition(widget: WidgetConfig, x: number, y: number): Position {
  const span = getWidgetSpan(widget.size);
  const anchorX = x - Math.floor(span.width / 2);
  const anchorY = y - Math.floor(span.height / 2);

  return clampWidgetPosition({
    ...widget,
    x: anchorX,
    y: anchorY
  });
}

export function findFirstFreePosition(widgets: WidgetConfig[], candidate: WidgetConfig): Position {
  const span = getWidgetSpan(candidate.size);

  for (let y = 1; y <= DASHBOARD_ROWS - span.height + 1; y += 1) {
    for (let x = 1; x <= DASHBOARD_COLUMNS - span.width + 1; x += 1) {
      const testWidget = { ...candidate, x, y };
      if (!hasCollision(widgets, testWidget, candidate.id)) {
        return { x, y };
      }
    }
  }

  return clampWidgetPosition({ ...candidate, x: 1, y: 1 });
}

export function hasCollision(widgets: WidgetConfig[], candidate: WidgetConfig, ignoreId?: string) {
  const candidateSpan = getWidgetSpan(candidate.size);
  const candidatePosition = clampWidgetPosition(candidate);

  return widgets
    .filter((widget) => widget.enabled && widget.id !== ignoreId)
    .some((widget) => {
      const span = getWidgetSpan(widget.size);
      const position = clampWidgetPosition(widget);

      return !(
        candidatePosition.x + candidateSpan.width - 1 < position.x ||
        position.x + span.width - 1 < candidatePosition.x ||
        candidatePosition.y + candidateSpan.height - 1 < position.y ||
        position.y + span.height - 1 < candidatePosition.y
      );
    });
}
