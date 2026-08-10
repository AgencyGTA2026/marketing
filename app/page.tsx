import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClosingCTA, PrimaryButton, SectionHeading } from "@/components/editorial";
import { SelectedWork } from "@/components/selected-work";
import { FreeToolsPreview } from "@/components/free-tools-preview";
import { Reviews } from "@/components/reviews";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Websites & Custom Web Apps | Bayline Digital",
  description: "Bayline Digital designs conversion-focused websites and builds useful custom web apps for growing businesses across Ontario.",
  path: "/",
});

const improvements = [
  { number: "01", title: "Win trust sooner", description: "Conversion-focused websites that explain your value quickly, feel credible, and give customers a clear next step.", details: "Marketing websites · Landing pages · Local SEO", href: "/services/custom-websites", linkLabel: "Explore custom websites" },
  { number: "02", title: "Turn an idea into a useful product", description: "Custom web apps that turn a focused idea into a working product, portal, or platform people can actually use.", details: "SaaS products · Client portals · Customer experiences", href: "/services/web-apps", linkLabel: "Explore custom web apps" },
  { number: "03", title: "Replace the workarounds", description: "Internal tools and connected workflows that replace spreadsheet fixes, scattered handoffs, and repeated admin.", details: "Dashboards · Workflow automation · CRM integrations", href: "/services/automation", linkLabel: "Explore workflow automation" },
];

export default function Home() {
  return <><Nav /><main>
    <section className="home-hero wrap" id="top">
      <div className="hero-intro"><p>WEBSITES &amp; WEB APPS FOR GROWING BUSINESSES</p><span>TORONTO · ONTARIO</span></div>
      <h1>Better websites. Useful web apps. <span>Built around your business.</span></h1>
      <div className="hero-bottom"><p>Bayline designs conversion-focused websites, builds custom web apps, and connects the systems behind them. Stronger first impressions. Simpler workflows. Less manual work.</p><div className="hero-actions"><PrimaryButton href="/contact">Talk through your project</PrimaryButton><a className="text-link" href="#work">View selected work ↓</a></div><p className="response-promise"><span aria-hidden="true" /> Personal reply within one business day.</p></div>
    </section>
    <section className="statement-band"><div className="wrap statement-inner"><p>Clear websites earn trust.</p><p>Focused apps remove friction.</p><p>Connected systems save time.</p></div></section>
    <Reviews />
    <section className="home-work wrap" id="services"><div className="home-section-title"><p className="eyebrow">WHAT WE BUILD</p><h2>From your public presence to the systems behind the work.</h2></div><div className="service-list">{improvements.map((item) => <article className="service-row" key={item.number}><span>{item.number}</span><h3><Link href={item.href}>{item.title}</Link></h3><div><p>{item.description}</p><small>{item.details}</small><Link className="service-row-link" href={item.href}>{item.linkLabel} <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
    <FreeToolsPreview />
    <SelectedWork />
    <section className="automation-band"><div className="wrap automation-layout"><div><p className="eyebrow">WHEN OFF-THE-SHELF SOFTWARE DOES NOT FIT</p><h2>Build the tool your workflow is missing.</h2><p className="automation-lede">Some problems do not need a larger software suite. Bayline builds focused web apps, portals, dashboards, and integrations around the way your team already works.</p></div><div className="sequence">{[["1","Start with the bottleneck","Map the repeated work, handoff, or customer experience that needs to improve."],["2","Build the smallest useful tool","Focus on the screens and workflows that create immediate value."],["3","Connect it to the business","Integrate the data, permissions, and systems the tool needs to keep working."]].map(([n,t,c]) => <div className="sequence-item" key={n}><span>{n}</span><div><strong>{t}</strong><p>{c}</p></div></div>)}</div></div></section>
    <section className="home-approach wrap"><SectionHeading eyebrow="WHY BAYLINE" title="A small team by design." description="You work directly with the people planning and building the project. No sales-to-production handoff. No mystery around what you own." /><div className="principles">{[["01","Clear scope","Practical recommendations, transparent deliverables, and a clear reason behind each decision."],["02","Direct access","Short communication lines with the people doing the strategy, design, and development."],["03","Your foundation","You own the finished work, and it is built to remain useful as the business changes."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <ClosingCTA eyebrow="HAVE A SITE TO IMPROVE OR AN APP TO BUILD?" title="Bring us the bottleneck." copy="Share the current website, the workflow slowing you down, or the product idea you want to bring to life. We will reply with a practical first step." linkLabel="Talk through your project" />
  </main><Footer /></>;
}
