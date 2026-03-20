import type { CSSProperties, DragEvent } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { SettingsPanel } from "./features/settings/SettingsPanel";
import { getBackgroundPalette } from "./features/widget-board/backgroundPalettes";
import {
  DASHBOARD_COLUMNS,
  DASHBOARD_ROWS,
  clampWidgetPosition,
  findFirstFreePosition,
  getAnchoredDropPosition,
  hasCollision
} from "./features/widget-board/board";
import { getInitialDashboardState, hasCachedDashboardState, loadDashboardState, saveDashboardState } from "./lib/storage";
import { renderWidget } from "./features/widgets/registry";
import { getWidgetSpan } from "./features/widget-board/sizes";
import type { DashboardState, ThemeMode, WidgetSize, WidgetTone } from "./types/widgets";

function App() {
  const [state, setState] = useState<DashboardState>(() => getInitialDashboardState());
  const [hasCachedState] = useState(() => hasCachedDashboardState());
  const [editMode, setEditMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
  const [dropTargetPosition, setDropTargetPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (hasCachedState) {
      return;
    }

    void loadDashboardState().then((loadedState) => {
      setState((currentState) => {
        const currentSerialized = JSON.stringify(currentState);
        const loadedSerialized = JSON.stringify(loadedState);
        return currentSerialized === loadedSerialized ? currentState : loadedState;
      });
    });
  }, [hasCachedState]);

  useEffect(() => {
    if (!state) {
      return;
    }

    void saveDashboardState(state);
  }, [state]);

  useLayoutEffect(() => {
    document.body.setAttribute("data-app-ready", "true");

    return () => {
      document.body.removeAttribute("data-app-ready");
    };
  }, []);

  const updateState = (partial: Partial<DashboardState>) => {
    setState((current) => ({ ...current, ...partial }));
  };

  const setWidgetEnabled = (widgetId: string, enabled: boolean) => {
    setState((current) => {
      const nextWidgets = current.widgets.map((widget) => {
        if (widget.id !== widgetId) {
          return widget;
        }

        if (!enabled) {
          return { ...widget, enabled: false };
        }

        const freePosition = findFirstFreePosition(current.widgets, { ...widget, enabled: true });
        return { ...widget, enabled: true, ...freePosition };
      });

      return {
        ...current,
        widgets: nextWidgets
      };
    });
  };

  const setWidgetTone = (widgetId: string, tone: WidgetTone) => {
    setState((current) => {
      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, tone } : widget))
      };
    });
  };

  const setWidgetSize = (widgetId: string, size: WidgetSize) => {
    setState((current) => {
      const nextWidgets = current.widgets.map((widget) => {
        if (widget.id !== widgetId) {
          return widget;
        }

        const resizedWidget = { ...widget, size };
        const clampedPosition = clampWidgetPosition(resizedWidget);
        const positionedWidget = { ...resizedWidget, ...clampedPosition };

        if (!positionedWidget.enabled || !hasCollision(current.widgets, positionedWidget, widgetId)) {
          return positionedWidget;
        }

        return { ...positionedWidget, ...findFirstFreePosition(current.widgets, positionedWidget) };
      });

      return {
        ...current,
        widgets: nextWidgets
      };
    });
  };

  const setWidgetTitle = (widgetId: string, title: string) => {
    setState((current) => {
      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, title } : widget))
      };
    });
  };

  const setWidgetContent = (widgetId: string, content: string) => {
    setState((current) => {
      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? { ...widget, content } : widget))
      };
    });
  };

  const moveWidgetToCell = (widgetId: string, x: number, y: number) => {
    setState((current) => {
      const targetWidget = current.widgets.find((widget) => widget.id === widgetId);
      if (!targetWidget) {
        return current;
      }

      const anchoredPosition = getAnchoredDropPosition(targetWidget, x, y);
      const positionedWidget = { ...targetWidget, ...anchoredPosition };

      if (hasCollision(current.widgets, positionedWidget, widgetId)) {
        return current;
      }

      return {
        ...current,
        widgets: current.widgets.map((widget) => (widget.id === widgetId ? positionedWidget : widget))
      };
    });
  };

  const updateDropTargetFromPointer = (event: DragEvent<HTMLElement>) => {
    if (!editMode || !draggedWidgetId) {
      return;
    }

    const board = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - board.left;
    const relativeY = event.clientY - board.top;

    if (relativeX < 0 || relativeY < 0 || relativeX > board.width || relativeY > board.height) {
      return;
    }

    const cellWidth = board.width / DASHBOARD_COLUMNS;
    const cellHeight = board.height / DASHBOARD_ROWS;
    const x = Math.min(DASHBOARD_COLUMNS, Math.max(1, Math.floor(relativeX / cellWidth) + 1));
    const y = Math.min(DASHBOARD_ROWS, Math.max(1, Math.floor(relativeY / cellHeight) + 1));

    setDropTargetPosition({ x, y });
  };

  const enabledWidgets = state.widgets.filter((widget) => widget.enabled);
  const draggedWidget = draggedWidgetId ? state.widgets.find((widget) => widget.id === draggedWidgetId) ?? null : null;
  const draggedWidgetSpan = draggedWidget ? getWidgetSpan(draggedWidget.size) : null;
  const backgroundPalette = getBackgroundPalette(state.backgroundPalette);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--boot-bg-start", backgroundPalette.bgStart);
    root.style.setProperty("--boot-bg-end", backgroundPalette.bgEnd);
    root.style.setProperty("--boot-hero-glow", backgroundPalette.heroGlow);
  }, [backgroundPalette.bgEnd, backgroundPalette.bgStart, backgroundPalette.heroGlow]);

  const boardStyle = {
    "--dashboard-columns": DASHBOARD_COLUMNS,
    "--dashboard-rows": DASHBOARD_ROWS,
    ...(state.backgroundPalette === "default"
      ? {}
      : {
          "--bg-start": backgroundPalette.bgStart,
          "--bg-end": backgroundPalette.bgEnd,
          "--hero-glow": backgroundPalette.heroGlow,
          "--orb-one": backgroundPalette.orbOne,
          "--orb-two": backgroundPalette.orbTwo
        })
  } as CSSProperties;

  return (
    <main className={`app-shell theme-${state.theme} palette-${state.backgroundPalette}`} style={boardStyle}>
      <div className="background-orb background-orb--one" />
      <div className="background-orb background-orb--two" />

      <SettingsPanel
        state={state}
        isOpen={isSettingsOpen}
        editMode={editMode}
        onToggleOpen={() => setIsSettingsOpen((current) => !current)}
        onToggleEditMode={() => setEditMode((current) => !current)}
        onThemeChange={(theme: ThemeMode) => updateState({ theme })}
        onBackgroundPaletteChange={(backgroundPalette) => updateState({ backgroundPalette })}
        onWidgetEnabledChange={setWidgetEnabled}
        onWidgetTitleChange={setWidgetTitle}
        onWidgetContentChange={setWidgetContent}
        onWidgetSizeChange={setWidgetSize}
        onWidgetToneChange={setWidgetTone}
      />

      <section
        className={`widget-grid ${editMode ? "widget-grid--edit" : ""}`}
        onDragOver={(event) => {
          if (!editMode || !draggedWidgetId) {
            return;
          }

          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          updateDropTargetFromPointer(event);
        }}
        onDrop={(event) => {
          if (!editMode || !draggedWidgetId || !dropTargetPosition) {
            return;
          }

          event.preventDefault();
          moveWidgetToCell(draggedWidgetId, dropTargetPosition.x, dropTargetPosition.y);
          setDraggedWidgetId(null);
          setDropTargetPosition(null);
        }}
      >
        {editMode ? (
          <div className="widget-grid__board" aria-hidden="true">
            {Array.from({ length: DASHBOARD_COLUMNS * DASHBOARD_ROWS }, (_, index) => {
              const x = (index % DASHBOARD_COLUMNS) + 1;
              const y = Math.floor(index / DASHBOARD_COLUMNS) + 1;
              const previewPosition =
                draggedWidget && dropTargetPosition
                  ? getAnchoredDropPosition(draggedWidget, dropTargetPosition.x, dropTargetPosition.y)
                  : null;
              const isPreviewCell =
                Boolean(previewPosition && draggedWidgetSpan) &&
                x >= previewPosition!.x &&
                x < previewPosition!.x + draggedWidgetSpan!.width &&
                y >= previewPosition!.y &&
                y < previewPosition!.y + draggedWidgetSpan!.height;

              return (
                <div
                  key={`cell-${x}-${y}`}
                  className={`widget-grid__cell ${isPreviewCell ? "widget-grid__cell--active" : ""}`}
                  style={{ gridColumnStart: x, gridRowStart: y } as CSSProperties}
                  onDragOver={(event) => {
                    if (!editMode || !draggedWidgetId) {
                      return;
                    }

                    event.preventDefault();
                    event.stopPropagation();
                    setDropTargetPosition({ x, y });
                  }}
                  onDrop={(event) => {
                    if (!editMode || !draggedWidgetId) {
                      return;
                    }

                    event.preventDefault();
                    event.stopPropagation();
                    moveWidgetToCell(draggedWidgetId, x, y);
                    setDraggedWidgetId(null);
                    setDropTargetPosition(null);
                  }}
                />
              );
            })}
          </div>
        ) : null}
        {enabledWidgets.map((widget) => (
          (() => {
            const span = getWidgetSpan(widget.size);
            const position = clampWidgetPosition(widget);
            return (
          <div
            key={widget.id}
            className={`widget-slot ${draggedWidgetId === widget.id ? "widget-slot--dragging" : ""} ${
              dropTargetPosition?.x === position.x && dropTargetPosition?.y === position.y ? "widget-slot--drop-target" : ""
            }`}
            style={
              {
                gridColumn: `${position.x} / span ${span.width}`,
                gridRow: `${position.y} / span ${span.height}`
              } as CSSProperties
            }
            draggable={editMode}
            onDragStart={(event) => {
              if (!editMode) {
                return;
              }

              const anchorX = position.x + Math.floor(span.width / 2);
              const anchorY = position.y + Math.floor(span.height / 2);

              setDraggedWidgetId(widget.id);
              setDropTargetPosition({ x: anchorX, y: anchorY });
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", widget.id);
            }}
            onDragEnd={() => {
              setDraggedWidgetId(null);
              setDropTargetPosition(null);
            }}
          >
            {renderWidget(widget, state)}
          </div>
            );
          })()
        ))}
      </section>
    </main>
  );
}

export default App;
