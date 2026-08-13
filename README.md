# Bayline Digital — Next.js

Marketing site for Bayline Digital, a custom digital studio. Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui** primitives.

## Stack

- **Next.js 15** — App Router, Turbopack dev server, RSC by default
- **React 19**
- **Tailwind CSS v4** — CSS-first config via `@theme` (no `tailwind.config.ts` needed)
- **shadcn/ui (new-york)** — Button / Input / Textarea / Card / Label primitives, CVA + `cn`
- **Geist Sans / Mono** via `geist` package, **Instrument Serif** via `next/font/google`
- **lucide-react** icons

## Getting started

```bash
pnpm install   # or npm / yarn / bun
pnpm dev       # http://localhost:3000
```

Production build:

```bash
pnpm build && pnpm start
```

## Project structure

```
app/
  globals.css       Tailwind v4 + theme tokens (@theme) + grain utility
  layout.tsx        Root layout, font variables, grain overlay
  page.tsx          Single-page site, composes all sections
components/
  ui/               shadcn primitives (button, input, textarea, card, label)
  nav.tsx           Sticky blur nav with mobile menu
  hero.tsx          Hero + animated "uptime" device-frame visual
  services.tsx      6 service cards
  why-us.tsx        6 reasons grid
  process.tsx       Interactive 4-step process with hoverable detail panel
  work.tsx          4 case-study/concept cards
  about.tsx         Studio principles card
  contact.tsx       Validated inquiry form with budget chips + success state
  footer.tsx
  logo.tsx
  reveal.tsx        IntersectionObserver-driven scroll reveal
  section-header.tsx
lib/
  utils.ts          cn() helper
```

## Design tokens

All color, font, and radius tokens live in `app/globals.css` under `@theme`. Tailwind v4 auto-generates utilities (`bg-bg`, `text-ink`, `border-line`, `font-serif`, etc.) from them. To swap the palette, change the variables — no rebuild config to touch.

```css
@theme inline {
  --color-bg: #f6f4ee;
  --color-ink: #0e1b32;
  --color-blue: #3d6cb6;
  /* … */
}
```

## Adding more shadcn components

```bash
pnpm dlx shadcn@latest add dialog
```

`components.json` is already configured for the **new-york** style, neutral base, CSS variables, and `@/` path alias.

## Prospect idea previews

Private, no-index concept pages for warm leads live at `/ideas/[slug]`. Prospect copy, colours, and concept content are configured in `lib/data/ideas.ts`; the route is deliberately absent from the public navigation and sitemap.

See [Deploying and sharing prospect ideas](docs/deploy-idea-previews.md) for the repeatable publishing workflow and privacy guidance.

## Notes

- The only piece of custom CSS in the project is a subtle grain overlay (`grain` utility in `globals.css`), kept because a `data:` SVG noise pattern cannot be expressed as a Tailwind utility.
- The contact form is client-side only; wire `onSubmit` to your inbox provider (Resend, Formspree, an API route, etc.) before going live.
- "Trusted by" logos and sample work entries are placeholders — swap in real material.
