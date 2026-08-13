import { businessConfig } from "@/lib/data/business";

export type ProspectIdea = {
  slug: string;
  company: string;
  preparedOn: string;
  template?: "standard" | "durham-junk-removal";
  walkthroughUrl?: string;
  bookingUrl: string;
  concept: {
    brandName: string;
    location: string;
    nav: readonly string[];
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    proof: ReadonlyArray<{ value: string; label: string }>;
    services: ReadonlyArray<{ number: string; title: string; description: string }>;
    process: readonly string[];
    closing: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };
    palette: {
      ink: string;
      paper: string;
      accent: string;
      soft: string;
      white: string;
    };
  };
};

export const PROSPECT_IDEAS = [
  {
    slug: "harbour-home-services",
    company: "Harbour Home Services",
    preparedOn: "August 2026",
    bookingUrl: businessConfig.calendlyUrl,
    concept: {
      brandName: "Harbour",
      location: "Home Services · Toronto & GTA",
      nav: ["Services", "How it works", "Reviews"],
      hero: {
        eyebrow: "Dependable help for the jobs that cannot wait",
        title: "Your home, back to working order.",
        description:
          "Straightforward repairs, maintenance, and small renovations from a local team that shows up prepared.",
        primaryCta: "Request a visit",
        secondaryCta: "See our services",
      },
      proof: [
        { value: "4.9", label: "Average homeowner rating" },
        { value: "12+", label: "Years serving the GTA" },
        { value: "1 day", label: "Typical response time" },
      ],
      services: [
        {
          number: "01",
          title: "Repairs",
          description: "Resolve the small problems before they become expensive ones.",
        },
        {
          number: "02",
          title: "Maintenance",
          description: "Keep essential systems and finishes working through every season.",
        },
        {
          number: "03",
          title: "Improvements",
          description: "Complete focused upgrades without managing multiple contractors.",
        },
      ],
      process: ["Tell us what is happening", "Get a clear recommendation", "Choose a visit time"],
      closing: {
        eyebrow: "A clearer first step",
        title: "Tell us what needs attention.",
        description:
          "Share a few details and a photo. Harbour will reply with the right next step and a practical time to visit.",
        cta: "Start your request",
      },
      palette: {
        ink: "#18352f",
        paper: "#f3efe5",
        accent: "#e65d38",
        soft: "#dce8dc",
        white: "#fffdf8",
      },
    },
  },
  {
    slug: "durham-junk-removal",
    company: "Durham Junk Removal",
    preparedOn: "August 2026",
    template: "durham-junk-removal",
    bookingUrl: businessConfig.calendlyUrl,
    concept: {
      brandName: "Durham Junk Removal",
      location: "Junk Removal · Durham Region",
      nav: ["Services", "How it works", "Service areas"],
      hero: {
        eyebrow: "Local hauling without the lost weekend",
        title: "Clear the clutter. Keep your weekend.",
        description:
          "Tell us what needs to go and get a quick concept estimate before choosing your pickup window.",
        primaryCta: "Build my estimate",
        secondaryCta: "Call 905-410-4036",
      },
      proof: [
        { value: "Call or text", label: "Choose the easiest way to reach us" },
        { value: "Photo quotes", label: "Show the load before booking" },
        { value: "Durham-wide", label: "Local service across the region" },
      ],
      services: [
        {
          number: "01",
          title: "Home cleanouts",
          description: "Clear garages, basements, moves, and accumulated household clutter.",
        },
        {
          number: "02",
          title: "Bulky pickups",
          description: "Remove furniture, appliances, and awkward items without the heavy lifting.",
        },
        {
          number: "03",
          title: "Project debris",
          description: "Haul yard waste and light renovation debris after the work is finished.",
        },
      ],
      process: ["Describe the load", "Confirm the job", "Reclaim your space"],
      closing: {
        eyebrow: "Ready when you are",
        title: "Show us what needs to go.",
        description:
          "Start with a quick estimate, then send the details Durham Junk Removal needs to confirm the job.",
        cta: "Get my estimate",
      },
      palette: {
        ink: "#071d36",
        paper: "#f4f7f2",
        accent: "#78c83f",
        soft: "#dfeaf1",
        white: "#ffffff",
      },
    },
  },
] as const satisfies readonly ProspectIdea[];

export function getProspectIdea(slug: string): ProspectIdea | undefined {
  return PROSPECT_IDEAS.find((idea) => idea.slug === slug);
}
