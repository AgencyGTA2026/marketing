"use client";

import { useEffect, useState } from "react";

const ONTARIO_CITIES = [
  "Toronto",
  "Vaughan",
  "Richmond Hill",
  "Markham",
  "Mississauga",
  "Brampton",
  "Hamilton",
  "Ottawa",
  "London",
  "Halifax",
  "Oakville",
  "Burlington",
  "Barrie",
];

export function useLocalTargeting(defaultBadge: string) {
  const [badgeText, setBadgeText] = useState(defaultBadge);
  const [cityName, setCityName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    
    // 1. Direct location / city parameter override (easy to test)
    const directCity = params.get("city") || params.get("location");
    if (directCity) {
      const formattedCity = capitalizeWords(directCity);
      setCityName(formattedCity);
      setBadgeText(`${formattedCity} Local Business Growth`);
      return;
    }

    // 2. Parse UTM campaign name (e.g. utm_campaign=vaughan_plumbers)
    const utmCampaign = params.get("utm_campaign");
    if (utmCampaign) {
      const normalizedCampaign = utmCampaign.toLowerCase().replace(/[-_]/g, " ");
      for (const city of ONTARIO_CITIES) {
        if (normalizedCampaign.includes(city.toLowerCase())) {
          setCityName(city);
          setBadgeText(`${city} Local Business Growth`);
          return;
        }
      }
    }
  }, [defaultBadge]);

  return { badgeText, cityName };
}

function capitalizeWords(str: string): string {
  return str
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
