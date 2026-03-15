browser.runtime.onMessage.addListener((message, sender) => {
  if (!message || message.type !== "nova-tab:search" || typeof message.query !== "string") {
    return undefined;
  }

  const query = message.query.trim();
  if (!query) {
    return Promise.resolve({ ok: false, error: "empty-query" });
  }

  const tabId = sender.tab && typeof sender.tab.id === "number" ? sender.tab.id : undefined;

  return (async () => {
    try {
      if (tabId !== undefined) {
        await browser.search.search({
          query,
          tabId
        });
        return { ok: true };
      }

      await browser.search.search({
        query,
        disposition: "NEW_TAB"
      });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "search-failed"
      };
    }
  })();
});
