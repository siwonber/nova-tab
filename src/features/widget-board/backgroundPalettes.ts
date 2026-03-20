import type { WidgetTone } from "../../types/widgets";

interface BackgroundPaletteOption {
  value: WidgetTone;
  label: string;
  swatch: string;
  bgStart: string;
  bgMid: string;
  bgEnd: string;
  heroGlow: string;
  heroGlowSecondary: string;
  meshTint: string;
  patternInk: string;
  patternHighlight: string;
  orbOne: string;
  orbTwo: string;
  orbThree: string;
}

export const backgroundPaletteOptions: BackgroundPaletteOption[] = [
  {
    value: "default",
    label: "White",
    swatch: "#e7e1d6",
    bgStart: "#f4ece1",
    bgMid: "#e7ddce",
    bgEnd: "#d2c6b5",
    heroGlow: "rgba(255, 248, 238, 0.78)",
    heroGlowSecondary: "rgba(205, 176, 137, 0.5)",
    meshTint: "rgba(98, 78, 49, 0.16)",
    patternInk: "rgba(92, 68, 34, 0.28)",
    patternHighlight: "rgba(255, 255, 255, 0.42)",
    orbOne: "#fffaf2",
    orbTwo: "#dec3a0",
    orbThree: "#b99978"
  },
  {
    value: "mint",
    label: "Mint",
    swatch: "#7feacb",
    bgStart: "#031f24",
    bgMid: "#0b403d",
    bgEnd: "#021014",
    heroGlow: "rgba(127, 234, 203, 0.4)",
    heroGlowSecondary: "rgba(163, 246, 218, 0.22)",
    meshTint: "rgba(132, 255, 220, 0.1)",
    patternInk: "rgba(170, 255, 232, 0.16)",
    patternHighlight: "rgba(233, 255, 250, 0.18)",
    orbOne: "#7feacb",
    orbTwo: "#bff6e6",
    orbThree: "#1ca88f"
  },
  {
    value: "ocean",
    label: "Ocean",
    swatch: "#68b6ff",
    bgStart: "#07182d",
    bgMid: "#123e63",
    bgEnd: "#020c16",
    heroGlow: "rgba(104, 182, 255, 0.42)",
    heroGlowSecondary: "rgba(143, 213, 255, 0.2)",
    meshTint: "rgba(104, 182, 255, 0.12)",
    patternInk: "rgba(150, 212, 255, 0.18)",
    patternHighlight: "rgba(233, 246, 255, 0.18)",
    orbOne: "#68b6ff",
    orbTwo: "#b7ddff",
    orbThree: "#1f5a93"
  },
  {
    value: "sunset",
    label: "Sunset",
    swatch: "#f0a86c",
    bgStart: "#261008",
    bgMid: "#6f2d14",
    bgEnd: "#120604",
    heroGlow: "rgba(255, 180, 110, 0.36)",
    heroGlowSecondary: "rgba(255, 120, 84, 0.22)",
    meshTint: "rgba(255, 154, 84, 0.12)",
    patternInk: "rgba(255, 195, 129, 0.16)",
    patternHighlight: "rgba(255, 238, 214, 0.16)",
    orbOne: "#f0a86c",
    orbTwo: "#ffd1ad",
    orbThree: "#ff6f4d"
  },
  {
    value: "rose",
    label: "Rose",
    swatch: "#ff8fab",
    bgStart: "#220711",
    bgMid: "#5a1730",
    bgEnd: "#13040b",
    heroGlow: "rgba(255, 143, 171, 0.36)",
    heroGlowSecondary: "rgba(255, 195, 214, 0.2)",
    meshTint: "rgba(255, 143, 171, 0.11)",
    patternInk: "rgba(255, 197, 214, 0.16)",
    patternHighlight: "rgba(255, 238, 243, 0.16)",
    orbOne: "#ff8fab",
    orbTwo: "#ffc2d1",
    orbThree: "#e64980"
  },
  {
    value: "pink",
    label: "Pink",
    swatch: "#ff5fc8",
    bgStart: "#1f051d",
    bgMid: "#5f0f4f",
    bgEnd: "#12020e",
    heroGlow: "rgba(255, 95, 200, 0.38)",
    heroGlowSecondary: "rgba(255, 173, 232, 0.22)",
    meshTint: "rgba(255, 95, 200, 0.12)",
    patternInk: "rgba(255, 174, 232, 0.16)",
    patternHighlight: "rgba(255, 232, 247, 0.18)",
    orbOne: "#ff5fc8",
    orbTwo: "#ffb0ea",
    orbThree: "#9e1b7a"
  },
  {
    value: "wine",
    label: "Wine",
    swatch: "#7a1634",
    bgStart: "#120108",
    bgMid: "#3b0818",
    bgEnd: "#050003",
    heroGlow: "rgba(122, 22, 52, 0.34)",
    heroGlowSecondary: "rgba(178, 58, 90, 0.2)",
    meshTint: "rgba(178, 58, 90, 0.1)",
    patternInk: "rgba(240, 164, 182, 0.14)",
    patternHighlight: "rgba(255, 226, 233, 0.14)",
    orbOne: "#7a1634",
    orbTwo: "#b23a5a",
    orbThree: "#f0a4b6"
  },
  {
    value: "violet",
    label: "Violet",
    swatch: "#a78bfa",
    bgStart: "#0f0823",
    bgMid: "#2e205b",
    bgEnd: "#05030d",
    heroGlow: "rgba(167, 139, 250, 0.38)",
    heroGlowSecondary: "rgba(212, 194, 255, 0.18)",
    meshTint: "rgba(167, 139, 250, 0.12)",
    patternInk: "rgba(214, 198, 255, 0.16)",
    patternHighlight: "rgba(242, 236, 255, 0.18)",
    orbOne: "#a78bfa",
    orbTwo: "#d4c2ff",
    orbThree: "#5f39cf"
  },
  {
    value: "black",
    label: "Black",
    swatch: "#0a0a0d",
    bgStart: "#050507",
    bgMid: "#161620",
    bgEnd: "#000000",
    heroGlow: "rgba(255, 255, 255, 0.14)",
    heroGlowSecondary: "rgba(136, 136, 176, 0.24)",
    meshTint: "rgba(255, 255, 255, 0.1)",
    patternInk: "rgba(255, 255, 255, 0.22)",
    patternHighlight: "rgba(184, 184, 224, 0.26)",
    orbOne: "#2a2a36",
    orbTwo: "#16161d",
    orbThree: "#5a5a72"
  }
];

export function getBackgroundPalette(value: WidgetTone) {
  return backgroundPaletteOptions.find((option) => option.value === value) ?? backgroundPaletteOptions[0];
}
