import { describe, it, expect } from "vitest";
import { getColorHex } from "./colorMap";

describe("getColorHex", () => {
  it("returns hex for known color names", () => {
    expect(getColorHex("black")).toBe("#171717");
    expect(getColorHex("gold")).toBe("#d4a843");
  });

  it("is case insensitive and trims whitespace", () => {
    expect(getColorHex("  Black  ")).toBe("#171717");
    expect(getColorHex("GOLD")).toBe("#d4a843");
  });

  it("returns fallback for unknown or empty values", () => {
    expect(getColorHex("unknown")).toBe("#d4d4d4");
    expect(getColorHex(null)).toBe("#d4d4d4");
    expect(getColorHex("")).toBe("#d4d4d4");
  });
});
