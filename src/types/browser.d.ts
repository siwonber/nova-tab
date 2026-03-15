export {};

declare global {
  interface Window {
    browser?: {
      runtime?: {
        sendMessage: (message: Record<string, unknown>) => Promise<{
          ok: boolean;
          error?: string;
        }>;
      };
      storage?: {
        local?: {
          get: (key: string) => Promise<Record<string, unknown>>;
          set: (value: Record<string, unknown>) => Promise<void>;
        };
      };
      search?: {
        get?: () => Promise<Array<{ name: string; isDefault: boolean }>>;
        search?: (searchProperties: {
          query: string;
          engine?: string;
          disposition?: "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";
          tabId?: number;
        }) => Promise<void>;
      };
    };
  }
}
