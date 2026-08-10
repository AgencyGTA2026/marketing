import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClosingCTA } from "@/components/editorial";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({ title: "Industries We Serve | Bayline Digital", description: "Website, automation, and digital system work shaped for home services, marketing firms, and B2B teams.", path: "/industries" });
export default function IndustriesPage() { return <><Nav /><main><Breadcrumbs items={[{ label: "Industries", href: "/industries" }]} /><section className="page-hero wrap"><p className="eyebrow">INDUSTRIES</p><h1>Different businesses need different digital systems.</h1><p>The foundation stays clear and dependable. The message, workflow, integrations, and priorities change with the way your team works.</p></section><section className="industry-index wrap">{Object.values(INDUSTRIES_DATA).map((industry, index) => <article key={industry.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><p className="eyebrow">{industry.hero.badge}</p><h2>{industry.hero.headline}</h2></div><div><p>{industry.hero.subheadline}</p><Link className="text-link" href={`/industries/${industry.slug}`}>Explore this industry <span aria-hidden="true">↗</span></Link></div></article>)}</section><ClosingCTA title="Start with your operating reality." copy="Share the current site, the tools your team uses, and the point where work is getting stuck." /></main><Footer /></>; }
