import Link from "next/link";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="primary-button" href={href}>{children}<Arrow /></Link>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children}<Arrow /></Link>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className={`section-heading ${description ? "" : "section-heading-two"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function FAQList({ items }: { items: ReadonlyArray<{ question: string; answer: string }> }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}<span aria-hidden="true">+</span></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ClosingCTA({ eyebrow = "NOT SURE WHERE TO START?", title = "Show us what you have.", copy = "We will review the current setup and point you toward the first useful improvement.", href = "/contact", linkLabel = "Start a conversation" }: { eyebrow?: string; title?: string; copy?: string; href?: string; linkLabel?: string }) {
  return (
    <section className="wrap closing-wrap">
      <div className="closing-cta">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
        <div><p>{copy}</p><TextLink href={href}>{linkLabel}</TextLink></div>
      </div>
    </section>
  );
}
