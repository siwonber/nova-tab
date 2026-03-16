export type ThemeMode = "aurora" | "paper" | "midnight" | "ember" | "fjord";

export type WidgetKind = "greeting" | "clock" | "focus" | "links" | "search" | "github";
export type WidgetTone = "default" | "mint" | "ocean" | "sunset" | "rose" | "pink" | "wine" | "violet" | "black";
export type WidgetSize = "S" | "M" | "L";

export interface WidgetConfig {
  id: string;
  kind: WidgetKind;
  title: string;
  tone: WidgetTone;
  enabled: boolean;
  size: WidgetSize;
  content?: string;
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
  backgroundPalette: WidgetTone;
  widgets: WidgetConfig[];
  quickLinks: QuickLink[];
}
