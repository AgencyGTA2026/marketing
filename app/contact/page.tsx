import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/contact";
import { FAQList } from "@/components/editorial";
import { businessConfig } from "@/lib/data/business";

export const metadata: Metadata = { title: "Contact Bayline Digital | Start a Project", description: "Tell Bayline Digital about your website, automation, SEO, or custom app project.", alternates: { canonical: "/contact" } };

const faqs = [
  { question: "Can you improve an existing website?", answer: "Yes. Bayline can review the current foundation and recommend a focused redesign, landing page, or rebuild based on what is actually limiting the site." },
  { question: "Who will work on the project?", answer: "You work directly with the people planning, designing, and building the work. Bayline keeps communication lines short on purpose." },
  { question: "Will we own the finished work?", answer: "Yes. The finished website or application and its content are yours, with a clear handoff at launch." },
];

export default function ContactPage() {
  return <><Nav /><main>
    <section className="contact-hero wrap"><div><p className="eyebrow">START A CONVERSATION</p><h1>Tell us what needs to work better.</h1><p>Share the current website, the bottleneck, or the idea. Bayline will review it and reply with practical next steps.</p><dl><div><dt>Email</dt><dd><a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a></dd></div><div><dt>Phone</dt><dd><a href={`tel:${businessConfig.phone.replace(/[^\d+]/g, "")}`}>{businessConfig.phone}</a></dd></div><div><dt>Hours</dt><dd>{businessConfig.hours}</dd></div><div><dt>Schedule</dt><dd><a href={businessConfig.calendlyUrl}>Book a 30-minute call ↗</a></dd></div></dl></div><InquiryForm sourcePage="/contact" /></section>
    <section className="next-steps"><div className="wrap"><div className="section-heading"><p className="eyebrow">WHAT HAPPENS NEXT</p><h2>A simple start.</h2></div><div className="step-rows">{[["01","We review the context","We look at the site, tools, and note before suggesting a call."],["02","We clarify the scope","A short conversation establishes priorities, timing, and fit."],["03","You get a clear proposal","The deliverables, timeline, ownership, and price are written down."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></div></section>
    <section className="contact-faq wrap"><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Before you send the note.</h2></div><FAQList items={faqs} /></section>
  </main><Footer /></>;
}
