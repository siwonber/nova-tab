import { CSSProperties, useEffect, useState } from "react";
import { SettingsPanel } from "./features/settings/SettingsPanel";
import { loadDashboardState, saveDashboardState } from "./lib/storage";
import { renderWidget } from "./features/widgets/registry";
import type { DashboardState, ThemeMode, WidgetConfig, WidgetTone } from "./types/widgets";

function App() {
  const [state, setState] = useState<DashboardState | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
  const [dropTargetWidgetId, setDropTargetWidgetId] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardState().then(setState);
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }

    void saveDashboardState(state);
  }, [state]);

  if (!state) {
    return <main className="app-shell loading">Loading Nova Tab...</main>;
  }

  const updateState = (partial: Partial<DashboardState>) => {
    setState((current) => (current ? { ...current, ...partial } : current));
  };

  const setWidgetEnabled = (widgetId: string, enabled: boolean) => {
    setState((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, enabled } : widget))
      };
    });
  };

  const setWidgetTone = (widgetId: string, tone: WidgetTone) => {
    setState((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, tone } : widget))
      };
    });
  };

  const setWidgetTitle = (widgetId: string, title: string) => {
    setState((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, title } : widget))
      };
    });
  };

  const moveWidget = (sourceWidgetId: string, targetWidgetId: string) => {
    setState((current) => {
      if (!current || sourceWidgetId === targetWidgetId) {
        return current;
      }

      const sourceIndex = current.widgets.findIndex((widget) => widget.id === sourceWidgetId);
      const targetIndex = current.widgets.findIndex((widget) => widget.id === targetWidgetId);

      if (sourceIndex === -1 || targetIndex === -1) {
        return current;
      }

      const reorderedWidgets = [...current.widgets];
      const [movedWidget] = reorderedWidgets.splice(sourceIndex, 1);
      reorderedWidgets.splice(targetIndex, 0, movedWidget);

      return {
        ...current,
        widgets: reorderedWidgets
      };
    });
  };

  const enabledWidgets = state.widgets.filter((widget) => widget.enabled);

  return (
    <main className={`app-shell theme-${state.theme}`}>
      <div className="background-orb background-orb--one" />
      <div className="background-orb background-orb--two" />

      <SettingsPanel
        state={state}
        isOpen={isSettingsOpen}
        editMode={editMode}
        onToggleOpen={() => setIsSettingsOpen((current) => !current)}
        onToggleEditMode={() => setEditMode((current) => !current)}
        onGreetingChange={(greeting) => updateState({ greeting })}
        onFocusChange={(focusText) => updateState({ focusText })}
        onThemeChange={(theme: ThemeMode) => updateState({ theme })}
        onWidgetEnabledChange={setWidgetEnabled}
        onWidgetTitleChange={setWidgetTitle}
        onWidgetToneChange={setWidgetTone}
      />

      <section className="hero">
        <p className="eyebrow">Firefox New Tab</p>
        <h1>{state.greeting}</h1>
        <p className="hero-copy">
          A modular starting point for widgets, routines, and future integrations.
        </p>
      </section>

      <section className={`widget-grid ${editMode ? "widget-grid--edit" : ""}`}>
        {enabledWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`widget-slot ${draggedWidgetId === widget.id ? "widget-slot--dragging" : ""} ${
              dropTargetWidgetId === widget.id ? "widget-slot--drop-target" : ""
            }`}
            style={
              {
                "--widget-col-span": widget.width,
                "--widget-row-span": widget.height
              } as CSSProperties
            }
            draggable={editMode}
            onDragStart={(event) => {
              if (!editMode) {
                return;
              }

              setDraggedWidgetId(widget.id);
              setDropTargetWidgetId(widget.id);
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", widget.id);
            }}
            onDragEnter={() => {
              if (!editMode || !draggedWidgetId || draggedWidgetId === widget.id) {
                return;
              }

              setDropTargetWidgetId(widget.id);
            }}
            onDragOver={(event) => {
              if (!editMode) {
                return;
              }

              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
            }}
            onDrop={(event) => {
              if (!editMode || !draggedWidgetId) {
                return;
              }

              event.preventDefault();
              moveWidget(draggedWidgetId, widget.id);
              setDraggedWidgetId(null);
              setDropTargetWidgetId(null);
            }}
            onDragEnd={() => {
              setDraggedWidgetId(null);
              setDropTargetWidgetId(null);
            }}
          >
            {renderWidget(widget, state)}
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
