import { useEffect, useState } from "react";
import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/clock.css";

interface ClockWidgetProps {
  widget: WidgetConfig;
}

export function ClockWidget({ widget }: ClockWidgetProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const startMinuteSync = () => {
      setNow(new Date());
      intervalId = window.setInterval(() => {
        setNow(new Date());
      }, 60_000);
    };

    const delayUntilNextMinute = 60_000 - (Date.now() % 60_000);
    timeoutId = window.setTimeout(startMinuteSync, delayUntilNextMinute);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  const timeParts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }).formatToParts(now);

  const time = timeParts.find((part) => part.type === "hour")?.value + ":" + timeParts.find((part) => part.type === "minute")?.value;
  const period = timeParts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);
  const monthDay = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(now);
  const dayNumber = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(now);

  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className={`clock-widget clock-widget--${widget.size.toLowerCase()}`}>
        <div className="clock-widget__backdrop" aria-hidden="true">
          <span>{dayNumber}</span>
        </div>
        <div className="clock-widget__hero">
          <div className="clock-widget__time-line">
            <strong className="clock-widget__time">{time}</strong>
            <span className="clock-widget__period">{period}</span>
          </div>
          <div className="clock-widget__meta">
            <span className="clock-widget__weekday">{weekday}</span>
            <span className="clock-widget__date">{monthDay}</span>
          </div>
        </div>
        <div className="clock-widget__footer">
          <span className="clock-widget__caption">Local time</span>
          <span className="clock-widget__caption clock-widget__caption--secondary">{monthDay}</span>
        </div>
      </div>
    </WidgetCard>
  );
}
