export type ThemeMode = "aurora" | "paper" | "midnight";

export type WidgetKind = "clock" | "focus" | "links" | "search";
export type WidgetTone = "default" | "mint" | "ocean" | "sunset" | "rose" | "violet";
export type WidgetSize = "S" | "M" | "L";

export interface WidgetConfig {
  id: string;
  kind: WidgetKind;
  title: string;
  tone: WidgetTone;
  enabled: boolean;
  size: WidgetSize;
  x: number;
  y: number;
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
