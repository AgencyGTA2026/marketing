import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
        
        <Services 
          customOrder={industry.servicesOrder}
          customizations={industry.servicesCustomizations}
        />

        <WhyUs 
          painPoints={industry.painPoints} 
        />

        <Process />

        <Work 
          featuredProjectSlug={industry.featuredProjectSlug} 
        />

        <About />

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
