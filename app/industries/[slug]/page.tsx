import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { SERVICES_DATA } from "@/lib/data/services";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SERVICE_SLUG_BY_NUMBER: Record<string, keyof typeof SERVICES_DATA> = {
  "01": "custom-websites",
  "02": "landing-pages",
  "03": "web-apps",
  "04": "automation",
  "05": "seo",
  "06": "maintenance",
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES_DATA[slug];
  if (!industry) {
    return {
      title: "Industry Landing Page | Bayline Digital",
    };
  }

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
  };
}

export default async function IndustryLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = INDUSTRIES_DATA[slug];

  if (!industry) {
    notFound();
  }

  const recommendedServices = industry.servicesOrder.flatMap((serviceNumber) => {
    const serviceSlug = SERVICE_SLUG_BY_NUMBER[serviceNumber];
    const service = serviceSlug ? SERVICES_DATA[serviceSlug] : undefined;
    if (!service) return [];

    const customization = industry.servicesCustomizations[serviceNumber];
    return [{
      number: serviceNumber,
      slug: serviceSlug,
      title: customization?.title ?? service.title,
      blurb: customization?.blurb ?? service.hero.subheadline,
      bullets: customization?.bullets ?? service.bullets.slice(0, 3),
    }];
  });

  return (
    <>
      <Nav />
      <main>
        <Hero
          badge={industry.hero.badge}
          headline={industry.hero.headline}
          subheadline={industry.hero.subheadline}
          visualType={industry.hero.visualType}
        />

        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="01 — Market problems"
              title="Built around the real buying context."
              sub="These pages are written for the operational pressures, search intent, and ad traffic patterns in this market."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1">
                {industry.industryProblems.map((problem, index) => (
                  <Reveal key={problem.title} className="rounded-[18px] border border-line bg-bg-card p-6 shadow-sm">
                    <div className="mb-5 font-mono text-[11px] text-muted-2">0{index + 1}</div>
                    <h3 className="m-0 mb-3 text-[20px] font-medium tracking-[-0.01em] text-ink">{problem.title}</h3>
                    <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{problem.description}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="rounded-[22px] border border-line bg-bg-card p-7 shadow-sm">
                <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">For SEO and ads</div>
                <div className="space-y-6">
                  {industry.adLandingBenefits.map((benefit) => (
                    <div key={benefit.title} className="border-t border-line pt-5 first:border-t-0 first:pt-0">
                      <h3 className="m-0 mb-2 text-[18px] font-medium tracking-[-0.01em]">{benefit.title}</h3>
                      <p className="m-0 text-[14px] leading-[1.6] text-muted">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-line bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="02 — Systems we build"
              title="Pages and workflows shaped for this industry."
              sub="The work is practical: clearer page structure, better intake paths, cleaner systems, and fewer manual handoffs."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
              {industry.recommendedBuilds.map((build) => (
                <Reveal key={build.title} className="flex min-h-[300px] flex-col rounded-[20px] border border-line bg-bg-card p-7 shadow-sm">
                  <h3 className="m-0 mb-3 text-[22px] font-medium tracking-[-0.015em]">{build.title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{build.description}</p>
                  <ul className="mt-6 list-none border-t border-line pt-5 pl-0">
                    {build.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 py-1.5 text-[13.5px] leading-snug text-ink-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="03 — Recommended services"
              title="A focused service mix for this market."
              sub="Each card links to a deeper service page, but the order and copy are tuned to this industry."
            />

            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedServices.map((service) => (
                <Reveal key={service.slug} className="group relative flex min-h-[300px] flex-col rounded-[20px] border border-line bg-bg-card p-7 shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-md">
                  <Link href={`/services/${service.slug}`} className="absolute inset-0 z-30" aria-label={`Learn more about ${service.title}`} />
                  <div className="relative z-20 flex items-start justify-between">
                    <span className="font-mono text-[11px] text-muted-2">{service.number}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-bg">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <h3 className="relative z-20 mt-10 mb-2.5 text-[21px] font-medium tracking-[-0.015em]">{service.title}</h3>
                  <p className="relative z-20 m-0 text-[14.5px] leading-[1.55] text-muted">{service.blurb}</p>
                  <ul className="relative z-20 mt-5 list-none border-t border-line pt-4 pl-0">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 py-1.5 text-[13px] text-ink-2">
                        <span className="mt-px text-blue">—</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-line bg-bg">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">04 — Integrations</Reveal>
              <Reveal as="h2" className="m-0 text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
                Connect the page to the way the business runs.
              </Reveal>
              <Reveal as="p" className="m-0 mt-6 text-[16px] leading-[1.65] text-muted">
                A useful landing page should not end at a form submission. It should help route the next step into the tools and workflows your team already uses.
              </Reveal>
            </div>

            <div className="divide-y divide-line rounded-[20px] border border-line bg-bg-card">
              {industry.integrationExamples.map((example) => (
                <Reveal key={example.tool} className="grid grid-cols-1 gap-3 p-6 md:grid-cols-[180px_1fr]">
                  <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-blue">{example.tool}</div>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{example.workflow}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[960px] px-8">
            <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">05 — FAQ</Reveal>
            <Reveal as="h2" className="m-0 text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
              Questions this industry page should answer.
            </Reveal>

            <div className="mt-12 divide-y divide-line rounded-[20px] border border-line bg-bg-card">
              {industry.faqs.map((faq) => (
                <Reveal key={faq.question} className="p-6">
                  <h3 className="m-0 text-[18px] font-medium tracking-[-0.01em]">{faq.question}</h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.65] text-muted">{faq.answer}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Contact
          industrySlug={industry.slug}
          customDropdownLabel={industry.ctaDropdownLabel}
          customDropdownOptions={industry.ctaDropdownOptions}
        />
      </main>
      <Footer />
    </>
  );
}
