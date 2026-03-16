import type { DashboardState } from "../types/widgets";
import { clampWidgetPosition, findFirstFreePosition, hasCollision } from "../features/widget-board/board";
import { normalizeWidgetSize } from "../features/widget-board/sizes";

const STORAGE_KEY = "nova-tab-dashboard";

const defaultState: DashboardState = {
  theme: "aurora",
  backgroundPalette: "default",
  widgets: [
    {
      id: "greeting-primary",
      kind: "greeting",
      title: "Greeting",
      tone: "default",
      enabled: true,
      size: "M",
      content: "What matters today?",
      x: 1,
      y: 1
    },
    { id: "search-primary", kind: "search", title: "Search", tone: "mint", enabled: true, size: "M", x: 6, y: 1 },
    { id: "clock-primary", kind: "clock", title: "Time", tone: "ocean", enabled: true, size: "S", x: 11, y: 1 },
    {
      id: "focus-primary",
      kind: "focus",
      title: "Main Focus",
      tone: "violet",
      enabled: true,
      size: "M",
      content: "Build a clear start page with zero friction.",
      x: 1,
      y: 4
    },
    { id: "links-primary", kind: "links", title: "Quick Links", tone: "sunset", enabled: true, size: "L", x: 7, y: 4 }
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

export function hasCachedDashboardState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

export function getInitialDashboardState(): DashboardState {
  if (typeof window === "undefined") {
    return defaultState;
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

export async function loadDashboardState(): Promise<DashboardState> {
  if (hasExtensionStorage()) {
    const result = await window.browser!.storage!.local!.get(STORAGE_KEY);
    return normalizeDashboardState(result[STORAGE_KEY] as Partial<DashboardState> | undefined);
  }

  return getInitialDashboardState();
}

export async function saveDashboardState(state: DashboardState) {
  const persistedState: DashboardState = {
    theme: state.theme,
    backgroundPalette: state.backgroundPalette,
    widgets: state.widgets,
    quickLinks: state.quickLinks
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
  }

  if (hasExtensionStorage()) {
    await window.browser!.storage!.local!.set({ [STORAGE_KEY]: persistedState });
    return;
  }
}

function normalizeDashboardState(savedState?: Partial<DashboardState>): DashboardState {
  const legacySearchEnabled =
    typeof (savedState as { searchEnabled?: unknown } | undefined)?.searchEnabled === "boolean"
      ? ((savedState as { searchEnabled?: boolean }).searchEnabled ?? true)
      : undefined;
  const legacyGreeting =
    typeof (savedState as { greeting?: unknown } | undefined)?.greeting === "string"
      ? (savedState as { greeting?: string }).greeting
      : undefined;
  const legacyFocusText =
    typeof (savedState as { focusText?: unknown } | undefined)?.focusText === "string"
      ? (savedState as { focusText?: string }).focusText
      : undefined;

  const savedWidgets = savedState?.widgets ?? [];
  const mergedWidgets = defaultState.widgets.reduce<DashboardState["widgets"]>((accumulator, defaultWidget) => {
    const savedWidget = savedWidgets.find((widget) => widget.kind === defaultWidget.kind || widget.id === defaultWidget.id);
    const isLegacySearchDisabled = defaultWidget.kind === "search" && legacySearchEnabled === false;
    const hasSavedPosition = typeof savedWidget?.x === "number" && typeof savedWidget?.y === "number";
    const mergedWidget = {
      ...defaultWidget,
      ...savedWidget,
      title: normalizeWidgetTitle(defaultWidget.kind, savedWidget?.title, defaultWidget.title),
      tone: savedWidget?.tone ?? defaultWidget.tone,
      enabled: savedWidget?.enabled ?? (savedWidget ? true : !isLegacySearchDisabled),
      size: normalizeWidgetSize(savedWidget?.size, defaultWidget.size),
      content: normalizeWidgetContent(defaultWidget.kind, savedWidget?.content, legacyGreeting, legacyFocusText, defaultWidget.content),
      x: typeof savedWidget?.x === "number" ? savedWidget.x : defaultWidget.x,
      y: typeof savedWidget?.y === "number" ? savedWidget.y : defaultWidget.y
    };

    if (!mergedWidget.enabled) {
      accumulator.push(mergedWidget);
      return accumulator;
    }

    if (!hasSavedPosition) {
      const freePosition = findFirstFreePosition(accumulator, mergedWidget);
      accumulator.push({
        ...mergedWidget,
        ...freePosition
      });
      return accumulator;
    }

    const clampedPosition = clampWidgetPosition(mergedWidget);
    const positionedWidget = {
      ...mergedWidget,
      ...clampedPosition
    };

    if (!hasCollision(accumulator, positionedWidget, positionedWidget.id)) {
      accumulator.push(positionedWidget);
      return accumulator;
    }

    accumulator.push({
      ...positionedWidget,
      ...findFirstFreePosition(accumulator, positionedWidget)
    });
    return accumulator;
  }, []);

  const mergedState: DashboardState = {
    ...defaultState,
    ...savedState,
    theme: normalizeTheme(savedState?.theme),
    backgroundPalette: savedState?.backgroundPalette ?? defaultState.backgroundPalette,
    widgets: mergedWidgets,
    quickLinks: savedState?.quickLinks ?? defaultState.quickLinks
  };

  return mergedState;
}

function normalizeTheme(theme: string | undefined): DashboardState["theme"] {
  switch (theme) {
    case "aurora":
    case "paper":
    case "midnight":
    case "ember":
    case "fjord":
      return theme;
    default:
      return defaultState.theme;
  }
}

function normalizeWidgetTitle(kind: string, title: string | undefined, fallbackTitle?: string) {
  const defaultTitle = fallbackTitle ?? getDefaultWidgetTitle(kind);

  if (!title) {
    return defaultTitle;
  }

  switch (kind) {
    case "greeting":
      return title === "Begruessung" ? "Greeting" : title;
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
    case "greeting":
      return "Greeting";
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

function normalizeWidgetContent(
  kind: string,
  content: string | undefined,
  legacyGreeting: string | undefined,
  legacyFocusText: string | undefined,
  fallbackContent?: string
) {
  if (typeof content === "string") {
    return content;
  }

  if (kind === "greeting" && legacyGreeting) {
    return legacyGreeting;
  }

  if (kind === "focus" && legacyFocusText) {
    return legacyFocusText;
  }

  return fallbackContent;
}
