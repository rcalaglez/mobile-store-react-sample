import { describe, it, expect } from "vitest";
import { filterProductsWithPrice } from "./filterProductsWithPrice";

describe("filterProductsWithPrice", () => {
  it("keeps products with valid numeric price", () => {
    const products = [
      { id: "1", price: 299 },
      { id: "2", price: 0 },
    ];
    expect(filterProductsWithPrice(products)).toHaveLength(2);
  });

  it("filters out products with null price", () => {
    const products = [{ id: "1", price: null }];
    expect(filterProductsWithPrice(products)).toHaveLength(0);
  });

  it("filters out products with undefined price", () => {
    const products = [{ id: "1" }];
    expect(filterProductsWithPrice(products)).toHaveLength(0);
  });

  it("filters out products with empty string price", () => {
    const products = [{ id: "1", price: "" }];
    expect(filterProductsWithPrice(products)).toHaveLength(0);
  });

  it("keeps products with string numeric price", () => {
    const products = [{ id: "1", price: "299" }];
    expect(filterProductsWithPrice(products)).toHaveLength(1);
  });

  it("returns empty array for empty input", () => {
    expect(filterProductsWithPrice([])).toEqual([]);
  });

  it("returns empty array when called without arguments", () => {
    expect(filterProductsWithPrice()).toEqual([]);
  });

  it("filters mixed valid and invalid prices correctly", () => {
    const products = [
      { id: "1", price: 100 },
      { id: "2", price: null },
      { id: "3", price: "" },
      { id: "4", price: 200 },
      { id: "5" },
    ];
    const result = filterProductsWithPrice(products);
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual(["1", "4"]);
  });
});
