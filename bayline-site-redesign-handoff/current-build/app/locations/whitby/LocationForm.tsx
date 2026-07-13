"use client";

import { FormEvent, useState } from "react";

export default function LocationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="location-form-success" role="status">
        <span>FORM PREVIEW</span>
        <h2>This form is ready to connect.</h2>
        <p>
          In production, submissions can route to Bayline&apos;s existing inquiry
          endpoint, email inbox, CRM, or an automated follow-up workflow.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="location-form" id="inquiry" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>FREE HOMEPAGE REVIEW</span>
        <p>Tell us where to look. We&apos;ll reply within one business day.</p>
      </div>

      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
      </label>

      <label>
        <span>Work email</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@business.com" required />
      </label>

      <label>
        <span>Current website</span>
        <input name="website" type="url" inputMode="url" placeholder="https://" />
      </label>

      <label>
        <span>What would help most?</span>
        <select name="service" defaultValue="Website redesign">
          <option>Website redesign</option>
          <option>New website</option>
          <option>Local SEO</option>
          <option>Lead automation</option>
          <option>Custom app or portal</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <label className="form-full">
        <span>What is not working? <i>Optional</i></span>
        <textarea name="message" rows={3} placeholder="A sentence or two is plenty." />
      </label>

      <input type="hidden" name="location" value="Whitby" />

      <button className="form-submit form-full" type="submit">
        Request my free review <span aria-hidden="true">↗</span>
      </button>

      <p className="form-note form-full">No mailing list. No hard pitch. Just a practical review.</p>
    </form>
  );
}
