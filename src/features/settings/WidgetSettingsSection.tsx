import type { CSSProperties } from "react";
import { widgetToneOptions } from "../widgets/widgetColors";
import { widgetSizeOptions } from "../widget-board/sizes";
import type { WidgetConfig, WidgetSize, WidgetTone } from "../../types/widgets";

interface WidgetSettingsSectionProps {
  widgets: WidgetConfig[];
  onWidgetEnabledChange: (widgetId: string, enabled: boolean) => void;
  onWidgetTitleChange: (widgetId: string, title: string) => void;
  onWidgetSizeChange: (widgetId: string, size: WidgetSize) => void;
  onWidgetToneChange: (widgetId: string, tone: WidgetTone) => void;
}

export function WidgetSettingsSection({
  widgets,
  onWidgetEnabledChange,
  onWidgetTitleChange,
  onWidgetSizeChange,
  onWidgetToneChange
}: WidgetSettingsSectionProps) {
  return (
    <section className="widget-settings-section">
      <div className="widget-settings-section__header">
        <span>Widgets</span>
        <p>Enable, rename, and recolor each widget.</p>
      </div>

      <div className="widget-color-list">
        {widgets.map((widget) => (
          <div key={widget.id} className="widget-color-item">
            <div className="widget-color-item__meta">
              <strong>{widget.kind}</strong>
              <label className="widget-visibility-toggle">
                <span>{widget.enabled ? "On" : "Off"}</span>
                <input
                  type="checkbox"
                  checked={widget.enabled}
                  onChange={(event) => onWidgetEnabledChange(widget.id, event.target.checked)}
                />
              </label>
            </div>

            {widget.enabled ? (
              <>
                <label className="widget-title-field">
                  <span>Title</span>
                  <input
                    value={widget.title}
                    onChange={(event) => onWidgetTitleChange(widget.id, event.target.value)}
                  />
                </label>

                <label className="widget-size-field">
                  <span>Size</span>
                  <div className="widget-size-options" role="group" aria-label={`${widget.title} size`}>
                    {widgetSizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`widget-size-option ${widget.size === size ? "widget-size-option--active" : ""}`}
                        aria-pressed={widget.size === size}
                        onClick={() => onWidgetSizeChange(widget.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </label>

                <div className="widget-color-item__swatches" role="group" aria-label={`${widget.title} colors`}>
                  {widgetToneOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`widget-swatch ${widget.tone === option.value ? "widget-swatch--active" : ""}`}
                      aria-label={`${widget.title} ${option.label}`}
                      aria-pressed={widget.tone === option.value}
                      onClick={() => onWidgetToneChange(widget.id, option.value)}
                      style={{ backgroundColor: option.swatch } as CSSProperties}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
