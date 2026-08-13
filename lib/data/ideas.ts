import { businessConfig } from "@/lib/data/business";

export type ProspectIdea = {
  slug: string;
  company: string;
  preparedOn: string;
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
] as const satisfies readonly ProspectIdea[];

export function getProspectIdea(slug: string) {
  return PROSPECT_IDEAS.find((idea) => idea.slug === slug);
}
