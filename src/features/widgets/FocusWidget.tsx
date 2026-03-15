import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/focus.css";

interface FocusWidgetProps {
  widget: WidgetConfig;
}

export function FocusWidget({ widget }: FocusWidgetProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <p className="focus-widget">{widget.content}</p>
    </WidgetCard>
  );
}
