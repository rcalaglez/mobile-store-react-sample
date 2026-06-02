import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders default error message", () => {
    render(<ErrorState />);
    expect(
      screen.getByText("Algo ha ido mal. Inténtalo de nuevo.")
    ).toBeInTheDocument();
  });

  it("renders custom message when provided", () => {
    render(<ErrorState message="Error de red" />);
    expect(screen.getByText("Error de red")).toBeInTheDocument();
  });
});
