import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header";
import CartProvider from "@/features/cart/context/CartProvider";

function renderHeader() {
  return render(
    <CartProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </CartProvider>
  );
}

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the MOVY logo linking to home", () => {
    renderHeader();

    const logo = screen.getByLabelText("Movy - Inicio");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
    expect(logo).toHaveTextContent("MOVY");
  });

  it("renders the cart icon", () => {
    renderHeader();
    expect(screen.getByLabelText("Carrito con 0 productos")).toBeInTheDocument();
  });

  it("does not show badge when count is 0", () => {
    renderHeader();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    renderHeader();

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Todos los productos")).toBeInTheDocument();
  });
});
