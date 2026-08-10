"use client";

import { useEffect } from "react";
import { trackClientEvent } from "@/lib/analytics";

export function ToolAnalytics({ slug }: { slug: string }) {
  useEffect(() => {
    trackClientEvent("free_tool_view", { tool: slug });
  }, [slug]);

  return null;
}
