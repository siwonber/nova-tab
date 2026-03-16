import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/focus.css";

interface FocusWidgetProps {
  widget: WidgetConfig;
}

export function FocusWidget({ widget }: FocusWidgetProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className={`focus-widget focus-widget--${widget.size.toLowerCase()}`}>
        <p>{widget.content}</p>
      </div>
    </WidgetCard>
  );
}
