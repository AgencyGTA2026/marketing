import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClosingCTA, SectionHeading } from "@/components/editorial";
import { SERVICES_DATA } from "@/lib/data/services";

export const metadata: Metadata = { title: "Web Design, SEO & Automation Services | Bayline Digital", description: "Explore custom websites, landing pages, web apps, automation, SEO, and ongoing support from Bayline Digital.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  const services = Object.values(SERVICES_DATA);
  return <><Nav /><main>
    <section className="page-hero wrap"><p className="eyebrow">SERVICES</p><h1>Build the part that is holding growth back.</h1><p>Bayline combines clear websites, focused conversion paths, and practical systems. Start with the bottleneck, not a long list of technology.</p></section>
    <section className="services-index wrap"><div className="service-index-list">{services.map((service, index) => <article className="service-index-row" key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><p className="eyebrow">{service.title}</p><h2>{service.hero.headline}</h2></div><div><p>{service.problems[0]?.description}</p><ul>{service.deliverables.map((item) => <li key={item.title}>{item.title}</li>)}</ul><Link className="text-link" href={`/services/${service.slug}`}>Explore {service.title.toLowerCase()} <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
    <section className="guidance-band"><div className="wrap guidance-layout"><SectionHeading eyebrow="START WITH THE BOTTLENECK" title="The right scope starts with the actual problem." description="A new website is useful when trust is the issue. A landing page helps when paid traffic is unfocused. Automation matters when good inquiries are getting lost after submit." /><div className="four-steps">{[["01","Review","Understand the current site, tools, traffic, and handoffs."],["02","Prioritize","Choose the smallest useful scope that addresses the bottleneck."],["03","Build","Design, develop, connect, and test the working system."],["04","Handoff","Launch with clear ownership and an understood support path."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></div></section>
    <section className="ownership wrap"><SectionHeading eyebrow="HOW BAYLINE WORKS" title="Clear ownership. Direct communication." /><div className="principle-rows">{[["No mystery handoff","Work directly with the people planning and building the project."],["Useful after launch","The foundation is structured so it can keep changing with the business."],["Your finished work","The code, content, and completed project belong to you."]].map(([t,c]) => <article key={t}><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <ClosingCTA title="Bring us the bottleneck." copy="Share the current site or workflow. Bayline will help identify the first useful project, without making the scope larger than it needs to be." />
  </main><Footer /></>;
}
