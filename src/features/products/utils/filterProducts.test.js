import { describe, it, expect } from "vitest";
import { filterProducts } from "./filterProducts";

const products = [
  { id: "1", brand: "Samsung", model: "Galaxy S24" },
  { id: "2", brand: "Apple", model: "iPhone 15" },
  { id: "3", brand: "Xiaomi", model: "Redmi Note 13" },
  { id: "4", brand: "Samsung", model: "Galaxy A55" },
];

describe("filterProducts", () => {
  it("returns all products when term is empty", () => {
    expect(filterProducts(products, "")).toHaveLength(4);
  });

  it("returns all products when term is whitespace", () => {
    expect(filterProducts(products, "   ")).toHaveLength(4);
  });

  it("filters by brand (case-insensitive)", () => {
    const result = filterProducts(products, "samsung");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.brand === "Samsung")).toBe(true);
  });

  it("filters by model (case-insensitive)", () => {
    const result = filterProducts(products, "galaxy");
    expect(result).toHaveLength(2);
  });

  it("filters with partial match", () => {
    const result = filterProducts(products, "iPhone");
    expect(result).toHaveLength(1);
    expect(result[0].model).toBe("iPhone 15");
  });

  it("returns empty array when no match", () => {
    expect(filterProducts(products, "zzz")).toHaveLength(0);
  });

  it("returns empty array for empty products list", () => {
    expect(filterProducts([], "samsung")).toHaveLength(0);
  });

  it("handles products with undefined brand/model gracefully", () => {
    const partial = [
      { id: "1", brand: "Samsung" },
      { id: "2", model: "iPhone" },
    ];
    expect(filterProducts(partial, "samsung")).toHaveLength(1);
  });

  it("uses original array reference when term is empty", () => {
    const result = filterProducts(products, "");
    expect(result).toBe(products);
  });

  it("filters by brand + model combined", () => {
    const extended = [
      ...products,
      { id: "5", brand: "Acer", model: "Iconia Tab A500" },
    ];
    const result = filterProducts(extended, "acer iconia");
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Acer");
  });

  it("filters by model + brand reversed order", () => {
    const extended = [
      ...products,
      { id: "5", brand: "Acer", model: "Iconia Tab A500" },
    ];
    const result = filterProducts(extended, "iconia acer");
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Acer");
  });

  it("each word must match at least one field", () => {
    const result = filterProducts(products, "samsung iphone");
    expect(result).toHaveLength(0);
  });
});
