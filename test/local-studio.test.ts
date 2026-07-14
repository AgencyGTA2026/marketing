import { describe, expect, it } from "vitest";
import { hostnameFromHostHeader, isLoopbackHostname, isStudioHostname } from "@/lib/local-studio";

describe("local-only Social Studio", () => {
  it.each(["localhost", "studio.localhost", "127.0.0.1", "::1", "[::1]"])("allows %s", (hostname) => {
    expect(isLoopbackHostname(hostname)).toBe(true);
  });

  it.each(["baylinedigital.com", "studio.baylinedigital.com", "127.0.0.2", "localhost.example.com"])("blocks %s", (hostname) => {
    expect(isLoopbackHostname(hostname)).toBe(false);
  });

  it("allows exact configured production hosts without allowing preview or lookalike domains", () => {
    const configured = "www.baylinedigital.com,https://baylinedigital.com";
    expect(isStudioHostname("www.baylinedigital.com", configured)).toBe(true);
    expect(isStudioHostname("baylinedigital.com", configured)).toBe(true);
    expect(isStudioHostname("preview.baylinedigital.com", configured)).toBe(false);
    expect(isStudioHostname("baylinedigital.com.example.com", configured)).toBe(false);
  });

  it.each([
    ["localhost:3000", "localhost"],
    ["127.0.0.1:3000", "127.0.0.1"],
    ["[::1]:3000", "::1"],
    ["baylinedigital.com", "baylinedigital.com"],
  ])("extracts the hostname from %s", (host, expected) => {
    expect(hostnameFromHostHeader(host)).toBe(expected);
  });
});
