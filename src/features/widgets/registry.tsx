import type { DashboardState, WidgetConfig } from "../../types/widgets";
import { WidgetCard } from "../../components/WidgetCard";
import { SearchWidget } from "./SearchWidget";

interface WidgetRendererProps {
  widget: WidgetConfig;
  state: DashboardState;
}

function ClockWidget({ widget }: WidgetRendererProps) {
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

  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className="clock-widget">
        <strong>{time}</strong>
        <span>{date}</span>
      </div>
    </WidgetCard>
  );
}

function FocusWidget({ widget, state }: WidgetRendererProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <p className="focus-widget">{state.focusText}</p>
    </WidgetCard>
  );
}

function LinksWidget({ widget, state }: WidgetRendererProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className="links-widget">
        {state.quickLinks.map((link) => (
          <a key={link.id} href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
    </WidgetCard>
  );
}

export function renderWidget(widget: WidgetConfig, state: DashboardState) {
  switch (widget.kind) {
    case "search":
      return <SearchWidget widget={widget} />;
    case "clock":
      return <ClockWidget widget={widget} state={state} />;
    case "focus":
      return <FocusWidget widget={widget} state={state} />;
    case "links":
      return <LinksWidget widget={widget} state={state} />;
    default:
      return null;
  }
}
