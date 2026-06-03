import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAddToCart from "./useAddToCart";
import CartProvider from "@/features/cart/context/CartProvider";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );
  };
}

describe("useAddToCart", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("calls the API with the correct data", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 1 }),
    });

    const { result } = renderHook(() => useAddToCart(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({
        id: "abc",
        colorCode: 1,
        storageCode: 2,
      });
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/cart",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ id: "abc", colorCode: 1, storageCode: 2 }),
      })
    );
  });

  it("updates cart count on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 3 }),
    });

    const { result } = renderHook(() => useAddToCart(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({
        id: "abc",
        colorCode: 1,
        storageCode: 2,
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
