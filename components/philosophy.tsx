"use client";

import { ShieldCheck, Zap, Cpu } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 bg-bg border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <SectionHeader
          eyebrow="01 — Philosophy"
          title={
            <>
              Built on <span className="font-serif italic text-blue">trust</span> and performance.
            </>
          }
          sub="Small businesses live and die by their local reputation. We believe digital partnerships should be built on the same foundations of transparency, clarity, and accountability."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Pillar 1: Trust & Accountability (The Core Highlighted Pillar) */}
          <Reveal className="lg:col-span-1 group relative flex flex-col rounded-[22px] border-2 border-blue bg-blue-pale/20 p-8 shadow-md transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-lg">
            {/* Top Badge */}
            <div className="absolute top-4 right-4 rounded-full bg-blue px-3 py-1 font-mono text-[9px] font-bold tracking-wider text-bg uppercase">
              Core Foundation
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/15 text-blue">
                <ShieldCheck size={26} />
              </span>
              <div>
                <span className="font-mono text-[11px] text-blue font-bold tracking-widest block uppercase">Pillar 01</span>
                <h3 className="text-[22px] font-semibold text-ink tracking-tight">Trust &amp; Accountability</h3>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-2 font-medium">
              Trust is the absolute currency of local commerce. We build it two ways: by operating with complete transparency (100% code ownership and direct builder access), and by engineering fast, beautiful websites that make your customers trust you the moment they land on your page.
            </p>

            <div className="mt-8 border-t border-blue/20 pt-6 space-y-5 flex-1">
              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-bg text-[11px] font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-[14.5px] font-semibold text-ink m-0">100% Code Ownership</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    No hostage-hosting or vendor lock-in. You own all custom Next.js source code, assets, and hosting configurations from day one.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-bg text-[11px] font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-[14.5px] font-semibold text-ink m-0">Customer-Facing Credibility</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    Your site is your digital storefront. We build modern, high-speed, and secure designs that make customers feel safe calling you.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-bg text-[11px] font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-[14.5px] font-semibold text-ink m-0">Direct Builder Access</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    No account managers or communication filters. You work directly with the senior engineers designing and coding your system.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pillar 2: Speed & Conversion */}
          <Reveal className="group relative flex flex-col rounded-[22px] border border-line bg-bg-card p-8 shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-sunken text-blue border border-line transition-colors duration-300 group-hover:bg-blue group-hover:text-bg group-hover:border-blue">
                <Zap size={24} />
              </span>
              <div>
                <span className="font-mono text-[11px] text-muted-2 block uppercase tracking-wider">Pillar 02</span>
                <h3 className="text-[22px] font-medium text-ink tracking-tight">Speed &amp; Conversion</h3>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              We build supersonic React/Next.js pages that eliminate click bounces and turn local search traffic into paid customers.
            </p>

            <div className="mt-8 border-t border-line pt-6 space-y-5 flex-1">
              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">Sub-Second Load Times</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    Every second saved is a customer retained. Our sites achieve Google Lighthouse performance scores of 95+.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">Clarity &amp; Copywriting</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    We write simple, persuasive copy that communicates your business value instantly. No confusing jargon.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">Mobile-First Engineering</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    Over 65% of local searches happen on mobile. We craft custom-responsive touchpoints for smaller screens.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pillar 3: Operational Utility */}
          <Reveal className="group relative flex flex-col rounded-[22px] border border-line bg-bg-card p-8 shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-sunken text-blue border border-line transition-colors duration-300 group-hover:bg-blue group-hover:text-bg group-hover:border-blue">
                <Cpu size={24} />
              </span>
              <div>
                <span className="font-mono text-[11px] text-muted-2 block uppercase tracking-wider">Pillar 03</span>
                <h3 className="text-[22px] font-medium text-ink tracking-tight">Operational Utility</h3>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              We design tools that eliminate operational friction, automate manual administration, and connect your business stack.
            </p>

            <div className="mt-8 border-t border-line pt-6 space-y-5 flex-1">
              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">No-Friction Automations</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    Auto-sync leads, bookings, and alerts between your site, SMS dispatch engines, CRM spreadsheets, and Slack.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">Neighborhood Local SEO</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    Structured local schema markup and Google Business optimization to rank high in the maps where customers search.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-sunken text-ink-2 border border-line text-[11px] mt-0.5">
                  —
                </span>
                <div>
                  <h4 className="text-[14.5px] font-medium text-ink m-0">Tailored Content Control</h4>
                  <p className="text-muted text-[13.5px] m-0 mt-1">
                    We structure intuitive Payload CMS interfaces to let your staff update inventory, pricing, or blogs instantly.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
