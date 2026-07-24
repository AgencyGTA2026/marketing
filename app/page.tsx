import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClosingCTA, PrimaryButton, SectionHeading } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Bayline Digital | Websites, Conversion & Automation",
  description: "Modern websites and practical automation for growing small businesses across Ontario.",
  alternates: { canonical: "/" },
};

const improvements = [
  { number: "01", title: "Look established", description: "A modern website that explains what you do quickly, feels credible, and gives every service a clear place to live.", details: "Website design · Development · Local SEO" },
  { number: "02", title: "Make the next step obvious", description: "Focused pages, stronger offers, and simpler quote paths that turn more of the right visitors into real conversations.", details: "Landing pages · Copy direction · Conversion tracking" },
  { number: "03", title: "Follow up without the scramble", description: "Connect your forms, inbox, CRM, and team so new inquiries receive a useful response while the opportunity is still warm.", details: "Lead automation · CRM connections · Internal tools" },
];

export default function Home() {
  return <><Nav /><main>
    <section className="home-hero wrap" id="top">
      <div className="hero-intro"><p>WEB DESIGN &amp; AUTOMATION FOR GROWING BUSINESSES</p><span>TORONTO · ONTARIO</span></div>
      <h1>A better website makes your business <span>easier to choose.</span></h1>
      <div className="hero-bottom"><p>Bayline designs clear, conversion-focused websites and connects the follow-up systems behind them. Fewer missed opportunities. Less manual work.</p><div className="hero-actions"><PrimaryButton href="/contact">Get a free homepage review</PrimaryButton><a className="text-link" href="#work">Explore our services ↓</a></div></div>
    </section>
    <section className="statement-band"><div className="wrap statement-inner"><p>Good design earns attention.</p><p>Clear thinking earns trust.</p><p>Fast follow-up wins the work.</p></div></section>
    <section className="home-work wrap" id="work"><div className="home-section-title"><p className="eyebrow">WHAT WE ACTUALLY IMPROVE</p><h2>From first impression to first reply.</h2></div><div className="service-list">{improvements.map((item) => <article className="service-row" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><div><p>{item.description}</p><small>{item.details}</small></div></article>)}</div></section>
    <section className="automation-band"><div className="wrap automation-layout"><div><p className="eyebrow">AFTER SOMEONE CLICKS “SUBMIT”</p><h2>Your website should keep working.</h2><p className="automation-lede">Most websites stop at the form. Bayline can connect what happens next, without forcing your team into a complicated new platform.</p></div><div className="sequence">{[["1","A new inquiry arrives","The useful details are captured once."],["2","The customer gets a real response","Helpful next steps go out immediately."],["3","Your team knows what to do","The lead and follow-up task reach the right place."]].map(([n,t,c]) => <div className="sequence-item" key={n}><span>{n}</span><div><strong>{t}</strong><p>{c}</p></div></div>)}</div></div></section>
    <section className="home-approach wrap"><SectionHeading eyebrow="WHY BAYLINE" title="A small team by design." description="You work directly with the people planning and building the project. No sales-to-production handoff. No mystery around what you own." /><div className="principles">{[["01","Clear scope","Practical recommendations, transparent deliverables, and a clear reason behind each decision."],["02","Direct access","Short communication lines with the people doing the strategy, design, and development."],["03","Your foundation","You own the finished work, and it is built to remain useful as the business changes."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <ClosingCTA eyebrow="NOT SURE WHERE TO START?" title="Show us what you have." copy="We will review your current homepage and point out the first thing we would improve. No hard pitch and no 40-page report." linkLabel="Request your free review" />
  </main><Footer /></>;
}
