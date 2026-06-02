import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductGrid from "./ProductGrid";

const products = [
  { id: "1", brand: "Samsung", model: "Galaxy S24", price: 899 },
  { id: "2", brand: "Apple", model: "iPhone 15", price: 999 },
  { id: "3", brand: "Xiaomi", model: "Redmi Note 13", price: 199 },
];

function renderGrid(productList) {
  return render(
    <MemoryRouter>
      <ProductGrid products={productList} />
    </MemoryRouter>
  );
}

describe("ProductGrid", () => {
  it("renders a card for each product", () => {
    renderGrid(products);
    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Xiaomi")).toBeInTheDocument();
  });

  it("renders empty state message when no products", () => {
    renderGrid([]);
    expect(
      screen.getByText("No hay productos que coincidan con la búsqueda.")
    ).toBeInTheDocument();
  });

  it("does not render grid container when products list is empty", () => {
    const { container } = renderGrid([]);
    expect(container.querySelector(".grid")).not.toBeInTheDocument();
  });

  it("renders correct number of links", () => {
    renderGrid(products);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });
});
