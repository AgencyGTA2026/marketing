import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQList, PrimaryButton, SectionHeading } from "@/components/editorial";
import { InquiryForm } from "@/components/contact";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(INDUSTRIES_DATA).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const industry = INDUSTRIES_DATA[slug]; if (!industry) return { title: "Industry Not Found | Bayline Digital" }; return buildPageMetadata({ title: industry.metaTitle, description: industry.metaDescription, path: `/industries/${slug}` }); }
export default async function IndustryPage({ params }: Props) { const { slug } = await params; const industry = INDUSTRIES_DATA[slug]; if (!industry) notFound(); const label = ({ "home-services": "Home Services", "marketing-firms": "Marketing Firms", "b2b-enterprises": "B2B Enterprises" } as Record<string, string>)[slug] ?? industry.hero.badge; return <><Nav /><main>
  <Breadcrumbs items={[{ label: "Industries", href: "/industries" }, { label, href: `/industries/${slug}` }]} />
  <section className="industry-detail-hero wrap"><div><p className="eyebrow">{industry.hero.badge}</p><h1>{industry.hero.headline}</h1></div><div><p>{industry.hero.subheadline}</p><PrimaryButton href="#inquiry">Discuss your current setup</PrimaryButton></div></section>
  <section className="detail-section detail-dark"><div className="wrap"><SectionHeading eyebrow="THE BUYING CONTEXT" title="Built around the real pressure points." /><div className="editorial-rows">{industry.industryProblems.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
  <section className="detail-section wrap"><SectionHeading eyebrow="RECOMMENDED BUILDS" title="Pages and workflows shaped for this market." /><div className="deliverable-rows">{industry.recommendedBuilds.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>
  <section className="industry-integrations"><div className="wrap"><SectionHeading eyebrow="WORKFLOW CONSIDERATIONS" title="Connect the page to the way the team works." description="Any integration depends on the tools, available API access, and the information that needs to move." /><div className="integration-rows">{industry.integrationExamples.map((item) => <article key={item.tool}><h3>{item.tool}</h3><p>{item.workflow}</p></article>)}</div></div></section>
  <section className="detail-faq wrap"><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Questions from this market.</h2></div><FAQList items={industry.faqs} /></section>
  <section className="related-services wrap"><p className="eyebrow">USEFUL SERVICES FOR {label.toUpperCase()}</p>{[{ label: "Custom websites", href: "/services/custom-websites" }, { label: "Workflow automation", href: "/services/automation" }, { label: "Custom web apps", href: "/services/web-apps" }].map((item) => <Link key={item.href} href={item.href}><span>{item.label}</span><span aria-hidden="true">↗</span></Link>)}</section>
  <section className="inquiry-band"><div className="wrap inquiry-layout"><div><p className="eyebrow">START A CONVERSATION</p><h2>Bring the current process.</h2><p>Explain what the team uses now and where the handoff breaks down. Bayline will respond with a practical next step.</p></div><InquiryForm sourcePage={`/industries/${industry.slug}`} industrySlug={industry.slug} customDropdownLabel={industry.ctaDropdownLabel} customDropdownOptions={industry.ctaDropdownOptions} /></div></section>
  </main><Footer /></>; }
