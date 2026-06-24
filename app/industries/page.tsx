import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Shield, Brain, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries We Serve | Bayline Digital",
  description: "Explore Bayline Digital solutions for home services, marketing firms, and B2B teams that need stronger websites and smarter workflows.",
  alternates: {
    canonical: "/industries",
  },
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
        <section className="relative border-b-4 border-ink bg-bg pt-20 pb-16">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="max-w-[860px]">
              <Reveal className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
                <span className="inline-block h-1.5 w-1.5 bg-blue" />
                Industry Targeting
              </Reveal>
              <Reveal as="h1" className="m-0 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink">
                Built for <span className="bg-blue px-2 text-white">your market</span>
              </Reveal>
              <Reveal as="p" className="mt-8 max-w-[640px] font-mono text-[15px] leading-relaxed text-muted">
                Bayline adapts the same disciplined design and engineering process to very different
                operating realities. Choose your sector to see how we shape messaging, workflows,
                and systems around the way your business actually runs.
              </Reveal>
            </div>
          </div>
        </section>

        {/* Industry Cards Grid */}
        <section className="bg-bg px-5 pb-32 sm:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid grid-cols-1 border-2 border-ink md:grid-cols-3">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Reveal
                    key={ind.slug}
                    className="group relative -mt-px -ml-px flex flex-col justify-between border-2 border-ink bg-bg-card p-8 transition-colors duration-150 hover:bg-ink hover:text-bg"
                  >
                    <Link href={`/industries/${ind.slug}`} className="absolute inset-0 z-10" aria-label={`View ${ind.title} solutions`} />

                    <div>
                      <div className="relative z-20 mb-8 flex items-center justify-between">
                        <span className="border-2 border-ink bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-white group-hover:border-bg">
                          {ind.badge}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center border-2 border-ink group-hover:border-bg">
                          <Icon size={16} strokeWidth={2.5} />
                        </div>
                      </div>

                      <h3 className="relative z-20 m-0 mb-3 font-display text-2xl font-black uppercase leading-tight tracking-tight">
                        {ind.title}
                      </h3>
                      <p className="relative z-20 m-0 mb-6 font-mono text-[13px] leading-snug opacity-80">
                        {ind.desc}
                      </p>
                    </div>

                    <div className="relative z-20 mt-6 flex items-center justify-between border-t-2 border-current/25 pt-5">
                      <span className="font-mono text-[10.5px] font-bold uppercase opacity-70">
                        {ind.project}
                      </span>
                      <span className="flex items-center gap-1 text-[13px] font-black uppercase tracking-tight">
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
