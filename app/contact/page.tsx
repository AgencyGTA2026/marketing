import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact Us | Bayline Digital",
  description: "Get in touch with Bayline Digital to discuss a website redesign, custom web app, or workflow automation project.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="relative border-b-4 border-ink pt-20 pb-12">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="max-w-[860px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
                <span className="inline-block h-1.5 w-1.5 bg-blue" />
                Start a conversation
              </Reveal>
              <Reveal as="h1" className="m-0 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink">
                Discuss your <span className="bg-blue px-2 text-white">goals</span>
              </Reveal>
              <Reveal as="p" className="mt-6 max-w-[640px] font-mono text-[15px] leading-relaxed text-muted">
                Bayline will review your inquiry and reply with scheduling availability or
                clarifying questions within one business day. No hard pitch, just practical next
                steps.
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact form section */}
        <Contact />

        {/* Frequently asked questions / onboarding info */}
        <section className="border-t-4 border-ink bg-bg-sunken py-24">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Reveal className="mb-4 font-mono text-[11.5px] font-bold uppercase tracking-[0.2em] text-blue">What to expect</Reveal>
                <h3 className="mb-6 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight">How Bayline kicks things off</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-blue text-white font-mono text-[12px] font-bold shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">Brief Intake Review</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We review your current site, tools, and business context before the first call so every minute is useful.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-blue text-white font-mono text-[12px] font-bold shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">30-Minute Video Intro</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We align on bottlenecks, scope, budget, and timing. The goal is shared clarity, not pressure.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-blue text-white font-mono text-[12px] font-bold shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">Fixed-Price Proposal</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We send a transparent proposal outlining deliverables, timeline, and commercial structure.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Reveal className="mb-4 font-mono text-[11.5px] font-bold uppercase tracking-[0.2em] text-blue">Common inquiries</Reveal>
                <h3 className="mb-6 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight">Frequently asked questions</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink m-0 text-[15px]">Do you work with templates or page builders?</h4>
                    <p className="text-muted text-[13.5px] m-0 mt-1">No. Bayline builds every application and marketing site on custom code with a structured design system and, when needed, a headless CMS for editing control.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink m-0 text-[15px]">What are your standard project timelines?</h4>
                    <p className="text-muted text-[13.5px] m-0 mt-1">High-performance localized marketing websites typically ship in 4 weeks. Custom web apps and multi-tenant systems require 6 to 12 weeks, depending on authentication and integration complexity.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink m-0 text-[15px]">Who actually writes the code for my project?</h4>
                    <p className="text-muted text-[13.5px] m-0 mt-1">You work directly with senior people who design, build, and launch the project. Bayline keeps the communication line short on purpose.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
