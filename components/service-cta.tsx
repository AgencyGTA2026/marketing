"use client";

import { ArrowRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics";

export const SELECT_SERVICE_EVENT = "bayline:select-service";

interface ServiceCtaProps {
  /** Service label, must match a SERVICE_OPTIONS value so the form select updates. */
  service: string;
  label: string;
  city?: string;
}

// Scrolls to the contact form (via href="#contact") and tells the form which
// service to pre-select, so a click in a service section flows straight into a
// pre-filled inquiry.
export function ServiceCta({ service, label, city }: ServiceCtaProps) {
  return (
    <a
      href="#contact"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }));
        trackClientEvent("service_section_click", { service, city, page_type: "location" });
      }}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-medium text-bg transition-transform hover:-translate-y-px"
    >
      {label}
      <ArrowRight size={14} />
    </a>
  );
}
