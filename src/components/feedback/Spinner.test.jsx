import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders with status role and aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Cargando")).toBeInTheDocument();
  });
});
