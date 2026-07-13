# Design System

## Direction

The approved direction is clean, editorial and direct. It should feel like a confident small studio, not a SaaS dashboard or generated agency template.

## Visual rules

- Use large, plain-language headlines.
- Use warm off-white backgrounds, deep ink text and one strong Bayline blue.
- Create hierarchy with spacing, type scale and horizontal rules.
- Prefer full-width rows and editorial lists over repeated card grids.
- Use one clear primary action per section.
- Keep animation limited to useful hover or disclosure feedback.
- Use real project imagery only when it adds evidence. Avoid generic faces and fake dashboards.

## Avoid

- Background grids
- Glass effects
- Floating badges
- Decorative corner brackets
- Gradient blobs
- Fake analytics interfaces
- Excessive rounded cards
- Tiny all-caps labels everywhere
- Invented client metrics, testimonials or logos
- Long keyword-stuffed text blocks

## Core tokens

```css
:root {
  --ink: #121820;
  --muted: #5c626a;
  --paper: #f4f1ea;
  --white: #fcfbf7;
  --blue: #2457e6;
  --blue-dark: #173eb4;
  --rule: #cfcac0;
}
```

Use the production font configuration when possible. The reference build uses Geist with Arial as fallback.

## Layout

- Maximum content width: approximately `1240px`
- Desktop side margin: `32px` minimum
- Mobile side margin: `16px`
- Major section spacing: `88–140px`
- Desktop breakpoint: approximately `940–980px`
- Mobile breakpoint: approximately `640px`

## Typography

- Hero: `68–124px`, tight tracking and line height
- Major section heading: `45–76px`
- Row heading: `29–44px`
- Body: `14–18px`, line height `1.6–1.75`
- Eyebrows: use sparingly at `9–10px` with letter spacing

## Shared components

### Header

Use the same logo, three or four primary navigation links and one understated text CTA. On mobile, replace hidden navigation with an accessible menu if the production site requires access to more routes.

### Buttons

Primary buttons use solid Bayline blue, square corners and a simple arrow. Secondary links use a thin underline or rule. Do not add heavy shadows, pills or gradients.

### Forms

Use labels above inputs, visible keyboard focus, concise validation messages and a full-width primary submit button. Keep the form visually aligned with the page rather than placing it in a floating glass card.

### FAQs

Use native `details` and `summary` where possible. Preserve keyboard behavior and clear focus states.

## Accessibility

- Maintain WCAG AA contrast.
- Keep visible focus indicators.
- Do not rely on color alone for status.
- Use one `h1` per page and ordered heading levels.
- Respect reduced-motion settings.
- Use descriptive link text.
- Ensure touch targets are at least approximately `44px` high.
