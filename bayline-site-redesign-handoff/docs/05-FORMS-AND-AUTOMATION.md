# Forms and Automation

## One reusable form

Build one production `InquiryForm` with configurable presentation:

```ts
type InquiryFormProps = {
  compact?: boolean;
  sourcePage: string;
  location?: string;
  service?: string;
  heading?: string;
};
```

Use it on:

- Contact page: full version
- Location pages: compact version in the hero
- Service pages: compact version near the closing CTA
- Homepage: CTA or compact version only if it does not overcrowd the page

## Submission payload

```ts
type InquiryPayload = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  message?: string;
  location?: string;
  sourcePage: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};
```

## Client behavior

- Validate required fields before submission.
- Disable the button while submitting.
- Show a specific inline error when submission fails.
- Show success only after the server confirms delivery.
- Preserve typed values on failure.
- Do not expose provider errors or secrets.
- Add an accessible status region for submission feedback.

## Server responsibilities

- Validate and normalize input.
- Reject unexpected fields.
- Apply rate limiting.
- Add a honeypot and/or appropriate bot protection.
- Escape untrusted content before placing it in email or CRM notes.
- Notify Bayline by email.
- Add or update the CRM lead when configured.
- Record page, city, service and UTM attribution.
- Return a safe success or error response.

## Suggested automation sequence

1. Receive and validate inquiry.
2. Send Bayline the complete lead context.
3. Send the visitor a concise confirmation with next steps.
4. Create or update the CRM contact.
5. Create an owner follow-up task.
6. Alert the appropriate channel only when helpful.

Do not claim that any of these steps happen until the corresponding integration is configured and tested.

## Analytics events

Recommended events:

```text
form_view
form_start
form_validation_error
form_submit
form_success
form_error
booking_click
email_click
phone_click
```

Include `source_page`, `location`, `service` and available UTM values. Never include the visitor's email or message in analytics.

## Production form replacement

The current Whitby `LocationForm.tsx` uses a local success state for demonstration. Replace it with a request to the production endpoint and call `setSubmitted(true)` only after `response.ok`.
