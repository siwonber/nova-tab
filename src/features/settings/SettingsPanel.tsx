import type { DashboardState, ThemeMode, WidgetSize, WidgetTone } from "../../types/widgets";
import { WidgetSettingsSection } from "./WidgetSettingsSection";

interface SettingsPanelProps {
  state: DashboardState;
  isOpen: boolean;
  editMode: boolean;
  onToggleOpen: () => void;
  onToggleEditMode: () => void;
  onGreetingChange: (value: string) => void;
  onFocusChange: (value: string) => void;
  onThemeChange: (value: ThemeMode) => void;
  onWidgetEnabledChange: (widgetId: string, enabled: boolean) => void;
  onWidgetTitleChange: (widgetId: string, title: string) => void;
  onWidgetSizeChange: (widgetId: string, size: WidgetSize) => void;
  onWidgetToneChange: (widgetId: string, tone: WidgetTone) => void;
}

const themes: Array<{ value: ThemeMode; label: string }> = [
  { value: "aurora", label: "Aurora" },
  { value: "paper", label: "Paper" },
  { value: "midnight", label: "Midnight" }
];

export function SettingsPanel({
  state,
  isOpen,
  editMode,
  onToggleOpen,
  onToggleEditMode,
  onGreetingChange,
  onFocusChange,
  onThemeChange,
  onWidgetEnabledChange,
  onWidgetTitleChange,
  onWidgetSizeChange,
  onWidgetToneChange
}: SettingsPanelProps) {
  return (
    <aside className={`settings-shell ${isOpen ? "settings-shell--open" : ""}`}>
      <button
        type="button"
        className="settings-shell__trigger"
        onClick={onToggleOpen}
        aria-expanded={isOpen}
        aria-controls="settings-panel"
        aria-label={isOpen ? "Close settings" : "Open settings"}
      >
        <span className="settings-shell__trigger-icon" aria-hidden="true">
          ⚙
        </span>
      </button>

      <section id="settings-panel" className="settings-panel">
        <div className="settings-panel__topline">
          <div>
            <span>Settings</span>
            <p>Adjust the new tab experience.</p>
          </div>
          <button type="button" onClick={onToggleEditMode}>
            {editMode ? "Done" : "Edit"}
          </button>
        </div>

        <label>
          <span>Greeting</span>
          <input value={state.greeting} onChange={(event) => onGreetingChange(event.target.value)} />
        </label>

        <label>
          <span>Main Focus</span>
          <textarea
            rows={3}
            value={state.focusText}
            onChange={(event) => onFocusChange(event.target.value)}
          />
        </label>

        <label>
          <span>Theme</span>
          <select value={state.theme} onChange={(event) => onThemeChange(event.target.value as ThemeMode)}>
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </label>

        <WidgetSettingsSection
          widgets={state.widgets}
          onWidgetEnabledChange={onWidgetEnabledChange}
          onWidgetTitleChange={onWidgetTitleChange}
          onWidgetSizeChange={onWidgetSizeChange}
          onWidgetToneChange={onWidgetToneChange}
        />
      </section>
    </aside>
  );
}
