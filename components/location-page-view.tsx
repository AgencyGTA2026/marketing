"use client";

import { useEffect } from "react";
import { trackClientEvent } from "@/lib/analytics";

// Fires the city_landing_page_view GA4 event once on mount, with attribution
// pulled from the current URL so each city page is individually trackable.
export function LocationPageView({ city }: { city: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    trackClientEvent("city_landing_page_view", {
      city,
      page_type: "location",
      traffic_source: params.get("utm_source") || undefined,
      campaign: params.get("utm_campaign") || undefined,
      service: params.get("utm_content") || undefined,
      keyword: params.get("utm_term") || undefined,
      gclid: params.get("gclid") || undefined,
    });
  }, [city]);

  return null;
}
