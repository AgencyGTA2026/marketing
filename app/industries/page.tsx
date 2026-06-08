import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Shield, Brain, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Industries We Serve | Bayline Digital",
  description: "Explore Bayline Digital solutions for home services, marketing firms, and B2B teams that need stronger websites and smarter workflows.",
};

const INDUSTRIES = [
  {
    slug: "b2b-enterprises",
    title: "B2B Enterprises & SaaS",
    desc: "Custom applications, multi-tenant dashboards, secure data portals, and legacy system integrations designed to consolidate spreadsheets.",
    icon: Shield,
    badge: "Custom Apps & Security",
    project: "PermiPro Core Case Study",
  },
  {
    slug: "marketing-firms",
    title: "Marketing & SEO Firms",
    desc: "Automated media pipelines and programmatic content generation engines designed to scale search rankings and lower campaign CPA.",
    icon: Brain,
    badge: "Automation & Scalability",
    project: "AutoBlogWriter Core Case Study",
  },
  {
    slug: "home-services",
    title: "Local Trades & Home Services",
    desc: "High-performance localized marketing websites featuring SMS lead-intake auto-responders and dispatch CRM integrations.",
    icon: Zap,
    badge: "Local SEO & SMS Lead Capture",
    project: "CoachlyCRM Core Case Study",
  },
];

export default function IndustriesIndexPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="relative pt-24 pb-16 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="max-w-[760px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                Industry Targeting
              </Reveal>
              <Reveal as="h1" className="m-0 text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                Solutions tailored for <br />
                <span className="font-serif italic text-blue text-[1.02em]">your specific market</span>.
              </Reveal>
              <Reveal as="p" className="mt-8 text-[18px] leading-[1.6] text-muted">
                Bayline adapts the same disciplined design and engineering process to very different
                operating realities. Choose your sector to see how we shape messaging, workflows,
                and systems around the way your business actually runs.
              </Reveal>
            </div>
          </div>
        </section>

        {/* Industry Cards Grid */}
        <section className="pb-32 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Reveal
                    key={ind.slug}
                    className="group relative flex flex-col justify-between rounded-[22px] border border-line bg-bg-card p-8 shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-md"
                  >
                    <Link href={`/industries/${ind.slug}`} className="absolute inset-0 z-10" aria-label={`View ${ind.title} solutions`} />
                    
                    <div>
                      <div className="flex items-center justify-between mb-8 relative z-20">
                        <span className="rounded-full border border-blue-pale bg-blue-pale/40 px-2.5 py-1 font-mono text-[10px] text-blue font-medium">
                          {ind.badge}
                        </span>
                        <div className="h-8 w-8 rounded-full border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-bg transition-colors duration-200">
                          <Icon size={14} />
                        </div>
                      </div>

                      <h3 className="m-0 text-[24px] font-medium tracking-tight mb-3 relative z-20">
                        {ind.title}
                      </h3>
                      <p className="m-0 text-[14.5px] leading-[1.6] text-muted mb-6 relative z-20">
                        {ind.desc}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-line mt-6 flex justify-between items-center relative z-20">
                      <span className="font-mono text-[10.5px] text-muted-2">
                        {ind.project}
                      </span>
                      <span className="text-blue font-medium flex items-center gap-1 text-[13.5px]">
                        Explore
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
