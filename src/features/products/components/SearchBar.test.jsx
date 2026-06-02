import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders toggle button with 'Abrir búsqueda' label", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Abrir búsqueda")).toBeInTheDocument();
  });

  it("toggles to open state on button click", async () => {
    const user = userEvent.setup();
    render(<SearchBar value="" onChange={vi.fn()} />);

    await user.click(screen.getByLabelText("Abrir búsqueda"));

    expect(screen.getByLabelText("Cerrar búsqueda")).toBeInTheDocument();
    expect(screen.getByLabelText("Buscar productos")).toBeInTheDocument();
  });

  it("focuses input when opened", async () => {
    const user = userEvent.setup();
    render(<SearchBar value="" onChange={vi.fn()} />);

    await user.click(screen.getByLabelText("Abrir búsqueda"));

    expect(screen.getByRole("searchbox")).toHaveFocus();
  });

  it("calls onChange for each keystroke", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    await user.click(screen.getByLabelText("Abrir búsqueda"));
    await user.type(screen.getByRole("searchbox"), "sa");

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, "s");
    expect(onChange).toHaveBeenNthCalledWith(2, "a");
  });

  it("shows clear button only when value is present", async () => {
    const { rerender } = render(
      <SearchBar value="" onChange={vi.fn()} />
    );

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Abrir búsqueda"));

    expect(screen.queryByLabelText("Limpiar búsqueda")).not.toBeInTheDocument();

    rerender(<SearchBar value="test" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Limpiar búsqueda")).toBeInTheDocument();
  });

  it("calls onChange with empty string when clear is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="samsung" onChange={onChange} />);

    await user.click(screen.getByLabelText("Abrir búsqueda"));
    await user.click(screen.getByLabelText("Limpiar búsqueda"));

    expect(onChange).toHaveBeenCalledWith("");
  });
});
