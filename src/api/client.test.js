import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient, ApiError } from "./client";

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
      "/api/product",
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

  it("throws ApiError with status on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: "Internal error" }),
    });

    const error = await apiClient.request("/api/product").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(500);
    expect(error.message).toBe("Internal error");
  });

  it("falls back to default message when body has no message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    const error = await apiClient.request("/api/missing").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
    expect(error.message).toBe("API error 404 on /api/missing");
  });

  it("handles non-JSON error body gracefully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: () => Promise.reject(new SyntaxError("Unexpected token")),
    });

    const error = await apiClient.request("/api/product").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(502);
    expect(error.message).toBe("API error 502 on /api/product");
  });

  it("throws ApiError on invalid JSON response body", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new SyntaxError("Unexpected token <")),
    });

    const error = await apiClient.request("/api/product").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.message).toContain("Invalid JSON response");
  });

  it("throws ApiError on network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch")
    );

    const error = await apiClient.request("/api/product").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(0);
    expect(error.message).toContain("Network error");
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
      "/api/cart",
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
