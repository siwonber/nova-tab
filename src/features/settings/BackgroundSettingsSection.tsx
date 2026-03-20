import type { CSSProperties } from "react";
import { backgroundPaletteOptions } from "../widget-board/backgroundPalettes";
import type { WidgetTone } from "../../types/widgets";

interface BackgroundSettingsSectionProps {
  value: WidgetTone;
  onChange: (value: WidgetTone) => void;
}

export function BackgroundSettingsSection({ value, onChange }: BackgroundSettingsSectionProps) {
  const selectedOption = backgroundPaletteOptions.find((option) => option.value === value) ?? backgroundPaletteOptions[0];

  return (
    <section className="widget-settings-section">
      <div className="widget-settings-section__header">
        <span>Background</span>
        <p>Pick a background palette for the board.</p>
      </div>

      <div className="widget-color-item widget-color-item--compact">
        <div className="widget-choice-summary">
          <span>Selected</span>
          <strong>{selectedOption.label}</strong>
        </div>
        <div className="widget-color-item__swatches" role="radiogroup" aria-label="Background palette">
          {backgroundPaletteOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`widget-swatch ${value === option.value ? "widget-swatch--active" : ""}`}
              role="radio"
              aria-label={option.label}
              aria-checked={value === option.value}
              onClick={() => onChange(option.value)}
              style={{ backgroundColor: option.swatch } as CSSProperties}
            >
              <span className="widget-swatch__check" aria-hidden="true">
                {value === option.value ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
