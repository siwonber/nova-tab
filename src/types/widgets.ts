export type ThemeMode = "aurora" | "paper" | "midnight";

export type WidgetKind = "clock" | "focus" | "links" | "search";
export type WidgetTone = "default" | "mint" | "ocean" | "sunset" | "rose" | "violet";

export interface WidgetConfig {
  id: string;
  kind: WidgetKind;
  title: string;
  tone: WidgetTone;
  enabled: boolean;
  width: number;
  height: number;
}

export interface QuickLink {
  id: string;
  label: string;
  url: string;
}

export interface DashboardState {
  theme: ThemeMode;
  greeting: string;
  focusText: string;
  widgets: WidgetConfig[];
  quickLinks: QuickLink[];
}
