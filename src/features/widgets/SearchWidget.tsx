import { FormEvent, useEffect, useState } from "react";
import { WidgetCard } from "../../components/WidgetCard";
import type { WidgetConfig } from "../../types/widgets";

interface SearchWidgetProps {
  widget: WidgetConfig;
}

export function SearchWidget({ widget }: SearchWidgetProps) {
  const [query, setQuery] = useState("");
  const [engineName, setEngineName] = useState<string | null>(null);
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadSearchCapabilities() {
      const searchApi = window.browser?.search;
      const runtimeApi = window.browser?.runtime;
      const canSearch = Boolean(searchApi?.search && runtimeApi?.sendMessage);

      if (isActive) {
        setIsSearchAvailable(canSearch);
      }

      if (!canSearch || !searchApi?.get) {
        return;
      }

      try {
        const engines = await searchApi.get();
        const defaultEngine = engines.find((engine) => engine.isDefault);

        if (isActive) {
          setEngineName(defaultEngine?.name ?? null);
        }
      } catch {
        if (isActive) {
          setEngineName(null);
        }
      }
    }

    void loadSearchCapabilities();

    return () => {
      isActive = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    try {
      const result = await window.browser?.runtime?.sendMessage({
        type: "nova-tab:search",
        query: trimmedQuery
      });

      if (!result?.ok) {
        setErrorText("Search could not be started. Reload the add-on in Firefox.");
        return;
      }

      setErrorText(null);
      setQuery("");
    } catch {
      setErrorText("Search could not be started. Reload the add-on in Firefox.");
    }
  };

  return (
    <WidgetCard title={widget.title} tone={widget.tone}>
      <form className="search-widget" onSubmit={(event) => void handleSubmit(event)}>
        <label className="search-widget__field">
          <span className="search-widget__label">
            {engineName ? `Search with ${engineName}` : "Firefox default search"}
          </span>
          <div className="search-widget__input-row">
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (errorText) {
                  setErrorText(null);
                }
              }}
              placeholder="Search the web"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" disabled={!isSearchAvailable || !query.trim()}>
              Search
            </button>
          </div>
        </label>

        {!isSearchAvailable ? (
          <p className="search-widget__hint">
            Default search is only available inside the loaded Firefox add-on.
          </p>
        ) : null}

        {errorText ? <p className="search-widget__hint">{errorText}</p> : null}
      </form>
    </WidgetCard>
  );
}
