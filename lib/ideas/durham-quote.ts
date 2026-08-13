export const JUNK_TYPES = [
  { value: "household", label: "Household junk", adjustment: [0, 0] },
  { value: "furniture", label: "Furniture", adjustment: [20, 40] },
  { value: "appliances", label: "Appliances", adjustment: [35, 65] },
  { value: "yard", label: "Yard waste", adjustment: [15, 45] },
  { value: "renovation", label: "Reno debris", adjustment: [55, 95] },
] as const;

export const LOAD_SIZES = [
  { value: "single", label: "Single item", shortLabel: "1 item", range: [89, 139] },
  { value: "quarter", label: "Quarter truck", shortLabel: "¼ load", range: [159, 239] },
  { value: "half", label: "Half truck", shortLabel: "½ load", range: [289, 389] },
  { value: "three-quarter", label: "Three-quarter truck", shortLabel: "¾ load", range: [419, 549] },
  { value: "full", label: "Full truck", shortLabel: "Full", range: [579, 749] },
] as const;

export const ACCESS_LEVELS = [
  { value: "curbside", label: "Curbside / driveway", adjustment: [0, 0] },
  { value: "inside", label: "Inside, easy access", adjustment: [20, 45] },
  { value: "stairs", label: "Stairs or tight access", adjustment: [55, 95] },
  { value: "disassembly", label: "Disassembly needed", adjustment: [80, 140] },
] as const;

export type JunkType = (typeof JUNK_TYPES)[number]["value"];
export type LoadSize = (typeof LOAD_SIZES)[number]["value"];
export type AccessLevel = (typeof ACCESS_LEVELS)[number]["value"];

export type DurhamQuoteInput = {
  junkType: JunkType;
  loadSize: LoadSize;
  access: AccessLevel;
};

export type DurhamQuote = {
  minimum: number;
  maximum: number;
};

export function calculateDurhamQuote(input: DurhamQuoteInput): DurhamQuote {
  const load = LOAD_SIZES.find((item) => item.value === input.loadSize);
  const junk = JUNK_TYPES.find((item) => item.value === input.junkType);
  const access = ACCESS_LEVELS.find((item) => item.value === input.access);

  if (!load || !junk || !access) throw new Error("Unknown Durham quote option");

  return {
    minimum: load.range[0] + junk.adjustment[0] + access.adjustment[0],
    maximum: load.range[1] + junk.adjustment[1] + access.adjustment[1],
  };
}

export function formatQuoteRange(quote: DurhamQuote) {
  return `$${quote.minimum}–$${quote.maximum}`;
}
