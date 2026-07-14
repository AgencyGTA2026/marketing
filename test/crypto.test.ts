import { beforeEach, describe, expect, it } from "vitest";

describe("Meta token protection", () => {
  beforeEach(() => { process.env.TOKEN_ENCRYPTION_KEY = Buffer.alloc(32, 7).toString("base64"); });

  it("round-trips with AES-GCM and uses a unique nonce", async () => {
    const { decryptToken, encryptToken } = await import("@/lib/social/crypto");
    const first = encryptToken("page-access-token");
    const second = encryptToken("page-access-token");
    expect(first).not.toBe(second);
    expect(decryptToken(first)).toBe("page-access-token");
  });

  it("redacts tokens from persisted error messages", async () => {
    const { sanitizeError } = await import("@/lib/social/crypto");
    expect(sanitizeError(new Error("access_token=secret123 Bearer abc.def"))).not.toContain("secret123");
    expect(sanitizeError(new Error("access_token=secret123 Bearer abc.def"))).not.toContain("abc.def");
    const failedQuery = sanitizeError(new Error("Failed query\nparams: magic-token,first line\nprivate prompt on another line"));
    expect(failedQuery).not.toContain("magic-token");
    expect(failedQuery).not.toContain("private prompt");
  });

  it("uses the underlying database cause instead of the failed query wrapper", async () => {
    const { sanitizeError } = await import("@/lib/social/crypto");
    const cause = new Error("duplicate key value violates unique constraint");
    expect(sanitizeError(new Error("Failed query\nparams: private prompt", { cause }))).toBe(cause.message);
  });
});
