export function trackClientEvent(eventType: string, payload: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    const windowWithGtag = window as Window & {
      gtag?: (command: string, name: string, params?: Record<string, unknown>) => void;
    };
    
    if (windowWithGtag.gtag) {
      windowWithGtag.gtag("event", eventType, payload);
    } else {
      // Stub output in development
      if (process.env.NODE_ENV !== "production") {
        console.info("[Analytics:Gtag Stub]", eventType, payload);
      }
    }
  }
}
