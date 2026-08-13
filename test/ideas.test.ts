import { describe, expect, it } from "vitest";
import { getProspectIdea, PROSPECT_IDEAS } from "@/lib/data/ideas";
import { calculateDurhamQuote, formatQuoteRange } from "@/lib/ideas/durham-quote";

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
    expect(getProspectIdea("durham-junk-removal")?.template).toBe("durham-junk-removal");
    expect(getProspectIdea("missing-company")).toBeUndefined();
  });

  it("calculates the Durham concept estimate from volume, material, and access", () => {
    expect(calculateDurhamQuote({ junkType: "household", loadSize: "quarter", access: "curbside" })).toEqual({
      minimum: 159,
      maximum: 239,
    });

    const complexLoad = calculateDurhamQuote({
      junkType: "renovation",
      loadSize: "half",
      access: "stairs",
    });

    expect(complexLoad).toEqual({ minimum: 399, maximum: 579 });
    expect(formatQuoteRange(complexLoad)).toBe("$399–$579");
  });
});
