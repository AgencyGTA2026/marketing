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
        <section className="relative pt-24 pb-16 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="max-w-[760px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                Capabilities &amp; Tech Stack
              </Reveal>
              <Reveal as="h1" className="m-0 text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                How we build for <br />
                <span className="font-serif italic text-blue text-[1.02em]">growing businesses</span>.
              </Reveal>
              <Reveal as="p" className="mt-8 text-[18px] leading-[1.6] text-muted">
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
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <div>
                <Reveal className="font-mono text-[11px] text-muted-2 uppercase tracking-[0.12em] mb-4">ENGINEERING VALUES</Reveal>
                <Reveal as="h2" className="m-0 text-[36px] tracking-[-0.025em] leading-none font-medium mb-6">
                  Pragmatic stack, <br />
                  <span className="font-serif italic text-blue">solid foundations</span>.
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
                <div className="bg-bg-card p-6 rounded-[18px] border border-line">
                  <Code size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Frontend Interfaces</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Fast React components utilizing static optimization. Tested on diverse device viewports for a highly responsive, accessible experience.
                  </p>
                </div>
                <div className="bg-bg-card p-6 rounded-[18px] border border-line">
                  <Cpu size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Workflow Integration</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Automations powered by background queues, webhook synchronization, and API integrations with platforms like Twilio, Stripe, and Jobber.
                  </p>
                </div>
                <div className="bg-bg-card p-6 rounded-[18px] border border-line">
                  <Server size={24} className="text-blue mb-4" />
                  <h4 className="m-0 text-[16.5px] font-medium tracking-tight mb-2">Local Ontario Hosting</h4>
                  <p className="m-0 text-[13.5px] leading-relaxed text-muted">
                    Direct local hosting powered by AWS / Vercel Edge networks. Instant SSL, daily database backups, and manual server monitoring.
                  </p>
                </div>
                <div className="bg-bg-card p-6 rounded-[18px] border border-line">
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
        <section className="py-24 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8 text-center">
            <Reveal className="max-w-[600px] mx-auto">
              <h2 className="text-[32px] font-medium tracking-tight mb-4">Ready to start building?</h2>
              <p className="text-muted text-[16px] leading-[1.6] mb-8">
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
