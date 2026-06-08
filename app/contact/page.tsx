import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Contact Us | Bayline Digital",
  description: "Get in touch with Bayline Digital to discuss a website redesign, custom web app, or workflow automation project.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="relative pt-20 pb-8">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="max-w-[760px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                Start a conversation
              </Reveal>
              <Reveal as="h1" className="m-0 text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                Let&apos;s discuss <br />
                your <span className="font-serif italic text-blue text-[1.02em]">business goals</span>.
              </Reveal>
              <Reveal as="p" className="mt-6 text-[17px] leading-[1.6] text-muted">
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
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Reveal className="font-mono text-[11.5px] text-muted-2 uppercase tracking-[0.12em] mb-4">WHAT TO EXPECT</Reveal>
                <h3 className="text-[24px] font-medium tracking-tight mb-6">How Bayline kicks things off</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white font-mono text-[12px] shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">Brief Intake Review</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We review your current site, tools, and business context before the first call so every minute is useful.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white font-mono text-[12px] shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">30-Minute Video Intro</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We align on bottlenecks, scope, budget, and timing. The goal is shared clarity, not pressure.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white font-mono text-[12px] shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold text-ink m-0 text-[16px]">Fixed-Price Proposal</h4>
                      <p className="text-muted text-[14px] m-0 mt-1">We send a transparent proposal outlining deliverables, timeline, and commercial structure.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Reveal className="font-mono text-[11.5px] text-muted-2 uppercase tracking-[0.12em] mb-4">COMMON INQUIRIES</Reveal>
                <h3 className="text-[24px] font-medium tracking-tight mb-6">Frequently asked questions</h3>

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
