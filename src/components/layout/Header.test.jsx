import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header";

describe("Header", () => {
  it("renders the MOVY logo linking to home", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByLabelText("Movy - Inicio");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
    expect(logo).toHaveTextContent("MOVY");
  });

  it("renders the cart icon with product count", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Carrito con 1 productos")).toBeInTheDocument();
  });

  it("renders the cart badge with count", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Todos los productos")).toBeInTheDocument();
  });
});
