import Link from "next/link";
import type { ServiceDetailData } from "@/lib/data/services";
import { SERVICES_DATA } from "@/lib/data/services";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { FAQList, PrimaryButton, SectionHeading } from "./editorial";
import { InquiryForm } from "./contact";
import { Breadcrumbs } from "./breadcrumbs";

export function ServicePage({ service }: { service: ServiceDetailData }) {
  const related = Object.values(SERVICES_DATA).filter((item) => item.slug !== service.slug).slice(0, 3);
  return <><Nav /><main>
    <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title, href: `/services/${service.slug}` }]} />
    <section className="service-detail-hero wrap"><div><p className="eyebrow">{service.hero.badge}</p><h1>{service.hero.headline}</h1><p>{service.hero.subheadline}</p><PrimaryButton href="#inquiry">Discuss this service</PrimaryButton></div><div className="fit-panel"><span>BEST FIT</span><h2>{service.bestFit.title}</h2><p>{service.bestFit.description}</p><ul>{service.bestFit.bullets.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="detail-section detail-dark"><div className="wrap"><SectionHeading eyebrow="WHAT THIS SOLVES" title={service.detailsTitle} description={service.detailsDescription} /><div className="editorial-rows">{service.problems.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
    <section className="detail-section wrap"><SectionHeading eyebrow="WHAT WE BUILD" title="Practical deliverables, clearly defined." /><div className="deliverable-rows">{service.deliverables.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>
    <section className="detail-section process-band"><div className="wrap"><SectionHeading eyebrow="THE WORKFLOW" title="A straightforward path from problem to launch." /><div className="process-rows">{service.howItWorks.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><div className="technical-note"><p className="eyebrow">TECHNICAL CONSIDERATIONS</p><ul>{service.bullets.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="detail-faq wrap"><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Before we get started.</h2></div><FAQList items={service.faqs} /></section>
    <section className="related-services wrap"><p className="eyebrow">RELATED SERVICES</p>{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`}><span>{item.title}</span><span aria-hidden="true">↗</span></Link>)}</section>
    <section className="inquiry-band"><div className="wrap inquiry-layout"><div><p className="eyebrow">START A CONVERSATION</p><h2>Make the first step specific.</h2><p>The service is already selected. Add the current website and a short note so Bayline can respond with useful context.</p></div><InquiryForm variant="compact" sourcePage={`/services/${service.slug}`} service={service.title} customDropdownLabel={service.ctaDropdownLabel} customDropdownOptions={service.ctaDropdownOptions} /></div></section>
  </main><Footer /></>;
}
