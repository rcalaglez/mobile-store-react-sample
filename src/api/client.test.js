import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./client";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("apiClient", () => {
  it("calls fetch with the correct URL", async () => {
    const mockData = [{ id: "1" }];
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await apiClient.request("/api/product");

    expect(fetch).toHaveBeenCalledWith(
      "https://itx-frontend-test.onrender.com/api/product",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("returns parsed JSON on success", async () => {
    const mockData = [{ id: "1", brand: "Samsung" }];
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiClient.request("/api/product");
    expect(result).toEqual(mockData);
  });

  it("throws an error when response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(apiClient.request("/api/product")).rejects.toThrow(
      "API error 500 on /api/product"
    );
  });

  it("throws on 404 responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(apiClient.request("/api/missing")).rejects.toThrow(
      "API error 404 on /api/missing"
    );
  });

  it("passes custom options to fetch", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await apiClient.request("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: "1" }),
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://itx-frontend-test.onrender.com/api/cart",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ productId: "1" }),
      })
    );
  });

  it("custom headers override defaults via spread", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await apiClient.request("/api/test", {
      headers: { Authorization: "Bearer token" },
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token",
        }),
      })
    );
  });
});
