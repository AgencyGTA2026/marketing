"use client";

import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

interface MobileStickyCTAProps {
  city?: string;
}

// Sticky bottom action bar shown on mobile only. Primary = book audit (scrolls
// to the contact form), secondary = tap-to-call. Hidden on md+ where the CTAs
// are already visible above the fold.
export function MobileStickyCTA({ city }: MobileStickyCTAProps) {
  const tel = businessConfig.phone.replace(/[^\d+]/g, "");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t-2 border-ink bg-bg-card px-4 py-3 md:hidden">
      <a
        href="#contact"
        onClick={() => trackClientEvent("book_call_click", { city, page_type: "location", location: "mobile_sticky" })}
        className="flex flex-1 items-center justify-center border-2 border-ink bg-blue px-4 py-3 text-[14px] font-black uppercase tracking-tight text-white"
      >
        Book Free Audit
      </a>
      <a
        href={`tel:${tel}`}
        onClick={() => trackClientEvent("phone_click", { city, page_type: "location", location: "mobile_sticky" })}
        className="flex items-center justify-center border-2 border-ink bg-bg px-5 py-3 text-[14px] font-black uppercase tracking-tight text-ink"
      >
        Call
      </a>
    </div>
  );
}
