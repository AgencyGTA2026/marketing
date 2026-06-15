"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";
import { SERVICE_OPTIONS } from "@/lib/data/locations";
import { SELECT_SERVICE_EVENT } from "./service-cta";

const BUDGETS = ["<1k", "1-5k", "5-10k", "10-25k", "25-50k", "50k+"] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  city: string;
  service: string;
  details: string;
  budget: (typeof BUDGETS)[number];
  customDropdownAnswer: string;
  industrySlug: string;
  // Ads attribution (hidden)
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  landingPageUrl: string;
  referrer: string;
  firstVisit: string;
};

interface ContactProps {
  industrySlug?: string;
  customDropdownLabel?: string;
  customDropdownOptions?: string[];
  /** City context for local landing pages — shows City + Service fields and tags the lead. */
  city?: string;
  /** Pre-selected service (e.g. from the ad group / anchor). */
  service?: string;
  /** Page type for analytics + Slack routing. */
  pageType?: string;
}

// Maps a service anchor id (from a URL hash) to a SERVICE_OPTIONS label.
function serviceFromAnchor(hash: string): string {
  const id = hash.replace(/^#/, "");
  const match: Record<string, string> = {
    "custom-websites": "Custom Websites",
    "website-redesigns": "Website Redesign",
    "local-seo": "Local SEO",
    "automation-systems": "Automation Systems",
    "custom-apps": "Custom Apps",
    "hosting-support": "Hosting & Support",
  };
  return match[id] || "";
}

export function Contact({
  industrySlug = "",
  customDropdownLabel,
  customDropdownOptions,
  city = "",
  service = "",
  pageType = "site",
}: ContactProps) {
  const router = useRouter();
  const isLocal = pageType === "location" || !!city;

  const [data, setData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    city: city,
    service: service || (isLocal ? SERVICE_OPTIONS[0] : ""),
    details: "",
    budget: "<1k",
    customDropdownAnswer: "",
    industrySlug: industrySlug,
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
    gclid: "",
    landingPageUrl: "",
    referrer: "",
    firstVisit: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Capture full Google Ads attribution + page context on the client side
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    // Persist the very first landing URL/timestamp across the visit.
    let firstVisit = "";
    let landingPageUrl = window.location.href;
    try {
      firstVisit = window.localStorage.getItem("bayline_first_visit") || "";
      if (!firstVisit) {
        firstVisit = new Date().toISOString();
        window.localStorage.setItem("bayline_first_visit", firstVisit);
      }
      const storedLanding = window.localStorage.getItem("bayline_landing_url");
      if (!storedLanding) {
        window.localStorage.setItem("bayline_landing_url", landingPageUrl);
      } else {
        landingPageUrl = storedLanding;
      }
    } catch {
      // localStorage unavailable (private mode) — fall back to live values.
    }

    const utmContent = params.get("utm_content") || "";
    const attributedService =
      service ||
      serviceFromAnchor(window.location.hash) ||
      (utmContent ? serviceFromAnchor(`#${utmContent.replace(/_/g, "-")}`) : "");

    setData((d) => ({
      ...d,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent,
      utmTerm: params.get("utm_term") || "",
      gclid: params.get("gclid") || "",
      referrer: document.referrer || "",
      landingPageUrl,
      firstVisit,
      city: city || d.city || params.get("city") || "",
      service: attributedService || d.service || (isLocal ? SERVICE_OPTIONS[0] : ""),
      industrySlug: industrySlug || d.industrySlug || params.get("industry") || "",
    }));
  }, [industrySlug, city, service, isLocal]);

  // Let a service-section CTA pre-select the service in the form.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const next = (e as CustomEvent<string>).detail;
      if (next && SERVICE_OPTIONS.includes(next)) {
        setData((d) => ({ ...d, service: next }));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, handler);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, handler);
  }, []);

  // Set default selection for dynamic dropdown
  useEffect(() => {
    if (customDropdownOptions && customDropdownOptions.length > 0) {
      setData((d) => ({
        ...d,
        customDropdownAnswer: d.customDropdownAnswer || customDropdownOptions[0],
      }));
    }
  }, [customDropdownOptions]);

  const errs = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) e.name = "Please enter your name";
    if (!data.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "That email looks off";
    if (!data.details.trim() || data.details.trim().length < 12) e.details = "Tell us a little more (12+ chars)";
    return e;
  }, [data]);

  const setField = <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [k]: e.target.value }));

  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));

  // Fire form_start once, on the first interaction with any field.
  const onStart = () => {
    if (started) return;
    setStarted(true);
    trackClientEvent("form_start", eventParams());
  };

  // Shared attribution parameters attached to every analytics event.
  const eventParams = (extra: Record<string, unknown> = {}) => ({
    city: data.city || undefined,
    service: data.service || undefined,
    page_type: pageType,
    traffic_source: data.utmSource || undefined,
    campaign: data.utmCampaign || undefined,
    keyword: data.utmTerm || undefined,
    gclid: data.gclid || undefined,
    ...extra,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, company: true, details: true });
    if (Object.keys(errs).length) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pageType }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      // Funnel event only; /thank-you fires the primary generate_lead conversion.
      trackClientEvent("form_submit_success", eventParams({ budget: data.budget }));
      trackClientEvent("form_submit", { company: data.company, budget: data.budget });

      // Redirect to the dedicated thank-you page for reliable Ads conversion tracking.
      const qs = new URLSearchParams();
      if (data.city) qs.set("city", data.city);
      if (data.service) qs.set("service", data.service);
      router.push(`/thank-you${qs.toString() ? `?${qs.toString()}` : ""}`);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to send inquiry. Please try again or email contact@baylinedigital.com directly.");
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 border-t border-line">
      <div className="absolute inset-x-4 inset-y-[60px] z-0 rounded-[22px] bg-ink md:inset-x-8 md:rounded-[28px]" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8">
        <div className="grid grid-cols-1 gap-14 px-7 py-12 text-bg md:grid-cols-2 md:gap-14 md:px-14 md:py-[72px]">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg/55">
                <span className="h-px w-6 bg-bg/35" />
                06 — Contact
              </div>
            </Reveal>
            <Reveal as="h2" className="m-0 mt-5 mb-6 text-[clamp(34px,4.4vw,56px)] tracking-[-0.03em] leading-none font-medium text-bg">
              Let&apos;s map out <br />your <span className="font-serif italic text-accent">next build</span>.
            </Reveal>
            <Reveal as="p" className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-bg/70">
              Have a website, campaign funnel, app idea, or internal workflow that needs an upgrade?
              Tell Bayline what you&apos;re working on and we&apos;ll respond within one business day.
            </Reveal>

            <Reveal className="mt-10 flex flex-col gap-[18px]">
              <ContactRow label="Email" value={businessConfig.email} />
              <ContactRow label="Phone" value={businessConfig.phone} />
              <ContactRow label="Hours" value={businessConfig.hours} />
              <ContactRow label="Office" value={businessConfig.office} />
            </Reveal>

            <Reveal className="mt-8">
              <p className="text-[14.5px] text-bg/60 m-0 leading-relaxed">
                Prefer to schedule immediately?{" "}
                <a
                  href={businessConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClientEvent("click_calendly", { location: "contact_sidebar" })}
                  className="text-accent underline font-medium hover:text-white transition-colors"
                >
                  Book a 30-min video call ↗
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal className="relative rounded-[20px] bg-bg-card p-8 text-ink">
              <form onSubmit={submit} noValidate onFocus={onStart}>
                <div className="mb-[18px] font-mono text-[11px] text-muted-2">
                  NEW PROJECT INQUIRY
                  {data.city
                    ? ` · ${data.city.toUpperCase()}`
                    : data.industrySlug && ` · FOR ${data.industrySlug.toUpperCase().replace("-", " ")}`}
                </div>

                {/* Hidden attribution tracking fields */}
                <input type="hidden" name="industry_slug" value={data.industrySlug} />
                <input type="hidden" name="utm_source" value={data.utmSource} />
                <input type="hidden" name="utm_medium" value={data.utmMedium} />
                <input type="hidden" name="utm_campaign" value={data.utmCampaign} />
                <input type="hidden" name="utm_content" value={data.utmContent} />
                <input type="hidden" name="utm_term" value={data.utmTerm} />
                <input type="hidden" name="gclid" value={data.gclid} />
                <input type="hidden" name="landing_page_url" value={data.landingPageUrl} />
                <input type="hidden" name="referrer" value={data.referrer} />
                <input type="hidden" name="first_visit" value={data.firstVisit} />

                <Field
                  label="Name"
                  id="name"
                  value={data.name}
                  onChange={setField("name")}
                  onBlur={blur("name")}
                  err={touched.name ? errs.name : undefined}
                  placeholder="Your name"
                />
                
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={setField("email")}
                  onBlur={blur("email")}
                  err={touched.email ? errs.email : undefined}
                  placeholder="you@company.com"
                />
                
                <Field
                  label="Company"
                  id="company"
                  value={data.company}
                  onChange={setField("company")}
                  onBlur={blur("company")}
                  placeholder="Optional"
                />

                {isLocal && (
                  <>
                    <Field
                      label="City"
                      id="city"
                      value={data.city}
                      onChange={setField("city")}
                      placeholder="Your city"
                    />

                    <div className="mt-4">
                      <Label htmlFor="service">Service interested in</Label>
                      <div className="mt-2 relative">
                        <select
                          id="service"
                          value={data.service}
                          onChange={setField("service")}
                          className="flex h-12 w-full rounded-xl border border-line-2 bg-bg px-3.5 py-2.5 text-[14.5px] text-ink focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5 transition-[border-color,box-shadow]"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-4">
                  <Label>Budget range</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setData((d) => ({ ...d, budget: b }))}
                        className={cn(
                          "rounded-full border px-3.5 py-2 text-[13px] transition-all cursor-pointer",
                          data.budget === b
                            ? "border-ink bg-ink text-bg"
                            : "border-line-2 bg-transparent text-ink-2 hover:border-ink-2"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Industry Dynamic Questionnaire Dropdown */}
                {customDropdownLabel && customDropdownOptions && (
                  <div className="mt-4">
                    <Label htmlFor="custom-dropdown">{customDropdownLabel}</Label>
                    <div className="mt-2 relative">
                      <select
                        id="custom-dropdown"
                        value={data.customDropdownAnswer}
                        onChange={setField("customDropdownAnswer")}
                        className="flex h-12 w-full rounded-xl border border-line-2 bg-bg px-3.5 py-2.5 text-[14.5px] text-ink focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5 transition-[border-color,box-shadow]"
                      >
                        {customDropdownOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <Field
                  label="Project details"
                  id="details"
                  textarea
                  value={data.details}
                  onChange={setField("details")}
                  onBlur={blur("details")}
                  err={touched.details ? errs.details : undefined}
                  placeholder="A few sentences about your project, timeline, and what success looks like."
                />

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-[11px] text-muted-2">
                    {Object.keys(errs).length === 0
                      ? "Ready to send"
                      : `${Object.keys(errs).length} field${Object.keys(errs).length > 1 ? "s" : ""} need attention`}
                  </div>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Send inquiry"}
                    <span aria-hidden className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/10 ml-2">→</span>
                  </Button>
                </div>
              </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-bg/10 pb-3.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-bg/55">{label}</span>
      <span className="text-[15px] text-bg font-medium">{value}</span>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  err?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}

function Field({ label, id, value, onChange, onBlur, err, placeholder, type, textarea }: FieldProps) {
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        {err && (
          <span className="text-[11px] text-warn font-sans normal-case tracking-normal">{err}</span>
        )}
      </div>
      <div className="mt-2">
        {textarea ? (
          <Textarea
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            aria-invalid={!!err}
            rows={4}
          />
        ) : (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            aria-invalid={!!err}
          />
        )}
      </div>
    </div>
  );
}
