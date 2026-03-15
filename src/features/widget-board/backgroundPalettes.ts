import type { WidgetTone } from "../../types/widgets";

interface BackgroundPaletteOption {
  value: WidgetTone;
  label: string;
  swatch: string;
  bgStart: string;
  bgEnd: string;
  heroGlow: string;
  orbOne: string;
  orbTwo: string;
}

export const backgroundPaletteOptions: BackgroundPaletteOption[] = [
  {
    value: "default",
    label: "Default",
    swatch: "#f4f7fb",
    bgStart: "#203244",
    bgEnd: "#0b1620",
    heroGlow: "rgba(244, 247, 251, 0.22)",
    orbOne: "#f4f7fb",
    orbTwo: "#c8d8e8"
  },
  {
    value: "mint",
    label: "Mint",
    swatch: "#7feacb",
    bgStart: "#12332f",
    bgEnd: "#071816",
    heroGlow: "rgba(127, 234, 203, 0.32)",
    orbOne: "#7feacb",
    orbTwo: "#bff6e6"
  },
  {
    value: "ocean",
    label: "Ocean",
    swatch: "#68b6ff",
    bgStart: "#102d4a",
    bgEnd: "#071827",
    heroGlow: "rgba(104, 182, 255, 0.3)",
    orbOne: "#68b6ff",
    orbTwo: "#b7ddff"
  },
  {
    value: "sunset",
    label: "Sunset",
    swatch: "#f0a86c",
    bgStart: "#3a2418",
    bgEnd: "#170d08",
    heroGlow: "rgba(240, 168, 108, 0.3)",
    orbOne: "#f0a86c",
    orbTwo: "#ffd1ad"
  },
  {
    value: "rose",
    label: "Rose",
    swatch: "#ff8fab",
    bgStart: "#381726",
    bgEnd: "#160811",
    heroGlow: "rgba(255, 143, 171, 0.3)",
    orbOne: "#ff8fab",
    orbTwo: "#ffc2d1"
  },
  {
    value: "pink",
    label: "Pink",
    swatch: "#ff5fc8",
    bgStart: "#3a1230",
    bgEnd: "#170713",
    heroGlow: "rgba(255, 95, 200, 0.32)",
    orbOne: "#ff5fc8",
    orbTwo: "#ffb0ea"
  },
  {
    value: "wine",
    label: "Wine",
    swatch: "#7a1634",
    bgStart: "#2a0914",
    bgEnd: "#120308",
    heroGlow: "rgba(122, 22, 52, 0.34)",
    orbOne: "#7a1634",
    orbTwo: "#b23a5a"
  },
  {
    value: "violet",
    label: "Violet",
    swatch: "#a78bfa",
    bgStart: "#241b46",
    bgEnd: "#0b0916",
    heroGlow: "rgba(167, 139, 250, 0.3)",
    orbOne: "#a78bfa",
    orbTwo: "#d4c2ff"
  },
  {
    value: "black",
    label: "Black",
    swatch: "#0a0a0d",
    bgStart: "#0a0a0d",
    bgEnd: "#000000",
    heroGlow: "rgba(255, 255, 255, 0.05)",
    orbOne: "#1a1a22",
    orbTwo: "#101014"
  }
];

export function getBackgroundPalette(value: WidgetTone) {
  return backgroundPaletteOptions.find((option) => option.value === value) ?? backgroundPaletteOptions[0];
}
