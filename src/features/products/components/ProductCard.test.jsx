import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductCard from "./ProductCard";

const product = {
  id: "1",
  brand: "Samsung",
  model: "Galaxy S24",
  price: 899,
  imgUrl: "https://example.com/galaxy.jpg",
};

function renderCard(overrides = {}) {
  return render(
    <MemoryRouter>
      <ProductCard product={{ ...product, ...overrides }} />
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders brand and model", () => {
    renderCard();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    renderCard();
    expect(screen.getByText("899 €")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    renderCard();
    const img = screen.getByAltText("Samsung Galaxy S24");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/galaxy.jpg");
  });

  it("renders 'Sin imagen' placeholder when imgUrl is empty", () => {
    renderCard({ imgUrl: "" });
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
    expect(screen.queryByAltText("Samsung Galaxy S24")).not.toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    renderCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/1");
  });

  it("has descriptive aria-label on the link", () => {
    renderCard();
    expect(
      screen.getByLabelText("Ver detalle de Samsung Galaxy S24")
    ).toBeInTheDocument();
  });

  it("renders dash when price is missing", () => {
    renderCard({ price: null });
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
