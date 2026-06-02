import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductListPage from "./ProductListPage";
import * as useProductsModule from "@/features/products/hooks/useProducts";

const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  brand: i % 2 === 0 ? "Samsung" : "Apple",
  model: `Model ${i + 1}`,
  price: (i + 1) * 100,
  imgUrl: "",
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

describe("ProductListPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows spinner while loading", () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Cargando")).toBeInTheDocument();
  });

  it("shows error state when query fails", () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });
    expect(
      screen.getByText("Algo ha ido mal. Inténtalo de nuevo.")
    ).toBeInTheDocument();
  });

  it("renders first 12 products on success", async () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Model 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Model 12")).toBeInTheDocument();
    expect(screen.queryByText("Model 13")).not.toBeInTheDocument();
  });

  it("shows 'load more' area when there are more products", async () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Model 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Model 12")).toBeInTheDocument();
    expect(screen.queryByText("Model 13")).not.toBeInTheDocument();
  });

  it("shows empty state when search has no results", async () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Model 1")).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Abrir búsqueda"));
    await user.type(screen.getByRole("searchbox"), "zzzznonexistent");

    await waitFor(
      () => {
        expect(
          screen.getByText("No hay productos que coincidan con la búsqueda.")
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("filters products when searching", async () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Model 1")).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Abrir búsqueda"));
    await user.type(screen.getByRole("searchbox"), "Apple");

    await waitFor(
      () => {
        expect(screen.getByText("Model 2")).toBeInTheDocument();
        expect(screen.queryByText("Model 1")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("resets visible count when search term changes", async () => {
    vi.spyOn(useProductsModule, "useProducts").mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Model 1")).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Abrir búsqueda"));
    await user.type(screen.getByRole("searchbox"), "Samsung");

    await waitFor(
      () => {
        expect(screen.getByText("Model 1")).toBeInTheDocument();
        expect(screen.getByText("Model 3")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
