"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";
import { useLocalTargeting } from "@/lib/hooks/useLocalTargeting";
import Link from "next/link";
import { Code2, Globe, Sparkles, Terminal } from "lucide-react";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

interface HeroProps {
  badge?: string;
  headline?: string | React.ReactNode;
  subheadline?: string;
  visualType?: "default" | "hvac" | "marketing" | "b2b";
}

export function Hero({
  badge = "Now booking projects — Summer 2026",
  headline = (
    <>
      Modern websites <br />
      and <span className="font-serif italic text-blue text-[1.05em]">automation systems</span> <br />
      built for growing <br />
      businesses.
    </>
  ),
  subheadline = "Bayline Digital designs polished marketing sites, modernizes outdated workflows, and builds custom digital systems that make growth easier to manage.",
  visualType = "default",
}: HeroProps) {
  // Use client-side location detection
  const { badgeText, cityName } = useLocalTargeting(badge);

  // Dynamic local decoration for Ontario cities
  const decoratedHeadline =
    cityName && typeof headline === "string"
      ? headline.replace("localized websites", `${cityName} websites`)
      : headline;

  return (
    <section id="top" className="relative pt-20 pb-32">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal className="mb-7 inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-good animate-pulse" />
              {badgeText}
            </Reveal>

            <Reveal as="h1" className="m-0 text-[clamp(40px,5.8vw,80px)] leading-[0.98] tracking-[-0.035em] font-medium text-ink">
              {decoratedHeadline}
            </Reveal>

            <Reveal as="p" className="mt-9 max-w-[560px] text-[18px] leading-[1.55] text-muted">
              {subheadline}
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-3.5">
              <Button asChild>
                <Link href="#contact">
                  Start a project
                  <span aria-hidden className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/10 ml-2">→</span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={businessConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClientEvent("click_calendly", { location: "hero" })}
                >
                  Book a call
                </a>
              </Button>
            </Reveal>

            <Reveal className="mt-20 flex flex-wrap items-center gap-7 border-t border-line pt-6 text-[13px] text-muted">
              <span className="font-mono text-[11px] text-muted-2">BUILT FOR TEAMS LIKE</span>
              <div className="flex flex-wrap gap-7 text-ink-2 font-medium tracking-[-0.01em]">
                <span>Harbourview&nbsp;Co.</span>
                <span className="font-serif italic">Bluepeak&nbsp;Studio</span>
                <span className="font-bold tracking-[-0.03em]">FIELDLAB</span>
                <span className="font-mono text-[12px]">northshore/ops</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative w-full">
            <HeroShowcase visualType={visualType} cityName={cityName} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HeroShowcase({
  visualType,
  cityName,
}: {
  visualType: "default" | "hvac" | "marketing" | "b2b";
  cityName: string | null;
}) {
  const [activeTab, setActiveTab] = useState<"ide" | "ui">("ide");

  // Loop IDE to UI transition for default view
  useEffect(() => {
    if (visualType !== "default") return;
    const interval = setInterval(() => {
      setActiveTab((tab) => (tab === "ide" ? "ui" : "ide"));
    }, 4500);
    return () => clearInterval(interval);
  }, [visualType]);

  const targetCity = cityName || "Vaughan";

  // Standard IDE View Content (React source code)
  const defaultCode = `// components/harbourview.tsx
import { useState } from "react";
import { BookingEngine } from "@/lib/bookings";

export function Harbourview() {
  const [booking, setBooking] = useState({
    vessel: "Windward Express",
    guests: 4,
    time: "14:00"
  });

  return (
    <div className="card rounded-[22px] border">
      <h3>Boats, served simply.</h3>
      <div className="lighthouse-badge">
        Score: 98 · 100 · 100
      </div>
      <BookingEngine data={booking} />
    </div>
  );
}`;

  return (
    <div className="relative w-full aspect-[5/6] max-w-[500px] lg:max-w-none mx-auto">
      {/* Control Tabs (only for Default IDE/UI switcher) */}
      {visualType === "default" && (
        <div className="absolute top-[-44px] left-0 flex items-center gap-1.5 bg-bg-sunken border border-line rounded-[10px] p-1 z-20">
          <button
            onClick={() => setActiveTab("ide")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "ide" ? "bg-bg shadow-sm text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <Code2 size={12} />
            IDE Source
          </button>
          <button
            onClick={() => setActiveTab("ui")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "ui" ? "bg-bg shadow-sm text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <Globe size={12} />
            UI Browser
          </button>
        </div>
      )}

      {/* Render Default Visual Type */}
      {visualType === "default" && (
        <div className="relative w-full h-full">
          {/* IDE View Card */}
          <div
            className={`absolute inset-0 rounded-[22px] border border-line bg-[#0E1525] text-[#ECEFF4] font-mono text-[11px] shadow-lg p-5 transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] overflow-hidden flex flex-col justify-between ${
              activeTab === "ide" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#3D6CB6]" />
                  <span className="text-white/60 text-[10px]">nextjs-app-router</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
                </div>
              </div>
              <pre className="text-left text-[#A3BE8C] overflow-x-auto leading-relaxed select-none">
                <code>
                  {defaultCode.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      <span className="text-white/20 select-none mr-4 inline-block w-4 text-right">
                        {i + 1}
                      </span>
                      <span
                        className={
                          line.startsWith("//")
                            ? "text-white/40"
                            : line.includes("export") || line.includes("import") || line.includes("return")
                            ? "text-[#81A1C1]"
                            : line.includes("useState") || line.includes("setBooking")
                            ? "text-[#8FBCBB]"
                            : line.includes("class") || line.includes("div") || line.includes("h3")
                            ? "text-[#D8DEE9]"
                            : "text-[#ECEFF4]"
                        }
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] text-white/40">
              <span>UTF-8</span>
              <span className="text-good flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-good animate-ping" />
                Live compiling...
              </span>
            </div>
          </div>

          {/* Browser Preview UI */}
          <div
            className={`absolute inset-0 rounded-[22px] border border-line bg-bg-card shadow-lg flex flex-col transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] overflow-hidden ${
              activeTab === "ui" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-3.5 border-b border-line bg-bg-sunken">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <div className="ml-2 flex-1 rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
                harbourview.co
              </div>
            </div>

            <div className="px-6 py-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] text-muted-2 mb-3.5">HARBOURVIEW · HOME</div>
                <div className="text-[26px] leading-[1.05] tracking-[-0.02em] font-medium mb-4">
                  Boats, served <span className="font-serif italic text-blue">simply</span>.
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="aspect-[4/3] rounded-[10px] bg-gradient-to-br from-accent to-blue-pale flex items-center justify-center p-3 text-center">
                    <span className="text-[12px] font-mono text-ink-2 font-semibold">14:00 Express</span>
                  </div>
                  <div className="aspect-[4/3] rounded-[10px] bg-bg-sunken border border-line p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-muted-2">CAPACITY</span>
                    <span className="text-[18px] font-medium text-ink">4 Guests</span>
                  </div>
                </div>
                <div className="h-2 rounded-sm bg-bg-sunken mb-2" />
                <div className="h-2 rounded-sm bg-bg-sunken w-[70%]" />
              </div>

              <div className="mt-5 flex justify-between items-center rounded-[10px] bg-ink px-3 py-2.5 text-[12px] text-bg">
                <span className="font-mono text-[10px] opacity-70">SHIPPED</span>
                <span>3 weeks · on budget</span>
              </div>
            </div>

            {/* Floating chip */}
            <div className="absolute right-[-4%] bottom-[12%] flex items-center gap-2.5 rounded-[14px] border border-line bg-bg-card px-3.5 py-2.5 shadow-md">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue text-white text-sm">↑</span>
              <div className="text-[12px] leading-tight">
                <div className="text-muted">Lighthouse score</div>
                <div className="font-semibold text-good">98 · 100 · 100 · 100</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render HVAC Visual (CoachlyCRM Booking Flow) */}
      {visualType === "hvac" && (
        <div className="relative w-full h-full flex flex-col">
          {/* Main Dashboard Window */}
          <div className="w-full h-[75%] rounded-[22px] border border-line bg-bg-card shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-bg-sunken">
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]" />
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]" />
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]" />
              <div className="ml-2 flex-1 rounded-md border border-line bg-bg px-2.5 py-0.5 font-mono text-[10px] text-muted">
                app.coachlycrm.ca/dispatch
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] text-muted-2">ACTIVE DISPATCH BOARD</span>
                  <span className="text-[11px] text-good font-mono flex items-center gap-1 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-good animate-ping" />
                    SYSTEM ONLINE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-bg-sunken border border-line rounded-[10px] p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold">AC Repair Dispatch</div>
                      <div className="text-[10px] text-muted font-mono">{targetCity}, ON</div>
                    </div>
                    <span className="rounded-full bg-blue-pale text-blue font-mono text-[10px] px-2 py-0.5 font-medium">
                      SMS TRIGGERED
                    </span>
                  </div>
                  <div className="bg-bg-sunken border border-line rounded-[10px] p-2.5 opacity-55 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold">Scheduled Boiler PM</div>
                      <div className="text-[10px] text-muted font-mono">Richmond Hill, ON</div>
                    </div>
                    <span className="rounded-full border border-line text-muted-2 font-mono text-[10px] px-2 py-0.5">
                      COMPLETE
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-ink text-bg rounded-[12px] p-3 mt-4">
                <div className="flex justify-between items-center text-[11px] font-mono mb-1">
                  <span className="opacity-75">AUTOPILOT ACTIONS</span>
                  <span className="text-[#A3BE8C]">✓ SAVED 9.5 HRS THIS WEEK</span>
                </div>
                <div className="text-[12px]">SMS Auto-Dispatch configured for immediate response.</div>
              </div>
            </div>
          </div>

          {/* Floating Phone with Text Messaging */}
          <div className="absolute right-[-4%] bottom-[5%] w-[210px] aspect-[9/16] rounded-[24px] border-[4px] border-ink bg-bg-card shadow-xl overflow-hidden flex flex-col z-10">
            <div className="h-5 bg-ink flex justify-center items-center">
              <span className="h-1.5 w-12 rounded-full bg-bg/20" />
            </div>
            <div className="bg-bg-sunken px-3 py-2 border-b border-line flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-blue flex items-center justify-center text-white text-[10px] font-bold">
                C
              </div>
              <div className="text-[11px] leading-tight font-medium">
                <div>Coachly dispatch</div>
                <div className="text-[8px] text-muted-2 font-mono">ACTIVE NOW</div>
              </div>
            </div>

            <div className="p-2.5 flex-1 flex flex-col gap-2 justify-end text-[10.5px]">
              <div className="bg-[#E9E9EB] text-ink p-2 rounded-[12px] max-w-[85%] self-start rounded-bl-none">
                Need emergency AC fix in {targetCity}. Can you dispatch today?
              </div>
              <div className="bg-blue text-white p-2 rounded-[12px] max-w-[85%] self-end rounded-br-none">
                Hi John! Coachly dispatched. We have a crew nearby in {targetCity} at 2:00 PM. Book here: coachly.link/ac2
              </div>
              <div className="bg-[#E9E9EB] text-ink p-2 rounded-[12px] max-w-[85%] self-start rounded-bl-none">
                Awesome! Tapped and booked.
              </div>
              <div className="font-mono text-[8px] text-center text-muted-2 mt-1">
                DELIVERED · 45 SEC RESPONSE
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Marketing Visual (AutoBlogWriter Dashboard) */}
      {visualType === "marketing" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-[22px] border border-line bg-[#0B0F19] text-[#E5E9F0] shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
              <span className="h-2 w-2 rounded-full bg-[#E0DCC9]/40" />
              <div className="ml-2 flex-1 rounded-md border border-white/10 bg-black/30 px-2.5 py-0.5 font-mono text-[10px] text-white/50">
                autoblogwriter.com/project-seo
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue" />
                    <span className="font-mono text-[10px] font-semibold text-white/70">AUTOBLOGWRITER CORE</span>
                  </div>
                  <span className="text-[11px] font-mono bg-blue-pale/10 text-blue border border-blue-pale/25 rounded-full px-2 py-0.5">
                    SEO PIPELINE ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-xl border border-white/10 p-3">
                    <span className="text-white/50 text-[9px] font-mono block">ORGANIC SEARCH</span>
                    <span className="text-[20px] font-bold text-good">+280%</span>
                  </div>
                  <div className="bg-white/5 rounded-xl border border-white/10 p-3">
                    <span className="text-white/50 text-[9px] font-mono block">ARTICLES AUTO-PUBLISHED</span>
                    <span className="text-[20px] font-bold">148</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-[11.5px] font-medium text-white/80 mb-2">Topic Cluster: Local Business Marketing</div>
                  <div className="space-y-1.5 font-mono text-[9.5px] text-white/60">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span>Article: &quot;Top Contractors in {targetCity}&quot;</span>
                      <span className="text-[#A3BE8C]">● Published</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span>Internal Links Inserted</span>
                      <span>5 Links</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Schema Markup (JSON-LD)</span>
                      <span className="text-[#8FBCBB]">Generated</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-white/40 text-[10px] border-t border-white/10 pt-3">
                <span>AutoBlogWriter v2.1 API</span>
                <span>Next.js Static Hook Synced</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render B2B Visual (PermiPro Portal) */}
      {visualType === "b2b" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-[22px] border border-line bg-bg-card shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3.5 border-b border-line bg-bg-sunken">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0DCC9]" />
              <div className="ml-2 flex-1 rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
                app.permipro.ca/municipal-hub
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-muted-2">PERMIPRO HUB · WORKFLOW</span>
                  <span className="bg-[#E9E9EB] text-ink font-mono text-[10px] px-2 py-0.5 rounded-[5px]">
                    PROJECT #1042
                  </span>
                </div>

                <div className="text-[20px] font-medium tracking-tight mb-4">
                  Approval: <span className="font-serif italic text-blue">180 Main St. Portal</span>
                </div>

                {/* Flow Checklist */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 bg-bg-sunken border border-line rounded-[10px] px-3 py-2 text-[12.5px]">
                    <div className="h-4 w-4 rounded-full bg-good text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <div className="flex-1">Document Upload &amp; Cryptographic Sign</div>
                    <span className="text-[10px] font-mono text-muted-2">CONTRACTOR</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-bg-sunken border border-line rounded-[10px] px-3 py-2 text-[12.5px]">
                    <div className="h-4 w-4 rounded-full bg-good text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <div className="flex-1">Zoning Variance Clearance</div>
                    <span className="text-[10px] font-mono text-muted-2">MUNICIPALITY</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-bg-sunken border border-line rounded-[10px] px-3 py-2 text-[12.5px]">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse mx-1.5" />
                    <div className="flex-1 font-medium">Environmental Impact Verification</div>
                    <span className="rounded-[4px] bg-blue-pale text-blue text-[9px] font-mono px-1.5 py-0.5">
                      PENDING REVIEW
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-line pt-3 flex items-center justify-between text-[11px] text-muted-2 font-mono">
                <span>Role-based access: Active</span>
                <span className="text-good font-semibold">🔒 AES-256</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
