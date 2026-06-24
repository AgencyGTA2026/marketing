"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

/**
 * Brutal announcement strip — a dismissible top bar (Tonne-style) that sits
 * above the sticky header and scrolls away. Drives to a booked call.
 */
export function AnnouncementBar() {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;

  return (
    <div className="relative border-b-2 border-ink bg-blue text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-3 px-10 py-2.5 text-center text-sm font-bold">
        <span className="hidden border border-white/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider sm:inline">
          New
        </span>
        <span className="uppercase tracking-tight">2 build slots left for Summer 2026.</span>
        <a
          href={businessConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClientEvent("click_calendly", { location: "announcement_bar" })}
          className="group inline-flex items-center gap-1 font-black uppercase underline underline-offset-4"
        >
          Book a call
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 -translate-y-1/2 p-1 transition-colors hover:bg-white/15"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
