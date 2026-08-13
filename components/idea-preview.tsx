import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
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
      <header className="idea-topbar">
        <a href="https://www.baylinedigital.com" aria-label="Bayline Digital home">
          <Logo />
        </a>
        <p>Private concept <span aria-hidden="true" /> Prepared {idea.preparedOn}</p>
        <a href={idea.bookingUrl}>Discuss the idea <ArrowUpRight size={14} /></a>
      </header>

      <main>
        <section className="idea-intro idea-wrap">
          <div className="idea-intro-copy">
            <p className="idea-kicker">{idea.pitch.eyebrow}</p>
            <h1>{idea.pitch.title}</h1>
            <p>{idea.pitch.summary}</p>
            <div className="idea-actions">
              <a className="idea-primary" href="#concept">Explore the concept <ArrowDown size={16} /></a>
              {idea.walkthroughUrl && (
                <a className="idea-secondary" href={idea.walkthroughUrl} target="_blank" rel="noreferrer">
                  <Play size={14} fill="currentColor" /> Watch the walkthrough
                </a>
              )}
            </div>
          </div>

          <aside className="idea-opportunity">
            <span>01 / Opportunity</span>
            <h2>{idea.pitch.opportunityTitle}</h2>
            <p>{idea.pitch.opportunitySummary}</p>
            <ul>
              {idea.pitch.observations.map((observation) => (
                <li key={observation}><Check size={14} /> <span>{observation}</span></li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="idea-concept-section" id="concept">
          <div className="idea-wrap idea-section-head">
            <div><p className="idea-kicker">The concept</p><h2>A focused website direction.</h2></div>
            <p>This is an early, unofficial design direction created from publicly available information—not a finished website.</p>
          </div>

          <div className="idea-browser-wrap">
            <div className="idea-browser-bar">
              <div aria-hidden="true"><i /><i /><i /></div>
              <span>{idea.concept.brandName.toLowerCase().replaceAll(" ", "")}.ca</span>
              <small>Concept preview</small>
            </div>

            <div className="prospect-site" style={palette}>
              <header className="prospect-nav">
                <a className="prospect-brand" href="#concept" aria-label={`${idea.concept.brandName} concept home`}>
                  <span>{idea.concept.brandName.charAt(0)}</span>
                  <strong>{idea.concept.brandName}</strong>
                </a>
                <nav aria-label="Concept navigation">
                  {idea.concept.nav.map((item) => <a href="#concept-services" key={item}>{item}</a>)}
                </nav>
                <a className="prospect-nav-cta" href="#concept-contact">Book a visit <ArrowUpRight size={13} /></a>
              </header>

              <section className="prospect-hero">
                <div className="prospect-hero-copy">
                  <p>{idea.concept.hero.eyebrow}</p>
                  <h2>{idea.concept.hero.title}</h2>
                  <p>{idea.concept.hero.description}</p>
                  <div>
                    <a href="#concept-contact">{idea.concept.hero.primaryCta} <ArrowRight size={14} /></a>
                    <a href="#concept-services">{idea.concept.hero.secondaryCta}</a>
                  </div>
                </div>
                <div className="prospect-visual" aria-label="Abstract home service illustration">
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

              <section className="prospect-services" id="concept-services">
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
                      <a href="#concept-contact" aria-label={`Learn about ${service.title}`}>Learn more <ArrowUpRight size={12} /></a>
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

              <section className="prospect-closing" id="concept-contact">
                <div><p>{idea.concept.closing.eyebrow}</p><h2>{idea.concept.closing.title}</h2></div>
                <div><p>{idea.concept.closing.description}</p><a href="#concept-contact">{idea.concept.closing.cta} <ArrowRight size={14} /></a></div>
              </section>
            </div>
          </div>
        </section>

        <section className="idea-benefits idea-wrap">
          <div className="idea-section-head">
            <div><p className="idea-kicker">Why this direction</p><h2>Designed around the decision.</h2></div>
            <p>Every element has a job: explain the offer, earn confidence, or make the next step easier.</p>
          </div>
          <div className="idea-benefit-grid">
            {idea.benefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="idea-next idea-wrap">
          <div><p className="idea-kicker">Next step</p><h2>Worth exploring together?</h2></div>
          <div>
            <p>If this direction feels useful, Bayline can turn the strongest parts into a clear scope, timeline, and working website.</p>
            <a href={idea.bookingUrl}>Talk through the concept <ArrowUpRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="idea-footer idea-wrap">
        <Logo />
        <p>Unofficial concept prepared for {idea.company}. Not commissioned or approved by the company.</p>
        <span>Bayline Digital · Toronto, Ontario</span>
      </footer>
    </div>
  );
}
