import type { Metadata } from "next";
import LocationForm from "./LocationForm";

const Arrow = () => <span aria-hidden="true">↗</span>;

export const metadata: Metadata = {
  title: "Web Design Whitby | Websites, Local SEO & Automation | Bayline Digital",
  description:
    "Bayline Digital builds modern websites, local landing pages, and lead automation for Whitby and Durham Region businesses.",
};

const offers = [
  {
    number: "01",
    label: "WEB DESIGN WHITBY",
    title: "A website that earns trust quickly.",
    copy: "Custom, mobile-first websites built around your services, your customers, and the action you want visitors to take.",
    points: ["Clear service structure", "Fast, accessible pages", "CMS editing when you need it"],
  },
  {
    number: "02",
    label: "WEBSITE REDESIGN",
    title: "Keep what works. Fix what costs you calls.",
    copy: "We sharpen the message, simplify the page structure, and replace the dated parts without making the project bigger than it needs to be.",
    points: ["Stronger trust signals", "Simpler quote paths", "Cleaner mobile experience"],
  },
  {
    number: "03",
    label: "LOCAL SEO WHITBY",
    title: "Useful local pages, not copied city text.",
    copy: "We build a solid local search foundation with service-area content, technical SEO, internal links, and Google Business Profile alignment.",
    points: ["Local service pages", "Schema and metadata", "Search tracking foundations"],
  },
  {
    number: "04",
    label: "LEAD AUTOMATION",
    title: "Make every inquiry easier to act on.",
    copy: "Forms can notify your team, send an immediate customer reply, update your CRM, and create the next follow-up automatically.",
    points: ["Email and SMS follow-up", "CRM connections", "Custom workflows and portals"],
  },
];

export default function WhitbyPage() {
  return (
    <main className="location-page">
      <header className="site-header wrap">
        <a className="logo" href="/" aria-label="Bayline Digital home">
          <span className="logo-slashes" aria-hidden="true">//</span>
          <span>BAYLINE <b>DIGITAL</b></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#local">Why local</a>
          <a href="#faq">Questions</a>
        </nav>
        <a className="header-cta" href="#inquiry">Free homepage review <Arrow /></a>
      </header>

      <section className="location-hero wrap">
        <div className="location-hero-copy">
          <p className="location-kicker"><span /> WEB DESIGN IN WHITBY, ONTARIO</p>
          <h1>Look established.<br />Get contacted.<br /><em>Follow up faster.</em></h1>
          <p className="location-summary">
            Bayline builds modern websites and practical automation for Whitby
            businesses that want more than a nicer-looking homepage.
          </p>

          <div className="location-trust">
            <span>Direct access to the builder</span>
            <span>You own the finished website</span>
            <span>Typical website launch: 4–6 weeks</span>
          </div>
        </div>

        <LocationForm />
      </section>

      <section className="local-proof">
        <div className="wrap local-proof-inner">
          <span>WORKING ACROSS DURHAM REGION</span>
          <div>
            <p>Whitby</p><p>Brooklin</p><p>Ajax</p><p>Oshawa</p><p>Pickering</p>
          </div>
        </div>
      </section>

      <section className="location-services wrap" id="services">
        <div className="location-section-heading">
          <p>WHAT WE BUILD</p>
          <h2>One clear system for getting found, trusted, and contacted.</h2>
        </div>

        <div className="location-offers">
          {offers.map((offer) => (
            <article key={offer.number}>
              <div className="offer-meta"><span>{offer.number}</span><p>{offer.label}</p></div>
              <div className="offer-main"><h3>{offer.title}</h3><p>{offer.copy}</p></div>
              <ul>{offer.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="local-context" id="local">
        <div className="wrap local-context-layout">
          <div>
            <p>BUILT FOR THE WAY LOCAL CUSTOMERS CHOOSE</p>
            <h2>Local traffic is valuable only when the page feels credible.</h2>
          </div>
          <div className="local-context-copy">
            <p>
              Someone searching for a Whitby service is usually comparing several
              businesses at once. They need to understand what you do, where you
              work, and why they should contact you without hunting for the answer.
            </p>
            <p>
              That is why every local page needs useful city context, specific
              services, visible proof, and an inquiry path that works just as well
              on a phone as it does on a desktop.
            </p>
          </div>
        </div>

        <div className="wrap local-principles">
          <article><span>01</span><h3>Specific</h3><p>Each city page answers questions that matter in that market instead of swapping a city name into duplicated copy.</p></article>
          <article><span>02</span><h3>Easy to scan</h3><p>Search-friendly content is broken into short, useful sections for real business owners and customers.</p></article>
          <article><span>03</span><h3>Ready to convert</h3><p>The form stays close to the main promise, with a second clear path back to it near the bottom.</p></article>
        </div>
      </section>

      <section className="location-faq wrap" id="faq">
        <div className="location-faq-heading">
          <p>COMMON QUESTIONS</p>
          <h2>Before we get started.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>How much does a website cost in Whitby?<span>+</span></summary>
            <p>The scope depends on the page count, CMS needs, integrations, and copy. After a short review, Bayline provides a fixed-price proposal with clear deliverables.</p>
          </details>
          <details>
            <summary>Can you improve my existing website instead?<span>+</span></summary>
            <p>Yes. If the current foundation is usable, a focused redesign or landing page can improve trust and conversion without replacing everything at once.</p>
          </details>
          <details>
            <summary>Can the form connect to our CRM or booking tool?<span>+</span></summary>
            <p>Yes. Forms can route details to email, a CRM, a spreadsheet, a booking system, or a custom workflow depending on the tools your team already uses.</p>
          </details>
          <details>
            <summary>Will we own the website when it launches?<span>+</span></summary>
            <p>Yes. You own the finished website and its content. Bayline can continue hosting and supporting it, but the foundation is yours.</p>
          </details>
        </div>
      </section>

      <section className="location-closing wrap">
        <p>YOUR CURRENT HOMEPAGE IS ENOUGH TO START</p>
        <h2>We&apos;ll show you the first thing worth fixing.</h2>
        <a href="#inquiry">Request a free homepage review <Arrow /></a>
      </section>

      <footer className="footer wrap">
        <a className="logo" href="/" aria-label="Bayline Digital home">
          <span className="logo-slashes" aria-hidden="true">//</span>
          <span>BAYLINE <b>DIGITAL</b></span>
        </a>
        <div><a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a><span>Toronto, Ontario</span></div>
        <span>© 2026 Bayline Digital Inc.</span>
      </footer>
    </main>
  );
}
