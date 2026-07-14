import { afterEach, describe, expect, it } from "vitest";
import { assertGenerationConfiguration } from "@/lib/social/generation";

const original = {
  openai: process.env.OPENAI_API_KEY,
  blob: process.env.BLOB_READ_WRITE_TOKEN,
  oidc: process.env.VERCEL_OIDC_TOKEN,
  store: process.env.BLOB_STORE_ID,
};

afterEach(() => {
  for (const [key, value] of Object.entries({
    OPENAI_API_KEY: original.openai,
    BLOB_READ_WRITE_TOKEN: original.blob,
    VERCEL_OIDC_TOKEN: original.oidc,
    BLOB_STORE_ID: original.store,
  })) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("social generation configuration", () => {
  it("fails before generation when Blob credentials are missing", () => {
    process.env.OPENAI_API_KEY = "test-key";
    delete process.env.BLOB_READ_WRITE_TOKEN;
    delete process.env.VERCEL_OIDC_TOKEN;
    delete process.env.BLOB_STORE_ID;
    expect(() => assertGenerationConfiguration()).toThrow(/BLOB_READ_WRITE_TOKEN/);
  });

  it("accepts a local Blob read/write token", () => {
    process.env.OPENAI_API_KEY = "test-key";
    process.env.BLOB_READ_WRITE_TOKEN = "vercel_blob_test";
    expect(() => assertGenerationConfiguration()).not.toThrow();
  });
});
