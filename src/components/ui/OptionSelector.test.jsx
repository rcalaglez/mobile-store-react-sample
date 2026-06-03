import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionSelector, { StorageOption, ColorOption } from "./OptionSelector";

const options = [
  { code: "128", name: "128 GB" },
  { code: "256", name: "256 GB" },
];

describe("OptionSelector", () => {
  it("renders label and all options", () => {
    render(
      <OptionSelector
        label="Almacenamiento"
        options={options}
        selected={null}
        onSelect={vi.fn()}
        renderOption={(opt) => <span>{opt.name}</span>}
      />
    );

    expect(screen.getByText("Almacenamiento")).toBeInTheDocument();
    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
  });

  it("calls onSelect with the option code on click", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <OptionSelector
        label="Almacenamiento"
        options={options}
        selected={null}
        onSelect={onSelect}
        renderOption={(opt) => <span>{opt.name}</span>}
      />
    );

    await user.click(screen.getByText("256 GB"));
    expect(onSelect).toHaveBeenCalledWith("256");
  });

  it("passes isSelected correctly to renderOption", () => {
    const renderOption = vi.fn((opt, isSelected) => (
      <span>{isSelected ? "SELECTED" : opt.name}</span>
    ));

    render(
      <OptionSelector
        label="Almacenamiento"
        options={options}
        selected="256"
        onSelect={vi.fn()}
        renderOption={renderOption}
      />
    );

    expect(renderOption).toHaveBeenCalledWith(
      expect.objectContaining({ code: "128" }),
      false
    );
    expect(renderOption).toHaveBeenCalledWith(
      expect.objectContaining({ code: "256" }),
      true
    );
  });
});

describe("StorageOption", () => {
  it("renders option name", () => {
    render(<StorageOption option={{ name: "128 GB" }} isSelected={false} />);
    expect(screen.getByText("128 GB")).toBeInTheDocument();
  });
});

describe("ColorOption", () => {
  it("renders color name and swatch", () => {
    render(<ColorOption option={{ name: "Black" }} isSelected={false} />);
    expect(screen.getByText("Black")).toBeInTheDocument();
  });
});
