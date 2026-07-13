"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { businessConfig } from "@/lib/data/business";
import { SERVICE_OPTIONS } from "@/lib/data/locations";
import { trackClientEvent } from "@/lib/analytics";

const BUDGETS = ["", "Under $5k", "$5k–$10k", "$10k–$25k", "$25k+"] as const;

type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  city: string;
  service: string;
  budget: string;
  details: string;
  customDropdownAnswer: string;
  industrySlug: string;
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  landingPageUrl: string;
  referrer: string;
  firstVisit: string;
  websiteFax: string;
};

export type InquiryFormProps = {
  variant?: "full" | "compact";
  sourcePage: string;
  city?: string;
  service?: string;
  industrySlug?: string;
  heading?: string;
  customDropdownLabel?: string;
  customDropdownOptions?: string[];
};

export function InquiryForm({
  variant = "full",
  sourcePage,
  city = "",
  service = "",
  industrySlug = "",
  heading,
  customDropdownLabel,
  customDropdownOptions,
}: InquiryFormProps) {
  const router = useRouter();
  const viewed = useRef(false);
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<{ type: "error" | "idle"; message: string }>({ type: "idle", message: "" });
  const [data, setData] = useState<FormData>({
    name: "", email: "", company: "", website: "", city, service,
    budget: "", details: "", customDropdownAnswer: customDropdownOptions?.[0] ?? "",
    industrySlug, sourcePage, utmSource: "", utmMedium: "", utmCampaign: "",
    utmContent: "", utmTerm: "", gclid: "", landingPageUrl: "", referrer: "",
    firstVisit: "", websiteFax: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let firstVisit = "";
    let landingPageUrl = window.location.href;
    try {
      firstVisit = localStorage.getItem("bayline_first_visit") || new Date().toISOString();
      localStorage.setItem("bayline_first_visit", firstVisit);
      landingPageUrl = localStorage.getItem("bayline_landing_url") || landingPageUrl;
      localStorage.setItem("bayline_landing_url", landingPageUrl);
    } catch {}

    setData((current) => ({
      ...current,
      city: city || params.get("city") || current.city,
      service: service || current.service,
      sourcePage: sourcePage || window.location.pathname,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      utmTerm: params.get("utm_term") || "",
      gclid: params.get("gclid") || "",
      landingPageUrl,
      referrer: document.referrer,
      firstVisit,
    }));

    if (!viewed.current) {
      viewed.current = true;
      trackClientEvent("form_view", { source_page: sourcePage, city: city || undefined, service: service || undefined });
    }
  }, [city, service, sourcePage]);

  useEffect(() => {
    const selectService = (event: Event) => {
      const selectedService = (event as CustomEvent<string>).detail;
      if (SERVICE_OPTIONS.includes(selectedService)) setData((current) => ({ ...current, service: selectedService }));
    };
    window.addEventListener("bayline:select-service", selectService);
    return () => window.removeEventListener("bayline:select-service", selectService);
  }, []);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!data.name.trim()) next.name = "Enter your name.";
    if (!data.email.trim()) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email address.";
    if (data.website && !/^https?:\/\//i.test(data.website)) next.website = "Include http:// or https://.";
    return next;
  }, [data]);

  const eventContext = () => ({
    source_page: data.sourcePage,
    city: data.city || undefined,
    service: data.service || undefined,
    page_type: industrySlug ? "industry" : city ? "location" : sourcePage.includes("services/") ? "service" : "site",
    traffic_source: data.utmSource || undefined,
    campaign: data.utmCampaign || undefined,
    gclid: data.gclid || undefined,
  });

  const update = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((current) => ({ ...current, [field]: event.target.value }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, website: true });
    setStatus({ type: "idle", message: "" });
    if (Object.keys(errors).length) {
      trackClientEvent("form_validation_error", { ...eventContext(), fields: Object.keys(errors).join(",") });
      return;
    }

    setSubmitting(true);
    trackClientEvent("form_submit", eventContext());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Delivery was not confirmed");

      trackClientEvent("form_submit_success", eventContext());
      trackClientEvent("form_success", eventContext());
      try { sessionStorage.setItem("bayline_confirmed_lead", "1"); } catch {}
      const params = new URLSearchParams();
      if (data.city) params.set("city", data.city);
      if (data.service) params.set("service", data.service);
      router.push(`/thank-you${params.size ? `?${params}` : ""}`);
    } catch {
      setStatus({ type: "error", message: `We could not confirm delivery. Try again or email ${businessConfig.email}.` });
      trackClientEvent("form_error", eventContext());
      setSubmitting(false);
    }
  }

  function onStart() {
    if (started.current) return;
    started.current = true;
    trackClientEvent("form_start", eventContext());
  }

  const compact = variant === "compact";
  return (
    <form className={`inquiry-form ${compact ? "inquiry-form-compact" : ""}`} id="inquiry" onSubmit={submit} onFocus={onStart} noValidate>
      <div className="form-heading">
        <span>{compact ? "FREE HOMEPAGE REVIEW" : "NEW PROJECT INQUIRY"}</span>
        <h2>{heading ?? (compact ? "Tell us where to look." : "Tell us what you are working on.")}</h2>
      </div>
      <FormField label="Name" id={`${sourcePage}-name`} error={touched.name ? errors.name : undefined}>
        <input id={`${sourcePage}-name`} value={data.name} onChange={update("name")} onBlur={() => setTouched((v) => ({ ...v, name: true }))} autoComplete="name" />
      </FormField>
      <FormField label="Work email" id={`${sourcePage}-email`} error={touched.email ? errors.email : undefined}>
        <input id={`${sourcePage}-email`} type="email" value={data.email} onChange={update("email")} onBlur={() => setTouched((v) => ({ ...v, email: true }))} autoComplete="email" />
      </FormField>
      {!compact && <FormField label="Company (optional)" id={`${sourcePage}-company`}><input id={`${sourcePage}-company`} value={data.company} onChange={update("company")} autoComplete="organization" /></FormField>}
      <FormField label="Current website (optional)" id={`${sourcePage}-website`} error={touched.website ? errors.website : undefined}>
        <input id={`${sourcePage}-website`} type="url" value={data.website} onChange={update("website")} onBlur={() => setTouched((v) => ({ ...v, website: true }))} placeholder="https://" inputMode="url" />
      </FormField>
      <FormField label="Service interest" id={`${sourcePage}-service`}>
        <select id={`${sourcePage}-service`} value={data.service} onChange={update("service")}>
          <option value="">Not sure yet</option>
          {data.service && !SERVICE_OPTIONS.includes(data.service) && <option value={data.service}>{data.service}</option>}
          {SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </FormField>
      {!compact && <FormField label="Budget range (optional)" id={`${sourcePage}-budget`}><select id={`${sourcePage}-budget`} value={data.budget} onChange={update("budget")}>{BUDGETS.map((option) => <option key={option} value={option}>{option || "Select a range"}</option>)}</select></FormField>}
      {customDropdownLabel && customDropdownOptions && <FormField label={customDropdownLabel} id={`${sourcePage}-custom`}><select id={`${sourcePage}-custom`} value={data.customDropdownAnswer} onChange={update("customDropdownAnswer")}>{customDropdownOptions.map((option) => <option key={option}>{option}</option>)}</select></FormField>}
      <FormField className="form-wide" label="Project note (optional)" id={`${sourcePage}-details`}><textarea id={`${sourcePage}-details`} rows={compact ? 3 : 5} value={data.details} onChange={update("details")} placeholder="A sentence or two is plenty." /></FormField>
      <div className="honeypot" aria-hidden="true"><label htmlFor={`${sourcePage}-fax`}>Fax</label><input id={`${sourcePage}-fax`} tabIndex={-1} autoComplete="off" value={data.websiteFax} onChange={update("websiteFax")} /></div>
      <button className="form-submit form-wide" type="submit" disabled={submitting}>{submitting ? "Sending..." : compact ? "Request my free review" : "Send inquiry"}<span aria-hidden="true">↗</span></button>
      <div className="form-status form-wide" role="status" aria-live="polite">{status.type === "error" ? status.message : ""}</div>
    </form>
  );
}

function FormField({ label, id, error, className = "", children }: { label: string; id: string; error?: string; className?: string; children: React.ReactNode }) {
  return <div className={`form-field ${className}`}><label htmlFor={id}>{label}</label>{children}{error && <p className="field-error">{error}</p>}</div>;
}

type ContactProps = Omit<InquiryFormProps, "sourcePage" | "variant"> & { pageType?: string };

export function Contact(props: ContactProps) {
  return (
    <section className="inquiry-band" id="contact">
      <div className="wrap inquiry-layout">
        <div><p className="eyebrow">START A CONVERSATION</p><h2>A useful first step, without the hard pitch.</h2><p>Share the current website or the problem you are trying to solve. Bayline will reply with practical next steps.</p></div>
        <InquiryForm {...props} sourcePage={typeof props.pageType === "string" ? props.pageType : "inquiry"} />
      </div>
    </section>
  );
}
