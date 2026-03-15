import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/greeting.css";

interface GreetingWidgetProps {
  widget: WidgetConfig;
}

export function GreetingWidget({ widget }: GreetingWidgetProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className="greeting-widget">
        <strong>{widget.content}</strong>
      </div>
    </WidgetCard>
  );
}
