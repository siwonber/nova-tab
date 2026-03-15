import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/clock.css";

interface ClockWidgetProps {
  widget: WidgetConfig;
}

export function ClockWidget({ widget }: ClockWidgetProps) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  const day = now.toLocaleDateString("en-US", {
    weekday: "short"
  });

  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className={`clock-widget clock-widget--${widget.size.toLowerCase()}`}>
        <div className="clock-widget__time-block">
          <strong>{time}</strong>
          <span className="clock-widget__day-pill">{day}</span>
        </div>
        <span className="clock-widget__date">{date}</span>
      </div>
    </WidgetCard>
  );
}
