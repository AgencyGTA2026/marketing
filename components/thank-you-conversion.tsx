"use client";

import { useEffect } from "react";
import { trackClientEvent } from "@/lib/analytics";

// Fires the primary lead conversion on the thank-you page. Reading city/service
// from the query string keeps attribution intact through the redirect. A
// dedicated thank-you URL makes Google Ads conversion tracking far more reliable
// than an inline success state.
export function ThankYouConversion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("bayline_confirmed_lead") !== "1") return;
      sessionStorage.removeItem("bayline_confirmed_lead");
    } catch {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const payload = {
      city: params.get("city") || undefined,
      service: params.get("service") || undefined,
      page_type: "thank_you",
    };

    trackClientEvent("generate_lead", payload);

    // Optional Google Ads conversion tag (set NEXT_PUBLIC_ADS_CONVERSION_ID,
    // e.g. "AW-XXXXXXXXX/abcDEF..."). No-op until configured.
    const conversionId = process.env.NEXT_PUBLIC_ADS_CONVERSION_ID;
    if (conversionId) {
      const w = window as Window & {
        gtag?: (command: string, name: string, params?: Record<string, unknown>) => void;
      };
      w.gtag?.("event", "conversion", { send_to: conversionId });
    }
  }, []);

  return null;
}
