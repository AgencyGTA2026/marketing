import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) {
    return {
      title: "Service Details | Bayline Digital",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main>
        <Hero
          badge={service.hero.badge}
          headline={service.hero.headline}
          subheadline={service.hero.subheadline}
          visualType={service.hero.visualType}
        />

        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="01 — What this solves"
              title={service.detailsTitle}
              sub={service.detailsDescription}
            />

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {service.problems.map((problem, index) => (
                <Reveal key={problem.title} className="border-2 border-ink bg-bg-card p-6">
                  <div className="mb-5 font-mono text-[11px] text-muted-2">0{index + 1}</div>
                  <h3 className="m-0 mb-3 text-[20px] font-medium tracking-[-0.01em] text-ink">{problem.title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{problem.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-4 border-ink py-24 bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="02 — What we build"
              title="Practical deliverables, not vague strategy."
              sub="Each service ends with working pages, systems, or integrations your team can actually use after launch."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {service.deliverables.map((deliverable) => (
                <Reveal key={deliverable.title} className="flex min-h-[300px] flex-col border-2 border-ink bg-bg-card p-7">
                  <h3 className="m-0 mb-3 text-[22px] font-medium tracking-[-0.015em]">{deliverable.title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{deliverable.description}</p>
                  <ul className="mt-6 list-none border-t-2 border-ink pt-5 pl-0">
                    {deliverable.bullets.map((bullet) => (
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

        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="03 — How it works"
              title="A focused path from problem to launch."
              sub="The process stays narrow enough to move quickly, but structured enough that scope and ownership are clear."
            />

            <div className="mt-14 overflow-hidden border-2 border-ink bg-ink">
              <div className="grid grid-cols-1 gap-px md:grid-cols-3">
                {service.howItWorks.map((step, index) => (
                  <Reveal key={step.title} className="min-h-[240px] bg-bg-card p-7">
                    <div className="mb-6 font-mono text-[11px] text-muted-2">STEP 0{index + 1}</div>
                    <h3 className="m-0 mb-3 text-[21px] font-medium tracking-[-0.01em]">{step.title}</h3>
                    <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{step.description}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t-4 border-ink py-24 bg-bg">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">04 — Best fit</Reveal>
              <Reveal as="h2" className="m-0 text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
                {service.bestFit.title}
              </Reveal>
              <Reveal as="p" className="m-0 mt-6 text-[16px] leading-[1.65] text-muted">
                {service.bestFit.description}
              </Reveal>
            </div>

            <Reveal className="border-2 border-ink bg-bg-card p-8">
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">A good fit when</div>
              <ul className="m-0 list-none p-0">
                {service.bestFit.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 border-t-2 border-ink py-4 text-[15px] text-ink-2 first:border-t-0 first:pt-0 last:pb-0">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto w-full max-w-[960px] px-8">
            <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">05 — FAQ</Reveal>
            <Reveal as="h2" className="m-0 text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
              Common questions about {service.title.toLowerCase()}.
            </Reveal>

            <div className="mt-12 divide-y-2 divide-ink border-2 border-ink bg-bg-card">
              {service.faqs.map((faq) => (
                <Reveal key={faq.question} className="p-6">
                  <h3 className="m-0 text-[18px] font-medium tracking-[-0.01em]">{faq.question}</h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.65] text-muted">{faq.answer}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Contact
          industrySlug={`service-${service.slug}`}
          customDropdownLabel={service.ctaDropdownLabel}
          customDropdownOptions={service.ctaDropdownOptions}
        />
      </main>
      <Footer />
    </>
  );
}
