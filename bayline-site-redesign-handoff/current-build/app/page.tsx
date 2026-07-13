const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  {
    number: "01",
    title: "Look established",
    description:
      "A modern website that explains what you do quickly, feels credible, and gives every service a clear place to live.",
    details: "Website design · Development · Local SEO",
  },
  {
    number: "02",
    title: "Make the next step obvious",
    description:
      "Focused pages, stronger offers, and simpler quote paths that turn more of the right visitors into real conversations.",
    details: "Landing pages · Copy direction · Conversion tracking",
  },
  {
    number: "03",
    title: "Follow up without the scramble",
    description:
      "Connect your forms, inbox, CRM, and team so new inquiries receive a useful response while the opportunity is still warm.",
    details: "Lead automation · CRM connections · Internal tools",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header wrap">
        <a className="logo" href="#top" aria-label="Bayline Digital home">
          <span className="logo-slashes" aria-hidden="true">//</span>
          <span>BAYLINE <b>DIGITAL</b></span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#work">What we do</a>
          <a href="#automation">Automation</a>
          <a href="#approach">Why Bayline</a>
        </nav>

        <a className="header-cta" href="https://www.baylinedigital.com/contact">
          Start a conversation <Arrow />
        </a>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-intro">
          <p>WEB DESIGN &amp; AUTOMATION FOR GROWING BUSINESSES</p>
          <span>TORONTO · ONTARIO</span>
        </div>

        <h1>
          A better website makes your business
          <span> easier to choose.</span>
        </h1>

        <div className="hero-bottom">
          <p>
            Bayline designs clear, conversion-focused websites and connects the
            follow-up systems behind them. Fewer missed opportunities. Less manual work.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="https://www.baylinedigital.com/contact">
              Get a free homepage review <Arrow />
            </a>
            <a className="quiet-link" href="#work">Explore our services ↓</a>
          </div>
        </div>
      </section>

      <section className="statement-band" aria-label="Bayline Digital value proposition">
        <div className="wrap statement-inner">
          <p>Good design earns attention.</p>
          <p>Clear thinking earns trust.</p>
          <p>Fast follow-up wins the work.</p>
        </div>
      </section>

      <section className="work wrap" id="work">
        <div className="section-title">
          <p>WHAT WE ACTUALLY IMPROVE</p>
          <h2>From first impression to first reply.</h2>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <div className="service-copy">
                <p>{service.description}</p>
                <span>{service.details}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="automation" id="automation">
        <div className="wrap automation-layout">
          <div className="automation-heading">
            <p>AFTER SOMEONE CLICKS “SUBMIT”</p>
            <h2>Your website should keep working.</h2>
            <p className="automation-lede">
              Most websites stop at the form. Bayline can connect what happens next,
              without forcing your team into a complicated new platform.
            </p>
          </div>

          <div className="sequence" aria-label="Example automated lead follow-up sequence">
            <div className="sequence-item">
              <span>1</span>
              <div><strong>A new inquiry arrives</strong><p>The useful details are captured once.</p></div>
            </div>
            <div className="sequence-item">
              <span>2</span>
              <div><strong>The customer gets a real response</strong><p>Helpful next steps go out immediately.</p></div>
            </div>
            <div className="sequence-item">
              <span>3</span>
              <div><strong>Your team knows what to do</strong><p>The lead and follow-up task reach the right place.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="approach wrap" id="approach">
        <div className="approach-heading">
          <p>WHY BAYLINE</p>
          <h2>A small team by design.</h2>
          <span>
            You work directly with the people planning and building the project.
            No sales-to-production handoff. No mystery around what you own.
          </span>
        </div>

        <div className="principles">
          <article>
            <span>01</span>
            <h3>Clear scope</h3>
            <p>Practical recommendations, transparent deliverables, and a clear reason behind each decision.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Direct access</h3>
            <p>Short communication lines with the people doing the strategy, design, and development.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Your foundation</h3>
            <p>You own the finished work, and it is built to remain useful as the business changes.</p>
          </article>
        </div>
      </section>

      <section className="closing-wrap wrap">
        <div className="closing">
          <div>
            <p>NOT SURE WHERE TO START?</p>
            <h2>Show us what you have.</h2>
          </div>
          <div>
            <p>
              We&apos;ll review your current homepage and point out the first thing
              we would improve. No hard pitch and no 40-page report.
            </p>
            <a className="closing-link" href="https://www.baylinedigital.com/contact">
              Request your free review <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer wrap">
        <a className="logo" href="#top" aria-label="Bayline Digital home">
          <span className="logo-slashes" aria-hidden="true">//</span>
          <span>BAYLINE <b>DIGITAL</b></span>
        </a>
        <div>
          <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>
          <span>Toronto, Ontario</span>
        </div>
        <span>© 2026 Bayline Digital Inc.</span>
      </footer>
    </main>
  );
}
