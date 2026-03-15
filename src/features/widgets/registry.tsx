import type { DashboardState, WidgetConfig } from "../../types/widgets";
import { ClockWidget } from "./ClockWidget";
import { FocusWidget } from "./FocusWidget";
import { GreetingWidget } from "./GreetingWidget";
import { LinksWidget } from "./LinksWidget";
import { SearchWidget } from "./SearchWidget";

export function renderWidget(widget: WidgetConfig, state: DashboardState) {
  switch (widget.kind) {
    case "greeting":
      return <GreetingWidget widget={widget} />;
    case "search":
      return <SearchWidget widget={widget} />;
    case "clock":
      return <ClockWidget widget={widget} />;
    case "focus":
      return <FocusWidget widget={widget} />;
    case "links":
      return <LinksWidget widget={widget} state={state} />;
    default:
      return null;
  }
}
