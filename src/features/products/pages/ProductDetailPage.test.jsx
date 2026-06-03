import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "@/features/cart/context/CartProvider";
import ProductDetailPage from "./ProductDetailPage";
import * as useProductModule from "@/features/products/hooks/useProduct";

const mockProduct = {
  id: "1",
  brand: "Samsung",
  model: "Galaxy S24",
  price: 899,
  imgUrl: "https://example.com/img.jpg",
  cpu: "Octa-core",
  ram: "8 GB",
  os: "Android 14",
  displayResolution: "1080 x 2340",
  battery: "4000 mAh",
  primaryCamera: ["50 MP", "12 MP"],
  secondaryCamera: ["12 MP"],
  dimensions: "147.0 x 70.6 x 7.6 mm",
  weight: "167 g",
  options: {
    colors: [
      { code: "black", name: "Black" },
      { code: "white", name: "White" },
    ],
    storages: [
      { code: "128", name: "128 GB" },
      { code: "256", name: "256 GB" },
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
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={children} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </QueryClientProvider>
    );
  };
}

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows spinner while loading", () => {
    vi.spyOn(useProductModule, "useProduct").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<ProductDetailPage />, { wrapper: createWrapper() });
    expect(screen.getByLabelText("Cargando")).toBeInTheDocument();
  });

  it("shows error state when query fails", () => {
    vi.spyOn(useProductModule, "useProduct").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<ProductDetailPage />, { wrapper: createWrapper() });
    expect(
      screen.getByText("Algo ha ido mal. Inténtalo de nuevo.")
    ).toBeInTheDocument();
  });

  it("renders product brand in orange and model", () => {
    vi.spyOn(useProductModule, "useProduct").mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    render(<ProductDetailPage />, { wrapper: createWrapper() });

    const brands = screen.getAllByText("Samsung");
    expect(brands[0]).toHaveClass("text-orange-600");
    expect(screen.getAllByText("Galaxy S24").length).toBeGreaterThanOrEqual(1);
  });

  it("renders back link to product list", () => {
    vi.spyOn(useProductModule, "useProduct").mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    render(<ProductDetailPage />, { wrapper: createWrapper() });

    const backLink = screen.getByText("← Volver al listado");
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("renders product image with correct alt", () => {
    vi.spyOn(useProductModule, "useProduct").mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    render(<ProductDetailPage />, { wrapper: createWrapper() });

    const img = screen.getByAltText("Samsung Galaxy S24");
    expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
  });
});
