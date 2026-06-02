import { describe, it, expect } from "vitest";
import { formatPrice } from "./priceUtils";

describe("formatPrice", () => {
  it("formats a numeric price with locale and Euro symbol", () => {
    const result = formatPrice(1299);
    expect(result).toContain("€");
    expect(result).toContain("1299");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("0 €");
  });

  it("formats decimal prices", () => {
    expect(formatPrice(49.99)).toContain("49,99");
    expect(formatPrice(49.99)).toContain("€");
  });

  it("returns dash for null", () => {
    expect(formatPrice(null)).toBe("—");
  });

  it("returns dash for undefined", () => {
    expect(formatPrice(undefined)).toBe("—");
  });

  it("returns dash for empty string", () => {
    expect(formatPrice("")).toBe("—");
  });

  it("appends Euro symbol to non-numeric strings", () => {
    expect(formatPrice("abc")).toBe("abc €");
  });

  it("formats numeric strings correctly", () => {
    expect(formatPrice("599")).toBe("599 €");
  });
});
