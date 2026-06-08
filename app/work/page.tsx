import { Nav } from "@/components/nav";
import { Work } from "@/components/work";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Work & Systems | Bayline Digital",
  description: "Browse Bayline Digital case studies covering shipped SaaS products, internal tools, and client automation systems.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-24 pb-12 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="max-w-[760px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                Proof of Execution
              </Reveal>
              <Reveal as="h1" className="m-0 text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                SaaS products and <br />
                <span className="font-serif italic text-blue text-[1.02em]">operational software</span>.
              </Reveal>
              <Reveal as="p" className="mt-8 text-[18px] leading-[1.6] text-muted">
                Bayline focuses on shipped work, not speculative decks. We design, launch, and
                support real-world software products that handle active users, payments, and
                automation flows every day.
              </Reveal>
            </div>
          </div>
        </section>

        {/* Core Case Studies component */}
        <Work />

        {/* Enterprise trust bar */}
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal className="bg-bg-card p-7 rounded-[20px] border border-line">
                <div className="font-mono text-[10px] text-muted-2 uppercase tracking-[0.12em] mb-4">PRODUCTION TESTING</div>
                <h3 className="text-[18px] font-medium tracking-tight mb-2">Real User Load</h3>
                <p className="text-muted text-[13.5px] leading-relaxed m-0">
                  Every featured product reflects patterns we trust in production. We test layouts,
                  workflows, and endpoints before recommending them to clients.
                </p>
              </Reveal>

              <Reveal className="bg-bg-card p-7 rounded-[20px] border border-line">
                <div className="font-mono text-[10px] text-muted-2 uppercase tracking-[0.12em] mb-4">SECURITY &amp; COMPLIANCE</div>
                <h3 className="text-[18px] font-medium tracking-tight mb-2">Strict Access Control</h3>
                <p className="text-muted text-[13.5px] leading-relaxed m-0">
                  Security is treated as infrastructure, not polish. We implement strong
                  authentication and granular permissions in the systems that need them.
                </p>
              </Reveal>

              <Reveal className="bg-bg-card p-7 rounded-[20px] border border-line">
                <div className="font-mono text-[10px] text-muted-2 uppercase tracking-[0.12em] mb-4">AGILE CYCLES</div>
                <h3 className="text-[18px] font-medium tracking-tight mb-2">Weekly Continuous Integration</h3>
                <p className="text-muted text-[13.5px] leading-relaxed m-0">
                  We ship in steady iterations and bring that same execution rhythm to Bayline
                  client projects.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8 text-center">
            <Reveal className="max-w-[600px] mx-auto">
              <h2 className="text-[32px] font-medium tracking-tight mb-4">Have a custom tool in mind?</h2>
              <p className="text-muted text-[16px] leading-[1.6] mb-8">
                Let&apos;s discuss how to transition your manual operations, spreadsheets, or slow legacy flows into a beautiful, secure custom web app.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Discuss a project
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
