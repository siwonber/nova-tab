import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";
import "../../styles/widgets/github.css";

interface GitHubWidgetProps {
  widget: WidgetConfig;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const weeksBySize = {
  S: 9,
  M: 18,
  L: 26
} as const;

export function GitHubWidget({ widget }: GitHubWidgetProps) {
  const username = widget.content?.trim() ?? "";
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalText, setTotalText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadCalendar() {
      if (!username) {
        setContributions([]);
        setTotalText(null);
        setErrorText(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorText(null);

      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
          {
            headers: {
              Accept: "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("GitHub contributions API request failed");
        }

        const payload = (await response.json()) as ContributionsApiResponse;
        const nextDays = Array.isArray(payload.contributions) ? payload.contributions : [];
        const lastYearTotal = payload.total?.lastYear;

        if (!nextDays.length) {
          throw new Error("GitHub contributions missing");
        }

        if (!isActive) {
          return;
        }

        setContributions(nextDays);
        setTotalText(
          typeof lastYearTotal === "number"
            ? `${lastYearTotal.toLocaleString("en-US")} contributions in the last year`
            : "Public contribution calendar"
        );
        setErrorText(null);
      } catch {
        if (!isActive) {
          return;
        }

        setContributions([]);
        setTotalText(null);
        setErrorText("GitHub calendar could not be loaded.");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadCalendar();

    return () => {
      isActive = false;
    };
  }, [username]);

  const visibleDays = useMemo(() => {
    if (!contributions.length) {
      return [];
    }

    return contributions.slice(-(weeksBySize[widget.size] * 7));
  }, [contributions, widget.size]);

  const peakDay = useMemo(() => visibleDays.reduce((max, day) => Math.max(max, day.count), 0), [visibleDays]);
  const activeDays = useMemo(() => visibleDays.filter((day) => day.count > 0).length, [visibleDays]);

  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <div className={`github-widget github-widget--${widget.size.toLowerCase()}`}>
        <div className="github-widget__topline">
          <div>
            <strong>{username ? `@${username}` : "GitHub username"}</strong>
            <p>
              {username
                ? isLoading
                  ? "Loading contribution calendar..."
                  : totalText ?? "Public contribution calendar"
                : "Enter a username in settings to show the calendar."}
            </p>
          </div>
          {username && !errorText ? <span className="github-widget__badge">{activeDays} active days</span> : null}
        </div>

        {visibleDays.length ? (
          <div className="github-widget__calendar-frame">
            <div
              className="github-widget__calendar-grid"
              style={{ "--github-weeks": weeksBySize[widget.size] } as CSSProperties}
            >
              {visibleDays.map((day) => (
                <span
                  key={day.date}
                  className={`github-widget__cell github-widget__cell--level-${Math.max(0, Math.min(day.level, 4))}`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="github-widget__empty">
            <span>{errorText ?? "Set a username to load the GitHub calendar."}</span>
          </div>
        )}

        <div className="github-widget__footer">
          <span>{errorText ?? "Data via github-contributions-api"}</span>
          {username && !errorText ? <span>Peak day: {peakDay}</span> : null}
        </div>
      </div>
    </WidgetCard>
  );
}
