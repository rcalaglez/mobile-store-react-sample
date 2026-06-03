import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductActions from "./ProductActions";
import CartProvider from "@/features/cart/context/CartProvider";

const product = {
  id: "1",
  options: {
    storages: [
      { code: "128", name: "128 GB" },
      { code: "256", name: "256 GB" },
    ],
    colors: [
      { code: "black", name: "Black" },
      { code: "white", name: "White" },
    ],
  },
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </CartProvider>
      </QueryClientProvider>
    );
  };
}

describe("ProductActions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renders storage and color selectors", () => {
    render(<ProductActions product={product} />, { wrapper: createWrapper() });

    expect(screen.getByText("Almacenamiento")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();
  });

  it("calls addToCart API on button click", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 1 }),
    });

    const user = userEvent.setup();
    render(<ProductActions product={product} />, { wrapper: createWrapper() });

    await user.click(screen.getByText("Añadir al carrito"));

    expect(fetch).toHaveBeenCalledWith(
      "/api/cart",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ id: "1", colorCode: "black", storageCode: "128" }),
      })
    );
  });
});
