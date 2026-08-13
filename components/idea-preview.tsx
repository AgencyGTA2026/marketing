import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Logo } from "@/components/logo";
import type { ProspectIdea } from "@/lib/data/ideas";

type IdeaPalette = CSSProperties & {
  "--concept-ink": string;
  "--concept-paper": string;
  "--concept-accent": string;
  "--concept-soft": string;
  "--concept-white": string;
};

export function IdeaPreview({ idea }: { idea: ProspectIdea }) {
  const palette = {
    "--concept-ink": idea.concept.palette.ink,
    "--concept-paper": idea.concept.palette.paper,
    "--concept-accent": idea.concept.palette.accent,
    "--concept-soft": idea.concept.palette.soft,
    "--concept-white": idea.concept.palette.white,
  } as IdeaPalette;

  return (
    <div className="idea-shell">
      <header className="idea-banner">
        <a href="https://www.baylinedigital.com" aria-label="Bayline Digital home">
          <Logo />
        </a>
        <p>
          Concept prepared for <strong>{idea.company}</strong>
          <span aria-hidden="true" />
          {idea.preparedOn}
        </p>
        <div>
          {idea.walkthroughUrl && (
            <a href={idea.walkthroughUrl} target="_blank" rel="noreferrer">
              <Play size={11} fill="currentColor" /> Walkthrough
            </a>
          )}
          <a className="idea-banner-cta" href={idea.bookingUrl}>Discuss this idea <ArrowUpRight size={13} /></a>
        </div>
      </header>

      <main className="prospect-site" style={palette}>
        <header className="prospect-nav">
          <a className="prospect-brand" href="#top" aria-label={`${idea.concept.brandName} concept home`}>
            <span>{idea.concept.brandName.charAt(0)}</span>
            <strong>{idea.concept.brandName}</strong>
          </a>
          <nav aria-label="Concept navigation">
            {idea.concept.nav.map((item) => <a href="#services" key={item}>{item}</a>)}
          </nav>
          <a className="prospect-nav-cta" href="#contact">Book a visit <ArrowUpRight size={13} /></a>
        </header>

        <section className="prospect-hero" id="top">
          <div className="prospect-hero-copy">
            <p>{idea.concept.hero.eyebrow}</p>
            <h1>{idea.concept.hero.title}</h1>
            <p>{idea.concept.hero.description}</p>
            <div>
              <a href="#contact">{idea.concept.hero.primaryCta} <ArrowRight size={14} /></a>
              <a href="#services">{idea.concept.hero.secondaryCta}</a>
            </div>
          </div>
          <div className="prospect-visual" role="img" aria-label="Abstract home service illustration">
            <div className="prospect-sun" />
            <div className="prospect-house">
              <div className="prospect-roof" />
              <div className="prospect-door" />
              <div className="prospect-window prospect-window-one" />
              <div className="prospect-window prospect-window-two" />
            </div>
            <div className="prospect-availability"><span /> Booking this week</div>
          </div>
        </section>

        <section className="prospect-proof" aria-label="Company highlights">
          {idea.concept.proof.map((item) => (
            <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
          ))}
        </section>

        <section className="prospect-services" id="services">
          <div className="prospect-section-title">
            <p>How we can help</p>
            <h2>One reliable team for the work around your home.</h2>
          </div>
          <div className="prospect-service-grid">
            {idea.concept.services.map((service) => (
              <article key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact" aria-label={`Learn about ${service.title}`}>Learn more <ArrowUpRight size={12} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="prospect-process">
          <p>A straightforward start</p>
          <ol>
            {idea.concept.process.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </section>

        <section className="prospect-closing" id="contact">
          <div><p>{idea.concept.closing.eyebrow}</p><h2>{idea.concept.closing.title}</h2></div>
          <div><p>{idea.concept.closing.description}</p><a href="#contact">{idea.concept.closing.cta} <ArrowRight size={14} /></a></div>
        </section>
      </main>

      <footer className="idea-disclaimer">
        <p>Unofficial concept prepared by Bayline Digital for {idea.company}. Not commissioned or approved by the company.</p>
        <span>Concept only · {idea.preparedOn}</span>
      </footer>
    </div>
  );
}
