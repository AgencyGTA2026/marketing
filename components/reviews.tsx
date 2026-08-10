const REVIEWS = [
  {
    quote:
      "Bayline turned a complex coaching workflow into a product that feels focused. Preparation, session notes, follow-up, and client progress finally work together without creating another complicated system to manage.",
    name: "Sarah",
    company: "Coachly",
  },
  {
    quote:
      "The site gave Ottawa Burger Spot a strong editorial identity while keeping every score and field report easy to browse. It feels like a real local publication, not a generic restaurant directory.",
    name: "Alex",
    company: "Ottawa Burger Spot",
  },
  {
    quote:
      "Bayline shaped a technical publishing workflow into a product people can understand quickly. The interface makes a multi-step SEO process feel controlled, reviewable, and ready to use.",
    name: "Ryan",
    company: "AutoBlogWriter",
  },
] as const;

export function Reviews() {
  return (
    <section className="customer-reviews" aria-labelledby="customer-reviews-title">
      <div className="wrap">
        <header className="customer-reviews-heading">
          <p className="eyebrow">PRODUCT OWNER REVIEWS</p>
          <h2 id="customer-reviews-title">Built close to the problem.</h2>
        </header>
        <div className="customer-review-grid">
          {REVIEWS.map((review, index) => (
            <blockquote key={review.company}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>“{review.quote}”</p>
              <footer>
                <strong>{review.name}</strong>
                <span>{review.company}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
