import type { DashboardState } from "../types/widgets";
import { findFirstFreePosition } from "../features/widget-board/board";
import { normalizeWidgetSize } from "../features/widget-board/sizes";

const STORAGE_KEY = "nova-tab-dashboard";

const defaultState: DashboardState = {
  theme: "aurora",
  greeting: "What matters today?",
  focusText: "Build a clear start page with zero friction.",
  widgets: [
    { id: "search-primary", kind: "search", title: "Search", tone: "mint", enabled: true, size: "M", x: 1, y: 1 },
    { id: "clock-primary", kind: "clock", title: "Time", tone: "ocean", enabled: true, size: "M", x: 5, y: 1 },
    { id: "focus-primary", kind: "focus", title: "Focus", tone: "violet", enabled: true, size: "M", x: 1, y: 5 },
    { id: "links-primary", kind: "links", title: "Quick Links", tone: "sunset", enabled: true, size: "M", x: 5, y: 5 }
  ],
  quickLinks: [
    { id: "gh", label: "GitHub", url: "https://github.com" },
    { id: "mail", label: "Mail", url: "https://mail.google.com" },
    { id: "docs", label: "Docs", url: "https://developer.mozilla.org" }
  ]
};

function hasExtensionStorage() {
  return typeof window !== "undefined" && Boolean(window.browser?.storage?.local);
}

export async function loadDashboardState(): Promise<DashboardState> {
  if (hasExtensionStorage()) {
    const result = await window.browser!.storage!.local!.get(STORAGE_KEY);
    return normalizeDashboardState(result[STORAGE_KEY] as Partial<DashboardState> | undefined);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  try {
    return normalizeDashboardState(JSON.parse(raw) as Partial<DashboardState>);
  } catch {
    return defaultState;
  }
}

export async function saveDashboardState(state: DashboardState) {
  const persistedState: DashboardState = {
    theme: state.theme,
    greeting: state.greeting,
    focusText: state.focusText,
    widgets: state.widgets,
    quickLinks: state.quickLinks
  };

  if (hasExtensionStorage()) {
    await window.browser!.storage!.local!.set({ [STORAGE_KEY]: persistedState });
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
}

function normalizeDashboardState(savedState?: Partial<DashboardState>): DashboardState {
  const legacySearchEnabled =
    typeof (savedState as { searchEnabled?: unknown } | undefined)?.searchEnabled === "boolean"
      ? ((savedState as { searchEnabled?: boolean }).searchEnabled ?? true)
      : undefined;

  const savedWidgets = savedState?.widgets ?? [];
  const mergedWidgets = defaultState.widgets.map((defaultWidget) => {
    const savedWidget = savedWidgets.find((widget) => widget.kind === defaultWidget.kind || widget.id === defaultWidget.id);
    const isLegacySearchDisabled = defaultWidget.kind === "search" && legacySearchEnabled === false;
    const mergedWidget = {
      ...defaultWidget,
      ...savedWidget,
      title: normalizeWidgetTitle(defaultWidget.kind, savedWidget?.title, defaultWidget.title),
      tone: savedWidget?.tone ?? defaultWidget.tone,
      enabled: savedWidget?.enabled ?? (savedWidget ? true : !isLegacySearchDisabled),
      size: normalizeWidgetSize(savedWidget?.size, defaultWidget.size),
      x: typeof savedWidget?.x === "number" ? savedWidget.x : defaultWidget.x,
      y: typeof savedWidget?.y === "number" ? savedWidget.y : defaultWidget.y
    };

    if (!mergedWidget.enabled) {
      return mergedWidget;
    }

    const freePosition = findFirstFreePosition(
      defaultState.widgets
        .map((widget) =>
          widget.id === mergedWidget.id
            ? null
            : savedWidgets.find((savedWidgetCandidate) => savedWidgetCandidate.id === widget.id || savedWidgetCandidate.kind === widget.kind)
        )
        .filter(Boolean)
        .map((widget, index) => ({
          ...defaultState.widgets[index],
          ...widget,
          enabled: (widget as { enabled?: boolean } | undefined)?.enabled ?? true
        })),
      mergedWidget
    );

    return {
      ...mergedWidget,
      ...freePosition
    };
  });

  const mergedState: DashboardState = {
    ...defaultState,
    ...savedState,
    widgets: mergedWidgets,
    quickLinks: savedState?.quickLinks ?? defaultState.quickLinks
  };

  return mergedState;
}

function normalizeWidgetTitle(kind: string, title: string | undefined, fallbackTitle?: string) {
  const defaultTitle = fallbackTitle ?? getDefaultWidgetTitle(kind);

  if (!title) {
    return defaultTitle;
  }

  switch (kind) {
    case "search":
      return title === "Suche" ? "Search" : title;
    case "clock":
      return title === "Zeit" ? "Time" : title;
    case "focus":
      return title === "Fokus" ? "Focus" : title;
    case "links":
      return title === "Schnellzugriff" ? "Quick Links" : title;
    default:
      return title;
  }
}

function getDefaultWidgetTitle(kind: string) {
  switch (kind) {
    case "search":
      return "Search";
    case "clock":
      return "Time";
    case "focus":
      return "Focus";
    case "links":
      return "Quick Links";
    default:
      return "Widget";
  }
}
