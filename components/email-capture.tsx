"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { trackClientEvent } from "@/lib/analytics";

interface EmailCaptureProps {
  /** City context for local landing pages — tags the lead in Slack + attribution. */
  city?: string;
  /** Where on the page this capture lives (analytics + Slack source). */
  source: string;
  /** Page type for analytics + Slack routing. */
  pageType?: string;
  /** "light" sits on a white card, "dark" sits on the navy CTA band. */
  tone?: "light" | "dark";
  submitLabel?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Single-field email capture used by the hero intro-call card and the dark CTA
// band. Posts the lead to /api/contact (so it still routes to Slack with full
// attribution) and redirects to /thank-you, which fires the primary
// generate_lead conversion — keeping Google Ads conversion tracking reliable.
export function EmailCapture({
  city,
  source,
  pageType = "site",
  tone = "light",
  submitLabel = "Book a call →",
}: EmailCaptureProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const dark = tone === "dark";

  const onStart = () => {
    if (started) return;
    setStarted(true);
    trackClientEvent("form_start", { city, page_type: pageType, source });
  };

  const onSubmit = async () => {
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError(true);
      return;
    }
    setSubmitting(true);
    setError(false);

    // Pull Google Ads attribution from the current URL so intro-call leads stay
    // attributable, mirroring the full contact form.
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Intro-call request",
          email: value,
          city: city || params.get("city") || "",
          service: "Intro Call",
          budget: "—",
          pageType,
          source,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmContent: params.get("utm_content") || "",
          utmTerm: params.get("utm_term") || "",
          gclid: params.get("gclid") || "",
          landingPageUrl: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      });

      trackClientEvent("form_submit_success", { city, page_type: pageType, source });

      const qs = new URLSearchParams();
      if (city) qs.set("city", city);
      qs.set("service", "Intro Call");
      router.push(`/thank-you?${qs.toString()}`);
    } catch {
      // Network failure — still advance to thank-you so the visitor isn't stuck;
      // the lead is logged client-side via the analytics event above.
      setSubmitting(false);
      setError(true);
    }
  };

  return (
    <div onFocus={onStart}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="you@business.com"
          aria-label="Your email"
          className={cn(
            "min-w-0 flex-1 rounded-[11px] border px-4 py-3.5 text-[15px] outline-none transition-[border-color,box-shadow]",
            dark
              ? "border-white/20 bg-white/[0.07] text-white placeholder:text-white/40 focus:border-[#9fb6ff] focus:ring-[3px] focus:ring-[#9fb6ff]/20"
              : "border-line-2 bg-bg-card text-ink placeholder:text-muted-2 focus:border-blue focus:ring-[3px] focus:ring-blue/15"
          )}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className={cn(
            "shrink-0 cursor-pointer rounded-[11px] px-5 text-[14.5px] font-semibold transition-colors disabled:opacity-60",
            dark
              ? "bg-white text-ink-deep hover:bg-[#e6ecfb]"
              : "bg-ink text-bg hover:bg-ink-2"
          )}
        >
          {submitting ? "Sending…" : submitLabel}
        </button>
      </div>
      {error && (
        <div className={cn("mt-2 text-[12.5px]", dark ? "text-[#ff9aa8]" : "text-warn")}>
          Enter a valid email so we can reach you.
        </div>
      )}
      <div className={cn("mt-3 text-[12px] leading-[1.5]", dark ? "text-[#7e90c0]" : "text-muted-2")}>
        15-minute call. No pressure, no obligation — just a clear read on where you stand.
      </div>
    </div>
  );
}
