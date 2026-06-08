"use client";

import { useMemo, useState, useEffect } from "react";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

const BUDGETS = ["<10k", "10–25k", "25–60k", "60k+"] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  details: string;
  budget: (typeof BUDGETS)[number];
  customDropdownAnswer: string;
  industrySlug: string;
  utmSource: string;
  utmCampaign: string;
};

interface ContactProps {
  industrySlug?: string;
  customDropdownLabel?: string;
  customDropdownOptions?: string[];
}

export function Contact({
  industrySlug = "",
  customDropdownLabel,
  customDropdownOptions,
}: ContactProps) {
  const [data, setData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    details: "",
    budget: "10–25k",
    customDropdownAnswer: "",
    industrySlug: industrySlug,
    utmSource: "",
    utmCampaign: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Capture UTM parameters and industry context on the client side
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || "";
    const utmCampaign = params.get("utm_campaign") || "";
    
    setData((d) => ({
      ...d,
      utmSource,
      utmCampaign,
      industrySlug: industrySlug || d.industrySlug || params.get("industry") || "",
    }));
  }, [industrySlug]);

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, company: true, details: true });
    if (Object.keys(errs).length) return;
    setSubmitting(true);

    // Output submission payload to simulate lead capture database entry
    console.log("Submit Inbound Lead Capture Payload:", data);

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 900);
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
              <ContactRow label="Email" value="hello@baylinedigital.com" />
              <ContactRow label="Phone" value="+1 (416) 555-0186" />
              <ContactRow label="Hours" value="Mon–Fri · 9am–5pm ET" />
              <ContactRow label="Office" value="Toronto, ON · remote-friendly" />
            </Reveal>
          </div>

          <Reveal className="relative rounded-[20px] bg-bg-card p-8 text-ink">
            {sent ? (
              <SuccessState
                onReset={() => {
                  setSent(false);
                  setData({
                    name: "",
                    email: "",
                    company: "",
                    details: "",
                    budget: "10–25k",
                    customDropdownAnswer: customDropdownOptions?.[0] || "",
                    industrySlug: industrySlug,
                    utmSource: data.utmSource,
                    utmCampaign: data.utmCampaign,
                  });
                  setTouched({});
                }}
              />
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="mb-[18px] font-mono text-[11px] text-muted-2">
                  NEW PROJECT INQUIRY
                  {data.industrySlug && ` · FOR ${data.industrySlug.toUpperCase().replace("-", " ")}`}
                </div>

                {/* Hidden telemetry tracking fields */}
                <input type="hidden" name="industry_slug" value={data.industrySlug} />
                <input type="hidden" name="utm_source" value={data.utmSource} />
                <input type="hidden" name="utm_campaign" value={data.utmCampaign} />

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
            )}
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

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="px-2 py-5 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-pale text-[28px] text-blue font-semibold">
        ✓
      </div>
      <h3 className="m-0 text-[26px] font-medium tracking-[-0.02em] text-ink">
        Thanks — message <span className="font-serif italic text-blue">received</span>.
      </h3>
      <p className="mx-auto mt-2.5 max-w-[360px] text-[15px] leading-[1.55] text-muted">
        We&apos;ll be in touch within one business day. In the meantime, feel free to send anything that might be useful — references, current site URL, or examples you like.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-full border border-line-2 bg-transparent px-[18px] py-2.5 text-[13px] text-ink hover:border-ink cursor-pointer transition-colors"
      >
        Send another
      </button>
    </div>
  );
}
