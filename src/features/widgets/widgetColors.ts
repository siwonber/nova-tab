import type { WidgetTone } from "../../types/widgets";

export interface WidgetToneOption {
  value: WidgetTone;
  label: string;
  swatch: string;
  surface: string;
  border: string;
  glow: string;
  accent: string;
}

export const widgetToneOptions: WidgetToneOption[] = [
  {
    value: "default",
    label: "White",
    swatch: "#e7e1d6",
    surface: "rgba(231, 225, 214, 0.14)",
    border: "rgba(231, 225, 214, 0.48)",
    glow: "rgba(231, 225, 214, 0.14)",
    accent: "#e7e1d6"
  },
  {
    value: "mint",
    label: "Mint",
    swatch: "#7feacb",
    surface: "rgba(127, 234, 203, 0.12)",
    border: "rgba(127, 234, 203, 0.34)",
    glow: "rgba(127, 234, 203, 0.22)",
    accent: "#7feacb"
  },
  {
    value: "ocean",
    label: "Ocean",
    swatch: "#68b6ff",
    surface: "rgba(104, 182, 255, 0.12)",
    border: "rgba(104, 182, 255, 0.34)",
    glow: "rgba(104, 182, 255, 0.22)",
    accent: "#68b6ff"
  },
  {
    value: "sunset",
    label: "Sunset",
    swatch: "#f0a86c",
    surface: "rgba(240, 168, 108, 0.12)",
    border: "rgba(240, 168, 108, 0.34)",
    glow: "rgba(240, 168, 108, 0.22)",
    accent: "#f0a86c"
  },
  {
    value: "rose",
    label: "Rose",
    swatch: "#ff8fab",
    surface: "rgba(255, 143, 171, 0.12)",
    border: "rgba(255, 143, 171, 0.34)",
    glow: "rgba(255, 143, 171, 0.22)",
    accent: "#ff8fab"
  },
  {
    value: "pink",
    label: "Pink",
    swatch: "#ff5fc8",
    surface: "rgba(255, 95, 200, 0.14)",
    border: "rgba(255, 95, 200, 0.36)",
    glow: "rgba(255, 95, 200, 0.24)",
    accent: "#ff5fc8"
  },
  {
    value: "wine",
    label: "Wine",
    swatch: "#7a1634",
    surface: "rgba(122, 22, 52, 0.2)",
    border: "rgba(160, 44, 79, 0.4)",
    glow: "rgba(122, 22, 52, 0.24)",
    accent: "#b23a5a"
  },
  {
    value: "violet",
    label: "Violet",
    swatch: "#a78bfa",
    surface: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.34)",
    glow: "rgba(167, 139, 250, 0.22)",
    accent: "#a78bfa"
  },
  {
    value: "black",
    label: "Black",
    swatch: "#0a0a0d",
    surface: "rgba(10, 10, 13, 0.48)",
    border: "rgba(255, 255, 255, 0.16)",
    glow: "rgba(255, 255, 255, 0.04)",
    accent: "#6f6f7c"
  }
];

export function getWidgetToneOption(tone: WidgetTone): WidgetToneOption {
  return widgetToneOptions.find((option) => option.value === tone) ?? widgetToneOptions[0];
}
