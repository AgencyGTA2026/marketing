import { createHash } from "node:crypto";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { hasMeaningfulSocialCopy, renderCreative, wrapHeadline } from "@/lib/social/generation";

describe("Bayline Digital 4:5 renderer", () => {
  it("rejects repeated-character model output before it can be published", () => {
    expect(hasMeaningfulSocialCopy("000000000000000000000000000000")).toBe(false);
    expect(hasMeaningfulSocialCopy("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false);
    expect(hasMeaningfulSocialCopy("A practical website should make the next step obvious.")).toBe(true);
  });

  it("wraps long headlines into the safe editorial area", () => {
    const lines = wrapHeadline("A practical system for turning better websites into steady growth");
    expect(lines.length).toBeLessThanOrEqual(4);
    expect(lines.every((line) => line.length <= 25)).toBe(true);
  });

  it("produces a deterministic 1080×1350 PNG with required brand colors", async () => {
    const source = await sharp({ create: { width: 1024, height: 1536, channels: 3, background: "#83919a" } }).png().toBuffer();
    const brief = {
      headline: "Clear systems. Better work.",
      onImageKicker: "Lead operations",
      onImageSupport: "The useful workflow starts after someone clicks submit.",
    };
    const first = await renderCreative(source, brief);
    const second = await renderCreative(source, brief);
    const metadata = await sharp(first).metadata();
    expect(metadata).toMatchObject({ width: 1080, height: 1350, format: "png" });
    expect(createHash("sha256").update(first).digest("hex")).toBe(createHash("sha256").update(second).digest("hex"));
    const topAccent = await sharp(first).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer();
    expect([...topAccent.slice(0, 3)]).toEqual([36, 87, 230]);
  });
});
