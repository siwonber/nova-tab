import type { CSSProperties, PropsWithChildren } from "react";
import type { WidgetTone } from "../types/widgets";
import { getWidgetToneOption } from "../features/widgets/widgetColors";

interface WidgetCardProps extends PropsWithChildren {
  title: string;
  tone: WidgetTone;
}

export function WidgetCard({ title, tone, children }: WidgetCardProps) {
  const toneOption = getWidgetToneOption(tone);
  const style = {
    "--widget-surface": toneOption.surface,
    "--widget-border-color": toneOption.border,
    "--widget-glow": toneOption.glow
  } as CSSProperties;

  return (
    <section className="widget-card" style={style}>
      <header className="widget-card__header">
        <span>{title}</span>
      </header>
      <div className="widget-card__content">{children}</div>
    </section>
  );
}
