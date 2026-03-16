import { WidgetCard } from "../../components/WidgetCard";
import type { DashboardState, WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/links.css";

interface LinksWidgetProps {
  widget: WidgetConfig;
  state: DashboardState;
}

export function LinksWidget({ widget, state }: LinksWidgetProps) {
  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className={`links-widget links-widget--${widget.size.toLowerCase()}`}>
        {state.quickLinks.map((link) => (
          <a key={link.id} href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
    </WidgetCard>
  );
}
