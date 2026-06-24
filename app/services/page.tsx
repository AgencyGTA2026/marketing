import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Code, Cpu, Server, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Services | Bayline Digital",
  description: "Explore Bayline Digital services for website design, web application development, workflow automation, and managed support.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative border-b-4 border-ink bg-bg pt-20 pb-16">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="max-w-[860px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
                <span className="inline-block h-1.5 w-1.5 bg-blue" />
                Capabilities &amp; Tech Stack
              </Reveal>
              <Reveal as="h1" className="m-0 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink">
                How we build for <span className="bg-blue px-2 text-white">growth</span>
              </Reveal>
              <Reveal as="p" className="mt-8 max-w-[640px] font-mono text-[15px] leading-relaxed text-muted">
                Bayline combines strategic UX, clean engineering, and practical automation. We build
                fast custom systems, remove manual bottlenecks, and provide hands-on support without
                burying you in jargon.
              </Reveal>
            </div>
          </div>
        </section>

        {/* The core 6-card services matrix */}
        <Services />

        {/* Tech Stack deep dive section */}
        <section className="border-t-4 border-ink bg-bg-sunken py-24">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <div>
                <Reveal className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue">Engineering values</Reveal>
                <Reveal as="h2" className="m-0 mb-6 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none tracking-tighter">
                  Pragmatic stack, <span className="bg-blue px-2 text-white">solid base</span>
                </Reveal>
                <Reveal as="p" className="m-0 text-[15.5px] leading-[1.6] text-muted mb-6">
                  We don&apos;t build on unstable trends. Bayline uses a production-ready stack that
                  supports strong performance, solid security, and long-term maintainability.
                </Reveal>
                
                <div className="space-y-4">
                  <Reveal className="flex gap-3">
                    <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-ink m-0 text-[15px]">Next.js &amp; App Router</h4>
                      <p className="text-muted text-[13.5px] m-0 mt-1">Fast page delivery, strong SEO fundamentals, and flexible rendering for growth-stage marketing sites.</p>
                    </div>
                  </Reveal>
                  <Reveal className="flex gap-3">
                    <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-ink m-0 text-[15px]">Tailwind CSS</h4>
                      <p className="text-muted text-[13.5px] m-0 mt-1">Strict, clean visual layouts built on a highly consistent custom design tokens grid.</p>
                    </div>
                  </Reveal>
                  <Reveal className="flex gap-3">
                    <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-ink m-0 text-[15px]">Payload CMS (Headless)</h4>
                      <p className="text-muted text-[13.5px] m-0 mt-1">A clean headless backend that gives non-technical teams editing control without breaking the design system.</p>
                    </div>
                  </Reveal>
                </div>
              </div>

              <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-ink bg-bg-card p-6 transition-colors hover:bg-bg-sunken">
                  <Code size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Frontend Interfaces</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Fast React components utilizing static optimization. Tested on diverse device viewports for a highly responsive, accessible experience.
                  </p>
                </div>
                <div className="border-2 border-ink bg-bg-card p-6 transition-colors hover:bg-bg-sunken">
                  <Cpu size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Workflow Integration</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Automations powered by background queues, webhook synchronization, and API integrations with platforms like Twilio, Stripe, and Jobber.
                  </p>
                </div>
                <div className="border-2 border-ink bg-bg-card p-6 transition-colors hover:bg-bg-sunken">
                  <Server size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Local Ontario Hosting</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Direct local hosting powered by AWS / Vercel Edge networks. Instant SSL, daily database backups, and manual server monitoring.
                  </p>
                </div>
                <div className="border-2 border-ink bg-bg-card p-6 transition-colors hover:bg-bg-sunken">
                  <Zap size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Google Ads Quality Check</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                  Pages built to improve relevance, load speed, and conversion tracking so paid traffic performs better.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="border-t-4 border-ink bg-blue py-24 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 text-center sm:px-8">
            <Reveal className="mx-auto max-w-[680px]">
              <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-none tracking-tighter">Ready to start building?</h2>
              <p className="mb-8 font-mono text-[15px] leading-relaxed text-white/80">
                Let&apos;s discuss your project, target deadlines, and workflow bottlenecks. We&apos;ll outline a clear proposal in one business day.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Start your inquiry
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
