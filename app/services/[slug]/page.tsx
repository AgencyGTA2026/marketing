import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
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
        {/* Dynamic Hero */}
        <Hero
          badge={service.hero.badge}
          headline={service.hero.headline}
          subheadline={service.hero.subheadline}
          visualType={service.hero.visualType}
        />

        {/* Detailed Service Checklist */}
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div>
                <Reveal className="font-mono text-[11px] text-muted-2 uppercase tracking-[0.12em] mb-4">SERVICE DEEP-DIVE</Reveal>
                <Reveal as="h2" className="m-0 text-[36px] tracking-[-0.025em] leading-none font-medium mb-6">
                  {service.detailsTitle}
                </Reveal>
                <Reveal as="p" className="m-0 text-[16px] leading-[1.65] text-muted">
                  {service.detailsDescription}
                </Reveal>
              </div>

              <div className="flex flex-col justify-center">
                <Reveal className="font-mono text-[11px] text-muted-2 uppercase tracking-[0.12em] mb-5">WHAT IS INCLUDED</Reveal>
                <div className="space-y-4">
                  {service.bullets.map((bullet) => (
                    <Reveal key={bullet} className="flex gap-3.5 bg-bg-card p-4 rounded-xl border border-line">
                      <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
                      <span className="text-[14.5px] leading-snug text-ink-2 font-medium">
                        {bullet}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlighted Project matching the service capability */}
        <Work featuredProjectSlug={service.featuredProjectSlug} />

        {/* Dynamic Contact intake Form */}
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
