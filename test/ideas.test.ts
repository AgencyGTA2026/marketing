import { describe, expect, it } from "vitest";
import { getProspectIdea, PROSPECT_IDEAS } from "@/lib/data/ideas";

describe("prospect ideas", () => {
  it("uses unique, URL-safe slugs", () => {
    const slugs = PROSPECT_IDEAS.map((idea) => idea.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
  });

  it("contains the content needed to render a complete concept", () => {
    for (const idea of PROSPECT_IDEAS) {
      expect(idea.company.length).toBeGreaterThan(2);
      expect(idea.concept.services).toHaveLength(3);
      expect(idea.concept.proof).toHaveLength(3);
      expect(idea.bookingUrl).toMatch(/^https:\/\//);
    }
  });

  it("finds known concepts and rejects unknown slugs", () => {
    expect(getProspectIdea("harbour-home-services")?.company).toBe("Harbour Home Services");
    expect(getProspectIdea("missing-company")).toBeUndefined();
  });
});
